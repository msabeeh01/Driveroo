import { View, Text, Button } from "native-base"
import { useState } from "react"

import axios from "axios"

const ShowMyRequests = () => {
    const [requests, setRequests] = useState([])

    const testRequests = async () =>{
        try{
            const response = await axios.get("/instructor/requests")
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <View>
            <Text>My Requests</Text>
            <Button onPress={testRequests}>Test Header</Button>
        </View>
    )
}

export default ShowMyRequests