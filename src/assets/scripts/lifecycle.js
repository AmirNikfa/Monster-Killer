import { App } from "@capacitor/app";
import { saveGameData } from "./storage";
import { state } from "./state";
import { isResultModalOpen, removeResultModal } from "./modals";
import { overlayHandler } from "./events";

export const setupLifecycleListeners = () => {
	App.addListener("pause", async () => {
		await saveGameData();
		console.log("[Lifecycle] Game state saved on background.");
	});

	App.addListener("appExit", async () => {
		await saveGameData(state);
		console.log("[Lifecycle] Game state saved on exit.");
	});

	App.addListener("backButton", () => {
		if (isResultModalOpen()) {
			overlayHandler();
		} else {
			App.exitApp();
		}
	});
};
