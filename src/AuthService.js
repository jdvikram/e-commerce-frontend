// AuthService.js

import axios from 'axios';
import { API_URL, LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, USERNAME, PASSWORD } from './Constants';

class AuthService {
  async token() {
    try {
      const response = await axios.post(`${API_URL}${LOGIN_ENDPOINT}`, {
        username: USERNAME,
        password: PASSWORD
      });
      const token = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken); // Store refresh token
      return token;
    } catch (error) {
      throw new Error('Failed to login');
    }
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      console.log(refreshToken)
      const response = await axios.post(`${API_URL}${REFRESH_TOKEN_ENDPOINT}`, {
        refresh: refreshToken
      });
      const newToken = response.data.access;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

const authServiceInstance = new AuthService(); // Assign AuthService to a variable

export default authServiceInstance;