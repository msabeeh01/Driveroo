import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem } from "@rneui/base";
//hooks
import { useState } from "react";

const ListOfInstructors = ({ instructorsList }) => {
    const [instructors, setInstructors] = useState([]);

    const settingInstructors = () => {
        setInstructors(instructorsList);
    }

    useEffect(() => { settingInstructors() }, []);

    return (
        <View style={styles.container}>
            <Text> List of Instructors</Text>

            {instructors?.map((instructor) => (
                <ListItem key={instructor.id} style={styles.itemExpand}>
                    <ListItem.Title>{instructor.id}</ListItem.Title>
                    <ListItem.Subtitle>{instructor.name}</ListItem.Subtitle>

                </ListItem>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#A52A2A',
    },
    itemExpand:{
        alignSelf: 'stretch',
    }
})

export default ListOfInstructors;