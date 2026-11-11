import { r as __toESM } from "../_runtime.mjs";
import { d as isRedSuit, g as rankLabel, h as potTotal, x as suitSymbol } from "./session-D4g7BORC.mjs";
import { n as formatChips } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $ as Bot, K as Crown, W as Eye, l as Trophy, s as UserRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dealers-D-_sVv5g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
function ActionBar({ table, legal, turnKey, onAct, waitingFor }) {
	if (!legal || !table.hand) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-emerald-400" }), waitingFor ? `Waiting for ${waitingFor}...` : "Waiting for the next hand..."]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionControls, {
		table,
		legal,
		turnKey,
		onAct
	}, turnKey);
}
function ActionControls({ table, legal, turnKey, onAct }) {
	const hand = table.hand;
	const pot = potTotal(table);
	const [raiseTo, setRaiseTo] = (0, import_react.useState)(legal.minTo);
	if (!hand) return null;
	const presets = [
		{
			label: "Min",
			value: legal.minTo
		},
		{
			label: "1/2 Pot",
			value: hand.currentBet + Math.round(pot / 2)
		},
		{
			label: "Pot",
			value: hand.currentBet + pot
		},
		{
			label: "All-in",
			value: legal.maxTo
		}
	];
	const callLabel = legal.canCheck ? "Check" : `Call ${formatChips(Math.min(legal.toCall, legal.maxTo))}`;
	const raiseValue = clamp(raiseTo, legal.minTo, legal.maxTo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-panel animate-rise-in space-y-2.5 rounded-2xl p-3 sm:space-y-3 sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full origin-left bg-gold-400",
					style: { animation: `turn-shrink 30s linear forwards` }
				}, turnKey)
			}),
			legal.canRaise && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 sm:space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Raise to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold tabular-nums text-gold-300 sm:text-base",
							children: formatChips(raiseValue)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						"aria-label": "Raise amount",
						min: legal.minTo,
						max: legal.maxTo,
						step: 1,
						value: raiseValue,
						onChange: (event) => setRaiseTo(Number(event.target.value)),
						className: "h-6 w-full accent-amber-400 sm:h-auto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-1.5 sm:gap-2",
						children: presets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRaiseTo(clamp(preset.value, legal.minTo, legal.maxTo)),
							className: "rounded-lg border border-white/10 bg-white/5 px-1 py-1.5 text-[11px] font-medium text-slate-200 transition active:scale-95 hover:border-gold-400/60 hover:text-gold-300 sm:px-2 sm:text-xs",
							children: preset.label
						}, preset.label))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-1.5 sm:gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onAct({ type: "fold" }),
						className: "rounded-xl border border-rose-500/50 bg-rose-500/10 py-2.5 text-sm font-semibold text-rose-300 transition active:scale-95 hover:bg-rose-500/20 sm:py-3",
						children: "Fold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onAct({ type: legal.canCheck ? "check" : "call" }),
						className: "rounded-xl border border-emerald-500/50 bg-emerald-500/15 py-2.5 text-sm font-semibold text-emerald-200 transition active:scale-95 hover:bg-emerald-500/25 sm:py-3",
						children: callLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !legal.canRaise,
						onClick: () => onAct({
							type: "raise",
							to: raiseValue
						}),
						className: "btn-gold rounded-xl py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 sm:py-3",
						children: legal.canRaise ? raiseValue >= legal.maxTo ? "All-in" : "Raise" : "No raise"
					})
				]
			})
		]
	});
}
function PlayingCard({ card, faceDown = false, size = "md", delayMs = 0 }) {
	const dimensions = size === "sm" ? "h-[44px] w-[32px] text-[8px] sm:h-[60px] sm:w-[42px] sm:text-[10px]" : "h-[68px] w-[48px] text-xs sm:h-[84px] sm:w-[60px] sm:text-sm";
	const style = { animationDelay: `${delayMs}ms` };
	if (!card || faceDown) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style,
		className: `${dimensions} animate-deal-in rounded-[5px] border border-gold-500/60 bg-gradient-to-br from-emerald-800 to-emerald-950 shadow-lg shadow-black/50`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "m-[2px] h-[calc(100%-4px)] rounded-[3px] border border-gold-400/25 bg-[repeating-linear-gradient(45deg,rgba(232,192,106,0.10)_0_3px,transparent_3px_6px)]" })
	});
	const color = isRedSuit(card.suit) ? "text-rose-600" : "text-slate-900";
	const label = rankLabel(card.rank);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style,
		className: `${dimensions} ${color} animate-card-flip relative flex flex-col justify-between overflow-hidden rounded-[5px] border border-slate-300/60 bg-gradient-to-br from-white to-slate-50 p-1 shadow-lg shadow-black/40 transition-transform duration-200 hover:-translate-y-1 sm:p-1.5`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.7)_0%,transparent_35%)] opacity-60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start leading-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-black",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] sm:text-xs",
					children: suitSymbol(card.suit)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "self-center text-sm leading-none sm:text-xl",
				children: suitSymbol(card.suit)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rotate-180 flex-col items-start leading-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-black",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] sm:text-xs",
					children: suitSymbol(card.suit)
				})]
			})
		]
	});
}
var BURST = Array.from({ length: 14 }, (_, index) => {
	const angle = index / 14 * Math.PI * 2;
	const distance = 46 + index % 3 * 18;
	return {
		dx: Math.cos(angle) * distance,
		dy: Math.sin(angle) * distance,
		delay: index % 4 * .06,
		size: 4 + index % 3 * 2
	};
});
function WinSparkles() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: "pointer-events-none absolute left-1/2 top-1/2 h-0 w-0",
		children: BURST.map((spark, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `absolute rounded-full ${index % 3 === 0 ? "bg-live" : "bg-gold"}`,
			style: {
				width: spark.size,
				height: spark.size,
				["--dx"]: `${spark.dx}px`,
				["--dy"]: `${spark.dy}px`,
				animation: `sparkle-pop 1.1s ease-out ${spark.delay}s both`
			}
		}, index))
	});
}
function groupPrizes(winners) {
	const byPlayer = /* @__PURE__ */ new Map();
	for (const winner of winners) {
		const key = `${winner.seat}-${winner.name}`;
		const existing = byPlayer.get(key);
		if (existing) {
			existing.amount += winner.amount;
			if (!existing.hands.includes(winner.label)) existing.hands.push(winner.label);
		} else byPlayer.set(key, {
			key,
			name: winner.name,
			avatarUrl: winner.avatarUrl,
			avatarEmoji: winner.avatarEmoji,
			amount: winner.amount,
			hands: [winner.label]
		});
	}
	return [...byPlayer.values()].sort((a, b) => b.amount - a.amount);
}
function HandResultPanel({ result }) {
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center text-sm text-slate-400",
		children: "Results from each hand appear here once the cards are shown."
	});
	const prizes = groupPrizes(result.winners);
	const distributed = prizes.reduce((sum, prize) => sum + prize.amount, 0);
	const topAmount = prizes[0]?.amount ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glow-breathe animate-fade-in overflow-hidden rounded-2xl border border-gold-400/25 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 animate-pot-bump text-gold-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinSparkles, {})]
					}, result.handNumber), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-semibold text-white",
						children: [
							"Hand #",
							result.handNumber,
							" winners"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: result.board.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCard, {
						card,
						size: "sm"
					}, `${card.rank}${card.suit}-${index}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 p-5",
				children: prizes.map((prize, index) => {
					const share = Math.round(prize.amount / Math.max(1, distributed) * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `animate-rise-in rounded-xl border border-white/10 bg-white/[0.03] p-3 ${index === 0 ? "shine-sweep" : ""}`,
						style: { animationDelay: `${index * .08}s` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-800 ring-2 ring-gold-400/40",
									children: [prize.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: prize.avatarUrl,
										alt: prize.name,
										className: "h-full w-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: prize.avatarEmoji
									}), index === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "absolute -right-1 -top-1 h-4 w-4 text-gold-300" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-semibold text-white",
										children: prize.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-gold-300",
										children: prize.hands.join(" · ")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg font-bold tabular-nums text-emerald-300",
										children: ["+", formatChips(prize.amount)]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] tabular-nums text-slate-400",
										children: [share, "% of prize"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-1.5 overflow-hidden rounded-full bg-white/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-300 transition-all duration-700",
								style: { width: `${Math.max(6, prize.amount / topAmount * 100)}%` }
							})
						})]
					}, prize.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-black/20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pot",
						value: formatChips(result.pot)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "House rake",
						value: formatChips(result.rake)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Paid out",
						value: formatChips(distributed)
					})
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-sm font-semibold tabular-nums text-slate-100",
			children: value
		})]
	});
}
var CHIP_DENOMINATIONS = [
	{
		value: 1e3,
		color: "gold"
	},
	{
		value: 500,
		color: "purple"
	},
	{
		value: 100,
		color: "black"
	},
	{
		value: 25,
		color: "green"
	},
	{
		value: 5,
		color: "red"
	},
	{
		value: 1,
		color: "white"
	},
	{
		value: .5,
		color: "blue"
	}
];
var MAX_COLUMNS = 3;
var MAX_PER_COLUMN = 6;
/** Splits an amount into stacks of real chip values, like a dealer would, showing the largest few stacks. */
function chipColumns(amount) {
	let rest = Math.round(Math.max(0, amount) * 100) / 100;
	const columns = [];
	for (const { value, color } of CHIP_DENOMINATIONS) {
		const count = Math.floor(rest / value + 1e-9);
		if (count > 0) {
			columns.push({
				value,
				color,
				count: Math.min(count, MAX_PER_COLUMN)
			});
			rest = Math.round((rest - count * value) * 100) / 100;
		}
		if (columns.length === MAX_COLUMNS) break;
	}
	return columns.length > 0 ? columns : [{
		value: .5,
		color: "blue",
		count: 1
	}];
}
/** Edge-spot colour on each clay colour: cream spots, except on white chips which get blue spots. */
var SPOT = {
	white: "var(--chip-blue)",
	red: "var(--chip-inlay)",
	green: "var(--chip-inlay)",
	black: "var(--chip-inlay)",
	purple: "var(--chip-inlay)",
	gold: "var(--chip-black)",
	blue: "var(--chip-inlay)"
};
var RX = 12;
var RY = 5;
var EDGE = 3.2;
var SPOT_ANGLES = [
	-75,
	-45,
	-15,
	15,
	45,
	75
];
/** A single stack of real-looking clay chips: striped edges, inlaid face and a soft shadow. */
function ChipColumnSvg({ color, count, offset }) {
	const id = (0, import_react.useId)().replace(/:/g, "");
	const width = 26;
	const height = 10 + EDGE * count + 3;
	const cx = width / 2;
	const clay = `var(--chip-${color})`;
	const spot = SPOT[color];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${width} ${height}`,
		className: "h-auto w-[18px] drop-shadow-[0_1px_1px_oklch(0_0_0/0.6)] sm:w-[22px]",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `${id}-side`,
				x1: "0",
				x2: "1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "var(--chip-shade)",
						stopOpacity: "0.45"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.35",
						stopColor: "var(--chip-shade)",
						stopOpacity: "0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.7",
						stopColor: "var(--chip-shade)",
						stopOpacity: "0.1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "var(--chip-shade)",
						stopOpacity: "0.5"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: `${id}-face`,
				cx: "0.35",
				cy: "0.3",
				r: "0.8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "var(--chip-inlay)",
						stopOpacity: "0.35"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.6",
						stopColor: "var(--chip-inlay)",
						stopOpacity: "0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "var(--chip-shade)",
						stopOpacity: "0.25"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx,
				cy: height - RY - .5,
				rx: 12.5,
				ry: RY,
				fill: "var(--chip-shade)",
				opacity: "0.35"
			}),
			Array.from({ length: count }).map((_, i) => {
				const top = height - RY - 2 - EDGE * (i + 1);
				const turn = (i * 23 + offset * 11) % 30;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx,
						cy: top + EDGE,
						rx: RX,
						ry: RY,
						fill: clay
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 1,
						y: top,
						width: 24,
						height: EDGE,
						fill: clay
					}),
					SPOT_ANGLES.map((angle) => {
						const a = (angle + turn) * Math.PI / 180;
						const w = 3.4 * Math.cos(a);
						if (w < .6) return null;
						const x = cx + RX * Math.sin(a) - w / 2;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x,
							y: top + .2,
							width: w,
							height: 2.8000000000000003,
							fill: spot
						}, angle);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 1,
						y: top,
						width: 24,
						height: EDGE,
						fill: `url(#${id}-side)`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx,
						cy: top + EDGE,
						rx: RX,
						ry: RY,
						fill: "none",
						stroke: "var(--chip-shade)",
						strokeOpacity: "0.35",
						strokeWidth: "0.4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx,
						cy: top,
						rx: RX,
						ry: RY,
						fill: clay
					}),
					i === count - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx,
							cy: top,
							rx: 10.7,
							ry: 4.45,
							fill: "none",
							stroke: spot,
							strokeWidth: "1.6",
							strokeDasharray: "3.2 3.6",
							strokeDashoffset: turn / 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx,
							cy: top,
							rx: 8,
							ry: 3.3,
							fill: clay,
							stroke: spot,
							strokeWidth: "0.45"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx,
							cy: top,
							rx: 6.4,
							ry: 2.65,
							fill: "none",
							stroke: spot,
							strokeOpacity: "0.7",
							strokeWidth: "0.35",
							strokeDasharray: "0.8 0.8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx,
							cy: top,
							rx: RX,
							ry: RY,
							fill: `url(#${id}-face)`
						})
					] })
				] }, i);
			})
		]
	});
}
function ChipStack({ amount, label }) {
	const columns = chipColumns(amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-1 animate-chip-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end",
			children: columns.map((column, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index > 0 ? "-ml-1.5" : void 0,
				style: { zIndex: columns.length - index },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipColumnSvg, {
					color: column.color,
					count: column.count,
					offset: index
				})
			}, column.value))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "rounded-full border border-gold/30 bg-room/85 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-foreground shadow-sm sm:px-2 sm:text-xs",
			children: [label ? `${label} ` : "", formatChips(amount)]
		})]
	});
}
var TONES = [
	"from-sky-500 to-sky-800",
	"from-emerald-500 to-emerald-800",
	"from-amber-400 to-amber-700",
	"from-rose-500 to-rose-800",
	"from-cyan-500 to-cyan-800",
	"from-orange-400 to-orange-700",
	"from-teal-400 to-teal-700",
	"from-slate-400 to-slate-700"
];
function SeatView({ seat, isDealer, isTurn, isWinner, isYou, revealCards, statusLabel }) {
	const [brokenAvatar, setBrokenAvatar] = (0, import_react.useState)(false);
	const showFace = seat.isMe || revealCards;
	const ring = isWinner ? "animate-winner-glow" : isTurn ? "animate-turn-pulse" : "";
	const visibleCards = seat.hole.length > 0 && !seat.folded;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex flex-col items-center gap-1 ${seat.folded ? "opacity-50" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex h-9 items-end justify-center gap-0.5 sm:h-11",
			children: visibleCards && seat.hole.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index === 0 ? "-rotate-6" : "rotate-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCard, {
					size: "sm",
					card: showFace ? card : void 0,
					faceDown: !showFace,
					delayMs: index * 80
				})
			}, index))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative flex w-[68px] flex-col items-center rounded-xl border px-1.5 pb-1.5 pt-2.5 shadow-lg transition-all duration-300 sm:w-[88px] sm:rounded-2xl sm:px-2 sm:pb-2 sm:pt-3 ${ring} ${isYou ? "border-gold-400/60 bg-gradient-to-b from-slate-800/95 to-slate-950/95 ring-1 ring-gold-400/40" : "border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-950/95"} ${seat.sittingOut ? "border-dashed border-white/15" : ""}`,
			children: [
				isDealer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					title: "Dealer button",
					className: "absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold/70 bg-foreground text-[9px] font-black text-background shadow-[0_3px_8px_rgba(0,0,0,0.6)] sm:h-6 sm:w-6 sm:text-[10px]",
					children: "D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `-mt-5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${TONES[seat.tone % TONES.length]} text-xs font-bold text-white ring-2 ring-white/20 shadow-md sm:h-11 sm:w-11 sm:text-sm`,
					children: seat.avatarUrl && !brokenAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: seat.avatarUrl,
						alt: seat.name,
						onError: () => setBrokenAvatar(true),
						className: "h-full w-full rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base sm:text-lg",
						children: seat.avatarEmoji
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-0.5 flex max-w-full items-center gap-0.5 sm:gap-1",
					children: [seat.isBot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-2.5 w-2.5 shrink-0 text-slate-400 sm:h-3 sm:w-3" }) : seat.sittingOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-2.5 w-2.5 shrink-0 text-slate-400 sm:h-3 sm:w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-2.5 w-2.5 shrink-0 text-gold-300 sm:h-3 sm:w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-[9px] font-semibold text-white sm:text-xs",
						children: isYou ? "You" : seat.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold tabular-nums text-emerald-300 sm:text-[11px]",
					children: seat.sittingOut ? "Sitting out" : formatChips(seat.stack)
				}),
				statusLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-slate-200 sm:px-2 sm:text-[9px]",
					children: statusLabel
				})
			]
		})]
	});
}
var SEAT_LAYOUT = [
	{
		x: 38,
		y: 95
	},
	{
		x: 62,
		y: 95
	},
	{
		x: 86,
		y: 87
	},
	{
		x: 97,
		y: 50
	},
	{
		x: 80,
		y: 8
	},
	{
		x: 20,
		y: 8
	},
	{
		x: 3,
		y: 50
	},
	{
		x: 14,
		y: 87
	}
];
var PORTRAIT_SEAT_LAYOUT = [
	{
		x: 34,
		y: 87.5
	},
	{
		x: 66,
		y: 87.5
	},
	{
		x: 87,
		y: 67
	},
	{
		x: 87,
		y: 41.5
	},
	{
		x: 76,
		y: 15
	},
	{
		x: 24,
		y: 15
	},
	{
		x: 13,
		y: 41.5
	},
	{
		x: 13,
		y: 67
	}
];
var PORTRAIT_BETS = [
	{
		x: 39,
		y: 73
	},
	{
		x: 61,
		y: 73
	},
	{
		x: 81,
		y: 79
	},
	{
		x: 87,
		y: 54
	},
	{
		x: 66,
		y: 28
	},
	{
		x: 34,
		y: 28
	},
	{
		x: 13,
		y: 54
	},
	{
		x: 19,
		y: 79
	}
];
var MIN_RATIO = 2;
var MAX_RATIO = 2.6;
var MAX_WIDTH = 1400;
var MIN_HEIGHT = 340;
/** Reserved for the top bar, action bar and spacing below the table. */
var RESERVED_HEIGHT = 250;
function computeTableSize(available, viewportHeight) {
	if (available < 640) return {
		width: 0,
		height: 0,
		scale: Math.min(1, Math.max(.8, available / 400))
	};
	let width = Math.min(available, MAX_WIDTH);
	const maxHeight = Math.max(MIN_HEIGHT, viewportHeight - RESERVED_HEIGHT);
	const height = Math.min(width / MIN_RATIO, maxHeight);
	if (width / height > MAX_RATIO) width = height * MAX_RATIO;
	const scale = Math.min(1.08, Math.max(.72, height / 440));
	return {
		width: Math.round(width),
		height: Math.round(height),
		scale: Number(scale.toFixed(3))
	};
}
function useTableSize() {
	const ref = (0, import_react.useRef)(null);
	const [size, setSize] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const element = ref.current?.parentElement;
		if (!element) return;
		const update = () => {
			const style = window.getComputedStyle(element);
			const available = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
			setSize(computeTableSize(available, window.innerHeight));
		};
		update();
		const observer = new ResizeObserver(update);
		observer.observe(element);
		window.addEventListener("resize", update);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", update);
		};
	}, []);
	return {
		ref,
		size
	};
}
function Scaled({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { scale: "var(--seat-scale, 1)" },
		children
	});
}
var BET_RATIO = .5;
var SPOT_RATIO = .36;
var RAIL_INLAYS = [
	{
		x: 30,
		y: 3.1,
		vertical: true
	},
	{
		x: 70,
		y: 3.1,
		vertical: true
	},
	{
		x: 30,
		y: 96.9,
		vertical: true
	},
	{
		x: 70,
		y: 96.9,
		vertical: true
	},
	{
		x: 1.6,
		y: 50,
		vertical: false
	},
	{
		x: 98.4,
		y: 50,
		vertical: false
	}
];
function statusFor(seat, hand) {
	if (seat.sittingOut) return null;
	if (!hand || hand.street === "complete") return null;
	if (seat.folded) return "Folded";
	if (seat.allIn) return "All-in";
	return null;
}
var CHIP_RACK = [
	"red",
	"blue",
	"green",
	"gold",
	"black"
];
function PokerTable({ table, meIndex, dealer, streetLabel }) {
	const hand = table.hand;
	const pot = potTotal(table);
	const finished = hand?.street === "complete";
	const revealCards = !!hand?.showdown && finished;
	const isDealing = hand?.street === "preflop" && hand.board.length === 0 && !!hand.toAct;
	const winnerSeats = new Set(hand?.winners.map((award) => award.seat) ?? []);
	const seatCount = table.seats.filter(Boolean).length;
	const { ref, size } = useTableSize();
	const wide = !!size && size.width > 0;
	const layout = wide ? SEAT_LAYOUT : PORTRAIT_SEAT_LAYOUT;
	const sizeStyle = size ? {
		...wide ? {
			width: size.width,
			height: size.height
		} : {},
		"--seat-scale": size.scale
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		style: sizeStyle,
		className: `relative mx-auto ${wide ? "" : "aspect-[3/4] w-full max-w-md"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-[4%] -bottom-[4%] h-[18%] rounded-full bg-black/70 blur-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "table-rail absolute inset-0 rounded-full" }),
			RAIL_INLAYS.map((inlay) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: `pointer-events-none absolute z-[1] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-[image:var(--gradient-gold)] shadow-[0_0_6px_color-mix(in_oklab,var(--gold)_60%,transparent)] ${wide ? "block" : ""} ${inlay.vertical ? "h-[4.2%] w-[3px]" : "h-[3px] w-[2.1%]"}`,
				style: {
					left: `${inlay.x}%`,
					top: `${inlay.y}%`
				}
			}, `${inlay.x}-${inlay.y}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[6.2%] rounded-full bg-[image:var(--gradient-gold)] opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "felt-texture absolute inset-[6.6%] rounded-full shadow-[inset_0_0_90px_rgba(0,0,0,0.6),inset_0_3px_0_rgba(255,255,255,0.06)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-[6.6%] animate-spotlight rounded-full bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,240,200,0.16),transparent_60%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute rounded-full border-2 border-foreground/25 ${wide ? "inset-x-[17%] inset-y-[20%]" : "inset-x-[24%] inset-y-[25%]"}` }),
			SEAT_LAYOUT.map((position, index) => {
				const x = position.x + (50 - position.x) * SPOT_RATIO;
				const y = position.y + (50 - position.y) * SPOT_RATIO;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-hidden": true,
					className: `pointer-events-none absolute z-[2] -translate-x-1/2 -translate-y-1/2 gap-1 ${wide ? "flex" : "hidden"}`,
					style: {
						left: `${x}%`,
						top: `${y}%`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-[34px] w-[24px] rounded-[4px] border-2 border-foreground/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-[34px] w-[24px] rounded-[4px] border-2 border-foreground/20" })]
				}, `spot-${index}`);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `pointer-events-none absolute left-1/2 z-[15] -translate-x-1/2 ${wide ? "top-[-11%] h-[38%]" : "top-[-3%] w-[22%]"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: dealer.avatarUrl,
					alt: `Dealer ${dealer.name}`,
					width: 569,
					height: 640,
					className: `${wide ? "h-full w-auto" : "h-auto w-full"} drop-shadow-[0_14px_18px_rgba(0,0,0,0.6)] transition-transform duration-500 ${isDealing ? "animate-dealer-deal" : ""}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gold/60 bg-wood-deep/95 px-2 py-0.5 font-display font-bold uppercase tracking-[0.25em] text-gold shadow-lg ${wide ? "text-[10px]" : "text-[8px]"}`,
					children: wide ? `Dealer · ${dealer.name}` : dealer.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `pointer-events-none absolute left-[17%] top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 ${wide ? "block" : "hidden"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block text-center font-display text-[clamp(10px,1.2vw,17px)] font-extrabold uppercase leading-tight tracking-[0.25em] text-gold/45",
					children: [
						"Master",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Poker"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-1/2 top-[48%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2",
				style: { scale: "var(--seat-scale, 1)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-black/45 px-3 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-50/80 sm:text-[10px]",
						children: hand && !finished ? streetLabel : hand ? "Showdown" : `${seatCount} seated`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 p-1.5 sm:gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `mr-3 flex-col items-center gap-1 ${wide ? "flex" : "hidden"}`,
								"aria-hidden": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-end gap-[2px] rounded-md border border-gold/30 bg-wood-deep/70 p-1 shadow-inner",
									children: CHIP_RACK.map((color, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipColumnSvg, {
										color,
										count: 4,
										offset: index
									}, color))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7 w-7 items-center justify-center rounded-full border-2 border-foreground/70 bg-foreground text-[6px] font-black uppercase tracking-tight text-background shadow-lg",
									children: "Dealer"
								})]
							}),
							Array.from({ length: 5 }).map((_, index) => {
								const card = hand?.board[index];
								return card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCard, {
									card,
									size: "sm",
									delayMs: index * 140
								}, `${hand?.number}-${index}-${card.rank}${card.suit}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[44px] w-[32px] rounded-md border-2 border-foreground/25 sm:h-[60px] sm:w-[42px]" }, `slot-${index}`);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `ml-3 items-end gap-2 ${wide ? "flex" : "hidden"}`,
								"aria-hidden": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-[60px] w-[42px]",
									children: [
										3,
										2,
										1,
										0
									].map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute",
										style: {
											left: layer * 1.2,
											top: -layer * 1.2
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCard, {
											faceDown: true,
											size: "sm"
										})
									}, layer))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-[60px] w-[42px] opacity-80",
									children: [
										0,
										1,
										2
									].map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0",
										style: { transform: `rotate(${layer * 9 - 9}deg)` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCard, {
											faceDown: true,
											size: "sm"
										})
									}, layer))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-0.5",
						children: [
							pot > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipStack, { amount: pot }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "animate-pot-bump rounded-full border border-gold-400/40 bg-black/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-gold-300 shadow-[0_0_24px_rgba(232,192,106,0.25)] sm:text-xs",
								children: ["Pot ", formatChips(pot)]
							}, pot),
							finished && hand && hand.rake > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[9px] uppercase tracking-wider text-emerald-50/60 sm:text-[10px]",
								children: ["Rake ", formatChips(hand.rake)]
							})
						]
					})
				]
			}),
			table.seats.slice(0, layout.length).map((seat, index) => {
				if (!seat || !hand || finished || seat.bet <= 0) return null;
				const position = layout[index];
				const portraitBet = PORTRAIT_BETS[index];
				const x = wide || !portraitBet ? position.x + (50 - position.x) * BET_RATIO : portraitBet.x;
				const y = wide || !portraitBet ? position.y + (50 - position.y) * BET_RATIO : portraitBet.y;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute z-15 -translate-x-1/2 -translate-y-1/2",
					style: {
						left: `${x}%`,
						top: `${y}%`
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scaled, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipStack, { amount: seat.bet }) })
				}, `bet-${hand.number}-${hand.street}-${index}-${seat.bet}`);
			}),
			table.seats.slice(0, layout.length).map((seat, index) => {
				const position = layout[index];
				if (!seat) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute z-10 -translate-x-1/2 -translate-y-1/2",
					style: {
						left: `${position.x}%`,
						top: `${position.y}%`
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scaled, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-16 flex-col items-center gap-1 opacity-40 sm:w-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-foreground/25 bg-black/30 sm:h-10 sm:w-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3 text-foreground/40 sm:h-4 sm:w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-foreground/40 sm:text-[9px]",
							children: "Open"
						})]
					}) })
				}, `empty-${index}`);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute z-20 -translate-x-1/2 -translate-y-1/2 animate-seat-in",
					style: {
						left: `${position.x}%`,
						top: `${position.y}%`,
						animationDelay: `${index * 60}ms`
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scaled, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatView, {
						seat,
						isDealer: table.dealer === index,
						isTurn: hand?.toAct === index,
						isWinner: winnerSeats.has(index),
						revealCards: revealCards && !seat.folded,
						statusLabel: statusFor(seat, hand),
						isYou: index === meIndex
					}) })
				}, `${seat.id}-${index}`);
			})
		]
	});
}
var dealer_female_default = "/assets/dealer-female-CwSXySh4.png";
var dealer_male_default = "/assets/dealer-male-y7-nJEep.png";
var DEALER_PERSONAS = [
	{
		name: "Rico",
		avatarUrl: dealer_male_default,
		tagline: "Keeps the game fast and the pot honest."
	},
	{
		name: "Bianca",
		avatarUrl: dealer_female_default,
		tagline: "Eagle-eyed — no chip slide gets past her."
	},
	{
		name: "Marco",
		avatarUrl: dealer_male_default,
		tagline: "Steady hands, calm voice, reads the table."
	},
	{
		name: "Lara",
		avatarUrl: dealer_female_default,
		tagline: "Sharp dresser, sharper eyes."
	},
	{
		name: "Tomas",
		avatarUrl: dealer_male_default,
		tagline: "Tournament veteran who never misses a bet."
	},
	{
		name: "Nina",
		avatarUrl: dealer_female_default,
		tagline: "Cool under pressure, fair to every player."
	}
];
function dealerFor(tableId) {
	let hash = 0;
	for (const char of tableId) hash = hash * 31 + char.charCodeAt(0) >>> 0;
	return DEALER_PERSONAS[hash % DEALER_PERSONAS.length];
}
//#endregion
export { dealerFor as i, HandResultPanel as n, PokerTable as r, ActionBar as t };
