import './UploadVideo.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../themeContext/ThemeContext';
import { fetchProtectedData } from '../services/authService';

function UploadVideo({ addVideo, user }) {
  const { darkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await fetchProtectedData('auth/verify-user'); // Example route to verify user
      } catch (err) {
        setErrorMessage('You must be logged in to upload a video.');
      }
    };

    if (user) {
      verifyUser();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Please enter a title for the video.');
      return;
    }

    if (!videoFile) {
      setErrorMessage('Please choose a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('topic', topic);
    formData.append('videoFile', videoFile);
    if (thumbnailFile) {
      formData.append('thumbnailFile', thumbnailFile);
    }
    formData.append('uploaderId', user._id);

    try {
      const response = await fetch(`http://localhost:8080/api/users/${user._id}/videos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newVideo = await response.json();
        addVideo(newVideo);
        setSuccessMessage(true);
        setTitle('');
        setDescription('');
        setTopic('');
        setVideoFile(null);
        setThumbnailFile(null);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to upload video.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to upload video.');
    }
  };

  const handleUploadAnother = () => {
    setSuccessMessage(false);
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle main-content">
      {!user ? (
        <div className={`alert alert-warning text-center ${darkMode ? 'alert-dark-mode' : ''}`}>
          Please sign in to upload a video.
          <div className="mt-3">
            <Link to="/signIn">
              <button className="btn btn-primary">Sign In</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {!successMessage && (
            <div className="mb-3 display-5">
              Upload Video
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success text-center success-message">
              Video was added successfully.
              <div className="mt-3">
                <Link to="/">
                  <button className="btn btn-danger me-2">Go to Main Screen</button>
                </Link>
                <button className="btn btn-secondary" onClick={handleUploadAnother}>Upload Another Video</button>
              </div>
            </div>
          )}

          {!successMessage && (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Topic</label>
                <input
                  className="form-control"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Video File (mp4 only)</label>
                <input
                  className="form-control"
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Thumbnail Image</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="text-center" style={{ margin: '10px' }}>
                <button type="submit" className="btn btn-danger">Upload</button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default UploadVideo;
