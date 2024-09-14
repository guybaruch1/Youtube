const API_URL = 'http://localhost:8080/api/users';

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      body: formData, // No headers required for FormData
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errorData = await response.json();
      console.error('Registration failed:', errorData);
      throw new Error(errorData.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`http://localhost:8080/api/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('Login response status:', response.status); // Check if response is successful

    if (response.ok) {
      const { user, token } = await response.json();
      console.log('User and token received:', user, token); // Verify user and token data
      localStorage.setItem('token', token); // Store the token
      localStorage.setItem('user', JSON.stringify(user)); // Store the user data
      return user; // Return the user object
    } else {
      const errorData = await response.json();
      console.error('Login error:', errorData.message); // Log error from the server
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

export const fetchProtectedData = async (route) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:8080/${route}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch protected data:', response.status, response.statusText);
      throw new Error('Failed to fetch protected data');
    }
  } catch (error) {
    console.error('Error during fetchProtectedData:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const checkUserExists = async (username) => {
  try {
    const response = await fetch(`${API_URL}/getUserId?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const { id } = await response.json();
      return !!id; // Return true if user exists
    } else if (response.status === 404) {
      return false; // User does not exist
    } else {
      throw new Error('Error checking username existence');
    }
  } catch (error) {
    console.error('Error during checkUserExists:', error);
    throw error;
  }
};
