import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {COLORS} from "../colors";
import {Storage} from "./Storage";
import {API_URL, TOKEN_KEY} from "../options";
import Game from "./game/Game";
import DefaultText from "./DefaultText";

// Function to get the current date as a string
function nowToString() {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

// Games Component to display the games of the day
export default function Games() {
	const [games, setGames] = useState([]);
	const [message, setMessage] = useState("");


	// This function fetches the games of the day from the API and sets the state variables
	const fetchGames = async () => {
		// Reset the message
		setMessage("")
		console.log("a")
		// Fetch the games of the day from the API
		const response = await fetch(
			// The URL of the API with the date of today
			API_URL + "booking/?date=" + nowToString(), {
				headers: {"Authorization": "Token " + await Storage.get(TOKEN_KEY)}
			})

		// If the response is not ok, return an empty array
		if (!response.ok) return
		const json = await response.json()
		// If the response is not valid, return an empty array
		if (!json || !json.results) return
		setGames(json.results)
		// If there are no games, set the message to inform the user
		if (json.results.length === 0) setMessage("Aucune partie n'est prévue aujourd'hui")
	}

	// Fetch the games of the day when the component is mounted
	useEffect(() => {
		fetchGames()
	}, [])

	// Return the component with the games and the message
	return (
		<View style={styles.container}>
			{games.map((game, index) => (
				<Game key={index} booking={game}/>
			))}
			<DefaultText>{message}</DefaultText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.dark,
		alignItems: 'center',
		paddingVertical: 50,
		gap: 20
	},
});
