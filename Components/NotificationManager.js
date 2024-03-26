// Purpose: Contains the NotificationManager class which is used to schedule and cancel notifications.
import * as Notifications from "expo-notifications";

// Notification Manager Class to schedule and cancel notifications
export class NotificationManager {
	// Function to schedule a notification with an id, title, content and date
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

	// Function to cancel a notification with an id
	static async cancelNotification(id) {
		await Notifications.cancelScheduledNotificationAsync(id)
	}
}