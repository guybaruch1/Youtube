import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CurrentVideo.css';
import ScreenVideo from './ScreenVideo';
import ButtonsVideo from './userOptions/ButtonsVideo';
import Comments from './userOptions/Comments';

function CurrentVideo({ video, onLikeToggle, onDislikeToggle, onCommentAdd, onCommentDelete, onCommentEdit,
                        resetComments, setResetComments, currentUser, onDeleteVideo, onEditVideo, comments }) {

  const videoRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(video?.title || '');
  const [editedDescription, setEditedDescription] = useState(video?.description || '');
  const [editedTopic, setEditedTopic] = useState(video?.topic || '');
  const [displayName, setDisplayName] = useState('');

  const fetchDisplayName = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${video._id}/uploader`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("API Response Data:", data); // Log the entire response data
      setDisplayName(data.uploaderId.display_name); // Access the populated field
      console.log("DisplayName after fetch:", data.uploaderId.display_name); // Add logging
    } catch (error) {
      console.error('Error fetching display name:', error);
    }
  };

  useEffect(() => {
    if (video._id) {
      fetchDisplayName();
    }
  }, [video._id]);

  useEffect(() => {
    if (resetComments) {
      setResetComments(false);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [video, resetComments, setResetComments]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditVideo(video._id, editedTitle, editedDescription, editedTopic, video.uploaderId);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(video.title);
    setEditedDescription(video.description);
    setEditedTopic(video.topic);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDeleteVideo(video._id);
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  const isUploader = currentUser && currentUser._id === video.uploaderId;

  return (
      <div className='main-content justify-content-center'>
        <ScreenVideo video={video} videoRef={videoRef} />
        <div className='row'>
          <div className='col-7'>
            <div className="video-header">
              <h4>{video.title}</h4>
              <Link to={`/user/${video.uploaderId}`} className='no-underline'>
                <p>{displayName}</p>
              </Link>
            </div>
          </div>
          <div className='col-5'>
            <ButtonsVideo video={video} onLikeToggle={onLikeToggle} onDislikeToggle={onDislikeToggle} currentUser={currentUser} />
          </div>
        </div>
        <div className="video-details-box p-3 mb-3">
          {isEditing ? (
              <div>
            <textarea
                className="form-control mb-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            ></textarea>
                <textarea
                    className="form-control mb-2"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
                <input
                    className="form-control mb-2"
                    value={editedTopic}
                    onChange={(e) => setEditedTopic(e.target.value)}
                />
                <button className="btn btn-primary me-2" onClick={handleSaveClick}>Save</button>
                <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
              </div>
          ) : (
              <div>
                <p className="text-bold">  {video.viewsCount} views • {video.dateUploaded} </p>
                <p>{video.description}</p>
                <p>{video.topic}</p>
                {isUploader && (
                    <div>
                      <button className="btn btn-secondary me-2" onClick={handleEditClick}>Edit Details</button>
                      <button className="btn btn-danger" onClick={handleDeleteClick}>Delete Video</button>
                    </div>
                )}
              </div>
          )}
        </div>
        <Comments
            video={video}
            onCommentAdd={onCommentAdd}
            onCommentDelete={onCommentDelete}
            onCommentEdit={onCommentEdit}
            resetComments={resetComments}
            currentUser={currentUser}
            comments={comments}
        />
      </div>
  );
}

export default CurrentVideo;