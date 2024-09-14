// src/api.js
export const fetchProtectedData = async (route) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/${route}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch protected data');
    }
  };
  