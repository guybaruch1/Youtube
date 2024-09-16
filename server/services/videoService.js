const VideoModel = require('../models/videoModel.js');

const getAllVideos = async () => {
  return await VideoModel.find({});
};

const getVideosByUploaderId = async (uploaderId) => {

  try {
    return await VideoModel.find({ uploaderId: uploaderId });
  } catch (error) {
    console.error('Error fetching videos by uploaderId:', error);
    throw error;
  }
};

const getVideoById = async (id) => {
  return await VideoModel.findOne({ _id: id }).populate('comments.userId', 'displayName');
};


const incrementViews = async (id) => {
  await VideoModel.updateOne({ _id: id }, { $inc: { viewsCount: 1 } });
};

const deleteVideoById = async (id) => {
  return await VideoModel.deleteOne({ _id: id });
};

const updateVideoById = async (id, updatedData) => {
  return await VideoModel.updateOne({ _id: id }, { $set: updatedData });
};

const createVideo = async (videoData) => {
  const video = new VideoModel(videoData);
  return await video.save();
};

const getMostViewedVideos = async (limit) => {
  return await VideoModel.find().sort({ viewsCount: -1 }).limit(limit);
};

const getRandomVideos = async (limit, excludedIds) => {
  return await VideoModel.aggregate([
    { $match: { _id: { $nin: excludedIds } } },
    { $sample: { size: limit } }
  ]);
};

const addCommentToVideo = async (id, commentData) => {
  return await VideoModel.findByIdAndUpdate(
      id,
      { $push: { comments: commentData } },
      { new: true, useFindAndModify: false }
  ).populate('comments.userId', 'displayName'); // Populate the userId field with displayName
};

const deleteCommentFromVideo = async (id, commentId) => {
  return await VideoModel.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true, useFindAndModify: false }
  ).populate('comments.userId', 'displayName');
};

const editCommentInVideo = async (id, commentId, newComment) => {
  return await VideoModel.findOneAndUpdate(
      { _id: id, 'comments._id': commentId },
      { $set: { 'comments.$.comment': newComment } },
      { new: true, useFindAndModify: false }
  ).populate('comments.userId', 'displayName');
};

const getVideoWithUploaderNameById = async (id) => {
  try {
    const video = await VideoModel.findOne({ _id: id }).populate('uploaderId', 'display_name');
    return video;
  } catch (error) {
    console.error('Error in getVideoWithUploaderNameById:', error);
    throw error;
  }
};

const getUploaderId = async (videoId) => {
  try {
    const video = await VideoModel.findById(videoId).select('uploaderId');
    if (!video) {
      return null;
    }
    return video.uploaderId;
  } catch (error) {
    throw new Error('Error fetching uploader ID');
  }
};

const getVideosByIds = async (videoIds) => {
  return await VideoModel.find({ _id: { $in: videoIds } });
};


module.exports = {
  getAllVideos, getVideosByUploaderId,
  getVideoById, incrementViews,
  deleteVideoById, updateVideoById, createVideo,
  getMostViewedVideos, getRandomVideos, addCommentToVideo, deleteCommentFromVideo, editCommentInVideo,
  getVideoWithUploaderNameById, getUploaderId, getVideosByIds
};