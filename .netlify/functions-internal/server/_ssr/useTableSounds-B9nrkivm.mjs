import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as playSound, c as setSoundEnabled, l as setSoundPrefs, n as getSoundPrefs, o as primeAudio, r as isSoundEnabled, t as DEFAULT_SOUND_PREFS, u as subscribeSound } from "./sounds-vUSvDDZ3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTableSounds-B9nrkivm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Works out which table sounds to play between two snapshots of the table.
* Pure so it can be tested; the server may send several moves in one update.
*/
function tableSoundEvents(prev, next) {
	const hand = next.hand;
	if (!hand) return [];
	const events = [];
	const before = prev?.hand ?? null;
	if (!before || before.number !== hand.number) {
		events.push({
			sound: "shuffle",
			delay: 0
		});
		const players = next.seats.filter((seat) => seat && seat.hole.length > 0).length;
		const deals = Math.min(players * 2, 16);
		for (let i = 0; i < deals; i++) events.push({
			sound: "deal",
			delay: .75 + i * .11
		});
		if (next.seats.some((seat) => seat && seat.invested > 0)) events.push({
			sound: "chip",
			delay: .85 + deals * .11
		});
		return events;
	}
	const streetChanged = before.street !== hand.street;
	let anyMove = false;
	next.seats.forEach((seat, index) => {
		const old = prev?.seats[index];
		if (!seat || !old || old.id !== seat.id) return;
		if (!old.folded && seat.folded) {
			events.push({
				sound: "fold",
				delay: 0
			});
			anyMove = true;
			return;
		}
		if (seat.invested > old.invested) {
			anyMove = true;
			if (seat.allIn && !old.allIn) events.push({
				sound: "allin",
				delay: 0
			});
			else if (!streetChanged && seat.bet > before.currentBet) events.push({
				sound: "raise",
				delay: 0
			});
			else events.push({
				sound: "call",
				delay: 0
			});
			return;
		}
		if (!streetChanged && seat.acted && !old.acted && !seat.folded && !seat.allIn) {
			events.push({
				sound: "check",
				delay: 0
			});
			anyMove = true;
		}
	});
	if (streetChanged && !anyMove && hand.street !== "complete") events.push({
		sound: "check",
		delay: 0
	});
	let at = anyMove || streetChanged ? .3 : 0;
	if (streetChanged && prev?.seats.some((seat) => seat && seat.bet > 0)) {
		events.push({
			sound: "collect",
			delay: at
		});
		at += .45;
	}
	for (let i = before.board.length; i < hand.board.length; i++) {
		events.push({
			sound: "deal",
			delay: at
		});
		at += .16;
	}
	if (hand.street === "complete" && before.street !== "complete") {
		const meIndex = next.seats.findIndex((seat) => seat?.isMe);
		const iWon = meIndex !== -1 && hand.winners.some((award) => award.seat === meIndex);
		const meInHand = meIndex !== -1 && next.seats[meIndex] && !next.seats[meIndex].folded && (next.seats[meIndex].hole.length ?? 0) > 0;
		events.push({
			sound: iWon ? "win" : "collect",
			delay: at + .4
		});
		if (!iWon && meInHand) events.push({
			sound: "lose",
			delay: at + .9
		});
		return events;
	}
	const meIndex = next.seats.findIndex((seat) => seat?.isMe);
	if (meIndex !== -1 && hand.toAct === meIndex && (before.toAct !== meIndex || streetChanged)) events.push({
		sound: "turn",
		delay: at + .15
	});
	return events;
}
/** Plays shuffle, deal, chip, check, fold and win sounds as the cash table changes. */
function useTableSounds(table, active) {
	const prevRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const unlock = () => primeAudio();
		window.addEventListener("pointerdown", unlock);
		window.addEventListener("keydown", unlock);
		return () => {
			window.removeEventListener("pointerdown", unlock);
			window.removeEventListener("keydown", unlock);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!active) {
			prevRef.current = null;
			return;
		}
		const prev = prevRef.current;
		prevRef.current = table;
		if (!prev) return;
		for (const event of tableSoundEvents(prev, table)) playSound(event.sound, event.delay);
	}, [table, active]);
}
/** Shared on/off switch for game sounds, remembered on this device. */
function useSoundSetting() {
	return [(0, import_react.useSyncExternalStore)(subscribeSound, isSoundEnabled, () => true), setSoundEnabled];
}
/** Mute switch plus card, chip and table volumes, shared everywhere and saved to the player's account. */
function useSoundPrefs() {
	return [(0, import_react.useSyncExternalStore)(subscribeSound, getSoundPrefs, () => DEFAULT_SOUND_PREFS), setSoundPrefs];
}
//#endregion
export { useSoundSetting as n, useTableSounds as r, useSoundPrefs as t };
