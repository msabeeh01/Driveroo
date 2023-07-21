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
import SigninStudent from './src/pages/SigninStudent';
import TabNavigator from './src/navigation/TabNavigator';
import theme from './src/theme/theme';
import { color } from '@rneui/base';
import AuthNavigator from './src/navigation/AuthNavigator';

/*
  CHANGE THIS TO YOUR IP ADDRESSS
*/
const yourIP = '10.0.0.173'
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
    if (authState?.isStudent) {
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.blueGray[900] }]}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView>
          <Text>instructor</Text>
          <Button onPress={onLogout}></Button>
        </SafeAreaView>
      )
    }
  } else {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.blueGray[900] }]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
