import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Comments({ video, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, currentUser, comments }) {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [addCommentText, setAddCommentText] = useState('');
  const [displayNames, setDisplayNames] = useState({});
  const [imagePaths, setImagePaths] = useState({});

  useEffect(() => {
    if (resetComments) {
      setNewComment('');
      setEditingComment(null);
      setAddCommentText('');
    }
  }, [resetComments]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIds = [...new Set(comments.map(comment => comment.userId?._id).filter(id => id))];
        console.log('Unique User IDs:', userIds);

        const displayNamePromises = userIds.map(userId =>
            axios.get(`/api/users/${userId}/getDisplayName`)
                .then(response => {
                  console.log(`Fetched display name for userId ${userId}:`, response.data.display_name);
                  return { userId, displayName: response.data.display_name };
                })
                .catch(error => {
                  console.error(`Error fetching display name for userId ${userId}:`, error);
                  return { userId, error };
                })
        );

        const imagePathPromises = userIds.map(userId =>
            axios.get(`/api/users/${userId}/getImagePath`)
                .then(response => {
                  console.log(`Fetched image path for userId ${userId}:`, response.data.image);
                  return { userId, imagePath: response.data.image };
                })
                .catch(error => {
                  console.error(`Error fetching image path for userId ${userId}:`, error);
                  return { userId, error };
                })
        );

        const displayNamesArray = await Promise.all(displayNamePromises);
        const imagePathsArray = await Promise.all(imagePathPromises);
        console.log('Fetched Display Names:', displayNamesArray);
        console.log('Fetched Image Paths:', imagePathsArray);

        const displayNamesMap = displayNamesArray.reduce((acc, { userId, displayName }) => {
          if (displayName) {
            acc[userId] = displayName;
          }
          return acc;
        }, {});
        const imagePathsMap = imagePathsArray.reduce((acc, { userId, imagePath }) => {
          if (imagePath) {
            acc[userId] = imagePath.startsWith('http') ? imagePath : `${imagePath}`;
          }
          return acc;
        }, {});
        console.log('Display Names Map:', displayNamesMap);
        console.log('Image Paths Map:', imagePathsMap);
        setDisplayNames(displayNamesMap);
        setImagePaths(imagePathsMap);
      } catch (error) {
        console.error('Error in fetchUserData:', error);
      }
    };

    fetchUserData();
  }, [comments]);

  const handleAddInputChange = (event) => {
    setAddCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (addCommentText.trim() !== '') {
      const comment = {
        userId: currentUser._id, // Ensure currentUser._id is correct
        comment: addCommentText
      };
      onCommentAdd(video._id, comment);
      setAddCommentText('');
    }
  };

  const handleCancelComment = () => {
    setAddCommentText('');
    setEditingComment(null);
  };

  const handleEditInputChange = (event) => {
    setEditingComment({ ...editingComment, comment: event.target.value });
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  const handleSaveComment = (commentId) => {
    if (editingComment.comment.trim() !== '') {
      onCommentEdit(video._id, commentId, editingComment.comment);
      setEditingComment(null);
    } else {
      alert('Comment cannot be empty.');
    }
  };

  const handleDeleteComment = (commentId) => {
    onCommentDelete(video._id, commentId);
  };

  return (
      <div>
        {currentUser && (
            <div className="input-group mt-3">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment..."
                  value={addCommentText}
                  onChange={handleAddInputChange}
              />
              <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleAddComment}
                    disabled={addCommentText.trim() === ''}
                >
                  Send
                </button>
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleCancelComment}
                >
                  Cancel
                </button>
              </div>
            </div>
        )}
        {!currentUser && (
            <h5>Please sign in to like a video or write a comment</h5>
        )}
        <div className="comments-section mt-3">
          {comments.map((comment) => {
            if (!comment.userId || !comment.userId._id) {
              console.error('Comment with missing or invalid userId:', comment);
              return null;
            }

            const displayName = displayNames[comment.userId._id] || 'Unknown';
            const imagePath = imagePaths[comment.userId._id] || 'default-user.png';

            console.log('Comment:', comment);
            console.log('Display Name:', displayName);
            console.log('Image Path:', imagePath);

            return (
                <div className='container-fluid' key={comment._id}>
                  <div className='row'>
                    <div className='col-1 align-items-center'>
                      <img
                          src={imagePath}
                          alt="User"
                          className="rounded-circle"
                          width="35px"
                          height="35px"
                      />
                    </div>
                    <div className='col-4'>
                      <div className='row'>
                        @{displayName}
                      </div>
                      <div className='row'>
                        <div className="comment-container">
                          {editingComment && editingComment._id === comment._id ? (
                              <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editingComment.comment}
                                    onChange={handleEditInputChange}
                                />
                                <div className="input-group-append">
                                  <button
                                      className="btn btn-outline-secondary"
                                      onClick={() => handleSaveComment(comment._id)}
                                      disabled={editingComment.comment.trim() === ''}
                                  >
                                    Save
                                  </button>
                                  <button
                                      className="btn btn-outline-secondary"
                                      onClick={() => handleCancelComment()}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                          ) : (
                              <>
                                <p>{comment.comment}</p>
                                {currentUser && currentUser._id === comment.userId._id && (
                                    <div className="input-group-append">
                                      <button className="btn btn-outline-secondary" onClick={() => handleEditComment(comment)}>
                                        <i className="bi bi-pencil"></i>
                                      </button>
                                      <button className="btn btn-outline-secondary" onClick={() => handleDeleteComment(comment._id)}>
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    </div>
                                )}
                              </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}

export default Comments;
