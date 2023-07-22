import { View } from "native-base"
import { StyleSheet, TextInput } from "react-native"
import { VStack, Link, Stack, Box, Center, Input, Heading, Button, FormControl, HStack, Text } from "native-base";
import { theme } from '../../theme/theme';

//axios
import axios from "axios"

//auth imports
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"

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
    const [instructor, setInstructor] = useState([])
    const { authState } = useAuth()



    useEffect(() => {
        getMyDetails()
    }, [])

    useEffect(() => {
        console.log(instructor)
        console.log(authState.token)
    }, [instructor])

    const getMyDetails = async () => {
        try {
            const response = await axios.get(`/instructor/${authState.token}`)
            await setInstructor(response.data.instructor)
            console.log(instructor)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleInputChange = (name, value) => {
        setInstructor((prevState) => ({
            ...prevState,
            [name]: value,
        }))
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
                        <Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={authState.token} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input type="email" color={theme.colors.primaryTextDark} size="2xl" value={instructor.email} onChangeText={(value) => handleInputChange('email', value)} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>First Name</FormControl.Label>
                        <Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={instructor.firstname} onChangeText={(value) => handleInputChange('firstname', value)} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Last Name</FormControl.Label>
                        <Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={instructor.lastname} onChangeText={(value) => handleInputChange('lastname', value)} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Biography</FormControl.Label>
                        <Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={instructor.biography} onChangeText={(value) => handleInputChange('biography', value)} />
                    </FormControl>

                    <Button mt="2" colorScheme="indigo">
                        Update Profile
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