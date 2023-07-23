import { View, Text, Button, ScrollView } from "native-base"
import { useEffect, useState } from "react"

import axios from "axios"
import { ListItem } from "@rneui/base"

const ShowMyRequests = () => {
    const [requests, setRequests] = useState([])

    const testRequests = async () => {
        try {
            const response = await axios.get("/instructor/requests")
            setRequests(response.data.request)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        testRequests()
    }, [])

    useEffect(() => {
        console.log(requests)
    }, [requests])

    return (
        <View>
            <ScrollView>
                {
                    requests?.map((request) => {
                        return (
                            <ListItem>
                                <ListItem.Content>

                                    <ListItem.Title>
                                        {request.associatedStudent.firstname} {request.associatedStudent.lastname}
                                    </ListItem.Title>

                                    <ListItem.Subtitle>
                                        <Text>{request.requestContent}</Text>
                                    </ListItem.Subtitle>

                                    <ListItem.Subtitle>
                                        <Text>{request.requestStatus}</Text>
                                    </ListItem.Subtitle>

                                    <ListItem.Subtitle>
                                        <Text>{new Date(request.requestDate).toLocaleDateString()}</Text>
                                    </ListItem.Subtitle>
                                </ListItem.Content>

                                <Button onPress={() => { console.log(request) }}>View</Button>
                                <Button onPress={() => { console.log(request) }}>Delete</Button>

                            </ListItem>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default ShowMyRequests