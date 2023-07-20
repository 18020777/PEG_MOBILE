import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from "react-native";
import {COLORS} from "../../colors";
import DropdownButton from "./Overview";
import Timer from "./Timer";
import {Storage} from "../Storage";
import {API_URL, TOKEN_KEY} from "../../options";
import DefaultText from "../DefaultText";

const Game = ({booking}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [game, setGame] = useState(booking);
	const [active, setActive] = useState();

	const fetchIsActive = () => setActive(game.start_time && !game.gameover_time)

	const action = async (action) => {
		const res = await fetch(API_URL + "booking_action/", {
			method: "POST",
			headers: {
				"Authorization": `Token ${await Storage.get(TOKEN_KEY)}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				booking_id: game.id,
				action: action
			})
		})
		console.log(res.ok, res.status, await res.text())
		await refresh()
	}

	const refresh = async () => {
		const response = await fetch(API_URL + "booking/" + game.id, {
			headers: {
				"Authorization": "Token " + await Storage.get(TOKEN_KEY),
			},
		})
		if (!response.ok) return
		const json = await response.json()
		if (json) {
			console.log("refresh:", json)
			setGame(json)
		}
	}

	useEffect(() => {
		fetchIsActive()
	}, [game])

	return (
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
