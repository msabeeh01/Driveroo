import { View, Text } from "react-native"
import { Input, Button } from "@rneui/base";

//!Duplicate for Student Details for Instructor Side

const InstructorDetails = () => {
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#000000", height: "100%" }}>
            <Title />
            <MainContent />
        </View>
    )
}

const Title = () => {
    return (
        <View style={{
            padding: "5%",
        }}>
            <Text>TITLE</Text>
        </View>
    )
}

const MainContent = () => {
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", height: "75%", width: "75%", gap: "10%" }}>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center",height: "50%", width: "75%", backgroundColor: "#000000" }}>
                <Text style={{color:"white"}}>IMAGE</Text>
            </View>

            <Text>INSTRUCTOR NAME</Text>
            <Text>WORKING HOURS</Text>
            <Text>BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY BIOGRAPHY</Text>

            <Options />
        </View>
    )
}

const Options = () => {
    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", height: "25%", width: "75%", gap: "10%" }}>
            <Button title="Options">OPTIONS</Button>
            <Button title="Options">OPTIONS</Button>
            <Button title="Options">OPTIONS</Button>
        </View>
    )
}

export default InstructorDetails