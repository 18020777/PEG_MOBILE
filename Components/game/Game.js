import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from "react-native";
import {COLORS} from "../../colors";
import DropdownButton from "./Overview";
import Timer from "./Timer";
import {Storage} from "../Storage";
import {API_URL, TOKEN_KEY} from "../../options";
import DefaultText from "../DefaultText";

const Game = ({booking}) => {
	// State variables for the game and the modal
	const [isOpen, setIsOpen] = useState(false);
	const [game, setGame] = useState(booking);
	const [active, setActive] = useState();

	// Function to check if the game is active
	const fetchIsActive = () => setActive(game.start_time && !game.gameover_time)

	// Function to perform an action on the game
	const action = async (action) => {
		// Perform the action on the game and refresh the game
		const res = await fetch(API_URL + "booking_action/", {
			method: "POST",
			headers: {
				// Send the token in the headers
				"Authorization": `Token ${await Storage.get(TOKEN_KEY)}`,
				'Content-Type': 'application/json'
			},
			// Send the action and the booking id to the server
			body: JSON.stringify({
				booking_id: game.id,
				action: action
			})
		})
		// If the action was successful, refresh the game
		await refresh()
	}

	// Function to refresh the game
	const refresh = async () => {
		// Fetch the game from the server
		const response = await fetch(API_URL + "booking/" + game.id, {
			headers: {
				"Authorization": "Token " + await Storage.get(TOKEN_KEY),
			},
		})
		if (!response.ok) return
		const json = await response.json()
		if (json) setGame(json)
	}

	// Fetch the game when the component is mounted
	useEffect(() => {
		fetchIsActive()
	}, [game])

	return (
		// Display the game information
		// Display the dropdown button
		// Display the scenario and the number of players
		<View style={styles.container}>
			<DropdownButton game={game} active={active} isOpen={isOpen} onTouch={() => setIsOpen(!isOpen)}/>
			{isOpen ? (
				<>
					<DefaultText style={styles.textCenter}>Scenario {game.scenario}</DefaultText>
					<DefaultText style={styles.textCenter}>{game.num_players} joueurs</DefaultText>
					<Timer game={game} action={action}/>
				</>
			) : <></>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		position: null,
		backgroundColor: COLORS.secondary,
		borderRadius: 10,
	},
	textCenter: {
		textAlign: "center"
	},
});

export default Game;
