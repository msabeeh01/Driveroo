import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Input, Button } from "@rneui/base";

const SigninForm = () => {
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", height: "100%" }}>

            <FormComponent />
        </View>
    )
}

const FormComponent = () => {

    const handleSubmit = async (e) => {
        console.log("Button clicked")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#000000", height: "75%", width: "75%" }}>
                <Text>Form Component</Text>
                <Input placeholder="Username" />
                <Input placeholder="Password" />
                <Button onPress={handleSubmit}>Sign In</Button>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SigninForm;