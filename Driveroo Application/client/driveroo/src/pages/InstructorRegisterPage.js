import React from "react";
import { StyleSheet, Text,View  } from "react-native";
import CreateInstructor from "../components/createInstructor";

const InstructorRegisterPage = ({navigation}) => {
    return(
        <View style={{flex:1}}>
            <CreateInstructor />
        </View>
        
    )
}


export default InstructorRegisterPage
