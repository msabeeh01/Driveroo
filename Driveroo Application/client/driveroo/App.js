//dependencies
import 'react-native-gesture-handler';

import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

//page imports
import { AuthProvider, useAuth } from './src/context/AuthContext';
import SigninStudent from './src/pages/SigninStudent';
import TabNavigator from './src/navigation/TabNavigator';

/*
  CHANGE THIS TO YOUR IP ADDRESSS
*/
const yourIP = '192.168.2.13'
axios.defaults.baseURL = `http://${yourIP}:3000`;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>{authState?.authenticated ?
        <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} /> : 
        <Stack.Screen name="Login" component={SigninStudent} options={{ headerShown: false }} />}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
