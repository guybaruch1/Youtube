import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import youtubeIcon from "../img/youtube-icon.png";
import './RegisterBox.css';
import { useTheme } from '../themeContext/ThemeContext';
import { registerUser as authRegisterUser, checkUserExists } from '../services/authService';


function RegisterBox({ registerUser, users }) {
  const { darkMode } = useTheme();

  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [step, setStep] = useState(1);
  const [userNameError, setUserNameError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setIsUserNameValid(e.target.value.trim() !== '');
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    setIsDisplayNameValid(e.target.value.trim() !== '');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length >= 8);
    setDoPasswordsMatch(e.target.value === verifyPassword);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
    setDoPasswordsMatch(e.target.value === password);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setPhoto(file);
      setIsPhotoValid(true);
    } else {
      setPhoto(null);
      setIsPhotoValid(false);
    }
  };

const handleNext = async (e) => {
  e.preventDefault();

  const isUserNameValidFinal = userName.trim() !== '';
  const isPasswordValidFinal = password.length >= 8;
  const doPasswordsMatchFinal = password === verifyPassword;

  setIsUserNameValid(isUserNameValidFinal);
  setIsPasswordValid(isPasswordValidFinal);
  setDoPasswordsMatch(doPasswordsMatchFinal);

  if (!isUserNameValidFinal || !isPasswordValidFinal || !doPasswordsMatchFinal) {
    return;
  }

  try {
    const lowerUserName = userName.toLowerCase();
    const userExists = await checkUserExists(lowerUserName); // Check if user exists in the database

    if (userExists) {
      setUserNameError('Username already taken. Please choose another one.');
      setIsUserNameValid(false);
      return;
    }

    setStep(2);
  } catch (error) {
    console.error('Error checking username existence:', error);
    setUserNameError('Error checking username. Please try again.');
  }
};


  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isDisplayNameValidFinal = displayName.trim() !== '';
    const isPhotoValidFinal = photo !== null;
  
    setIsDisplayNameValid(isDisplayNameValidFinal);
    setIsPhotoValid(isPhotoValidFinal);
  
    if (!isDisplayNameValidFinal || !isPhotoValidFinal) {
      return;
    }
  
    const displayNameExists = users.some(user => user.displayName === displayName);
  
    if (displayNameExists) {
      setDisplayNameError('Display name already taken. Please choose another one.');
      setIsDisplayNameValid(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('username', userName);
    formData.append('displayName', displayName);
    formData.append('password', password);
    formData.append('photo', photo);
  
    try {
      const user = await authRegisterUser(formData);
      if (user) {
        registerUser(user);
        alert('Registration successful!');
        navigate('/signIn');
      } else {
        console.error('Failed to register: User is null');
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Failed to register:', error.message);
      alert('Failed to register. Please try again.');
    }
  };
  
  
  
  
  

  return (
    <div className={`position-absolute top-50 start-50 translate-middle main-content-register ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='container'>
        <div id="sign-in-register-card" className="card">
          <div className="card-body">
            <div className="container overflow-hidden text-center">
              <div className="row gy-5">
                <div className="col-6">
                  <div className="p-3 text-start">
                    <h5 className="card-title">Register</h5>
                    <p className="card-text">To continue to YouTube</p>
                    <div className='col-8 d-flex align-items-center justify-content-center'>
                      <img src={youtubeIcon} alt="Clickable" height="80px" />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3">
                    <form noValidate onSubmit={handleSubmit}>
                      {step === 1 && (
                        <>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className={`form-control ${!isUserNameValid ? 'is-invalid' : ''}`}
                              id="userName"
                              placeholder="Username"
                              value={userName}
                              onChange={handleUserNameChange}
                              required
                            />
                            <label htmlFor="userName">Username</label>
                            <div className="invalid-feedback">
                              {userNameError || 'Username is required.'}
                            </div>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className={`form-control ${!isPasswordValid ? 'is-invalid' : ''}`}
                              id="password"
                              placeholder="Password"
                              value={password}
                              onChange={handlePasswordChange}
                              required
                            />
                            <label htmlFor="password">Password</label>
                            <div className="invalid-feedback">
                              {passwordError || 'Password must be at least 8 characters long.'}
                            </div>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className={`form-control ${!doPasswordsMatch ? 'is-invalid' : ''}`}
                              id="verifyPassword"
                              placeholder="Verify Password"
                              value={verifyPassword}
                              onChange={handleVerifyPasswordChange}
                              required
                            />
                            <label htmlFor="verifyPassword">Verify Password</label>
                            <div className="invalid-feedback">Passwords do not match.</div>
                          </div>
                          <div className="mt-3">
                            <div className='row'>
                              <div className='col-6'>
                                <button type="button" className="btn btn-light" onClick={() => navigate('/signIn')}>
                                  Sign In
                                </button>
                              </div>
                              <div className='col-6'>
                                <button type="button" className="btn btn-primary" onClick={handleNext}>
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {step === 2 && (
                        <>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className={`form-control ${!isDisplayNameValid ? 'is-invalid' : ''}`}
                              id="displayName"
                              placeholder="Display Name"
                              value={displayName}
                              onChange={handleDisplayNameChange}
                              required
                            />
                            <label htmlFor="displayName">Display Name</label>
                            <div className="invalid-feedback">
                              {displayNameError || 'Display Name is required.'}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Profile Photo (jpeg, jpg, png)</label>
                            <input
                              type="file"
                              className={`form-control ${!isPhotoValid ? 'is-invalid' : ''}`}
                              id="photo"
                              accept="image/jpeg, image/jpg, image/png"
                              onChange={handlePhotoChange}
                              required
                            />
                            <div className="invalid-feedback">Please upload a valid photo (jpeg, jpg, png).</div>
                            {photo && (
                              <div className="mt-3">
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="Profile Preview"
                                  className="img-thumbnail"
                                  style={{ width: '150px', height: '150px' }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="mt-3">
                            <button type="button" className="btn btn-secondary" onClick={handleBack}>
                              Back
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Register
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterBox;
