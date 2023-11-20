import * as Notifications from "expo-notifications";

export class NotificationManager {
	static async scheduleNotification(id, title, content, date) {
		await Notifications.scheduleNotificationAsync({
			identifier: id,
			content: {
				title: title,
				body: content,
			},
			trigger: date,
		});
	}

	static async cancelNotification(id) {
		await Notifications.cancelScheduledNotificationAsync(id)
	}
}