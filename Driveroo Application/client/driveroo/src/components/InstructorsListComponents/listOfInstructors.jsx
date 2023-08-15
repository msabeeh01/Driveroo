import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView, TextInput } from "react-native";
import { ListItem } from "@rneui/base";

//hooks
import { useState } from "react";

//navigation
import { useNavigation } from "@react-navigation/native";

import axios from "axios";


const ListOfInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();

    const getInstructors = async () => {
        try {
            const response = await axios.get("/instructor/instructors");
            setInstructors(response.data.instructors);
        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => { getInstructors() }, []);

    //useEffect(() => { console.log(instructors) }, [instructors]);

    const filteredInstructors = instructors.filter((instructor) => {
        return instructor.firstname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by instructor firstname"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
                {filteredInstructors.map((instructor, index) => (
                    <ListItem key={instructor._id} style={styles.itemExpand} onPress={() => {navigation.navigate('Instructor Details', {instructor: instructor})}}>
                        <ListItem.Title>{index + 1}</ListItem.Title>
                        <ListItem.Subtitle>{instructor.firstname}</ListItem.Subtitle>
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
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: "90%",
    },
})

export default ListOfInstructors;
