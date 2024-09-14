import LeftMenu from '../leftMenu/LeftMenu';
import VideoList from '../videoList/VideoList';

function MainBlock({ videos, currentUser }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <LeftMenu currentUser={currentUser} />
        <VideoList videos={videos} />
      </div>
    </div>
  );
}

export default MainBlock;
