
// ==================== ENTRY POINT ====================
import "../sass/main.scss"

import { initEvents } from "./events.js";
import { setupLifecycleListeners } from "./lifecycle.js";
import { resetState, state } from "./state.js";
import { clearGameState, loadGameData } from "./storage.js";
import { UI, updateUIHealth, updateUIPowers } from "./ui.js";
import { updateHealthStyles } from "./utils.js";

const initGame = async () => {
	const savedState = await loadGameData();

	if(savedState) {
		Object.assign(state, savedState);
			
		updateUIHealth(state.playerHealth, state.monsterHealth);
		updateHealthStyles(state.playerHealth, UI.playerHealth, UI.playerIndicator)
		updateHealthStyles(state.monsterHealth, UI.monsterHealth, UI.monsterIndicator)
		updateUIPowers();
	}

	setupLifecycleListeners();
	initEvents();
}

initGame();