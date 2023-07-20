//dependencies
import 'react-native-gesture-handler';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

//page imports
import MyStack from './src/stack/navStack';

//variable networking imports (allows expo to connect to localhost regardless of network)
import * as Network from 'expo-network';
import axios from 'axios';

//navigation imports

import { NavigationContainer } from '@react-navigation/native';

// Network.getIpAddressAsync().then(ipAddress => {
//   axios.defaults.baseURL = `http://${ipAddress}:3000`;
//   console.log('my ip: ' + axios.defaults.baseURL);
// })

/*
  CHANGE THIS TO YOUR IP ADDRESSS
*/
const yourIP = '10.0.0.173'
axios.defaults.baseURL = `http://${yourIP}:3000`;


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
