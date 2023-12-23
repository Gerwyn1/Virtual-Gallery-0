// auth.js
// import process from 'process';
import * as jwtDecode from 'jwt-decode'
// import axios from 'axios';

export const isAuthenticated = () => {
  const token = localStorage.getItem('jwt'); // You may use cookies or another storage mechanism
  if (token) {
    try {
      const decoded =  jwtDecode.jwtDecode(token);
      // const userRegistered = axios.get(`http://localhost:3000/api/users/${decoded.id}`)
      if (decoded.exp && decoded.iat) return true;
    } catch (error) {
      console.log('JWT verification failed:', error);
    }
  }
  return false;
};
