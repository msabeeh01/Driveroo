import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const AuthContext = createContext({});
const TOKEN_KEY = 'token';
const API_URL = 'http://10.0.0.173:3000';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null, authenticated: null, isStudent: null });

  useEffect(() => {
    const loadToken = async () => { 
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const isStudent = await SecureStore.getItemAsync('isStudent');

      if (token) {
        axios.defaults.headers.common['Authorization'] =  `Basic ${token}`;
        setAuthState({
          token,
          authenticated: true,
          isStudent
        })
      }
    };

    loadToken();
  }, [])

  const register = async (email, password) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password});
    } catch (error) {
      return {error: true, message: error.data.message}
    }
  }

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {email, password});

      setAuthState({
        token: result.data.token,
        authenticated: true,
        isStudent: result.data.user.isStudent
      })

      axios.defaults.headers.common['Authorization'] =  `Basic ${result.data.data}`;
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
      isStudent: null
    })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
