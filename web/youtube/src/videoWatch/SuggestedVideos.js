import React from 'react';
import SuggestedVideoItem from './SuggestedVideoItem';
import './WatchVideos.css';
import './SuggestedVideos';

function SuggestedVideos({videoData, onVideoSelect}) {


  return (
    <div className='main-content'> 
      <h4>Suggested Videos</h4>
      {videoData.map(video => (
        <SuggestedVideoItem 
          key={video.id} 
          video={video} 
          onVideoClick={() => onVideoSelect(video)} 
        />
      ))}
    </div>
  );
}

export default SuggestedVideos;
