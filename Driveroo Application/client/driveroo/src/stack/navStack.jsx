import React from "react";

import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

//pages import
import Instructors from "../pages/Instructors";
import Profile from "../pages/Profile";
import SigninStudent from "../pages/SigninStudent";
import DetailedInstructorProfile from "../pages/DetailedInstructorProfile";
import { Button } from "@rneui/base";

const Stack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MyStack = () => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Instructors} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Signin" component={SigninStudent} />
            <Stack.Screen name="Instructor Details" component={DetailedInstructorProfile} />
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