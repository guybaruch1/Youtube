import React, { useEffect, useRef } from 'react';

function ScreenVideo({ video, videoRef }) {
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video, videoRef]);

  return (
    <div>
      <div className="current-video">
        <div className="mb-3">
          {video ? (
            <video
              ref={videoRef}
              key={video._id}
              className="video-player"
              controls
              poster={video.thumbnail}
            >
              <source src={video.videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScreenVideo;
