// ==================== EVENTS ====================
import { toggleScroll, checkGameOver, cloneTemplate } from "./utils.js";
import { UI, templates, updateUIPowers } from "./ui.js";
import { DAMAGE, state, TOTAL_WIN_REWARD } from "./state.js";
import { renderHeal, renderAttack, resetGame } from "./game.js";
import {
	removeLogModals,
	removeResultModal,
	renderAttackModal,
	renderResultModal,
} from "./modals.js";
import { renderHistory } from "./history.js";

export const overlayHandler = () => {
	toggleScroll("initial");
	removeResultModal();
	UI.overlay.classList.remove("overlay--active");
};

const getWinMessageAndClass = (winner) => {
	switch (winner) {
		case "DRAW":
			return { message: "DRAW!", className: "modal-result--draw" };
		case "PLAYER":
			return { message: "You Win!", className: "modal-result--win" };
		case "MONSTER":
		default:
			return { message: "You Lost!", className: "modal-result--lost" };
	}
};

export const toggleAccordion = (e) => {
	const button = e.target.closest("button.accordion-button");

	if (!button) return;

	const content = button.nextElementSibling;
	const icon = button.querySelector("#accordion-angle-icon");
	const isOpen = button.getAttribute("data-is-open") === "true";

	button.setAttribute("data-is-open", !isOpen);
	icon.classList.toggle("fa-angle-up", !isOpen);
	icon.classList.toggle("fa-angle-down", isOpen);
	content.style.height = isOpen ? "0" : `${content.scrollHeight}px`;

	button.scrollIntoView({ behavior: "smooth" });
};


export const updateWinResultModal = (winStatus, contentsContainer, modal) => {
	modal.style.height = "25%";
	contentsContainer.innerHTML = "";

	const { message, className } = getWinMessageAndClass(winStatus.winner);

	const resultEl = document.createElement("h3");
	resultEl.textContent = message;
	resultEl.classList.add(className);

	if (winStatus.totalWin >= TOTAL_WIN_REWARD) {
		const rewardMessage = `Congrats!🎉 You won ${TOTAL_WIN_REWARD} games in total. You are now awarded +1 Heal and +1 Strong Attack`;
		const paraEl = document.createElement("p");
		paraEl.textContent = rewardMessage;
		resultEl.appendChild(paraEl);
	}

	contentsContainer.appendChild(resultEl);
};

export const handleOperation = (e) => {
	const operation = e.target
		.closest(".operations-item")
		?.getAttribute("data-type");
		
	if (!operation) return;

	switch (operation) {
		case "ATTACK":
			renderAttack(DAMAGE.NORMAL, DAMAGE.NORMAL, "ATTACK");
			break;
		case "ATTACK_STRONG":
			if (state.strongAttacksLeft > 0) {
				renderAttack(DAMAGE.STRONG, DAMAGE.NORMAL, "STRONG_ATTACK");
				updateUIPowers(undefined, --state.strongAttacksLeft);
			}
			break;
		case "HEAL":
			renderHeal();
			break;
		case "SHOW_LOG":
			removeLogModals(false);

			renderResultModal("Game History", renderHistory);

			break;
	}

	const result = checkGameOver(UI);

	if (result.isOver) {
		const winner = result.winner;

		if (winner === "PLAYER") {
			++state.totalWin;
		}

		renderResultModal(
			"Game Result",
			updateWinResultModal.bind(this, {
				winner,
				totalWin: state.totalWin,
			})
		);

		resetGame(winner);
	}
};

export const initEvents = () => {
	UI.operationsList.addEventListener("click", handleOperation);
	UI.overlay.addEventListener("click", overlayHandler);
};
