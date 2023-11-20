import {API_URL, TOKEN_KEY} from "../options";
import {Storage} from "./Storage";

export let SCENARIOS_TIMES = {}

export async function fetchScenarioTimers() {
	const response = await fetch(API_URL + "scenario", {
		headers: {
			"Authorization": "Token " + await Storage.get(TOKEN_KEY),
		},
	})
	if (!response.ok) return$
	const json = await response.json()
	if (json && json.results) {
		const scenarios = {}
		json.results.map((s) => {
			const time = s.duration.split(":")
			scenarios[s.id] = {
				hour: Number.parseInt(time[0]),
				minute: Number.parseInt(time[1]),
				seconds: Number.parseInt(time[2]),
			}
		})
		SCENARIOS_TIMES = scenarios;
	}
	return null
}