//#region node_modules/.nitro/vite/services/ssr/assets/sounds-vUSvDDZ3.js
var SOUND_GROUPS = [
	"card",
	"chip",
	"table"
];
var DEFAULT_SOUND_PREFS = {
	muted: false,
	card: 80,
	chip: 80,
	table: 80
};
/** Which volume slider controls each sound. Card handling, chip handling, everything else on the table. */
var GROUP_OF = {
	shuffle: "card",
	deal: "card",
	fold: "card",
	chip: "chip",
	call: "chip",
	raise: "chip",
	allin: "chip",
	collect: "chip",
	win: "chip",
	check: "table",
	turn: "table",
	tick: "table",
	lose: "table"
};
function soundGroup(sound) {
	return GROUP_OF[sound];
}
function clampVolume(value, fallback) {
	const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
	if (!Number.isFinite(n)) return fallback;
	return Math.round(Math.min(100, Math.max(0, n)));
}
/** Cleans up saved settings from storage or the database; anything missing falls back to the defaults. */
function normalizeSoundPrefs(raw) {
	const value = raw && typeof raw === "object" ? raw : {};
	return {
		muted: value["muted"] === true,
		card: clampVolume(value["card"] ?? value["card_volume"], DEFAULT_SOUND_PREFS.card),
		chip: clampVolume(value["chip"] ?? value["chip_volume"], DEFAULT_SOUND_PREFS.chip),
		table: clampVolume(value["table"] ?? value["table_volume"], DEFAULT_SOUND_PREFS.table)
	};
}
/** Slider position (0–100) to loudness. 80 is the original loudness; 0 is silent. */
function volumeToGain(volume) {
	if (volume <= 0) return 0;
	return Math.pow(volume / 80, 1.6);
}
function sameSoundPrefs(a, b) {
	return a.muted === b.muted && a.card === b.card && a.chip === b.chip && a.table === b.table;
}
/**
* Casino sound effects synthesised with the Web Audio API (no audio files to download).
* Every sound is built from filtered noise bursts and short resonant pings so cards
* snap, chips clack and the table knocks like a real felt table, with a light room echo.
*/
var STORAGE_KEY = "master-poker-sound-prefs";
var LEGACY_KEY = "master-poker-sound";
var ctx = null;
var master = null;
var room = null;
var buses = {};
/** The volume group the sound being scheduled right now belongs to. */
var activeGroup = "table";
var prefs = DEFAULT_SOUND_PREFS;
var loaded = false;
var listeners = /* @__PURE__ */ new Set();
var lastPlay = {};
function loadPreference() {
	if (loaded || typeof window === "undefined") return;
	loaded = true;
	try {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved) prefs = normalizeSoundPrefs(JSON.parse(saved));
		else if (window.localStorage.getItem(LEGACY_KEY) === "off") prefs = {
			...DEFAULT_SOUND_PREFS,
			muted: true
		};
	} catch {
		prefs = DEFAULT_SOUND_PREFS;
	}
}
function applyBusVolumes() {
	for (const group of SOUND_GROUPS) {
		const bus = buses[group];
		if (bus && ctx) bus.gain.setTargetAtTime(volumeToGain(prefs[group]), ctx.currentTime, .02);
	}
}
function getCtx() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const AC = window.AudioContext ?? window.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
		master = ctx.createGain();
		master.gain.value = .9;
		master.connect(ctx.destination);
		room = ctx.createConvolver();
		const length = Math.floor(ctx.sampleRate * .35);
		const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
		for (let channel = 0; channel < 2; channel++) {
			const data = impulse.getChannelData(channel);
			for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
		}
		room.buffer = impulse;
		const wet = ctx.createGain();
		wet.gain.value = .12;
		room.connect(wet);
		wet.connect(master);
		for (const group of SOUND_GROUPS) {
			const bus = ctx.createGain();
			bus.gain.value = volumeToGain(prefs[group]);
			bus.connect(master);
			bus.connect(room);
			buses[group] = bus;
		}
	}
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function connectOut(node, ac) {
	node.connect(buses[activeGroup] ?? master ?? ac.destination);
}
var noiseBuffer = null;
function whiteNoise(ac) {
	if (!noiseBuffer || noiseBuffer.sampleRate !== ac.sampleRate) {
		noiseBuffer = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
		const data = noiseBuffer.getChannelData(0);
		for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	}
	return noiseBuffer;
}
var rand = (min, max) => min + Math.random() * (max - min);
/** Filtered noise burst — the building block for card snaps, slides and chip clicks. */
function burst(opts) {
	const ac = getCtx();
	if (!ac) return;
	const start = ac.currentTime + opts.at;
	const src = ac.createBufferSource();
	src.buffer = whiteNoise(ac);
	const filter = ac.createBiquadFilter();
	filter.type = opts.type ?? "bandpass";
	filter.frequency.setValueAtTime(opts.freq, start);
	if (opts.sweepTo) filter.frequency.exponentialRampToValueAtTime(opts.sweepTo, start + opts.duration);
	filter.Q.value = opts.q ?? 1;
	const vol = ac.createGain();
	const attack = opts.attack ?? .002;
	vol.gain.setValueAtTime(1e-4, start);
	vol.gain.linearRampToValueAtTime(opts.gain, start + attack);
	vol.gain.exponentialRampToValueAtTime(1e-4, start + opts.duration);
	src.connect(filter);
	filter.connect(vol);
	connectOut(vol, ac);
	src.start(start, Math.random() * .5);
	src.stop(start + opts.duration + .05);
}
/** Short pitched ping — the ring of a clay chip or a bell partial. */
function ping(opts) {
	const ac = getCtx();
	if (!ac) return;
	const start = ac.currentTime + opts.at;
	const osc = ac.createOscillator();
	osc.type = opts.type ?? "sine";
	osc.frequency.setValueAtTime(opts.freq, start);
	if (opts.dropTo) osc.frequency.exponentialRampToValueAtTime(opts.dropTo, start + opts.duration);
	const vol = ac.createGain();
	vol.gain.setValueAtTime(1e-4, start);
	vol.gain.linearRampToValueAtTime(opts.gain, start + .003);
	vol.gain.exponentialRampToValueAtTime(1e-4, start + opts.duration);
	osc.connect(vol);
	connectOut(vol, ac);
	osc.start(start);
	osc.stop(start + opts.duration + .05);
}
function cardSnap(at, loud = 1) {
	burst({
		at,
		duration: .07,
		gain: .05 * loud,
		freq: 1800,
		q: .7,
		attack: .03,
		sweepTo: 3200
	});
	burst({
		at: at + .06,
		duration: .035,
		gain: .22 * loud,
		freq: rand(2600, 3400),
		q: 1.2
	});
	burst({
		at: at + .062,
		duration: .05,
		gain: .08 * loud,
		freq: 350,
		type: "lowpass"
	});
}
function chipClick(at, loud = 1) {
	burst({
		at,
		duration: .018,
		gain: .3 * loud,
		freq: rand(3800, 6200),
		q: 5
	});
	ping({
		at,
		freq: rand(4200, 6800),
		duration: rand(.03, .06),
		gain: .025 * loud
	});
}
function chips(at, count, spread, loud = 1) {
	let t = at;
	for (let i = 0; i < count; i++) {
		chipClick(t, loud * rand(.7, 1));
		t += rand(spread * .5, spread * 1.3);
	}
	burst({
		at: t,
		duration: .06,
		gain: .06 * loud,
		freq: 500,
		type: "lowpass"
	});
	return t;
}
function knock(at) {
	ping({
		at,
		freq: 150,
		dropTo: 80,
		duration: .11,
		gain: .45
	});
	burst({
		at,
		duration: .04,
		gain: .25,
		freq: 900,
		type: "lowpass"
	});
}
function bell(at, freq, gain, duration = .9) {
	ping({
		at,
		freq,
		duration,
		gain
	});
	ping({
		at,
		freq: freq * 2.01,
		duration: duration * .6,
		gain: gain * .35
	});
	ping({
		at,
		freq: freq * 3.02,
		duration: duration * .35,
		gain: gain * .15
	});
}
function throttle(name, ms) {
	const now = Date.now();
	if (lastPlay[name] && now - lastPlay[name] < ms) return false;
	lastPlay[name] = now;
	return true;
}
/** Plays a sound, optionally `delay` seconds from now. Silent when muted or before audio is unlocked. */
function playSound(sound, delay = 0) {
	loadPreference();
	if (prefs.muted) return;
	activeGroup = soundGroup(sound);
	if (prefs[activeGroup] <= 0 && !(sound === "win" && prefs.table > 0)) return;
	if (!getCtx()) return;
	const at = Math.max(0, delay);
	switch (sound) {
		case "shuffle": {
			if (!throttle("shuffle", 800)) return;
			let t = at;
			for (let i = 0; i < 26; i++) {
				burst({
					at: t,
					duration: .012,
					gain: rand(.06, .12),
					freq: rand(2500, 4500),
					q: 2
				});
				t += rand(.014, .026);
			}
			burst({
				at: t + .04,
				duration: .18,
				gain: .08,
				freq: 1200,
				q: .6,
				attack: .05,
				sweepTo: 600
			});
			burst({
				at: t + .24,
				duration: .05,
				gain: .18,
				freq: 400,
				type: "lowpass"
			});
			break;
		}
		case "deal":
			cardSnap(at);
			break;
		case "chip":
			chips(at, 2, .04, .8);
			break;
		case "call":
			chips(at, 3, .045);
			break;
		case "raise":
			chips(at, 5, .035, 1.05);
			break;
		case "allin":
			burst({
				at,
				duration: .25,
				gain: .1,
				freq: 900,
				q: .5,
				attack: .08
			});
			chips(at + .12, 10, .022, 1.1);
			break;
		case "collect":
			burst({
				at,
				duration: .3,
				gain: .07,
				freq: 1400,
				q: .5,
				attack: .1,
				sweepTo: 700
			});
			chips(at + .08, 7, .03, .75);
			break;
		case "check":
			knock(at);
			knock(at + .14);
			break;
		case "fold":
			burst({
				at,
				duration: .22,
				gain: .12,
				freq: 2200,
				q: .8,
				attack: .02,
				sweepTo: 900
			});
			burst({
				at: at + .02,
				duration: .03,
				gain: .12,
				freq: 3e3,
				q: 1
			});
			break;
		case "win": {
			const end = chips(at, 12, .025, .9);
			activeGroup = "table";
			bell(end + .05, 784, .07);
			bell(end + .17, 1175, .06);
			break;
		}
		case "lose":
			ping({
				at,
				freq: 330,
				dropTo: 300,
				duration: .35,
				gain: .04
			});
			ping({
				at: at + .18,
				freq: 247,
				dropTo: 220,
				duration: .5,
				gain: .04
			});
			break;
		case "turn":
			if (!throttle("turn", 600)) return;
			bell(at, 1046, .06, .7);
			break;
		case "tick": burst({
			at,
			duration: .015,
			gain: .08,
			freq: 2e3,
			q: 3
		});
	}
}
/** Current mute switch and the three volumes (0–100). */
function getSoundPrefs() {
	loadPreference();
	return prefs;
}
/** Changes sound settings, applies them straight away and remembers them on this device. */
function setSoundPrefs(change) {
	loadPreference();
	const next = normalizeSoundPrefs({
		...prefs,
		...change
	});
	if (sameSoundPrefs(next, prefs)) return;
	prefs = next;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
	} catch {}
	applyBusVolumes();
	if (!prefs.muted) getCtx();
	for (const listener of listeners) listener();
}
function setSoundEnabled(on) {
	setSoundPrefs({ muted: !on });
}
function isSoundEnabled() {
	return !getSoundPrefs().muted;
}
function subscribeSound(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
/** Browsers only allow audio after a tap or click; call this from one. */
function primeAudio() {
	loadPreference();
	if (!prefs.muted) getCtx();
}
//#endregion
export { playSound as a, setSoundEnabled as c, normalizeSoundPrefs as i, setSoundPrefs as l, getSoundPrefs as n, primeAudio as o, isSoundEnabled as r, sameSoundPrefs as s, DEFAULT_SOUND_PREFS as t, subscribeSound as u };
