import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import SigninStudent from '../pages/SigninStudent';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={SigninStudent} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
