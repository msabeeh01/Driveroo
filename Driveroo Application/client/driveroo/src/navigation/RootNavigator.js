import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StudentTabNavigator from './StudentTabNavigator';
import InstructorNavigator from './InstructorTabNavigator';
import { Chat } from '../pages/Chat/Chat';
import InstructorDetails from '../components/DetailedInstructorProfileComponents/InstructorDetails';

import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator>
      <>
      {authState.isStudent ? (
        <>
          <Stack.Screen name="StudentTab" component={StudentTabNavigator} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="InstructorTab" component={InstructorNavigator} options={{ headerShown: false }} />
        </>
      )}
      </>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

export default MainNavigator
