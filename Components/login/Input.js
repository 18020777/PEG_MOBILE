import React, {useEffect, useState} from 'react'
import DefaultText from "../DefaultText";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS} from "../../colors";

const Input = ({label, onChange, validate, required, isPassword = false}) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		setError("")
		if (required && value === "") setError("Ce champ ne peut pas être vide")
		validate(error === "")
		onChange(value)
	}, [value])

	return (
		<View style={styles.inputContainer}>
			<DefaultText>{label}</DefaultText>
			<TextInput secureTextEntry={isPassword} onChangeText={text => setValue(text)} placeholder={label}
			           style={styles.input} placeholderTextColor={COLORS.placeholder}/>
			<Text style={styles.error}>{error}</Text>
		</View>
	)
}
export default Input

const styles = StyleSheet.create({
	inputContainer: {
		width: "90%",
	},
	input: {
		width: "100%",
		marginTop: 3,
		paddingHorizontal: 10,
		paddingVertical: 6,
		color: COLORS.light,
		backgroundColor: COLORS.secondary,
		borderRadius: 5
	},
	error: {
		color: COLORS.red,
	},
});
