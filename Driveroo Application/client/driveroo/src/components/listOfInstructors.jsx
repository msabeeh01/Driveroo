import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { ListItem } from "@rneui/base";
//hooks
import { useState } from "react";
import axios from "axios";

const ListOfInstructors = () => {
    const [instructors, setInstructors] = useState([]);

    const getInstructors = () => {
        axios.get("/getInstructors")
            .then((response) => {
                setInstructors(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => { getInstructors() }, []);

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text> List of Instructors</Text>

            {instructors?.map((instructor) => (
                <ListItem key={instructor.id} style={styles.itemExpand}>
                    <ListItem.Title>{instructor.id}</ListItem.Title>
                    <ListItem.Subtitle>{instructor.name}</ListItem.Subtitle>

                </ListItem>
            ))}

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    itemExpand: {
        alignSelf: 'stretch',
    }
})

export default ListOfInstructors;