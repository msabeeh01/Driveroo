import React, { useState } from "react";
import { VStack, Radio, Stack, Box, Center, Input, Heading, Button, FormControl, HStack, Text, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import {theme} from '../../theme/theme';

import { useAuth } from '../../context/AuthContext.js'
import { auth as firebaseAuth } from "../../config/firebase";

const RegisterForm = () => {
	return (
		<Stack flex={1} scr>
			<Center flex={1} bg={theme.colors.backgroundDark}>
				<ScrollView><FormComponent /></ScrollView>
			</Center>
		</Stack>
	)
}

const FormComponent = () => {
	const { onRegister } = useAuth();
  const toast = useToast();

	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isStudent, setIsStudent] = useState(true);
	const navigation = useNavigation();

	const handleSubmit = async () => {
		try{
			await onRegister(email, password, firstname, lastname, isStudent)
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      navigation.goBack();
      toast.show({text: "Account created successfully!"})
		}catch(err){
			console.log(err.message)
		}
	}

	return (
		<Center w="100%">
			<Box safeArea p="2" py="8" w="95%" maxW="300">
				<Heading size="lg" fontWeight="600" color="warmGray.50">
					Welcome
				</Heading>
				<Heading mt="1" color="warmGray.200" fontWeight="medium" size="xs">
					Sign up to continue!
				</Heading>

				<VStack space={3} mt="5">
          <Radio.Group name="isStudent" defaultValue="0" onChange={value => setIsStudent(value)}>
            <Stack direction={{ base: "row", md: "row" }} alignItems={{ base: "flex-center" }} space={4} w="100%">
              <Radio value="0" colorScheme="indigo" size="md">
                <Text color={theme.colors.white}>I'm a Student</Text>
              </Radio>
              <Radio value="1" colorScheme="indigo" size="md">
                <Text color={theme.colors.white}>I'm an Instructor</Text>
              </Radio>
            </Stack>
          </Radio.Group>
          <FormControl>
						<FormControl.Label>First Name</FormControl.Label>
						<Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={firstname} onChangeText={(text) => setFirstname(text)} />
					</FormControl>
          <FormControl>
						<FormControl.Label>Last Name</FormControl.Label>
						<Input type="text" color={theme.colors.primaryTextDark} size="2xl" value={lastname} onChangeText={(text) => setLastname(text)} />
					</FormControl>
					<FormControl>
						<FormControl.Label>Email</FormControl.Label>
						<Input type="email" color={theme.colors.primaryTextDark} size="2xl" value={email} onChangeText={(text) => setEmail(text)} />
					</FormControl>
					<FormControl>
						<FormControl.Label>Password</FormControl.Label>
						<Input type="password" color={theme.colors.primaryTextDark} size="2xl" value={password} onChangeText={(text) => setPassword(text)} />
					</FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" color={theme.colors.primaryTextDark} size="2xl" />
          </FormControl>
					<Button mt="2" onPress={handleSubmit} colorScheme="indigo">
						Sign up
					</Button>
				</VStack>
			</Box>
		</Center>
	)
}

export default RegisterForm;
