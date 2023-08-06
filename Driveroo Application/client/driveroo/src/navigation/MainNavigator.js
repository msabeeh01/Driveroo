import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import { Chat } from '../pages/Chat/Chat';
import InstructorDetails from '../components/DetailedInstructorProfileComponents/InstructorDetails';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="InstructorDetails" component={InstructorDetails} />
    </Stack.Navigator>
  )
}

export default MainNavigator
