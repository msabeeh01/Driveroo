import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Instructors from '../pages/InstructorsList';
import DetailedInstructorProfile from '../pages/DetailedInstructorProfile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Instructors} />
      <Tab.Screen name="Instructor Details" component={DetailedInstructorProfile} />
    </Tab.Navigator>
  )
}


export default TabNavigator
