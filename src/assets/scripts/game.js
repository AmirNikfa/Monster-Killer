// ==================== GAME ACTIONS ====================
import { getRandomInt, getCurrentTimestamp, cloneTemplate } from "./utils.js";
import { templates, UI, updateUIHealth, updateUIPowers } from "./ui.js";
import {
	state,
	MAX_HEALTH,
	INITIAL_HEAL,
	INITIAL_STRONG_ATTACK,
	TOTAL_WIN_REWARD,
} from "./state.js";
import { renderAttackModal } from "./modals.js";
import { resetHealthStyles } from "./utils.js";

export const updateRoundLog = (entry) => {
	const index = state.roundCount - 1;
	if (!state.logs[index])
		state.logs[index] = { roundCount: state.roundCount, infos: [] };
	state.logs[index].infos.push(entry);
};

export const renderHeal = () => {
	const healAmount = getRandomInt(1, 10);
	if (state.healsLeft < 1 || UI.playerHealth.value == MAX_HEALTH) return;

	state.playerHealth = UI.playerHealth.value = parseInt(UI.playerHealth.value) + healAmount;
	UI.playerIndicator.textContent =
		parseInt(UI.playerIndicator.textContent) + healAmount;

	state.healCount++;
	state.healsLeft--;

	updateUIPowers(state.healsLeft);

	updateRoundLog({ mode: "HEAL", healCount: state.healCount, healAmount });
};

export const renderAttack = (playerDmgRange, monsterDmgRange, mode) => {
	const playerDmg = getRandomInt(playerDmgRange.min, playerDmgRange.max);
	const monsterDmg = getRandomInt(monsterDmgRange.min, monsterDmgRange.max);

	const playerHealth = parseInt(UI.playerHealth.value) - monsterDmg;
	const monsterHealth = parseInt(UI.monsterHealth.value) - playerDmg;

	updateUIHealth(playerHealth, monsterHealth);

	state.attackCount++;
	state.playerHealth = playerHealth;
	state.monsterHealth = monsterHealth;

	updateRoundLog({
		mode,
		attackCount: state.attackCount,
		playerDealtDamage: playerDmg,
		monsterDealtDamage: monsterDmg,
	});

	renderAttackModal(playerDmg, monsterDmg, state);
};

export const resetGame = (winner) => {
	UI.playerHealth.value = UI.monsterHealth.value = MAX_HEALTH;
	UI.playerIndicator.textContent = UI.monsterIndicator.textContent =
		MAX_HEALTH;

	state.logs[state.roundCount - 1].finishedTime = getCurrentTimestamp();
	state.logs[state.roundCount - 1].winner = winner;

	state.roundCount++;
	state.attackCount = 0;
	state.healCount = 0;
	state.playerHealth = MAX_HEALTH;
	state.monsterHealth = MAX_HEALTH;

	if (state.totalWin >= TOTAL_WIN_REWARD) {
		const healsLeft = ++state.healsLeft;
		const strongAttacksLeft = ++state.strongAttacksLeft;

		updateUIPowers(healsLeft, strongAttacksLeft);
		state.totalWin = 0;
	}

	resetHealthStyles(UI.playerHealth, UI.playerIndicator);
	resetHealthStyles(UI.monsterHealth, UI.monsterIndicator);
};
