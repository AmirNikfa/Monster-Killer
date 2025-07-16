import { state } from "./state";

// ==================== UTILITIES ====================
export const toggleScroll = (value) => (document.body.style.overflow = value);

export const getCurrentTimestamp = () => {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(now.getDate()).padStart(2, "0")}, ${String(
		now.getHours()
	).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
		now.getSeconds()
	).padStart(2, "0")}`;
};

export const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const cloneTemplate = (template) =>
	document.importNode(template.content, true).firstElementChild;

export const resetHealthStyles = (progressBar, indicator) => {
	progressBar.classList.remove("yellow-health", "red-health");
	indicator.classList.remove(
		"progress-indicator--yellow",
		"progress-indicator--red"
	);
};

export const updateHealthStyles = (value, progressBar, indicator) => {
	resetHealthStyles(progressBar, indicator);
	if (value <= 50 && value > 20) {
		progressBar.classList.add("yellow-health");
		indicator.classList.add("progress-indicator--yellow");
	} else if (value <= 20) {
		progressBar.classList.add("red-health");
		indicator.classList.add("progress-indicator--red");
	}
};

export const checkGameOver = (UI) => {
	const playerHP = parseInt(UI.playerHealth.value);
	const monsterHP = parseInt(UI.monsterHealth.value);

	updateHealthStyles(playerHP, UI.playerHealth, UI.playerIndicator);
	updateHealthStyles(monsterHP, UI.monsterHealth, UI.monsterIndicator);

	const isOver = playerHP < 1 || monsterHP < 1;
	const winner =
		playerHP < 1 && monsterHP < 1
			? "DRAW"
			: playerHP < 1
			? "MONSTER"
			: "PLAYER";

	return { isOver, winner };
};

export const getPercentage = (count, total) => {
	return total === 0 ? 0 : ((count / total) * 100).toFixed(2);
};

export const getTotalStats = () => {
	const winnerMap = {
		PLAYER: 0,
		MONSTER: 0,
		DRAW: 0
	}

	for(const log of state.logs) {
		if(winnerMap.hasOwnProperty(log.winner)) {
			++winnerMap[log.winner];
		}
	}

	return winnerMap;
}