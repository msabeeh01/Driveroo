import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ListOfInstructors from "../components/InstructorsListComponents/listOfInstructors";


const Instructors = ({navigation}) => {
    return(
    <View style={styles.container}>
        <ListOfInstructors/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7FFFD4",
      },
})

export default Instructors;
