import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import SigninStudent from '../pages/SigninStudent';
import Register from '../pages/RegisterPage';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={SigninStudent} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false, presentation: 'modal' }} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
