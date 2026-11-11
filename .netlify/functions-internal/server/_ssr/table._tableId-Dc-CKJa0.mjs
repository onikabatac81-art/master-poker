import { r as __toESM } from "../_runtime.mjs";
import { c as effectiveRake, f as isValidAction, l as emptyTable, p as legalActions } from "./session-D4g7BORC.mjs";
import { t as supabase } from "./client-DQTJBoLu.mjs";
import { i as formatPeso, n as formatChips, t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useTableSettings } from "./useTableSettings-Bq7lZs-1.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { H as History, J as Coins, N as LogOut, a as Volume1, at as Armchair, i as Volume2, it as ArrowDownToLine, j as Maximize2, k as Minimize2, n as Wallet, o as Users, r as VolumeX, rt as ArrowLeft, tt as ArrowUpFromLine } from "../_libs/lucide-react.mjs";
import { S as useRouter, Vt as isRedirect, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./useAuth-D_f7uHyK.mjs";
import { n as useWallet, t as RequestModal } from "./useWallet-CvhXBrOJ.mjs";
import { t as Route } from "./table._tableId-CGicAofF.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CXr6X1Wx.mjs";
import { r as useTableSounds, t as useSoundPrefs } from "./useTableSounds-B9nrkivm.mjs";
import { i as PopoverTrigger$1, n as PopoverContent$1, r as PopoverPortal, t as Popover$1 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { n as cn, t as SoundControls } from "./SoundControls-tmojWTfB.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CMevzYJH.mjs";
import { i as dealerFor, n as HandResultPanel, r as PokerTable, t as ActionBar } from "./dealers-D-_sVv5g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/table._tableId-Dc-CKJa0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Server-authoritative cash tables. The full game (deck, bots, chip counts) lives in the
* table_game_states table, which only this server can read or write (service role).
* Every handler first verifies the signed-in player, then only touches that player's rows.
* The browser only sends "tick" and the player's own actions, and receives a redacted view.
*/
/** Service-role client, loaded inside handlers only (never shipped to the browser). */
/** Load a game only if it belongs to this player. */
/** Save with an optimistic version check; on conflict return the latest stored row. */
/** Close any open session the player left behind (closed tab, lost connection). */
function sanitizeRemotes(value) {
	if (!Array.isArray(value)) return [];
	return value.slice(0, 8).flatMap((entry) => {
		if (!entry || typeof entry !== "object") return [];
		const { id, name } = entry;
		if (typeof id !== "string" || typeof name !== "string" || id.length > 64) return [];
		return [{
			id,
			name: name.slice(0, 40),
			avatarUrl: null,
			avatarEmoji: "🙂"
		}];
	});
}
function requireUuid(value, label) {
	if (typeof value !== "string" || !/^[0-9a-f-]{36}$/i.test(value)) throw new Error(`Invalid ${label}`);
	return value;
}
var getTableGame = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ({ tableId: requireUuid(input?.tableId, "table") })).handler(createSsrRpc("d3be1dad2b7745a03e80556a51bc3958ad020d97dcd99af6eedfb16b7bb90695"));
var sitDownAtTable = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	const buyIn = Number(input?.buyIn);
	if (!Number.isFinite(buyIn) || buyIn <= 0) throw new Error("Invalid buy-in");
	return {
		tableId: requireUuid(input?.tableId, "table"),
		buyIn: Math.floor(buyIn)
	};
}).handler(createSsrRpc("ce6defde78d9f551b049a7d6c727648e4816ee0b23b9e8a8b6945f8cd7a55086"));
var tickTableGame = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ({
	sessionId: requireUuid(input?.sessionId, "session"),
	remotes: sanitizeRemotes(input?.remotes)
})).handler(createSsrRpc("d2afbab39247f69a4809efdc381e88fc289ddbae3e9953a499c1b65d0bbbb52b"));
var actAtTable = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!isValidAction(input?.action)) throw new Error("Invalid action");
	return {
		sessionId: requireUuid(input?.sessionId, "session"),
		action: input.action
	};
}).handler(createSsrRpc("b5269c5f506b85a24fe4785674219f2be35ac8b37a0e8ceafbe410f100006911"));
var leaveTable = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ({ sessionId: requireUuid(input?.sessionId, "session") })).handler(createSsrRpc("6b32d6fed5f396a9226fa85eb076e86753742a9d70a4c534d0a90bb90e7d4c31"));
var PRESENCE_CHANNEL = "poker-table-main";
var TICK_BUFFER_MS = 150;
var RETRY_MS = 3e3;
/**
* Cash-table state is owned by the server: chips, cards, bots and cash-outs are all computed there.
* This hook only displays the server's view, sends the player's actions, and asks the server to
* advance the game when the next automatic step is due.
*/
function usePokerTable(me, tableConfig, tableId) {
	const getGameFn = useServerFn(getTableGame);
	const sitFn = useServerFn(sitDownAtTable);
	const tickFn = useServerFn(tickTableGame);
	const actFn = useServerFn(actAtTable);
	const leaveFn = useServerFn(leaveTable);
	const [table, setTable] = (0, import_react.useState)(emptyTable(tableConfig));
	const [seated, setSeated] = (0, import_react.useState)(false);
	const [version, setVersion] = (0, import_react.useState)(-1);
	const [dueAt, setDueAt] = (0, import_react.useState)(0);
	const [retryNonce, setRetryNonce] = (0, import_react.useState)(0);
	const [remotes, setRemotes] = (0, import_react.useState)([]);
	const [leaving, setLeaving] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [cashOutBlocked, setCashOutBlocked] = (0, import_react.useState)(false);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [botLevel, setBotLevel] = (0, import_react.useState)(null);
	const sessionRef = (0, import_react.useRef)(null);
	const versionRef = (0, import_react.useRef)(-1);
	const inFlightRef = (0, import_react.useRef)(false);
	const remotesRef = (0, import_react.useRef)([]);
	const configRef = (0, import_react.useRef)(tableConfig);
	configRef.current = tableConfig;
	(0, import_react.useEffect)(() => {
		remotesRef.current = remotes;
	}, [remotes]);
	const applyResult = (0, import_react.useCallback)((result) => {
		if (result.closed || !result.view) {
			sessionRef.current = null;
			versionRef.current = -1;
			setSeated(false);
			setLeaving(false);
			setRemotes([]);
			setVersion(-1);
			setBotLevel(null);
			setTable(emptyTable(configRef.current));
			return;
		}
		const view = result.view;
		if (sessionRef.current === view.sessionId && view.version < versionRef.current) return;
		sessionRef.current = view.sessionId;
		versionRef.current = view.version;
		setTable(view.table);
		setDueAt(Date.now() + view.msUntilNext);
		setVersion(view.version);
		setBotLevel(view.botLevel);
		setSeated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		getGameFn({ data: { tableId } }).then((result) => {
			if (active && !result.closed) applyResult(result);
		}).catch(() => void 0);
		return () => {
			active = false;
		};
	}, [
		getGameFn,
		tableId,
		applyResult
	]);
	(0, import_react.useEffect)(() => () => {
		const sessionId = sessionRef.current;
		if (sessionId) leaveFn({ data: { sessionId } }).catch(() => void 0);
	}, [leaveFn]);
	(0, import_react.useEffect)(() => {
		if (!seated) return;
		const channel = supabase.channel(PRESENCE_CHANNEL, { config: { presence: { key: me.id } } });
		channel.on("presence", { event: "sync" }, () => {
			const state = channel.presenceState();
			const people = /* @__PURE__ */ new Map();
			for (const entries of Object.values(state)) for (const entry of entries) if (entry.id !== me.id) people.set(entry.id, {
				id: entry.id,
				name: entry.name,
				avatarUrl: null,
				avatarEmoji: "🙂"
			});
			setRemotes([...people.values()]);
		}).subscribe(async (status) => {
			if (status === "SUBSCRIBED") await channel.track({
				id: me.id,
				name: me.name
			});
		});
		return () => {
			supabase.removeChannel(channel);
		};
	}, [
		seated,
		me.id,
		me.name
	]);
	(0, import_react.useEffect)(() => {
		if (!seated || leaving || cashOutBlocked) return;
		const sessionId = sessionRef.current;
		if (!sessionId) return;
		const timer = window.setTimeout(() => {
			if (inFlightRef.current) {
				window.setTimeout(() => setRetryNonce((n) => n + 1), 500);
				return;
			}
			inFlightRef.current = true;
			tickFn({ data: {
				sessionId,
				remotes: remotesRef.current.map((player) => ({
					id: player.id,
					name: player.name
				}))
			} }).then((result) => {
				const before = versionRef.current;
				applyResult(result);
				if (!result.closed && result.view?.version === before) setRetryNonce((n) => n + 1);
			}).catch(() => window.setTimeout(() => setRetryNonce((n) => n + 1), RETRY_MS)).finally(() => {
				inFlightRef.current = false;
			});
		}, Math.max(0, dueAt - Date.now()) + TICK_BUFFER_MS);
		return () => window.clearTimeout(timer);
	}, [
		seated,
		leaving,
		cashOutBlocked,
		version,
		dueAt,
		retryNonce,
		tickFn,
		applyResult
	]);
	(0, import_react.useEffect)(() => {
		const hand = table.hand;
		if (!hand || hand.street !== "complete") return;
		setHistory((previous) => {
			if (previous[0]?.handNumber === hand.number) return previous;
			return [{
				handNumber: hand.number,
				board: hand.board,
				rake: hand.rake,
				pot: hand.winners.reduce((sum, award) => sum + award.amount, 0) + hand.rake,
				showdown: hand.showdown,
				winners: hand.winners.flatMap((award) => {
					const seat = table.seats[award.seat];
					if (!seat) return [];
					return [{
						seat: award.seat,
						name: seat.name,
						avatarUrl: seat.avatarUrl,
						avatarEmoji: seat.avatarEmoji,
						amount: award.amount,
						label: award.label
					}];
				})
			}, ...previous].slice(0, 25);
		});
	}, [table]);
	const sitDown = (0, import_react.useCallback)(async (buyIn) => {
		setBusy(true);
		setError(null);
		try {
			const result = await sitFn({ data: {
				tableId,
				buyIn
			} });
			setLeaving(false);
			setCashOutBlocked(false);
			applyResult(result);
			if (!result.closed) window.__lovableEvents?.track?.("project.table_joined", {
				big_blind: configRef.current.bigBlind,
				buy_in: buyIn
			});
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setBusy(false);
		}
	}, [
		sitFn,
		tableId,
		applyResult
	]);
	const act = (0, import_react.useCallback)((action) => {
		const sessionId = sessionRef.current;
		if (!sessionId || inFlightRef.current) return;
		inFlightRef.current = true;
		actFn({ data: {
			sessionId,
			action
		} }).then(applyResult).catch((err) => setError(errorMessage(err))).finally(() => {
			inFlightRef.current = false;
		});
	}, [actFn, applyResult]);
	const standUp = (0, import_react.useCallback)(async () => {
		const sessionId = sessionRef.current;
		if (!sessionId) return true;
		setLeaving(true);
		setError(null);
		try {
			const result = await leaveFn({ data: { sessionId } });
			applyResult(result);
			return true;
		} catch (err) {
			setError(errorMessage(err));
			setCashOutBlocked(true);
			setLeaving(false);
			return false;
		}
	}, [leaveFn, applyResult]);
	const retryCashOut = (0, import_react.useCallback)(() => {
		setCashOutBlocked(false);
		standUp();
	}, [standUp]);
	const meIndex = table.seats.findIndex((seat) => seat?.isMe);
	return {
		table,
		seated,
		busy,
		error,
		leaving,
		cashOutBlocked,
		meIndex,
		legal: meIndex === -1 ? null : legalActions(table, meIndex),
		sitDown,
		standUp,
		act,
		retryCashOut,
		history,
		botLevel
	};
}
var RECENT_LIMIT = 10;
function RecentWinners({ history }) {
	const rows = history.slice(0, RECENT_LIMIT);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-white/10 bg-slate-900/70 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-2 text-sm font-semibold text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4 text-gold-300" }), " Recent winners"]
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs text-slate-500",
			children: "No hands finished yet at this table."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 divide-y divide-white/5",
			children: rows.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 py-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-slate-400",
						children: ["Hand #", entry.handNumber]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-semibold text-slate-100",
						children: entry.winners.map((winner) => winner.name).join(", ") || "No winner"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold tabular-nums text-emerald-300",
						children: ["+", formatChips(entry.winners.reduce((sum, winner) => sum + winner.amount, 0))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[10px] text-slate-500",
						children: entry.winners[0]?.label ?? ""
					})]
				})]
			}, entry.handNumber))
		})]
	});
}
function SitDownPanel({ balance, minBuyIn, maxBuyIn, busy, error, rakePercent, onSit }) {
	const [amount, setAmount] = (0, import_react.useState)(minBuyIn);
	const valid = amount >= minBuyIn && amount <= maxBuyIn && amount <= balance;
	const presets = [
		minBuyIn,
		Math.round((minBuyIn + maxBuyIn) / 2),
		maxBuyIn
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel mx-auto w-full max-w-md animate-modal-in rounded-3xl p-6 shadow-2xl sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Armchair, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold text-white",
					children: "Take a seat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400",
					children: "Choose how many chips to bring to the table."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "buy-in",
						className: "text-xs font-medium uppercase tracking-wider text-slate-400",
						children: "Buy-in amount"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-xl border border-white/10 bg-slate-950 px-4 focus-within:border-gold-400/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400",
							children: "PHP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "buy-in",
							type: "number",
							inputMode: "numeric",
							min: minBuyIn,
							max: maxBuyIn,
							value: amount,
							onChange: (event) => setAmount(Number(event.target.value)),
							className: "w-full bg-transparent px-3 py-3 text-lg font-semibold tabular-nums text-white outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						"aria-label": "Buy-in slider",
						min: minBuyIn,
						max: maxBuyIn,
						step: 1,
						value: amount,
						onChange: (event) => setAmount(Number(event.target.value)),
						className: "w-full accent-gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: presets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAmount(preset),
							className: "rounded-lg border border-white/10 bg-white/5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-gold-400/60 hover:text-gold-300",
							children: formatChips(preset)
						}, preset))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-slate-400",
						children: [
							"Limits: ",
							formatPeso(minBuyIn),
							" to ",
							formatPeso(maxBuyIn),
							". Your wallet balance is",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-slate-200",
								children: formatPeso(balance)
							}),
							". House cut:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-slate-200",
								children: [rakePercent, "%"]
							}),
							" of each pot."
						]
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
				children: error
			}),
			!valid && amount > balance && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-amber-300",
				children: "Your balance is not enough for this buy-in. Cash in first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !valid || busy,
				onClick: () => onSit(amount),
				className: "btn-gold mt-6 w-full rounded-xl py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40",
				children: busy ? "Sitting down..." : "Sit down at the table"
			})
		]
	});
}
var Popover = Popover$1;
var PopoverTrigger = PopoverTrigger$1;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent$1, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = PopoverContent$1.displayName;
/** Speaker button that opens the mute switch and card / chip / table volume sliders. */
function SoundToggle({ className = "" }) {
	const [prefs] = useSoundPrefs();
	const loudest = Math.max(prefs.card, prefs.chip, prefs.table);
	const Icon = prefs.muted || loudest === 0 ? VolumeX : loudest < 50 ? Volume1 : Volume2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Sound settings",
			title: "Sound settings",
			className: `inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-gold/50 hover:text-gold data-[state=open]:border-gold/60 data-[state=open]:text-gold ${className}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl border-gold/25 bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-gold",
				children: "Game sounds"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundControls, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] text-muted-foreground",
				children: "Saved to your account."
			})
		]
	})] });
}
/** Compact wallet: live balance plus small cash-in / withdraw buttons. */
function WalletBar({ playerId, wallet }) {
	const [request, setRequest] = (0, import_react.useState)(null);
	const { player } = wallet;
	const frozen = player?.status === "frozen";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel flex items-center gap-1.5 rounded-full py-1 pl-3 pr-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-3.5 w-3.5 shrink-0 text-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				title: frozen ? "This account is frozen" : "Wallet balance",
				className: "animate-balance-flash text-sm font-bold tabular-nums text-foreground",
				children: player ? formatPeso(player.balance) : "…"
			}, player?.balance ?? "loading"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: frozen,
				onClick: () => setRequest("cash_in"),
				"aria-label": "Recharge",
				title: "Recharge",
				className: "btn-gold ml-1 inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-bold disabled:opacity-40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "h-3.5 w-3.5" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Recharge"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: frozen,
				onClick: () => setRequest("cash_out"),
				"aria-label": "Withdraw",
				title: "Withdraw",
				className: "inline-flex h-7 items-center gap-1 rounded-full border border-border px-2.5 text-xs font-semibold text-foreground transition hover:border-gold/50 hover:text-gold disabled:opacity-40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpFromLine, { className: "h-3.5 w-3.5" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Withdraw"
					})
				]
			}),
			request && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestModal, {
				mode: request,
				playerId,
				balance: player?.balance ?? 0,
				onClose: () => setRequest(null)
			})
		]
	});
}
var STREET_LABELS = {
	preflop: "Pre-flop",
	flop: "Flop",
	turn: "Turn",
	river: "River",
	complete: "Showdown"
};
function TablePage({ player, tableConfig, tableName, tableId, tableRake, onLeaveTable }) {
	const wallet = useWallet(player.id);
	const { settings } = useTableSettings();
	const poker = usePokerTable(player, tableConfig, tableId);
	const { table, legal, meIndex, history } = poker;
	useTableSounds(table, poker.seated);
	const rootRef = (0, import_react.useRef)(null);
	const [fullscreen, setFullscreen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current);
		document.addEventListener("fullscreenchange", onChange);
		return () => document.removeEventListener("fullscreenchange", onChange);
	}, []);
	function toggleFullscreen() {
		if (document.fullscreenElement) document.exitFullscreen();
		else rootRef.current?.requestFullscreen?.().catch(() => void 0);
	}
	const turnKey = table.hand ? `${table.hand.number}-${table.hand.street}-${table.hand.toAct}-${table.hand.currentBet}` : "idle";
	const turnSeat = table.hand?.toAct != null ? table.seats[table.hand.toAct] : null;
	const isMyTurn = meIndex !== -1 && table.hand?.toAct === meIndex;
	const waitingFor = turnSeat && !isMyTurn ? turnSeat.name : null;
	const balance = wallet.player?.balance ?? 0;
	const seatCount = table.seats.filter(Boolean).length;
	const dealer = dealerFor(tableId);
	const streetLabel = table.hand ? STREET_LABELS[table.hand.street] : STREET_LABELS.preflop;
	const myChips = table.seats.find((seat) => seat?.isMe)?.stack ?? 0;
	const rakePercent = effectiveRake(tableRake, settings.rakePercent);
	async function handleStandUp() {
		if (document.fullscreenElement) document.exitFullscreen();
		if (await poker.standUp()) onLeaveTable();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: `flex min-h-[calc(100dvh-4rem)] flex-col gap-3 ${fullscreen ? "bg-ambient overflow-y-auto p-3 sm:p-5" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel relative z-30 flex flex-wrap items-center gap-2 rounded-2xl px-3 py-2 sm:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onLeaveTable,
						"aria-label": "Back to tables",
						className: "inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-gold/50 hover:text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 basis-[calc(100%-3rem)] sm:basis-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-base font-extrabold leading-tight text-foreground sm:text-lg",
							children: tableName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 truncate text-[11px] text-muted-foreground sm:text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3 shrink-0" }),
								poker.seated ? `${Math.min(seatCount, 8)}/8 seated` : "Open",
								" · ",
								formatPeso(tableConfig.smallBlind),
								"/",
								formatPeso(tableConfig.bigBlind),
								" · Rake ",
								rakePercent,
								"%"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletBar, {
						playerId: player.id,
						wallet
					}),
					poker.seated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full border border-live/30 bg-live/10 px-2.5 py-1 text-xs font-bold tabular-nums text-live",
						title: "Chips on the table",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "h-3.5 w-3.5" }),
							" ",
							formatChips(myChips)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleFullscreen,
						"aria-label": fullscreen ? "Exit full screen" : "Full screen",
						title: fullscreen ? "Exit full screen" : "Full screen",
						className: "hidden h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-gold/50 hover:text-gold sm:inline-flex",
						children: fullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-4 w-4" })
					}),
					poker.seated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void handleStandUp(),
						disabled: poker.leaving,
						"aria-label": "Leave table",
						className: "inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-2.5 text-xs font-semibold text-foreground transition hover:border-destructive/60 hover:text-destructive disabled:opacity-50 sm:px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: poker.leaving ? "Leaving…" : "Leave"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex flex-1 items-center justify-center px-1 pb-3 pt-6 sm:px-12 sm:pb-8 sm:pt-20",
				children: poker.seated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PokerTable, {
					table,
					meIndex,
					dealer,
					streetLabel
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitDownPanel, {
					balance,
					minBuyIn: tableConfig.minBuyIn,
					maxBuyIn: tableConfig.maxBuyIn,
					busy: poker.busy,
					error: poker.error,
					rakePercent,
					onSit: (amount) => void poker.sitDown(amount)
				})
			}),
			poker.seated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full max-w-3xl",
				children: poker.cashOutBlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: poker.error ?? "Could not cash out. Please try again." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: poker.retryCashOut,
						className: "rounded-lg bg-destructive/20 px-3 py-1.5 font-semibold hover:bg-destructive/30",
						children: "Try again"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBar, {
					table,
					legal: isMyTurn ? legal : null,
					turnKey,
					onAct: poker.act,
					waitingFor
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-[1fr_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandResultPanel, { result: history[0] ?? null }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentWinners, { history })]
			})
		]
	});
}
function TableRoute() {
	const { table } = Route.useLoaderData();
	const { player } = useAuth();
	const navigate = useNavigate();
	if (!player) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TablePage, {
		player: {
			id: player.id,
			name: player.display_name,
			avatarUrl: player.avatar_url,
			avatarEmoji: player.avatar_emoji
		},
		tableConfig: {
			smallBlind: Number(table.small_blind),
			bigBlind: Number(table.big_blind),
			minBuyIn: Number(table.min_buy_in),
			maxBuyIn: Number(table.max_buy_in)
		},
		tableName: table.name,
		tableId: table.id,
		tableRake: table.rake_percent === null ? null : Number(table.rake_percent),
		onLeaveTable: () => void navigate({ to: "/lobby" })
	}, table.id);
}
//#endregion
export { TableRoute as component };
