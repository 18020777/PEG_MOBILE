import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {COLORS} from "../colors";
import {Storage} from "./Storage";
import {API_URL, TOKEN_KEY} from "../options";
import game from "./game/Game";
import Game from "./game/Game";
import DefaultText from "./DefaultText";

function nowToString() {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export default function Games() {
	const [games, setGames] = useState([]);
	const [message, setMessage] = useState("");


	const fetchGames = async () => {
		setMessage("")
		const response = await fetch(
			API_URL + "booking/?date=" + nowToString(), {
				headers: {"Authorization": "Token " + await Storage.get(TOKEN_KEY)}
			})
		console.log(response.url, response.status)
		if (!response.ok) return
		const json = await response.json()
		if (!json || !json.results) return
		setGames(json.results)
		if (json.results.length === 0) setMessage("Aucune partie n'est prévue aujourd'hui")
	}

	useEffect(() => {
		fetchGames()
	}, [])

	return (
		<View style={styles.container}>
			{ games.map((game, index) => (
				<Game key={index} booking={game} />
			)) }
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
