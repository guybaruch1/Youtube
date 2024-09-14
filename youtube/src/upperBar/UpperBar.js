import './UpperBar.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useTheme } from '../themeContext/ThemeContext';

import youtubeLogoLight from "../img/youtube-logo-light-mode.png";
import youtubeLogoDark from "../img/youtube-logo-dark-mode.png";

function UpperBar({ setSearchQuery, setTagFilter, currentUser, logoutUser }) {
  const { darkMode, toggleTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(inputValue);
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setInputValue('');
    setTagFilter('all');
  };

  const handleSignOut = () => {
    logoutUser();
  };

  return (
    <div className="container-fluid upper-bar">
      <div className="row align-items-center">
        <div className="col-4 d-flex align-items-center my-height">
          <Link to='/' onClick={handleLogoClick}>
            <img src={darkMode ? youtubeLogoDark : youtubeLogoLight} alt="Clickable" height="25px" />
          </Link>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-center my-height">
          <div className="input-group mb-3 push-down">
            <input
              type="text"
              className={`form-control no-outline ${darkMode ? 'form-control-dark-mode' : 'form-control-light-mode'}`}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-secondary custom-button"
              type="button"
              id="button-addon2"
              onClick={handleSearchClick}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        
        <div className="col-1 d-flex align-items-center justify-content-center my-height">
          <Link to='/uploadVideo'>
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-upload"></i>
            </button>
          </Link>
        </div>
        
        <div className="col-3 d-flex align-items-center justify-content-center my-height">
          <button type="button" className="btn btn-outline-secondary me-2" onClick={toggleTheme}>
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
          </button>
          {currentUser ? (
            <>
              <button type="button" className="btn btn-outline-primary align-middle" onClick={handleSignOut}>
                Sign Out
              </button>
              <Link to={`/user/${currentUser._id}`} className='no-underline'>
              <img
                src={currentUser.image}
                alt="User Profile"
                className="rounded-circle me-2"
                style={{ width: '35px', height: '35px', marginLeft : '7px' }}
              />
              </Link>
            </>
          ) : (
            <Link to='/signIn'>
              <button type="button" className="btn btn-outline-primary align-middle">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpperBar;
