import { r as __toESM } from "../_runtime.mjs";
import { x as fetchPokerTables } from "./api-DH6oy-PM.mjs";
import { a as methodLabel, i as formatPeso, o as transactionTypeLabel, r as formatDateTime, t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as Image, L as Loader, it as ArrowDownToLine, l as Trophy, n as Wallet, o as Users, tt as ArrowUpFromLine } from "../_libs/lucide-react.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./useAuth-BRiQAX8u.mjs";
import { n as useWallet, t as RequestModal } from "./useWallet-QjkQKyog.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lobby-DWOIrRLa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_STYLES = {
	pending: "bg-amber-400/15 text-amber-300",
	approved: "bg-emerald-400/15 text-emerald-300",
	rejected: "bg-rose-400/15 text-rose-300"
};
function TransactionList({ transactions }) {
	if (transactions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-slate-500",
		children: "No requests yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-white/5",
		children: transactions.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center justify-between gap-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-white",
						children: [
							transactionTypeLabel(row.type),
							" · ",
							formatPeso(row.amount)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-slate-500",
						children: [
							methodLabel(row.method),
							" · ",
							formatDateTime(row.created_at)
						]
					}),
					row.admin_note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-slate-400",
						children: ["Note: ", row.admin_note]
					}),
					row.proof_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 inline-flex items-center gap-1 text-xs text-emerald-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3 w-3" }), " Proof uploaded"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[row.status]}`,
				children: row.status
			})]
		}, row.id))
	});
}
function WalletCard({ playerId, wallet }) {
	const [request, setRequest] = (0, import_react.useState)(null);
	const { player, transactions } = wallet;
	const frozen = player?.status === "frozen";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-felt-700 via-felt-800 to-slate-950 p-6 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/10 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-emerald-100/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-widest",
							children: "Wallet balance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 animate-balance-flash text-3xl font-bold tabular-nums text-white",
						children: player ? formatPeso(player.balance) : "Loading..."
					}, player?.balance ?? "loading"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-emerald-100/60",
						children: frozen ? "This account is frozen. Contact support." : "Updates live when the admin approves a request."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: frozen,
							onClick: () => setRequest("cash_in"),
							className: "btn-gold inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "h-4 w-4" }), "Recharge"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: frozen,
							onClick: () => setRequest("cash_out"),
							className: "inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.98] disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpFromLine, { className: "h-4 w-4" }), "Withdraw"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel rounded-3xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold text-gold-300",
					children: "Wallet history"
				}), wallet.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-rose-300",
					children: wallet.error
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionList, { transactions })]
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
function TableLobby({ balance, onSelect, onTournament }) {
	const [tables, setTables] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetchPokerTables().then((rows) => {
			setTables(rows);
			setError(null);
		}).catch((err) => setError(errorMessage(err))).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center py-20 text-slate-400",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "mr-2 h-5 w-5 animate-spin" }), " Loading tables..."]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
		children: error
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold text-white",
				children: "Choose a Table"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-slate-400",
				children: [
					"Pick a table that fits your budget. Your wallet balance is",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-gold-300",
						children: formatPeso(balance)
					}),
					"."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onTournament,
				className: "border-spin card-lift group flex w-full animate-rise-in items-center gap-4 rounded-2xl p-5 text-left shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 shrink-0 animate-float items-center justify-center rounded-xl bg-gold/15 text-gold transition group-hover:scale-110",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold text-white",
							children: "Sit & Go Tournament"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-400",
							children: "8 players. Rising blinds. Last one standing wins. Free entry with play chips."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-sm font-semibold text-gold-300 transition group-hover:translate-x-1",
						children: "Join →"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: tables.map((table, index) => {
					const canAfford = balance >= table.min_buy_in;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						style: {
							animationDelay: `${index * .05 + .1}s`,
							["--shine-delay"]: `${index % 6 * .9}s`
						},
						disabled: !canAfford,
						onClick: () => onSelect({
							table,
							config: {
								smallBlind: Number(table.small_blind),
								bigBlind: Number(table.big_blind),
								minBuyIn: Number(table.min_buy_in),
								maxBuyIn: Number(table.max_buy_in)
							}
						}),
						className: `group relative animate-rise-in overflow-hidden rounded-2xl p-5 text-left ${canAfford ? "glass-panel card-lift shine-sweep" : "glass-panel opacity-50"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "pointer-events-none absolute -right-6 -top-8 font-display text-8xl font-extrabold text-foreground/[0.04] transition duration-500 group-hover:-rotate-12 group-hover:text-gold/10",
								children: [
									"♠",
									"♥",
									"♦",
									"♣"
								][index % 4]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl font-extrabold text-white",
									children: table.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-live/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-live",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-2.5 items-end gap-[2px]",
											children: [
												0,
												1,
												2
											].map((bar) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "animate-equalizer h-full w-[2px] rounded-full bg-live",
												style: { animationDelay: `${bar * .18 + index * .05}s` }
											}, bar))
										}),
										" ",
										"Live",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "ml-0.5 h-3 w-3" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-1 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400",
											children: "Min bet"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold tabular-nums text-gold-300",
											children: formatPeso(Number(table.min_bet))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400",
											children: "Blinds"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium tabular-nums text-slate-200",
											children: [
												formatPeso(Number(table.small_blind)),
												" / ",
												formatPeso(Number(table.big_blind))
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400",
											children: "Buy-in"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium tabular-nums text-slate-200",
											children: [
												formatPeso(Number(table.min_buy_in)),
												" – ",
												formatPeso(Number(table.max_buy_in))
											]
										})]
									})
								]
							}),
							!canAfford && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-amber-300",
								children: "Your balance is too low for this table."
							})
						]
					}, table.id);
				})
			})
		]
	});
}
function LobbyWallet({ playerId }) {
	const wallet = useWallet(playerId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCard, {
		playerId,
		wallet
	});
}
function LobbyRoute() {
	const { player } = useAuth();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_320px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableLobby, {
			balance: player?.balance ?? 0,
			onSelect: ({ table }) => void navigate({
				to: "/table/$tableId",
				params: { tableId: table.id }
			}),
			onTournament: () => void navigate({ to: "/tournament" })
		}), player && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "order-first h-fit lg:sticky lg:top-24 lg:order-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LobbyWallet, { playerId: player.id })
		})]
	});
}
//#endregion
export { LobbyRoute as component };
