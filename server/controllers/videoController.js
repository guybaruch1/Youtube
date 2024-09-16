const videoService = require('../services/videoService.js');
const { sendToCppServer } = require('../services/tcpClient.js');  // Import the TCP client function


const getAllVideos = async (_, res) => {
  try {
    const videosList = await videoService.getAllVideos();
    res.json(videosList);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getVideosByUploader = async (req, res) => {
  const { id: uploaderId } = req.params;

  try {
    const videos = await videoService.getVideosByUploaderId(uploaderId);
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos by uploaderId:', error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.pid);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incrementViews = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.body.userId;  // Assuming userId is sent in the request body

    // Increment the video views (existing logic)
    await videoService.incrementViews(videoId);

    // Create a message to send to the C++ server
    const message = JSON.stringify({ user: userId, video: videoId });

    // Send the message to the C++ server and get recommendations
    sendToCppServer(message, async (recommendations) => {
      // Clean the recommendation response to extract only the video IDs
      const recommendedVideoIds = recommendations
          .replace('Recommended videos:', '') // Remove the "Recommended videos:" part
          .trim() // Remove leading/trailing spaces
          .split(' '); // Split into an array of video IDs

      // Fetch the recommended videos from MongoDB
      const recommendedVideos = await videoService.getVideosByIds(recommendedVideoIds);

      // Send the videos as JSON response
      res.status(200).json({
        message: "Views incremented and recommendations received",
        recommendedVideos
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    const result = await videoService.deleteVideoById(req.params.pid);
    if (result.deletedCount > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const updatedData = req.body;
    const result = await videoService.updateVideoById(req.params.pid, updatedData);
    if (result.nModified > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: 'Video not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createVideo = async (req, res) => {
  try {
    const { title, description, topic, uploaderId } = req.body; // Extract channel from req.body
    const videoFile = req.files.videoFile[0];
    const thumbnailFile = req.files.thumbnailFile ? req.files.thumbnailFile[0] : null;

    const newVideo = {
      id: Date.now(), // Adding id here
      title,
      description,
      topic,
      uploaderId,
      videoPath: `/uploads/videos/${videoFile.filename}`,
      thumbnailPath: thumbnailFile ? `/uploads/thumbnails/${thumbnailFile.filename}` : null,
      viewsCount: 0,
      dateUploaded: new Date().toLocaleDateString('en-GB'),
      isLiked: false,
      likes: 0,
      comments: [], // Initialize empty comments array
      likedBy: []   // Initialize empty likedBy array
    };

    const savedVideo = await videoService.createVideo(newVideo);
    res.status(201).json(savedVideo);
  } catch (err) {
    console.error('Error creating video:', err.message); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getMostViewedAndRandomVideos = async (req, res) => {
  try {
    const mostViewedVideos = await videoService.getMostViewedVideos(10);
    const mostViewedVideoIds = mostViewedVideos.map(video => video._id);
    const randomVideos = await videoService.getRandomVideos(10, mostViewedVideoIds);

    // Combine and shuffle the videos
    const combinedVideos = shuffleArray([...mostViewedVideos, ...randomVideos]);

    res.json(combinedVideos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addCommentToVideo = async (req, res) => {
  try {
    const { id } = req.params; // Video ID
    const { userId, comment } = req.body; // Comment data

    const updatedVideo = await videoService.addCommentToVideo(id, { userId, comment });
    if (updatedVideo) {
      res.status(200).json(updatedVideo);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCommentFromVideo = async (req, res) => {
  try {
    const { id, commentId } = req.params; // Video ID and Comment ID

    const updatedVideo = await videoService.deleteCommentFromVideo(id, commentId);
    if (updatedVideo) {
      res.status(200).json(updatedVideo);
    } else {
      res.status(404).json({ message: 'Video or comment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editCommentInVideo = async (req, res) => {
  try {
    const { id, commentId } = req.params; // Video ID and Comment ID
    const { comment } = req.body; // New comment data

    const updatedVideo = await videoService.editCommentInVideo(id, commentId, comment);
    if (updatedVideo) {
      res.status(200).json(updatedVideo);
    } else {
      res.status(404).json({ message: 'Video or comment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVideoWithUploaderNameById = async (req, res) => {
  try {
    const video = await videoService.getVideoWithUploaderNameById(req.params.id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUploaderId = async (req, res) => {
  try {
    const uploaderId = await videoService.getUploaderId(req.params.id);
    if (!uploaderId) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ uploaderId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getAllVideos,
  getVideosByUploader,
  getVideoById,
  incrementViews,
  deleteVideoById,
  updateVideoById,
  createVideo,
  getMostViewedAndRandomVideos, addCommentToVideo, deleteCommentFromVideo, editCommentInVideo,
  getVideoWithUploaderNameById,
  getUploaderId
};