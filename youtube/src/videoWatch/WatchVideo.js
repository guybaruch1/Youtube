import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';

function WatchVideo({ addComment, editComment, deleteComment, currentUser, videoList, deleteVideo, editVideo, setVideoList }) {
  const { videoId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [resetComments, setResetComments] = useState(false);
  const [comments, setComments] = useState([]); // Local state for comments
  const [uploaderId, setUploaderId] = useState(null); // State for uploaderId
  const [recommendedVideoList, setRecommendedVideoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUploaderId = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/api/videos/${id}/getUploaderId`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUploaderId(data.uploaderId);
        console.log('Uploader ID:', data.uploaderId); // Print uploaderId to the console
      } catch (error) {
        console.error('Error fetching uploaderId:', error);
      }
    };

    fetchUploaderId(videoId);
  }, [videoId]);

  useEffect(() => {
    const fetchAndIncrementVideoById = async (uploaderId, videoId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${uploaderId}/videos/${videoId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Increment the view count in the database
        await fetch(`http://localhost:8080/api/videos/increment-views/${videoId}`, {
          method: 'PATCH',
        });

        // Update the local state with the incremented view count
        setSelectedVideo({ ...data, viewsCount: (parseInt(data.viewsCount) + 1).toString() });
        setComments(data.comments); // Set comments from the response
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    const fetchRecommendations = async (videoId) => {
      try {
        // Fetch the recommended videos from the server
        const response = await fetch(`http://localhost:8080/api/videos/recommendations/${videoId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: currentUser?._id || null }),  // Handle case where user is not logged in
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommended videos');
        }

        const data = await response.json();
        let recommendedVideos = data.recommendedVideos;

        // Sort the videos in decreasing order by view count
        recommendedVideos.sort((a, b) => parseInt(b.viewsCount) - parseInt(a.viewsCount));

        // Filter out the current video from recommendations
        recommendedVideos = recommendedVideos.filter(video => video._id !== videoId);

        // If the list has fewer than 7 videos, supplement with videos from videoList
        if (recommendedVideos.length < 7) {
          // Create a Set of video IDs from the recommended videos to avoid duplicates
          const recommendedVideoIds = new Set(recommendedVideos.map(video => video._id));

          // Add videos from videoList, ensuring there are no duplicates
          for (let video of videoList) {
            if (!recommendedVideoIds.has(video._id)) {
              recommendedVideos.push(video);
              recommendedVideoIds.add(video._id);
            }

            // Stop once we have 7 videos
            if (recommendedVideos.length === 7) {
              break;
            }
          }
        }

        // Update the state with the final list of recommended videos
        setRecommendedVideoList(recommendedVideos);  // Set the recommended videos list into the state
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    if (uploaderId) {
      fetchAndIncrementVideoById(uploaderId, videoId);
    }

    if (currentUser){
      fetchRecommendations(videoId)
    } else{
      const filteredVideoList = videoList.filter(video => video._id !== videoId);
      setRecommendedVideoList(filteredVideoList);
    }

  }, [uploaderId, videoId]);

  useEffect(() => {
    if (selectedVideo) {
      window.scrollTo(0, 0); // Scroll to top when selectedVideo changes
    }
  }, [selectedVideo]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setResetComments(true);
  };

  const handleLikeToggle = (videoId) => {
    setVideoList(prevVideoList =>
        prevVideoList.map(video => {
          if (video._id === videoId) {
            return {
              ...video,
              isLiked: !video.isLiked,
              likes: video.isLiked ? video.likes - 1 : video.likes + 1,
              isDisliked: false,
            };
          } else {
            return video;
          }
        })
    );
  };

  const handleDislikeToggle = (videoId) => {
    setVideoList(prevVideoList =>
        prevVideoList.map(video => {
          if (video._id === videoId) {
            return {
              ...video,
              isDisliked: !video.isDisliked,
              isLiked: false,
              likes: video.isLiked ? video.likes - 1 : video.likes, // Update likes if previously liked
            };
          } else {
            return video;
          }
        })
    );
  };

  const handleCommentAdd = async (videoId, comment) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        setComments(updatedVideo.comments); // Update comments from response
        setResetComments(true);
      } else {
        console.error('Failed to add comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentDelete = async (videoId, commentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${videoId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id }), // Include user ID in the request body
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        setComments(updatedVideo.comments); // Update comments from response
        setResetComments(true);
      } else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCommentEdit = async (videoId, commentId, newComment) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${videoId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id, comment: newComment }), // Include user ID in the request body
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        setComments(updatedVideo.comments); // Update comments from response
        setResetComments(true);
      } else {
        console.error('Failed to edit comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteVideo = async (uploaderId, videoId) => {
    if (!uploaderId) {
      console.error('Uploader ID is not set.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${uploaderId}/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id }), // Include user ID in the request body
      });

      if (response.ok) {
        deleteVideo(videoId);
        navigate('/');
      } else {
        console.error('Failed to delete video:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEditVideo = async (videoId, newTitle, newDescription, newTopic, uploaderId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${uploaderId}/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, description: newDescription, topic: newTopic, userId: currentUser._id }), // Include user ID in the request body
      });

      if (response.ok) {
        editVideo(videoId, newTitle, newDescription, newTopic);
        setSelectedVideo(prevVideo => ({ ...prevVideo, title: newTitle, description: newDescription, topic: newTopic }));
      } else {
        console.error('Failed to edit video:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing video:', error);
    }
    window.location.reload();
  };


  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <div className="current-video-padding">
              {selectedVideo && (
                  <CurrentVideo
                      video={selectedVideo}
                      onLikeToggle={handleLikeToggle}
                      onDislikeToggle={handleDislikeToggle}
                      onCommentAdd={handleCommentAdd}
                      onCommentDelete={handleCommentDelete}
                      onCommentEdit={handleCommentEdit}
                      resetComments={resetComments}
                      setResetComments={setResetComments}
                      currentUser={currentUser}
                      comments={comments} // Pass the comments state here
                      onDeleteVideo={() => handleDeleteVideo(uploaderId, videoId)} // Pass the uploaderId
                      onEditVideo={handleEditVideo} // Pass the handleEditVideo function
                  />
              )}
            </div>
          </div>
          <div className="col-4">
            <SuggestedVideos onVideoSelect={handleVideoSelect} videoData={recommendedVideoList} />
          </div>
        </div>
      </div>
  );
}

export default WatchVideo;