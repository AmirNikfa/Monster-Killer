import { state, MAX_HEALTH } from "./state";

// ==================== DOM ELEMENTS ====================
export const $ = (selector) => document.querySelector(selector);

export const templates = {
	modal: $("#modal-template"),
	attack: $("#attack-template"),
	heal: $("#heal-template"),
	accordion: $("#accordion-template"),
	attackResult: $("#attack-result-template"),
	healResult: $("#heal-result-template"),
	winResult: $("#win-result-template"),
	winRatio: $("#win-ratio-template")
};

export const UI = {
	operationsList: $(".operations-list"),
	playerHealth: $(".status__player-health"),
	monsterHealth: $(".status__monster-health"),
	playerIndicator: $(".status__player-health").nextElementSibling,
	monsterIndicator: $(".status__monster-health").nextElementSibling,
	strongAttackCount: $("#strong-attack-left"),
	healCount: $("#heal-left"),
	overlay: $(".overlay"),
};

export const updateUIPowers = (
	healsLeft = state.healsLeft,
	strongAttacksLeft = state.strongAttacksLeft
) => {
	UI.strongAttackCount.textContent = `${strongAttacksLeft} Left`;
	UI.healCount.textContent = `${healsLeft} Left`;
};

export const updateUIHealth = (playerHealth, monsterHealth) => {
	UI.playerHealth.value = playerHealth;
	UI.playerIndicator.textContent = playerHealth;

	UI.monsterHealth.value = monsterHealth;
	UI.monsterIndicator.textContent = monsterHealth;
};

export const updateUIFromState = (state) => {
	const playerHealth = state.playerHealth ?? MAX_HEALTH;
	const monsterHealth = state.monsterHealth ?? MAX_HEALTH;

	updateUIHealth(playerHealth, monsterHealth);
	updateUIPowers(state.healsLeft.state.strongAttacksLeft);
};
