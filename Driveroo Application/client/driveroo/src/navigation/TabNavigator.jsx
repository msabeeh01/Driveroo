import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Instructors from '../pages/InstructorsList';
import DetailedInstructorProfile from '../pages/DetailedInstructorProfile';
import ShowMyProfile from '../components/InstructorProfileComponents/ShowMyProfile';
import AppBar from '../components/Header/AppBar';
import ChatHome from '../pages/Chat/ChatHome';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Instructors} 
        options={{ header: (props) => <AppBar title="Home" {...props} />}} />
      <Tab.Screen 
        name="Instructor Details" 
        component={DetailedInstructorProfile} 
        options={{ header: (props) => <AppBar title="Instructor Details" {...props} />}} />
      <Tab.Screen 
        name="Messages" 
        component={ChatHome} 
        options={{ header: (props) => <AppBar title="Messages" {...props} />}} />
      <Tab.Screen 
        name="Profile" 
        component={ShowMyProfile} 
        options={{ header: (props) => <AppBar title="Profile" {...props} />}} />
    </Tab.Navigator>
  )
}


export default TabNavigator
