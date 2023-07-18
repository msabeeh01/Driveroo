import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

const CreateInstructor = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/createInstructor", {name})
            console.log(response.data);
        } catch (err) {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }
    }




    return (
        <View>
            <Text> Create Instructor</Text>
            <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />
            {error ? <Text>{error}</Text> : null}
            <Button title="Create Instructor" onPress={handleSubmit} />
        </View>
    )
}

export default CreateInstructor;