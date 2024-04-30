import { View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { Stack, router } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../common/ThemeProvider';
const PwReset = () => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const { signIn, setActive } = useSignIn();
	const { colorScheme } = useContext(ThemeContext)
	// Request a passowrd reset code by email
	const onRequestReset = async () => {
		try {
			await signIn.create({
				strategy: 'reset_password_email_code',
				identifier: emailAddress
			});
			setSuccessfulCreation(true);
		} catch (err) {
			alert(err.errors[0].message);
		}
	};

	// Reset the password with the code and the new password
	const onReset = async () => {
		try {
			const result = await signIn.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password
			});
			console.log(result);
			alert('Password reset successfully');

			// Set the user session active, which will log in the user automatically
			await setActive({ session: result.createdSessionId });
		} catch (err) {
			alert(err.errors[0].message);
		}
	};

	return (
		<View className='bg-slate-100 dark:bg-black' style={styles.container}>
			{/* Close Button */}
			<TouchableOpacity
				onPress={() => router.back()}
				className="absolute top-10 left-5 z-10  p-3 rounded-full"
			>
				<Icon name={'arrow-back-outline'} size={30} color={colorScheme == 'dark' ? 'white' : 'black'} />
			</TouchableOpacity>
			<Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

			{!successfulCreation && (
				<>
					<TextInput
						autoCapitalize="none"
						placeholder="son@gmail.com"
						value={emailAddress}
						onChangeText={setEmailAddress}
						style={styles.inputField}
					/>

					<Button onPress={onRequestReset} title="طلب اعادة تغيير الرمز" color={'#6c47ff'}></Button>
				</>
			)}

			{successfulCreation && (
				<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
							style={styles.inputField}
							onChangeText={setCode}
						/>
						<TextInput
							placeholder="الباسورد الجديد"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							style={styles.inputField}
						/>
					</View>
					<Button onPress={onReset} title="ادخل رمز جديد" color={'#6c47ff'}></Button>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#6c47ff',
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	},
	button: {
		margin: 8,
		alignItems: 'center'
	}
});

export default PwReset;