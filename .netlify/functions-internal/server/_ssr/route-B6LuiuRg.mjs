import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DQTJBoLu.mjs";
import { m as fetchIsAdmin } from "./api-Cf0drsAo.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as RefreshCw, L as Loader, N as LogOut, _ as ShieldCheck, b as Settings, l as Trophy, u as TriangleAlert } from "../_libs/lucide-react.mjs";
import { b as Link, g as Outlet, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./useAuth-D_f7uHyK.mjs";
import { t as FloatingSuits } from "./FloatingSuits-CJ6WQyVh.mjs";
import { i as normalizeSoundPrefs, l as setSoundPrefs, n as getSoundPrefs, s as sameSoundPrefs, u as subscribeSound } from "./sounds-vUSvDDZ3.mjs";
import { n as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-B6LuiuRg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_BASE = "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition sm:px-3";
var NAV_IDLE = `${NAV_BASE} text-slate-400 hover:text-white`;
var NAV_ACTIVE = `${NAV_BASE} bg-gold/15 text-gold`;
function AppShell({ children }) {
	const { player, signOut, refreshPlayer } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const onTable = useRouterState({ select: (state) => state.location.pathname.startsWith("/table/") });
	const playerId = player?.id;
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!playerId) return;
		let active = true;
		fetchIsAdmin().then((value) => active && setIsAdmin(value)).catch(() => active && setIsAdmin(false));
		return () => {
			active = false;
		};
	}, [playerId]);
	(0, import_react.useEffect)(() => {
		if (!playerId) return;
		const channel = supabase.channel(`header-balance-${Math.random().toString(36).slice(2)}`).on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "players",
			filter: `id=eq.${playerId}`
		}, () => {
			refreshPlayer();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [playerId]);
	async function handleSignOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	const avatarDisplay = player?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: player.avatar_url,
		alt: player.display_name,
		className: "h-full w-full rounded-full object-cover"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: player?.avatar_emoji ?? "🙂" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ambient min-h-screen text-foreground",
		children: [
			!onTable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingSuits, { intensity: .08 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "header-sweep sticky top-0 z-20 border-b border-gold/20 bg-wood-deep/85 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/lobby",
							className: "group flex items-center gap-2.5 font-display text-lg font-extrabold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/favicon.png",
									alt: "",
									className: "h-10 w-10 rounded-xl border border-gold/50 object-cover shadow-[var(--shadow-gold)] transition duration-300 group-hover:scale-105"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-gold-shimmer sm:inline",
									children: "Master Poker"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative ml-1 hidden h-2 w-2 sm:flex",
									title: "Live",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-live-ping rounded-full bg-live" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-live" })]
								})
							]
						}),
						player && !onTable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden animate-balance-flash rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm font-bold tabular-nums text-gold md:inline-flex",
							children: ["₱", Number(player.balance).toLocaleString("en-PH", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})]
						}, player.balance),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center gap-1.5 text-sm sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lobby",
									activeProps: { className: NAV_ACTIVE },
									inactiveProps: { className: NAV_IDLE },
									children: "Play"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/tournament",
									activeProps: { className: NAV_ACTIVE },
									inactiveProps: { className: NAV_IDLE },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Tournament"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/settings",
									activeProps: { className: NAV_ACTIVE },
									inactiveProps: { className: NAV_IDLE },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Settings"
										})
									]
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin",
									activeProps: { className: NAV_ACTIVE },
									inactiveProps: { className: NAV_IDLE },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Admin"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-1 flex items-center gap-2 sm:ml-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-800 text-sm",
										children: avatarDisplay
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void handleSignOut(),
										"aria-label": "Sign out",
										className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-slate-300 transition hover:border-white/25 hover:text-white sm:px-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "Sign out"
											})
										]
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: `mx-auto animate-fade-in px-3 sm:px-6 ${onTable ? "max-w-none py-3" : "max-w-7xl py-6"}`,
				children
			})
		]
	});
}
var ErrorBoundary = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch(error, info) {
		console.error("App crashed while rendering", error, info.componentStack);
	}
	render() {
		if (!this.state.failed) return this.props.children;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 text-xl font-semibold text-white",
						children: "Something went wrong"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "The page hit an unexpected problem. Reloading usually fixes it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => window.location.reload(),
						className: "mt-6 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-5 py-2.5 text-sm font-bold text-slate-900",
						children: "Reload"
					})
				]
			})
		});
	}
};
var SAVE_DELAY_MS = 700;
function toRow(userId, prefs) {
	return {
		user_id: userId,
		muted: prefs.muted,
		card_volume: prefs.card,
		chip_volume: prefs.chip,
		table_volume: prefs.table,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
}
/**
* Keeps the signed-in player's sound settings in their account, so the same
* volumes follow them to any phone or computer they sign in on.
*/
function useSoundPreferencesSync(userId) {
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		let cancelled = false;
		let ready = false;
		let lastSaved = null;
		let timer;
		const save = async (prefs) => {
			const { error } = await supabase.from("sound_preferences").upsert(toRow(userId, prefs));
			if (!error) lastSaved = prefs;
			else console.warn("Could not save sound settings", error.message);
		};
		(async () => {
			const { data, error } = await supabase.from("sound_preferences").select("muted, card_volume, chip_volume, table_volume").eq("user_id", userId).maybeSingle();
			if (cancelled) return;
			if (error) console.warn("Could not load sound settings", error.message);
			else if (data) {
				const saved = normalizeSoundPrefs(data);
				lastSaved = saved;
				setSoundPrefs(saved);
			} else await save(getSoundPrefs());
			ready = true;
		})();
		const unsubscribe = subscribeSound(() => {
			if (!ready) return;
			const current = getSoundPrefs();
			if (lastSaved && sameSoundPrefs(current, lastSaved)) return;
			clearTimeout(timer);
			timer = setTimeout(() => void save(getSoundPrefs()), SAVE_DELAY_MS);
		});
		return () => {
			cancelled = true;
			unsubscribe();
			if (timer) {
				clearTimeout(timer);
				const current = getSoundPrefs();
				if (!lastSaved || !sameSoundPrefs(current, lastSaved)) save(current);
			}
		};
	}, [userId]);
}
function AuthenticatedLayout() {
	const { user, player, loading, refreshPlayer, signOut } = useAuth();
	useSoundPreferencesSync(user?.id);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-950 text-slate-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-6 w-6 animate-spin text-gold-300" })
	});
	if (!player) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold text-white",
					children: "Setting up your player profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate-400",
					children: "This usually takes a second. Try again if it doesn't load."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void refreshPlayer(),
						className: "inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-4 py-2 text-sm font-bold text-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), " Try again"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void signOut(),
						className: "rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-300 hover:text-white",
						children: "Sign out"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) });
}
//#endregion
export { AuthenticatedLayout as component };
