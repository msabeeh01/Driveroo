import React, { useState } from "react";
import { VStack, Link, Stack, Box, Center, Input, Heading, Button, FormControl, HStack, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from 'firebase/auth';

import {theme} from '../../theme/theme';

import { useAuth } from '../../context/AuthContext.js'
import { auth as firebaseAuth } from "../../config/firebase";

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
	const { onLogin, setUser } = useAuth();

	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const navigation = useNavigation();

	const handleSubmit = async () => {
		try{
			const user = await signInWithEmailAndPassword(firebaseAuth, email, password)
			setUser(user);
			//await onLogin(email, password)
		}catch(err){
			console.log(err.message)
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
					<Button mt="2" onPress={handleSubmit} colorScheme="indigo">
						Sign in
					</Button>
					<HStack mt="6" justifyContent="center">
						<Text fontSize="sm" color="warmGray.200">
							I'm a new user.{" "}
						</Text>
						<Link 
							_text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} 
							onPress={() => navigation.navigate('Register')}
						>
							Sign Up
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Center>
	)
}

export default SigninStudentForm;
