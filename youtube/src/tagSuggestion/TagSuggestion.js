import './TagSuggestion.css';
import { useTheme } from '../themeContext/ThemeContext';

function TagSuggestion({ setTagFilter }) {
  const { darkMode } = useTheme();

  const handleButtonClick = (event) => {
    const topic = event.target.textContent.toLowerCase();
    setTagFilter(topic === 'all' ? 'all' : topic);
  };

  const buttonClass = darkMode ? 'btn-dark-mode' : 'btn-light-mode';
  const allButtonClass = darkMode ? 'btn-all-dark-mode' : 'btn-all-light-mode';

  return (
    <div className="row" style={{ padding: '5px' }}>
      <div className="col-1"></div>
      <div className="col-11 align-middle">
        <div className="d-flex justify-content-evenly">
          <button type="button" className={`btn ${allButtonClass}`} onClick={handleButtonClick}>All</button>
          <button type="button" className={`btn ${buttonClass}`} onClick={handleButtonClick}>Music</button>
          <button type="button" className={`btn ${buttonClass}`} onClick={handleButtonClick}>Sports</button>
          <button type="button" className={`btn ${buttonClass}`} onClick={handleButtonClick}>Food</button>
          <button type="button" className={`btn ${buttonClass}`} onClick={handleButtonClick}>Gaming</button>
          <button type="button" className={`btn ${buttonClass}`} onClick={handleButtonClick}>Languages</button>
          <button type="button" className={`btn ${buttonClass}`} onClick={handleButtonClick}>Travel</button>
        </div>
      </div>
    </div>
  );
}

export default TagSuggestion;
