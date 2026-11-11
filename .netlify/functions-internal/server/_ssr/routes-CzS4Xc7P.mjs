import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as QrCode, G as Download, U as Gift, _ as ShieldCheck, l as Trophy, m as Spade, nt as ArrowRight, o as Users } from "../_libs/lucide-react.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./useAuth-BRiQAX8u.mjs";
import { t as FloatingSuits } from "./FloatingSuits-CJ6WQyVh.mjs";
import { t as master_poker_hero_jpg_asset_default } from "./master-poker-hero.jpg.asset-CByH3_u4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CzS4Xc7P.js
var import_jsx_runtime = require_jsx_runtime();
var CARDS = [
	{
		rank: "A",
		suit: "♠",
		red: false
	},
	{
		rank: "K",
		suit: "♥",
		red: true
	},
	{
		rank: "Q",
		suit: "♦",
		red: true
	},
	{
		rank: "J",
		suit: "♣",
		red: false
	},
	{
		rank: "10",
		suit: "♠",
		red: false
	}
];
function CardFan({ className = "relative" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: `group pointer-events-auto h-36 w-56 ${className}`,
		children: CARDS.map((card, index) => {
			const angle = (index - 2) * 11;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-1/2 h-32 w-[5.5rem] origin-bottom transition-transform duration-500",
				style: {
					marginLeft: "-2.75rem",
					transform: `rotate(${angle}deg)`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full w-full",
					style: { animation: `float 6s ease-in-out ${index * .3}s infinite` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full w-full flex-col justify-between rounded-xl border border-gold/40 bg-foreground p-2 shadow-[0_14px_30px_-10px_oklch(0_0_0/80%)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `font-display text-lg font-black leading-none ${card.red ? "text-burgundy" : "text-background"}`,
							children: [card.rank, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-base",
								children: card.suit
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `self-end font-display text-3xl leading-none ${card.red ? "text-burgundy" : "text-background"}`,
							children: card.suit
						})]
					})
				})
			}, card.rank + card.suit);
		})
	});
}
var FEATURES = [
	{
		icon: Gift,
		title: "₱20 welcome bonus",
		text: "Free credit in your wallet the first time you sign in."
	},
	{
		icon: QrCode,
		title: "Scan to recharge",
		text: "Scan our QR with GCash, Maya or any bank app, upload your receipt."
	},
	{
		icon: Users,
		title: "Invite friends",
		text: "Every player gets a personal 8-character referral code."
	},
	{
		icon: ShieldCheck,
		title: "Fair tables",
		text: "Every table plays the same rules. Every payment is reviewed and logged."
	}
];
var APP_DOWNLOAD_URL = "https://www.mediafire.com/file/0gsax22io7t0zza/KareraQueen_release_v1.0.3.aab/file";
var STAKES = [
	"₱0.50 / ₱1",
	"₱1 / ₱2",
	"₱2.50 / ₱5",
	"₱5 / ₱10",
	"₱10 / ₱20",
	"₱25 / ₱50",
	"₱50 / ₱100",
	"₱100 / ₱200",
	"₱500 / ₱1000"
];
function Index() {
	const { user, loading } = useAuth();
	const signedIn = !loading && Boolean(user);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ambient min-h-screen overflow-x-hidden text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingSuits, { intensity: .14 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative isolate overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: master_poker_hero_jpg_asset_default.url,
						alt: "",
						"aria-hidden": true,
						className: "absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-30 blur-md"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-gradient-to-b from-room/40 via-room/75 to-room" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid min-h-[86vh] max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "order-2 lg:order-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex w-fit animate-rise-in items-center gap-2 rounded-full border border-live/30 bg-live/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-live",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-live-ping rounded-full bg-live" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-live" })]
									}), "Tables live now"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-6 animate-rise-in font-display text-5xl font-black leading-[1.02] sm:text-7xl",
									style: { animationDelay: "0.1s" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold-shimmer",
										children: "Master Poker"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 animate-rise-in font-display text-sm font-semibold uppercase tracking-[0.4em] text-gold-300",
									style: { animationDelay: "0.15s" },
									children: "Strategy · Skill · Victory"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 max-w-xl animate-rise-in text-lg text-slate-300",
									style: { animationDelay: "0.2s" },
									children: [
										"Texas Hold’em with a real peso wallet. Create your account in seconds and get",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-gold",
											children: "₱20 free"
										}),
										" to start playing."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-9 flex animate-rise-in flex-wrap gap-3",
									style: { animationDelay: "0.3s" },
									children: [signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/lobby",
										className: "btn-gold inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold",
										children: ["Go to the tables ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										className: "btn-gold inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold",
										children: ["Create account · get ₱20 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										className: "rounded-xl border border-gold/40 bg-room/40 px-7 py-3.5 text-sm font-semibold text-gold-300 backdrop-blur transition hover:border-gold hover:text-gold",
										children: "Sign in"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: APP_DOWNLOAD_URL,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-2 rounded-xl border border-live/40 bg-live/10 px-7 py-3.5 text-sm font-semibold text-live backdrop-blur transition hover:border-live hover:bg-live/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download the app"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative order-1 animate-rise-in lg:order-2",
							style: { animationDelay: "0.05s" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFan, { className: "absolute -bottom-14 -left-10 z-10 hidden scale-90 md:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "absolute -right-3 -top-5 z-10 hidden gap-1 md:flex",
									children: [
										"bg-chip-red",
										"bg-chip-black",
										"bg-chip-gold"
									].map((tone, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `animate-chip-hop h-9 w-9 rounded-full border-4 border-dashed border-chip-inlay/80 ${tone} shadow-lg`,
										style: { animationDelay: `${index * .35}s` }
									}, tone))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-spin rounded-3xl p-1.5 shadow-2xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: master_poker_hero_jpg_asset_default.url,
										alt: "Master Poker emblem: a golden crowned M with two aces on stacks of poker chips",
										width: 1408,
										height: 768,
										className: "w-full rounded-[1.25rem] object-cover"
									})
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative border-y border-gold/20 bg-wood-deep/70 py-3 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-semibold text-slate-300",
					children: [...STAKES, ...STAKES].map((stake, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: [
									"♠",
									"♥",
									"♦",
									"♣"
								][index % 4]
							}),
							" ",
							stake,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase tracking-widest text-live",
								children: "open"
							})
						]
					}, index))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-10 max-w-md text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold text-gold-300",
						children: "Why players choose us"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule mx-auto mt-4 w-40" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: FEATURES.map(({ icon: Icon, title, text }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel card-lift shine-sweep group animate-rise-in rounded-2xl p-6",
						style: {
							animationDelay: `${.1 * index + .2}s`,
							["--shine-delay"]: `${index * 1.2}s`
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold transition duration-300 group-hover:rotate-6 group-hover:scale-110",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-lg font-bold text-white",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate-400",
								children: text
							})
						]
					}, title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-gold/15 py-8 text-center text-xs text-slate-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spade, { className: "h-3.5 w-3.5 text-gold" }),
						" Master Poker ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3.5 w-3.5 text-gold" })
					]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
