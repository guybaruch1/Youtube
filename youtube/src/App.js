import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './themeContext/ThemeContext';
import WatchVideo from './videoWatch/WatchVideo';
import RegisterBox from './registerBox/RegisterBox';
import SignInBox from './signInBox/SignInBox';
import MainScreen from './mainScreen/MainScreen';
import UploadVideo from './uploadVideo/UploadVideo';
import UpperBar from './upperBar/UpperBar';
import UserProfile from "./userProfile/UserProfile";
import { loginUser as authLoginUser, fetchProtectedData, getCurrentUser } from './services/authService';

function App() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [videoList, setVideoList] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [comments, setComments] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve user data from localStorage on load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/videos');
      const data = await response.json();
      setVideoList(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const checkUserAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await fetchProtectedData('auth/verify-user');
        if (user) {
          setCurrentUser(user);
          console.log('User authenticated:', user); // Log user after authentication check
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    }
  };

  useEffect(() => {
    fetchVideos();
    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      fetchVideos();
    }
  }, [location]);

  // add to check the current user
  useEffect(() => {
  }, [currentUser]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const filteredVideos = videoList.filter(video => {
    const matchesTag = tagFilter === 'all' || video.topic.toLowerCase() === tagFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const addVideo = (newVideo) => {
    setVideoList([...videoList, newVideo]);
  };

  const registerUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const loginUser = async (userName, password) => {
    try {
      const user = await authLoginUser(userName, password);
      if (user) {
        setCurrentUser(user);
        console.log('User logged in:', user); // Log user after login
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const addComment = (videoId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: [...(prevComments[videoId] || []), comment]
    }));
  };

  const editComment = (videoId, commentIndex, newComment) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].map((comment, index) =>
        index === commentIndex ? newComment : comment
      )
    }));
  };

  const deleteComment = (videoId, commentIndex) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter((_, index) => index !== commentIndex)
    }));
  };

  const deleteVideo = (videoId) => {
    setVideoList(prevVideoList => prevVideoList.filter(video => video._id !== videoId));
  };

  const editVideo = (videoId, newTitle, newDescription) => {
    setVideoList(prevVideoList =>
      prevVideoList.map(video => {
        if (video._id === videoId) {
          return {
            ...video,
            title: newTitle,
            description: newDescription
          };
        } else {
          return video;
        }
      })
    );
  };
  console.log('Current user changed:', currentUser); // Log user changes

  return (
    <div className="App">
      <UpperBar
        setSearchQuery={setSearchQuery}
        setTagFilter={setTagFilter}
        currentUser={currentUser}
        logoutUser={logoutUser}
      />
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter} currentUser={currentUser} />} />
        <Route path="/register" element={<RegisterBox registerUser={registerUser} users={users} />} />
        <Route path="/signIn" element={<SignInBox loginUser={loginUser} />} />
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo} user={currentUser} />} />
        <Route path="/WatchVideo/:videoId" element={<WatchVideo
            comments={comments} addComment={addComment} editComment={editComment}
            deleteComment={deleteComment} currentUser={currentUser} videoList={videoList}
            deleteVideo={deleteVideo} editVideo={editVideo} setVideoList={setVideoList} />} />
        <Route path='/user/:userId' element={<UserProfile currentUser={currentUser} logout={logoutUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
