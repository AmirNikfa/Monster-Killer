// ==================== MODAL HANDLING ====================
import { cloneTemplate, getPercentage, getTotalStats, toggleScroll } from "./utils.js";
import { templates, UI } from "./ui.js";
import { overlayHandler } from "./events.js";

export const isResultModalOpen = () => {
	const resultModal = document.querySelector(".modal-result--active");

	return !!resultModal;
}

export const removeResultModal = () => {
	const resultModal = document.querySelector(".modal-result--active");
	if(!!resultModal) {
		resultModal.classList.remove("modal-result--active");
		resultModal.addEventListener("transitionend", () => resultModal.remove());
	}
};

export const removeLogModals = (keepLast = true) => {
	const modals = [...document.querySelectorAll(".modal-log--active")];
	const toRemove =
		keepLast && modals.length > 1 ? modals.slice(0, -1) : modals;
	toRemove.forEach((modal) => modal?.remove());
};

export const scheduleModalRemoval = (modal, closeBtn, delay = 2000) => {
	setTimeout(() => {
		modal.classList.remove("modal-log--active");
		modal.addEventListener("transitionend", () => modal.remove());
	}, delay);
	closeBtn.removeEventListener("click", scheduleModalRemoval);
};

export const renderResultModal = (modalTitle, contentsHandlerFn) => {
	const modal = cloneTemplate(templates.modal);
	modal.classList.add("modal-result");

	modal.querySelector(".modal-title").textContent = modalTitle;

	modal
		.querySelector(".modal-close")
		.addEventListener("click", overlayHandler);

	UI.overlay.classList.add("overlay--active");

	toggleScroll("hidden");

	const contentEl = modal.querySelector("#modal-contents");
	contentsHandlerFn(contentEl, modal);

	document.body.prepend(modal);
	requestAnimationFrame(() => modal.classList.add("modal-result--active"));
};

export const renderAttackModal = (playerDmg, monsterDmg, state) => {
	const modal = cloneTemplate(templates.modal);
	const attackContent = document.importNode(templates.attack.content, true);

	modal.classList.add("modal-log");
	const contents = modal.querySelector("#modal-contents");
	contents.innerHTML = "";
	contents.classList.add("modal-log-contents");
	contents.appendChild(attackContent);

	modal.querySelector(".modal-title").textContent = "Game Log";
	modal.querySelector("#player-damage").textContent = playerDmg;
	modal.querySelector("#monster-damage").textContent = monsterDmg;
	modal.querySelector("#strike-number").textContent = state.attackCount;

	const closeBtn = modal.querySelector(".modal-close");
	closeBtn.addEventListener("click", () =>
		scheduleModalRemoval(modal, closeBtn, 0)
	);

	document.body.insertBefore(modal, document.body.firstChild);
	requestAnimationFrame(() => modal.classList.add("modal-log--active"));

	removeLogModals();
	scheduleModalRemoval(modal, closeBtn);
};
