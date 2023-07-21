import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { VStack, Link, Stack, Box, Center, Input, Heading, Button, FormControl, HStack, Text } from "native-base";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

import {theme} from '../../theme/theme';
import { useNavigation } from "@react-navigation/native";

const SigninStudentForm = () => {
	return (
		<Stack flex={1}>
			<Center flex={1} bg={theme.colors.backgroundDark}>
				<FormComponent />
			</Center>
		</Stack>
	)
}

const FormComponent = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
		const navigation = useNavigation();

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
			<Center w="100%">
				<Box safeArea p="2" py="8" w="90%" maxW="290">
					<Heading size="lg" fontWeight="600" color="warmGray.50">
						Welcome
					</Heading>
					<Heading mt="1" color="warmGray.200" fontWeight="medium" size="xs">
						Sign in to continue!
					</Heading>

					<VStack space={3} mt="5">
						<FormControl>
							<FormControl.Label>Email</FormControl.Label>
							<Input type="email" color={theme.colors.primaryTextDark} size="2xl" value={email} onChangeText={(text) => setEmail(text)} />
						</FormControl>
						<FormControl>
							<FormControl.Label>Password</FormControl.Label>
							<Input type="password" color={theme.colors.primaryTextDark} size="2xl" value={password} onChangeText={(text) => setPassword(text)} />
						</FormControl>
						<Button mt="2" colorScheme="indigo">
							Sign in
						</Button>
						<HStack mt="6" justifyContent="center">
							<Text fontSize="sm" color="warmGray.200">
								I'm a new user.{" "}
							</Text>
							<Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={() => navigation.navigate('InstructorRegister')}>
								Sign Up
							</Link>
						</HStack>
					</VStack>
				</Box>
			</Center>
    )
}

export default SigninStudentForm;
