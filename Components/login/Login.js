import {Button, Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from "react";
import {COLORS} from "../../colors";
import DefaultText from "../DefaultText";
import Input from "./Input";
import {API_URL} from "../../options";

export default function Login({checkAuth}) {
	const [username, setUsername] = useState("");
	const [isUsernameValid, setUsernameValid] = useState(false);
	const [password, setPassword] = useState("");
	const [isPasswordValid, setPasswordValid] = useState(false);

	const [error, setError] = useState("");

	const submit = async () => {
		setError("")
		if (!isUsernameValid || !isPasswordValid) return
		console.log(API_URL + "token/")
		const tokenRes = await fetch(API_URL + "token/", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		const tokenJson = await tokenRes.json()

		if (!tokenRes.ok || !tokenJson.token) {
			setError("Nom d'utilisateur ou Mot de Passe invalide !")
			return
		}

		const token = tokenJson.token
		const allowed = await checkAuth(token)
		if (!allowed) setError("Vous devais être staff pour accéder a l'application")
	}

	return (<View style={styles.container}>
		<View style={styles.titleContainer}>
			<DefaultText style={styles.title}>Se connecter à Paradox</DefaultText>
			<DefaultText>Un Role Staff est Nécessaire</DefaultText>
			{error && error !== "" ? <DefaultText style={styles.error}>{error}</DefaultText> : <></>}
		</View>
		<Input label="Nom d'utilisateur" required={true} onChange={setUsername} validate={setUsernameValid}/>
		<Input label="Mot de Passe" isPassword={true} required={true} onChange={setPassword}
		       validate={setPasswordValid}/>
		<View style={styles.buttonContainer}>
			<Button title="Se Connecter" color={COLORS.primary} onPress={submit}/>
		</View>
	</View>);
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16
	},
	titleContainer: {
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 25,
		fontWeight: "bold"
	},
	error: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.red,
		backgroundColor: "rgba(255, 0, 0, 0.1)",
		paddingVertical: 5,
		paddingHorizontal: 8,
	},
	buttonContainer: {
		width: "90%",
	},
});

