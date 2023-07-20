import React from 'react'
import {StyleSheet, View} from "react-native";
import DefaultText from "../DefaultText";
import {AntDesign} from "@expo/vector-icons";
import {COLORS} from "../../colors";

function transformTimeString(string) {
	const split = string.split(":")
	return split[0] + "h" + split[1]
}

const DropdownButton = ({game, active, isOpen, onTouch}) => {
	return (
		<View style={styles.container} onTouchEnd={onTouch}>
			<View style={styles.titleView}>
				<DefaultText style={styles.title}>{transformTimeString(game.time)}</DefaultText>
				{active ? <View style={styles.activeIcon} /> : <></>}
				<AntDesign name="right" size={12} style={[styles.dropIcon, (isOpen ? styles.dropIconActive : {})]}/>
			</View>
			<DefaultText style={styles.room}>#{game.id} - Salle {game.room}</DefaultText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		padding: 15,
		justifyContent: "space-between",
		alignItems: "center",
	},
	titleView: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 7,
	},
	title: {
		fontSize: 17,
	},
	activeIcon: {
		borderRadius: 100,
		height: 8,
		width: 8,
		backgroundColor: COLORS.green
	},
	dropIcon: {
		opacity: 0.75,
		color: COLORS.light,
	},
	dropIconActive: {
		transform: [{rotate: "90deg"}]
	},
	room: {
		fontSize: 13,
		opacity: 0.75,
	},
});


export default DropdownButton
