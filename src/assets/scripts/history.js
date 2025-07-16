// ==================== RENDERING LOG HISTORY ====================
import { templates, UI } from "./ui.js";
import { cloneTemplate, getPercentage, getTotalStats } from "./utils.js";
import { toggleAccordion } from "./events.js";
import { state } from "./state.js";

const renderHealEntry = (entry) => {
	const healResult = cloneTemplate(templates.healResult);
	healResult.querySelector("#heal-count").textContent = entry.healCount;
	healResult.querySelector("#heal-amount").textContent = entry.healAmount;
	return healResult;
};

const renderAttackEntry = (entry) => {
	const attackResult = cloneTemplate(templates.attackResult);
	attackResult.querySelector("#attack-number").textContent =
		entry.attackCount;
	attackResult.querySelector("#player-dealt-damage").textContent =
		entry.playerDealtDamage;
	attackResult.querySelector("#monster-dealt-damage").textContent =
		entry.monsterDealtDamage;
	return attackResult;
};

const renderResult = (winner, done, taken) => {
	const result = cloneTemplate(templates.winResult);
	const title = result.querySelector(".accordion-title");
	const doneEl = result.querySelector("#damage-done");
	const takenEl = result.querySelector("#damage-taken");

	let titleText = "";
	let className = "";

	switch (winner) {
		case "DRAW":
			titleText = "DRAW";
			className = "draw-item";
			break;
		case "PLAYER":
			titleText = "YOU WON!";
			className = "winner-item";
			break;
		case "MONSTER":
		default:
			titleText = "YOU LOST!";
			className = "loser-item";
			break;
	}

	title.textContent = titleText;
	doneEl.textContent = done;
	takenEl.textContent = taken;
	result.classList.add(className);

	return result;
};

const applyButtonState = (button, winner) => {
	const classMap = {
		DRAW: "accordion-button--draw",
		PLAYER: "accordion-button--win",
		MONSTER: "accordion-button--lose",
	};

	button.classList.add(classMap[winner] || "accordion-button--lose");
};

export const createWinRatio = () => {
	const winRatio = cloneTemplate(templates.winRatio);
	const stats = getTotalStats();

	const total = stats.PLAYER + stats.MONSTER + stats.DRAW;
	if (total === 0) return; 

	const percentages = {
		"#win": getPercentage(stats.PLAYER, total),
		"#lose": getPercentage(stats.MONSTER, total),
		"#draw": getPercentage(stats.DRAW, total),
	};

	Object.entries(percentages).forEach(([selector, percent]) => {
		const element = winRatio.querySelector(selector);
		if (element) element.style.width = `${percent}%`;
	});

	return winRatio;
};

export const renderHistory = (container, modal) => {
	if (!state.logs.length) return;

	container.innerHTML = "";

	const winRatioEl = createWinRatio();

	modal.insertBefore(winRatioEl, container);

	state.logs.forEach((log) => {
		const accordion = cloneTemplate(templates.accordion);
		const button = accordion.querySelector(".accordion-button");
		const contents = accordion.querySelector(
			".accordion-contents-container"
		);
		accordion.querySelector("#round-number").textContent = log.roundCount;

		let totalDamageDone = 0;
		let totalDamageTaken = 0;

		log.infos.forEach((entry) => {
			if (entry.mode === "HEAL") {
				contents.appendChild(renderHealEntry(entry));
			} else {
				contents.appendChild(renderAttackEntry(entry));
				totalDamageDone += entry.playerDealtDamage;
				totalDamageTaken += entry.monsterDealtDamage;
			}
		});

		if (log.winner && log.finishedTime) {
			const result = renderResult(
				log.winner,
				totalDamageDone,
				totalDamageTaken
			);
			contents.prepend(result);

			accordion.querySelector("#finished-time").textContent =
				log.finishedTime;
			applyButtonState(button, log.winner);
		}

		container.appendChild(accordion);
		button.addEventListener("click", toggleAccordion);
	});
};