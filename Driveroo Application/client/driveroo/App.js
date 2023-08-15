//dependencies
import 'react-native-gesture-handler';

import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box, useTheme, Button } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

//page imports
import { AuthProvider, useAuth } from './src/context/AuthContext';
import theme from './src/theme/theme';
import AuthNavigator from './src/navigation/AuthNavigator';
import RootNavigator from './src/navigation/RootNavigator';

/*
  CHANGE THIS TO YOUR IP ADDRESSS
*/
const yourIP = '172.20.10.14'
axios.defaults.baseURL = `http://${yourIP}:3000`;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider theme={theme}>
        <Layout />
      </NativeBaseProvider>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  const theme = useTheme();

  if (authState?.authenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={RootNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
