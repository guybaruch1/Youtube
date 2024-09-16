// routes/videoRouter.js
const express = require('express');
const videoController = require('../controllers/videoController.js');
const upload = require('../middleware/multerConfig');
const authenticateToken = require('../middleware/authMiddleware'); // Correct import
const videoRouter = express.Router();

videoRouter.route('/')
    .get(videoController.getMostViewedAndRandomVideos)

videoRouter.get('/:id/getUploaderId', videoController.getUploaderId);

// Video information
videoRouter.get('/:id/uploader', videoController.getVideoWithUploaderNameById);
videoRouter.patch('/increment-views/:id', videoController.incrementViews);
videoRouter.patch('/recommendations/:id', videoController.recommendations);


// Handle comments
videoRouter.post('/:id/comments', authenticateToken, videoController.addCommentToVideo);
videoRouter.delete('/:id/comments/:commentId', authenticateToken, videoController.deleteCommentFromVideo);
videoRouter.put('/:id/comments/:commentId', authenticateToken, videoController.editCommentInVideo);

module.exports = videoRouter;