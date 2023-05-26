import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ListOfInstructors from "../components/listOfInstructors";

const instructors = [
    {
        id: 1,
        name: "John Doe",
    },
    {
        id: 2,
        name: "Jane Doe",
    },
    {
        id: 3,
        name: "s",
    },
    {
        id: 4,
        name: "d",
    },
    {
        id: 5,
        name: "r",
    },
    {
        id: 6,
        name: "g",
    }
]

const Instructors = () => {
    return(
    <View style={styles.container}>
        <ListOfInstructors instructorsList={instructors} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7FFFD4",
        alignItems: "center", // Change to 'flex-start'
        justifyContent: "flex-start", // Add left padding for spacing
      },
})

export default Instructors;
