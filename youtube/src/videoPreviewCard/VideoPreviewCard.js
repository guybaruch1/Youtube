import './VideoPreviewCard.css';
import { useTheme } from '../themeContext/ThemeContext';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VideoPreviewCard({ video }) {

  const { darkMode } = useTheme();
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

  return (
      <div className="col-4">
        <Link to={`/WatchVideo/${video._id}`} className='no-underline'>
          <div className={`card video-preview-card card-hover-effect ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            {video.thumbnailPath ? (
                <img src={video.thumbnailPath} alt="Thumbnail" className="card-img-top" />
            ) : (
                <video
                    className="card-img-top"
                    height="170px"
                    width="400"
                    controls={false}
                    preload="metadata"
                >
                  <source src={`${video.videoPath}#t=1`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            )}
            <div className="card-body">
              <h5 className="card-title">{video.title}</h5>
              <p>
                <Link to={`/user/${video.uploaderId}`} className='no-underline'>
                  <span className="card-text">{displayName || 'Loading...'}</span>
                </Link>
              </p>
              <p className="card-text">{video.description}</p>
              <p className="card-text">{video.dateUploaded} • {video.viewsCount} views</p>
            </div>
          </div>
        </Link>
      </div>
  );
}

export default VideoPreviewCard;
