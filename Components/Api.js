import {Storage} from "./Storage";
import {API_URL, TOKEN_KEY} from "../options";

export class Api {
	static post(path, body) {
		return fetch(API_URL + "booking_action", {
			method: "POST",
			headers: {
				"Authorization": "Token " + Storage.get(TOKEN_KEY),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
	}
}
