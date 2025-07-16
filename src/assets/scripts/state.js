
// ==================== STATE ====================
export const MAX_HEALTH = 100;
export const INITIAL_HEAL = 2;
export const INITIAL_STRONG_ATTACK = 2;
export const TOTAL_WIN_REWARD = 5;

export const DAMAGE = {
	NORMAL: { min: 5, max: 15 },
	STRONG: { min: 10, max: 20 },
};

export let state = {
	roundCount: 1,
	attackCount: 0,
	healCount: 0,
	healsLeft: INITIAL_HEAL,
	strongAttacksLeft: INITIAL_STRONG_ATTACK,
	logs: [],
	totalWin: 0,
	playerHealth: MAX_HEALTH,
	monsterHealth: MAX_HEALTH
};

export const resetState = () => {
	state.roundCount = 1;
	state.attackCount = 0;
	state.healCount = 0;
	state.healsLeft = INITIAL_HEAL;
	state.strongAttacksLeft = INITIAL_STRONG_ATTACK;
	state.logs = [];
	state.totalWin = 0;

	console.log("[State] Game state reset.");
}