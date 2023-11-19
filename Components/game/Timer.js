import React, {useEffect, useState} from 'react'
import {Button, Modal, StyleSheet, Text, View} from "react-native";
import DefaultText from "../DefaultText";
import {COLORS} from "../../colors";
import {NotificationManager} from "../NotificationManager";
import {SCENARIOS_TIMES} from "../ScenarioManager";

function secondsToTime(s) {
	const hours = String(Math.floor(s / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
	const seconds = String(Math.floor(s % 60)).padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
}

const Timer = ({game, action}) => {
	const [timer, setTimer] = useState(0);
	const [modal, setModal] = useState(false);

	async function start() {
		setModal(false)
		const date = new Date(
			new Date().getTime() +
			SCENARIOS_TIMES[game.scenario].hour * 60 * 60 * 1000 +
			SCENARIOS_TIMES[game.scenario].minute * 60 * 1000 +
			SCENARIOS_TIMES[game.scenario].seconds * 1000
		)
		await NotificationManager.scheduleNotification(
			game.id.toString(),
			"Fin de la Partie #" + game.id,
			`Le temps de la partie #${game.id} Salle ${game.room} est écoulé !`,
			date
		)
		action("start_game")
	}

	async function stop() {
		setModal(false)
		await NotificationManager.cancelNotification(game.id.toString())
		action("end_game")
	}

	useEffect(() => {
		setModal(false)
		if (!game.start_time || game.gameover_time) return
		const start_time = new Date(game.start_time)

		let intervalId;

		setTimer((new Date() - start_time) / 1000);
		intervalId = setInterval(() => {
			setTimer((new Date() - start_time) / 1000);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [game]);

	return (
		<>
			<View style={styles.container}>
				{game.chrono !== "00:00:00" ? (
					<DefaultText style={{fontWeight: "bold"}}>{game.chrono}</DefaultText>
				) : game.start_time ? (
					<>
						<DefaultText style={{fontWeight: "bold"}}>{secondsToTime(timer)}</DefaultText>
						<Button title="Arrêter" color="crimson" onPress={() => setModal(true)}/>
					</>
				) : (
					<>
						<DefaultText style={{fontWeight: "bold"}}>{game.chrono}</DefaultText>
						<Button title="Commencer" color={COLORS.primary} onPress={() => setModal(true)}/>
					</>
				)}
			</View>
			<Modal animationType="fade" transparent={true} visible={modal}>
				<View style={styles.modalBackground}/>
				<View style={styles.modal}>
					<DefaultText style={styles.modalTitle}>
						Souhaitez-vous {game.start_time ? "arrêter" : "démarrer"} la partie prévu
						pour {game.time.split(":")[0]}h ?
					</DefaultText>
					<View style={styles.modalButtons}>
						<DefaultText onPress={() => setModal(false)}>Annuler</DefaultText>
						{game.start_time ? (
							<Button title="Arrêter" color="crimson" onPress={stop}/>
						) : (
							<Button title="Commencer" color={COLORS.primary} onPress={start}/>
						)}
					</View>
				</View>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 15
	},
	button: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 5,
		backgroundColor: COLORS.primary,
		borderRadius: 2,
	},
	modalBackground: {
		position: "absolute",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modal: {
		width: "90%",
		backgroundColor: COLORS.secondary,
		padding: 25,
		gap: 15,
		top: "35%",
		alignSelf: "center",
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	modalTitle: {
		fontSize: 20,
		flexShrink: 1,
		fontWeight: "bold",
		textAlign: "center",
	},
	modalButtons: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	}
});


export default Timer
