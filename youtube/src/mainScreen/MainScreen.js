import TagSuggestion from '../tagSuggestion/TagSuggestion';
import MainBlock from '../mainBlock/MainBlock';

function MainScreen({ videos, setTagFilter, currentUser }) {
  return (
    <div className="main-content">
      <TagSuggestion setTagFilter={setTagFilter} />
      <MainBlock videos={videos} currentUser={currentUser} />
    </div>
  );
}

export default MainScreen;
