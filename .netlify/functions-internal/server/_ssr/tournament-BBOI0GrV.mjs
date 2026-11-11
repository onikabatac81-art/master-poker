import { r as __toESM } from "../_runtime.mjs";
import { C as uniqueBotName, a as chooseBotAction, b as startHand, n as BOT_ROSTER, o as createHumanSeat, p as legalActions, r as applyAction } from "./session-D4g7BORC.mjs";
import { n as formatChips } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $ as Bot, A as MessageCircle, K as Crown, N as LogOut, S as Send, d as TrendingUp, i as Volume2, l as Trophy, o as Users, p as Timer, r as VolumeX, s as UserRound } from "../_libs/lucide-react.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./useAuth-D_f7uHyK.mjs";
import { a as playSound } from "./sounds-vUSvDDZ3.mjs";
import { n as useSoundSetting } from "./useTableSounds-B9nrkivm.mjs";
import { i as dealerFor, n as HandResultPanel, r as PokerTable, t as ActionBar } from "./dealers-D-_sVv5g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tournament-BBOI0GrV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TRASH_TALK = {
	win: [
		"Easy money. Who taught you to play?",
		"Read you like a book.",
		"That's how it's done.",
		"Too easy, try harder next time.",
		"I knew you were bluffing."
	],
	lose: [
		"Lucky river. Pure luck.",
		"One hand doesn't make you good.",
		"You got lucky that time.",
		"I had you until that card."
	],
	fold: [
		"Smart fold. You would have lost anyway.",
		"I saw the fear in your eyes.",
		"Giving up already?",
		"Wise choice — for once."
	],
	raise: [
		"Feeling brave? Let us see.",
		"Big bet, small hand.",
		"Is that all you have got?",
		"Raise all you want, I am not going anywhere."
	],
	preflop: [
		"Let us see what the cards say.",
		"New hand, same result.",
		"My lucky hand is coming."
	],
	big_pot: [
		"Now we are playing for real.",
		"Big pot, bigger nerves.",
		"Who is brave enough for this one?"
	]
};
function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function botTrashTalk(action, seat, street, potAmount, wonAmount) {
	if (!seat.isBot) return null;
	if (wonAmount !== null && wonAmount > 0) return pick(TRASH_TALK.win);
	if (action.type === "fold") return pick(TRASH_TALK.fold);
	if (action.type === "raise") {
		if (Math.random() < .4) return pick(TRASH_TALK.raise);
	}
	if (street === "preflop" && Math.random() < .15) return pick(TRASH_TALK.preflop);
	if (potAmount > 5e3 && Math.random() < .2) return pick(TRASH_TALK.big_pot);
	if (wonAmount === 0 && Math.random() < .2) return pick(TRASH_TALK.lose);
	return null;
}
var QUICK_MESSAGES = [
	"nice hand",
	"lucky!",
	"gg",
	"all in?",
	"I had you",
	"rough",
	"lets go",
	"big one",
	"folded that?",
	"nice bluff",
	"read you",
	"unlucky"
];
function quickMessageOptions() {
	return QUICK_MESSAGES;
}
var msgCounter = 0;
function makeMessage(author, text, isMe, isBot, isSystem = false) {
	msgCounter += 1;
	return {
		id: `msg-${msgCounter}-${Date.now()}`,
		author,
		text,
		isMe,
		isBot,
		isSystem,
		timestamp: Date.now()
	};
}
function ChatBox({ messages, onSend, collapsed, onToggle }) {
	const [input, setInput] = (0, import_react.useState)("");
	const [soundOn, setSoundOn] = useSoundSetting();
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [messages]);
	function send(text) {
		const trimmed = text.trim();
		if (!trimmed) return;
		onSend(trimmed);
		setInput("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col rounded-2xl border border-white/10 bg-slate-900/80 shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-white/10 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onToggle,
				className: "flex items-center gap-1.5 text-xs font-semibold text-white transition hover:text-gold-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5 text-gold-300" }),
					"Table Chat",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 rounded-full bg-white/10 px-1.5 text-[9px] tabular-nums text-slate-300",
						children: messages.length
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setSoundOn(!soundOn);
				},
				className: "rounded-lg p-1 text-slate-400 transition hover:text-gold-300",
				title: soundOn ? "Mute sounds" : "Enable sounds",
				children: soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" })
			})]
		}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "flex-1 space-y-1.5 overflow-y-auto px-3 py-2",
				style: { maxHeight: "200px" },
				children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-4 text-center text-xs text-slate-500",
					children: "Chat with the table. Bots will trash talk too."
				}) : messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-start gap-1.5 ${msg.isMe ? "flex-row-reverse" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 shrink-0",
						children: msg.isSystem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-slate-500",
							children: "SYS"
						}) : msg.isBot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-3 w-3 text-slate-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-3 w-3 text-gold-300" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-[75%] rounded-lg px-2 py-1 text-xs ${msg.isSystem ? "bg-white/5 text-slate-400" : msg.isMe ? "bg-gold-400/15 text-gold-100" : msg.isBot ? "bg-white/5 text-slate-300" : "bg-sky-500/15 text-sky-100"}`,
						children: [!msg.isSystem && !msg.isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mr-1 font-semibold opacity-70",
							children: [msg.author, ":"]
						}), msg.text]
					})]
				}, msg.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 border-t border-white/10 px-2 py-1.5",
				children: quickMessageOptions().slice(0, 6).map((quick) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => send(quick),
					className: "rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-300 transition active:scale-95 hover:bg-white/10 hover:text-white",
					children: quick
				}, quick))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				className: "flex items-center gap-1.5 border-t border-white/10 px-2 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Say something...",
					maxLength: 120,
					className: "min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950 px-2.5 py-1.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-gold-400/50"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: !input.trim(),
					className: "flex shrink-0 items-center justify-center rounded-lg bg-gold-400/20 p-1.5 text-gold-300 transition active:scale-95 hover:bg-gold-400/30 disabled:opacity-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })
				})]
			})
		] })]
	});
}
var BLIND_LEVELS = [
	{
		level: 1,
		smallBlind: 10,
		bigBlind: 20,
		durationSec: 60
	},
	{
		level: 2,
		smallBlind: 15,
		bigBlind: 30,
		durationSec: 60
	},
	{
		level: 3,
		smallBlind: 25,
		bigBlind: 50,
		durationSec: 60
	},
	{
		level: 4,
		smallBlind: 50,
		bigBlind: 100,
		durationSec: 60
	},
	{
		level: 5,
		smallBlind: 75,
		bigBlind: 150,
		durationSec: 60
	},
	{
		level: 6,
		smallBlind: 100,
		bigBlind: 200,
		durationSec: 60
	},
	{
		level: 7,
		smallBlind: 150,
		bigBlind: 300,
		durationSec: 60
	},
	{
		level: 8,
		smallBlind: 250,
		bigBlind: 500,
		durationSec: 60
	},
	{
		level: 9,
		smallBlind: 400,
		bigBlind: 800,
		durationSec: 60
	},
	{
		level: 10,
		smallBlind: 600,
		bigBlind: 1200,
		durationSec: 60
	}
];
function blindLevelFor(elapsedSec) {
	let remaining = elapsedSec;
	for (const level of BLIND_LEVELS) {
		if (remaining < level.durationSec) return level;
		remaining -= level.durationSec;
	}
	return BLIND_LEVELS[BLIND_LEVELS.length - 1];
}
function nextBlindLevel(elapsedSec) {
	const current = blindLevelFor(elapsedSec);
	const idx = BLIND_LEVELS.findIndex((l) => l.level === current.level);
	return idx < BLIND_LEVELS.length - 1 ? BLIND_LEVELS[idx + 1] : null;
}
function timeRemainingInLevel(elapsedSec) {
	const current = blindLevelFor(elapsedSec);
	let consumed = 0;
	for (const level of BLIND_LEVELS) {
		if (level.level === current.level) break;
		consumed += level.durationSec;
	}
	return Math.max(0, current.durationSec - (elapsedSec - consumed));
}
var TOURNAMENT_STARTING_STACK = 3e3;
function tournamentConfig(level) {
	return {
		smallBlind: level.smallBlind,
		bigBlind: level.bigBlind,
		minBuyIn: TOURNAMENT_STARTING_STACK,
		maxBuyIn: TOURNAMENT_STARTING_STACK
	};
}
function buildLeaderboard(table) {
	return table.seats.filter((seat) => !!seat).map((seat) => ({
		id: seat.id,
		name: seat.name,
		isBot: seat.isBot,
		isMe: seat.isMe,
		avatarUrl: seat.avatarUrl,
		avatarEmoji: seat.avatarEmoji,
		stack: seat.stack,
		eliminated: seat.sittingOut && seat.stack === 0,
		finishPosition: null
	})).sort((a, b) => b.stack - a.stack);
}
var NEXT_HAND_DELAY_MS = 2e3;
var RESULT_DISPLAY_MS = 6e3;
var BOT_MIN_THINK_MS = 1800;
var TURN_SECONDS = 20;
function makeBotSeats(count) {
	const shuffled = [...BOT_ROSTER].sort(() => Math.random() - .5);
	const taken = [];
	return shuffled.slice(0, count).map((bot, index) => {
		const name = uniqueBotName(bot.gender, taken);
		taken.push(name);
		return {
			id: `tbot-${bot.key}-${index}`,
			name,
			isBot: true,
			isMe: false,
			tone: bot.tone,
			stack: TOURNAMENT_STARTING_STACK,
			bet: 0,
			invested: 0,
			hole: [],
			folded: false,
			allIn: false,
			acted: false,
			sittingOut: false,
			avatarUrl: bot.avatarUrl,
			avatarEmoji: bot.emoji,
			photoKey: bot.key
		};
	});
}
function useTournament(me) {
	const [active, setActive] = (0, import_react.useState)(false);
	const [table, setTable] = (0, import_react.useState)(null);
	const [elapsedSec, setElapsedSec] = (0, import_react.useState)(0);
	const [chat, setChat] = (0, import_react.useState)([]);
	const [level, setLevel] = (0, import_react.useState)(blindLevelFor(0));
	const [finished, setFinished] = (0, import_react.useState)(false);
	const [finalPosition, setFinalPosition] = (0, import_react.useState)(null);
	const tableRef = (0, import_react.useRef)(null);
	const prevStreetRef = (0, import_react.useRef)("");
	const prevBoardLenRef = (0, import_react.useRef)(0);
	const prevWinnersRef = (0, import_react.useRef)("");
	const prevToActRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		tableRef.current = table;
	}, [table]);
	(0, import_react.useEffect)(() => {
		if (!active || finished) return;
		const interval = window.setInterval(() => {
			setElapsedSec((prev) => {
				const next = prev + 1;
				const newLevel = blindLevelFor(next);
				setLevel((current) => {
					if (current.level !== newLevel.level) setChat((c) => [...c, makeMessage("Tournament", `Blinds rising to ${newLevel.smallBlind}/${newLevel.bigBlind}`, false, false, true)]);
					return newLevel;
				});
				return next;
			});
		}, 1e3);
		return () => window.clearInterval(interval);
	}, [active, finished]);
	(0, import_react.useEffect)(() => {
		if (!table || !active) return;
		const hand = table.hand;
		if (hand) {
			if (hand.board.length > prevBoardLenRef.current) for (let i = prevBoardLenRef.current; i < hand.board.length; i++) playSound("deal");
			prevBoardLenRef.current = hand.board.length;
			const streetKey = `${hand.number}-${hand.street}`;
			if (streetKey !== prevStreetRef.current) {
				if (hand.street === "preflop") playSound("deal");
				prevStreetRef.current = streetKey;
			}
			if (hand.toAct !== prevToActRef.current && hand.toAct !== null) {
				if (table.seats[hand.toAct]?.isMe) playSound("turn");
				prevToActRef.current = hand.toAct;
			}
		}
		if (hand && hand.street === "complete") {
			const winnerKey = hand.winners.map((w) => w.seat).join(",");
			if (winnerKey !== prevWinnersRef.current) {
				const meSeat = table.seats.findIndex((s) => s?.isMe);
				const iWon = hand.winners.some((w) => w.seat === meSeat);
				playSound(iWon ? "win" : "lose");
				for (const award of hand.winners) {
					const seat = table.seats[award.seat];
					if (!seat) continue;
					const talk = botTrashTalk({ type: "call" }, seat, hand.street, 0, award.amount);
					if (talk) setChat((c) => [...c, makeMessage(seat.name, talk, false, seat.isBot)]);
				}
				prevWinnersRef.current = winnerKey;
			}
		} else prevWinnersRef.current = "";
	}, [table, active]);
	(0, import_react.useEffect)(() => {
		if (!active || !table || finished) return;
		const hand = table.hand;
		let timer;
		if (!hand) {
			const alive = buildLeaderboard(table).filter((p) => p.stack > 0);
			if (!alive.some((p) => p.isMe)) {
				const myFinish = alive.length + 1;
				setFinalPosition(myFinish);
				setFinished(true);
				setChat((c) => [...c, makeMessage("Tournament", `You finished in position ${myFinish}.`, false, false, true)]);
				return;
			}
			if (alive.length <= 1) {
				setFinished(true);
				setFinalPosition(1);
				setChat((c) => [...c, makeMessage("Tournament", "Tournament over! You won!", false, false, true)]);
				return;
			}
			timer = window.setTimeout(() => {
				setTable((prev) => {
					if (!prev) return prev;
					const updatedSeats = prev.seats.map((seat) => seat && seat.stack === 0 ? {
						...seat,
						sittingOut: true
					} : seat);
					const updated = {
						...prev,
						seats: updatedSeats,
						config: tournamentConfig(level)
					};
					return startHand(updated, 0);
				});
			}, NEXT_HAND_DELAY_MS);
		} else if (hand.street === "complete") timer = window.setTimeout(() => {
			setTable((prev) => prev ? {
				...prev,
				hand: null
			} : prev);
		}, RESULT_DISPLAY_MS);
		else if (hand.toAct !== null) {
			const index = hand.toAct;
			if (table.seats[index]?.isBot) {
				const thinkMs = BOT_MIN_THINK_MS + Math.random() * 2200;
				timer = window.setTimeout(() => {
					setTable((prev) => {
						if (!prev || prev.hand?.toAct !== index) return prev;
						const action = chooseBotAction(prev, index, "balanced");
						if (action.type === "fold") playSound("fold");
						else if (action.type === "check") playSound("check");
						else if (action.type === "call") playSound("call");
						else if (action.type === "raise") playSound("raise");
						const seat = prev.seats[index];
						if (seat && Math.random() < .25) {
							const talk = botTrashTalk(action, seat, prev.hand?.street ?? "preflop", 0, null);
							if (talk) setChat((c) => [...c, makeMessage(seat.name, talk, false, true)]);
						}
						return applyAction(prev, index, action);
					});
				}, thinkMs);
			} else timer = window.setTimeout(() => {
				setTable((prev) => {
					if (!prev || prev.hand?.toAct !== index) return prev;
					const fallback = legalActions(prev, index)?.canCheck ? { type: "check" } : { type: "fold" };
					return applyAction(prev, index, fallback);
				});
			}, TURN_SECONDS * 1e3);
		}
		return () => window.clearTimeout(timer);
	}, [
		table,
		active,
		finished,
		level
	]);
	const join = (0, import_react.useCallback)(() => {
		const bots = makeBotSeats(7);
		const human = createHumanSeat(me.id, me.name, TOURNAMENT_STARTING_STACK, 0, me.avatarUrl, me.avatarEmoji);
		const config = tournamentConfig(blindLevelFor(0));
		const initial = {
			seats: [human, ...bots],
			dealer: 0,
			hand: null,
			handCount: 0,
			config
		};
		setTable(initial);
		setElapsedSec(0);
		setLevel(blindLevelFor(0));
		setFinished(false);
		setFinalPosition(null);
		setActive(true);
		window.__lovableEvents?.track?.("project.tournament_entered", { players: 8 });
		setChat([makeMessage("Tournament", `Tournament started! 8 players, starting stack ${TOURNAMENT_STARTING_STACK.toLocaleString()}.`, false, false, true)]);
	}, [
		me.id,
		me.name,
		me.avatarUrl,
		me.avatarEmoji
	]);
	const leave = (0, import_react.useCallback)(() => {
		setActive(false);
		setTable(null);
		setFinished(false);
		setFinalPosition(null);
		setChat([]);
	}, []);
	const act = (0, import_react.useCallback)((action) => {
		if (action.type === "fold") playSound("fold");
		else if (action.type === "check") playSound("check");
		else if (action.type === "call") playSound("call");
		else if (action.type === "raise") playSound("raise");
		setTable((prev) => {
			if (!prev) return prev;
			const index = prev.seats.findIndex((s) => s?.isMe);
			return index === -1 ? prev : applyAction(prev, index, action);
		});
	}, []);
	const sendChat = (0, import_react.useCallback)((text) => {
		setChat((c) => [...c, makeMessage(me.name, text, true, false)]);
	}, [me.name]);
	const meIndex = table?.seats.findIndex((s) => s?.isMe) ?? -1;
	const legal = table && meIndex !== -1 ? legalActions(table, meIndex) : null;
	const leaderboard = table ? buildLeaderboard(table) : [];
	return {
		active,
		table,
		level,
		elapsedSec,
		nextLevel: nextBlindLevel(elapsedSec),
		timeInLevel: timeRemainingInLevel(elapsedSec),
		chat,
		leaderboard,
		finished,
		finalPosition,
		meIndex,
		legal,
		join,
		leave,
		act,
		sendChat
	};
}
var STREET_LABELS = {
	preflop: "Pre-flop",
	flop: "Flop",
	turn: "Turn",
	river: "River",
	complete: "Showdown"
};
function TournamentPage({ player, onLeave }) {
	const tournament = useTournament(player);
	const [chatCollapsed, setChatCollapsed] = (0, import_react.useState)(false);
	if (!tournament.active && !tournament.table) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-center shadow-2xl sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-xl font-bold text-white",
				children: "Sit & Go Tournament"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: [
					"8 players. Starting stack of ",
					formatChips(3e3),
					". Blinds rise every 60 seconds. Last player standing wins. No rake — winner takes all."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-1.5 rounded-xl bg-black/20 p-3 text-left text-xs text-slate-400",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Structure:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-200",
							children: "8 players, 3000 chips"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Blinds:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-200",
							children: "10/20, rising every 60s"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Entry fee:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-emerald-300",
							children: "Free (play chips)"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => tournament.join(),
				className: "mt-6 w-full rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:brightness-110 active:scale-95",
				children: "Join Tournament"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onLeave,
				className: "mt-2 w-full rounded-xl border border-white/10 py-2.5 text-sm text-slate-400 transition hover:text-white",
				children: "Back to Lobby"
			})
		]
	});
	const { table, level, nextLevel, timeInLevel, chat, leaderboard, finished, finalPosition, meIndex, legal, act, sendChat, leave } = tournament;
	if (!table) return null;
	const hand = table.hand;
	const streetLabel = hand ? STREET_LABELS[hand.street] : STREET_LABELS.preflop;
	const isMyTurn = meIndex !== -1 && hand?.toAct === meIndex;
	const turnSeat = hand?.toAct != null ? table.seats[hand.toAct] : null;
	const waitingFor = turnSeat && !isMyTurn ? turnSeat.name : null;
	const turnKey = hand ? `${hand.number}-${hand.street}-${hand.toAct}-${hand.currentBet}` : "idle";
	const aliveCount = leaderboard.filter((p) => p.stack > 0).length;
	const dealer = dealerFor("tournament");
	function handleLeave() {
		leave();
		onLeave();
	}
	if (finished) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-8 w-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-white",
				children: finalPosition === 1 ? "Tournament Winner!" : `Finished #${finalPosition}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400",
				children: finalPosition === 1 ? "You outlasted everyone. Incredible run!" : `You placed ${finalPosition} out of ${leaderboard.length}. Better luck next time.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-md space-y-1.5 rounded-2xl border border-white/10 bg-slate-900/80 p-4",
				children: leaderboard.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center justify-between rounded-lg px-3 py-1.5 text-sm ${p.isMe ? "bg-gold-400/10 text-gold-100" : "text-slate-300"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-5 text-right text-xs tabular-nums text-slate-500",
								children: [i + 1, "."]
							}),
							p.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.avatarUrl,
								alt: "",
								className: "h-5 w-5 rounded-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: p.avatarEmoji
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: p.isMe ? "You" : p.name
							}),
							i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3.5 w-3.5 text-gold-300" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-emerald-300",
						children: formatChips(p.stack)
					})]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: handleLeave,
				className: "mt-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-2.5 text-sm font-bold text-slate-900",
				children: "Back to Lobby"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 sm:gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 sm:px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-gold-300" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold text-white",
						children: "Tournament"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-slate-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
							" ",
							aliveCount,
							" left"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-slate-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3 w-3 text-gold-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								Math.floor(timeInLevel / 60),
								":",
								String(timeInLevel % 60).padStart(2, "0")
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-slate-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-emerald-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold tabular-nums",
							children: [
								level.smallBlind,
								"/",
								level.bigBlind
							]
						})]
					}),
					nextLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden text-slate-500 sm:inline",
						children: [
							"next: ",
							nextLevel.smallBlind,
							"/",
							nextLevel.bigBlind
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 lg:grid lg:grid-cols-[1fr_300px] lg:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-2 shadow-2xl sm:rounded-3xl sm:p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PokerTable, {
							table,
							meIndex,
							dealer,
							streetLabel
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBar, {
						table,
						legal: isMyTurn ? legal : null,
						turnKey,
						onAct: act,
						waitingFor
					}),
					hand?.street === "complete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandResultPanel, { result: {
						handNumber: hand.number,
						board: hand.board,
						rake: hand.rake,
						pot: hand.winners.reduce((s, w) => s + w.amount, 0) + hand.rake,
						showdown: hand.showdown,
						winners: hand.winners.flatMap((w) => {
							const seat = table.seats[w.seat];
							if (!seat) return [];
							return [{
								seat: w.seat,
								name: seat.name,
								avatarUrl: seat.avatarUrl,
								avatarEmoji: seat.avatarEmoji,
								amount: w.amount,
								label: w.label
							}];
						})
					} })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-white/10 bg-slate-900/80 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-2 flex items-center gap-1.5 text-xs font-semibold text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3.5 w-3.5 text-gold-300" }), " Chip Counts"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: leaderboard.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center justify-between rounded-lg px-2 py-1 text-xs ${p.stack === 0 ? "opacity-40" : ""} ${p.isMe ? "bg-gold-400/10" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-3.5 text-right text-[10px] tabular-nums text-slate-500",
											children: i + 1
										}),
										p.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.avatarUrl,
											alt: "",
											className: "h-4 w-4 shrink-0 rounded-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs",
											children: p.avatarEmoji
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `truncate font-medium ${p.isMe ? "text-gold-200" : "text-slate-200"}`,
											children: p.isMe ? "You" : p.name
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `shrink-0 tabular-nums ${p.stack === 0 ? "text-rose-400" : "text-emerald-300"}`,
									children: p.stack === 0 ? "OUT" : formatChips(p.stack)
								})]
							}, p.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatBox, {
						messages: chat,
						onSend: sendChat,
						collapsed: chatCollapsed,
						onToggle: () => setChatCollapsed(!chatCollapsed)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleLeave,
						className: "inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 py-2 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Leave Tournament"]
					})
				]
			})]
		})]
	});
}
function TournamentRoute() {
	const { player } = useAuth();
	const navigate = useNavigate();
	if (!player) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TournamentPage, {
		player: {
			id: player.id,
			name: player.display_name,
			avatarUrl: player.avatar_url,
			avatarEmoji: player.avatar_emoji
		},
		onLeave: () => void navigate({ to: "/lobby" })
	});
}
//#endregion
export { TournamentRoute as component };
