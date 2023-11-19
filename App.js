import {StatusBar} from 'expo-status-bar';
import {Dimensions, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {COLORS} from "./colors";
import Games from "./Components/GamesScreen";
import Login from "./Components/login/Login";
import {Storage} from "./Components/Storage";
import {API_URL, TOKEN_KEY} from "./options";
import DefaultText from "./Components/DefaultText";
import {setNotificationHandler} from "expo-notifications";
import {fetchScenarioTimers} from "./Components/ScenarioManager";

setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [refreshing, setRefreshing] = useState(false);


	const disconnect = async () => {
		await Storage.remove(TOKEN_KEY)
		setIsAuthenticated(false)
	}

	const checkAuth = async (token = null) => {
		let useStorage = false
		if (!token) {
			token = await Storage.get(TOKEN_KEY)
			if (!token) return false
			useStorage = true
		}

		const response = await fetch(API_URL + "is_staff/", {
			headers: {"Authorization": "Token " + token}
		})
		const json = await response.json()
		if (!json || !json.is_staff) {
			if (useStorage) Storage.remove(TOKEN_KEY)
			return false
		}
		await Storage.set(TOKEN_KEY, token)

		await fetchScenarioTimers()

		setIsAuthenticated(true)
		return true
	}

	useEffect(() => {
		checkAuth()
	}, [])

	const onRefresh = async () => {
		setRefreshing(true);
		await checkAuth()
		setRefreshing(false)
	};

	return (
		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
		} style={styles.container}>
			<StatusBar style="light"/>
			{refreshing ? <></> :
				isAuthenticated ? (
					<View style={styles.screen}>
						<Games/>
						<DefaultText style={styles.disconnect} onPress={disconnect}>SE DECONNECTER</DefaultText>
					</View>
				) : <Login checkAuth={checkAuth}/>
			}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get("window").width,
		minHeight: Dimensions.get("window").height,
		backgroundColor: COLORS.dark,
	},
	screen: {
		width: Dimensions.get("window").width,
		minHeight: Dimensions.get("window").height,
	},
	disconnect: {
		textAlign: "center",
		position: "absolute",
		bottom: 0,
		width: "100%",
		padding: 10,
		fontWeight: "bold",
		backgroundColor: COLORS.primary,
	}
});
