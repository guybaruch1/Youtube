import VideoPreviewCard from '../videoPreviewCard/VideoPreviewCard';

function VideoList({ videos }) {
  const videosToShow = videos.map((video) => {
    return <VideoPreviewCard key={video._id} video={video} />;
  });

  return (
    <div className="col-9">
      <div className="row">
        <div className="container">
          <div className="row">
            {videosToShow}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoList;
