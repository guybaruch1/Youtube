// LeftMenu.js
import './LeftMenu.css';
import { useTheme } from '../themeContext/ThemeContext';
import { Link } from "react-router-dom";
import React from "react";

function LeftMenu({ currentUser }) {

  const { darkMode } = useTheme();

  return (
      <div className="col-lg-2 col-md-2 col-sm-1">
        <div className="row">
          <div className="col">
            <ul className={`list-group left-menu ${darkMode ? 'dark-mode' : 'light-mode'}`}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Home
                <i className="bi bi-house"></i>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  My Profile
                  <i className="bi bi-person"></i>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Subscriptions
                <i className="bi bi-card-list"></i>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Your channel
                <i className="bi bi-person-square"></i>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                History
                <i className="bi bi-clock-history"></i>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Liked videos
                <i className="bi bi-hand-thumbs-up"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default LeftMenu;
