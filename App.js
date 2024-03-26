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

// Main App Component
export default function App() {
	// State variables for authentication and refreshing
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [refreshing, setRefreshing] = useState(false);


	// Function to disconnect the user
	const disconnect = async () => {
		await Storage.remove(TOKEN_KEY)
		setIsAuthenticated(false)
	}

	// Function to check if the user is authenticated
	const checkAuth = async (token = null) => {
		// Check if the token is in the storage
		let useStorage = false
		if (!token) {
			// Get the token from the storage
			token = await Storage.get(TOKEN_KEY)
			if (!token) return false
			useStorage = true
		}

		// Check if the user is staff
		const response = await fetch(API_URL + "is_staff/", {
			headers: {"Authorization": "Token " + token}
		})
		// If the user is not staff, remove the token from the storage
		const json = await response.json()
		if (!json || !json.is_staff) {
			if (useStorage) Storage.remove(TOKEN_KEY)
			return false
		}
		// If the user is staff, set the token in the storage and fetch the scenario timers
		await Storage.set(TOKEN_KEY, token)

		await fetchScenarioTimers()

		setIsAuthenticated(true)
		return true
	}

	// Check if the user is authenticated when the app is loaded
	useEffect(() => {
		checkAuth()
	}, [])

	// Function to refresh the app
	// This function is called when the user pulls down the screen
	const onRefresh = async () => {
		// Set the refreshing state to true
		setRefreshing(true);
		// Check if the user is authenticated
		await checkAuth()
		setRefreshing(false)
	};

	// Return the app screen
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
