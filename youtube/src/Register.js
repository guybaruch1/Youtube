import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthBox from './AuthBox';

function Register() {
  const history = useNavigate();

  const handleSwitchPage = () => {
    history.push('/login');
  };

  return (
    <AuthBox
      title="Register"
      subtitle="Create an account to continue"
      showEmail={true}
      showPassword={true}
      showSignUp={true}
      showLogin={false}
      onSwitchPage={handleSwitchPage}
    />
  );
}

export default Register;
