import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";

//pages import
import Instructors from "../pages/Instructors";
import Profile from "../pages/Profile";

const Stack = createBottomTabNavigator();

const MyStack = () =>{
    return(
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Instructors}/>
        <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    instructorContainer: {
        flex: 1,
        backgroundColor: "#00FFFF",
        alignItems: "flex-start",
        paddingTop: 50,
        paddingLeft: 20,
        paddingBottom: 50,
        justifyContent: "flex-start", // Align content to the left
      },
  
  });


export default MyStack