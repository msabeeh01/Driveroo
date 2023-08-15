import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const AuthContext = createContext({});
const TOKEN_KEY = 'token';
const API_URL = 'http://172.20.10.14:3000';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null, authenticated: null, isStudent: null, user: null });

  useEffect(() => {
    const loadToken = async () => { 
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const isStudent = await SecureStore.getItemAsync('isStudent');

      const user = await getProfile(isStudent);

      if (token) {
        axios.defaults.headers.common['Authorization'] =  `Basic ${token}`;
        setAuthState({
          token,
          authenticated: true,
          isStudent,
          user
        })
      }
    };

    loadToken();
  }, [])

  const register = async (email, password, firstname, lastname, isStudent) => {
    const url = isStudent ? `${API_URL}/auth/signupStudent` : `${API_URL}/auth/signupInstructor`;
    try {
      const response = await axios.post(url, { email, password, firstname, lastname });
      return response; 
    } catch (error) {
      console.log(error)
      return {error: true, message: error}
    }
  }

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {email, password});

      setAuthState({
        token: result.data.token,
        authenticated: true,
        isStudent: result.data.user.isStudent,
        user: result.data.user
      })

      axios.defaults.headers.common['Authorization'] =  `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync('isStudent', result.data.user.isStudent.toString());

      return result;

    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync('isStudent');

    // Update HTTP Headers
    axios.defaults.headers.common['Authorization'] =  '';

    // Reset auth state
    setAuthState({
      token: null,
      authenticated: null,
      isStudent: null,
      user: null
    })
  }

  const getProfile = async (isStudent) => {
    const baseUrl = isStudent ? 'student' : 'instructor';

    try {
      const response = await axios.get(`/${baseUrl}/profile`)
      return response.data.user;
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateFirebaseUID = async (user, firebaseUID) => {

    const url = user.isStudent ? `${API_URL}/student/${user._id}` : `${API_URL}/instructor/${user._id}`;

    try {
      const response = await axios.put(url, { firebaseUID });
      return response; 
    } catch (error) {
      console.log(error)
      return {error: true, message: error}
    }
    
  }

  const setUser = (user) => {
    setAuthState({
      token: user.token,
      authenticated: true,
      isStudent: true,
      user
    })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    setUser,
    updateFirebaseUID
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
