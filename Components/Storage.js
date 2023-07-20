import * as SecureStore from 'expo-secure-store';

export class Storage {
	static async set(key, value) {
		await SecureStore.setItemAsync(key, value);
	};

 	static async get(key) {
		return await SecureStore.getItemAsync(key);
	};

	static async remove(key) {
		return await SecureStore.deleteItemAsync(key);
	};
}
