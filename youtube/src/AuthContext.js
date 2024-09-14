// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { loginUser as authLoginUser, registerUser as authRegisterUser, logoutUser as authLogoutUser } from './services/authService';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Optionally, validate the token with the server
//       setCurrentUser({ token });
//     }
//   }, []);

//   const loginUser = async (username, password) => {
//     const user = await authLoginUser(username, password);
//     if (user) {
//       setCurrentUser(user);
//       return true;
//     }
//     return false;
//   };

//   const logoutUser = () => {
//     authLogoutUser();
//     setCurrentUser(null);
//   };

//   const registerUser = async (newUser) => {
//     const registeredUser = await authRegisterUser(newUser);
//     if (registeredUser) {
//       setCurrentUser(registeredUser);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, loginUser, logoutUser, registerUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
