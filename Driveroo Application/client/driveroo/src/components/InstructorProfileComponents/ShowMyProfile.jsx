import React, {useState} from 'react';
import { View } from "native-base"
import { StyleSheet, TextInput } from "react-native"
import { VStack, Link, Stack, Box, Center, Input, Heading, Button, FormControl, HStack, Text } from "native-base";
import { theme } from '../../theme/theme';

//axios
import axios from "axios"

//auth imports
import { useAuth } from "../../context/AuthContext"

const ShowMyProfile = () => {
    return (
        <Stack flex={1}>
            <Center flex={1} bg={theme.colors.backgroundDark}>
                <FormComponent />
            </Center>
        </Stack>
    )

}

const FormComponent = () => {
    const [user, setUser] = useState({})
    const { authState, onLogout } = useAuth()
    const baseUrl = authState.isStudent ? 'student' : 'instructor';

    React.useEffect(() => {
        getMyDetails()
    }, [])


    const getMyDetails = async () => {
        try {
            const response = await axios.get(`/${baseUrl}/profile`)
            await setUser(response.data.user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleInputChange = (name, value) => {
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/${baseUrl}/${user._id}`, user)
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="warmGray.50">
                    Profile
                </Heading>
                <Heading mt="1" color="warmGray.200" fontWeight="medium" size="xs">
                    Edit your details
                </Heading>

                <VStack space={3} mt="5">

                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input type="email" color={theme.colors.primaryTextDark} size="2xl" value={user.email} onChangeText={(value) => handleInputChange('email', value)} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>First Name</FormControl.Label>
                        <Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={user.firstname} onChangeText={(value) => handleInputChange('firstname', value)} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Last Name</FormControl.Label>
                        <Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={user.lastname} onChangeText={(value) => handleInputChange('lastname', value)} />
                    </FormControl>

                    {!authState.isStudent && <FormControl>
                        <FormControl.Label>Biography</FormControl.Label>
                        <Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={user.biography} onChangeText={(value) => handleInputChange('biography', value)} />
                    </FormControl>}

                    <Button onPress={handleSubmit} mt="2" colorScheme="indigo">
                        Update Profile
                    </Button>

                    <Button onPress={onLogout} mt="2" colorScheme="red">
                        Log Out
                    </Button>
                    <HStack mt="6" justifyContent="center">
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemExpand: {
        alignSelf: 'stretch',
    }
})

export default ShowMyProfile
