import { Preferences } from "@capacitor/preferences";
import { state } from "./state.js";

export const saveGameData = async () => {
	try {
		await Preferences.set({
			key: "game_state",
			value: JSON.stringify(state),
		});
		console.log("[Storage] Game state saved.");
	} catch (error) {
		console.error("[Storage] Save failed.", error);
	}
};

export const loadGameData = async () => {
	try {
		const { value } = await Preferences.get({
			key: "game_state",
		});
		console.log("[Storage] Game state loaded.");
		return JSON.parse(value);
	} catch (error) {
		console.error("[Storage] Load failed.");
	}

	return null;
};

export async function clearGameState() {
	try {
		await Preferences.remove({ key: "game_state" });
		console.log("[Storage] Saved game state cleared.");
	} catch (error) {
		console.error("[Storage] Failed to clear game state:", error);
	}
}
