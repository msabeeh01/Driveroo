import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Input, Button } from "@rneui/base";

//functional imports
import { useState } from "react";

//axios import 
import axios from "axios";

const SigninStudentForm = () => {
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", height: "100%" }}>

            <FormComponent />
        </View>
    )
}

const FormComponent = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try{
            const response = await axios.post("/auth/login", 
            {
                email: email,
                password: password,

            })
            console.log(response.data);
        }catch(err){
            console.log(err.response.data.message)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#000000", height: "75%", width: "75%" }}>
                <Text>Form Component</Text>
                <Input placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} 
                style={{
                    color:"white"
                }}/>
                <Input placeholder="Password" value={password} onChangeText={(e) => setPassword(e)}
                style={{
                    color:"white"
                }}/>
                

                <Button onPress={handleSubmit}>Sign In</Button>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SigninStudentForm;