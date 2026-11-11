import { r as __toESM } from "../_runtime.mjs";
import { w as referralCodeExists } from "./api-Cf0drsAo.mjs";
import { t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { L as Loader, M as MailCheck, P as LogIn, U as Gift, c as UserPlus, z as KeyRound } from "../_libs/lucide-react.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./useAuth-D_f7uHyK.mjs";
import { t as Route } from "./auth-D3ylvm_Q.mjs";
import { t as FloatingSuits } from "./FloatingSuits-CJ6WQyVh.mjs";
import { t as master_poker_hero_jpg_asset_default } from "./master-poker-hero.jpg.asset-CByH3_u4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-LqPA9MOg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAME_MIN = 2;
var NAME_MAX = 24;
var REFERRAL_MAX = 8;
function cleanReferral(value) {
	return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, REFERRAL_MAX);
}
var INPUT = "mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-gold-400/70 focus:ring-2 focus:ring-gold/20";
function AuthPage({ initialMode = "login", initialReferral = "" }) {
	const { signIn, signUp, sendPasswordReset } = useAuth();
	const [mode, setMode] = (0, import_react.useState)(initialMode);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [referral, setReferral] = (0, import_react.useState)(cleanReferral(initialReferral));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const isSignup = mode === "signup";
	const isForgot = mode === "forgot";
	const trimmedName = displayName.trim();
	const nameValid = !isSignup || trimmedName.length >= NAME_MIN && trimmedName.length <= NAME_MAX;
	const valid = email.trim().length > 0 && (isForgot || password.length >= 6) && nameValid;
	function switchMode(next) {
		setMode(next);
		setError(null);
		setNotice(null);
	}
	async function handleSubmit(event) {
		event.preventDefault();
		if (!valid || busy) return;
		setBusy(true);
		setError(null);
		setNotice(null);
		try {
			if (isForgot) {
				await sendPasswordReset(email.trim());
				setNotice("Check your email for a link to set a new password.");
			} else if (isSignup) {
				if (referral && !await referralCodeExists(referral)) throw new Error("That referral code was not found. Check it or leave it blank.");
				const needsConfirmation = await signUp(email.trim(), password, trimmedName, referral || void 0);
				window.__lovableEvents?.track?.("project.sign_up_completed", {
					confirmation_required: needsConfirmation,
					referred: Boolean(referral)
				});
				if (needsConfirmation) await signIn(email.trim(), password);
			} else await signIn(email.trim(), password);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setBusy(false);
		}
	}
	const title = isForgot ? "Reset your password" : isSignup ? "Create your account" : "Welcome back";
	const subtitle = isForgot ? "Enter your email and we will send you a link to choose a new password." : isSignup ? "Takes 10 seconds. No email confirmation needed." : "Sign in to get back to the tables.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-screen max-w-md flex-col justify-center py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-panel animate-modal-in overflow-hidden rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-36 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: master_poker_hero_jpg_asset_default.url,
					alt: "Master Poker",
					className: "h-full w-full object-cover object-center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-room/30 to-card" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-7 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-bold text-white",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-slate-400",
						children: subtitle
					}),
					isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-sm font-semibold text-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-4 w-4 shrink-0" }), " Get ₱20 free in your wallet when you join."]
					}),
					!isForgot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex rounded-xl border border-white/10 bg-slate-950/80 p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => switchMode("login"),
							className: `flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${!isSignup ? "btn-gold" : "text-slate-400 hover:text-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), " Sign In"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => switchMode("signup"),
							className: `flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${isSignup ? "btn-gold" : "text-slate-400 hover:text-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Create Account"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-5 space-y-4",
						children: [
							isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-slate-400",
									children: "Player name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									maxLength: NAME_MAX,
									value: displayName,
									onChange: (event) => setDisplayName(event.target.value),
									placeholder: "e.g. Juan D.",
									className: INPUT
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-slate-400",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									autoComplete: "email",
									value: email,
									onChange: (event) => setEmail(event.target.value),
									placeholder: "you@example.com",
									className: INPUT
								})]
							}),
							!isForgot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-between text-xs font-medium text-slate-400",
									children: ["Password", !isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => switchMode("forgot"),
										className: "text-gold-300 hover:text-gold-400",
										children: "Forgot password?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									autoComplete: isSignup ? "new-password" : "current-password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									placeholder: "At least 6 characters",
									className: INPUT
								})]
							}),
							isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-slate-400",
									children: "Referral code (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									inputMode: "text",
									autoCapitalize: "characters",
									maxLength: REFERRAL_MAX,
									value: referral,
									onChange: (event) => setReferral(cleanReferral(event.target.value)),
									placeholder: "e.g. AB12CD34",
									className: `${INPUT} font-mono uppercase tracking-[0.3em]`
								})]
							}),
							notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								role: "status",
								className: "flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "mt-0.5 h-4 w-4 shrink-0" }),
									" ",
									notice
								]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: !valid || busy,
								className: "btn-gold w-full rounded-xl py-3 text-sm font-bold disabled:opacity-40",
								children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }), " Please wait..."]
								}) : isForgot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }), " Send reset link"]
								}) : isSignup ? "Create account & play" : "Sign in"
							}),
							isForgot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => switchMode("login"),
								className: "w-full text-center text-sm text-slate-400 hover:text-white",
								children: "Back to sign in"
							})
						]
					})
				]
			})]
		}, mode)
	});
}
function AuthRoute() {
	const { user, loading } = useAuth();
	const { redirect, mode, ref } = Route.useSearch();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({
			to: redirect ?? "/lobby",
			replace: true
		});
	}, [
		loading,
		user,
		redirect,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ambient min-h-screen px-4 text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingSuits, { intensity: .12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, {
			initialMode: mode === "signup" ? "signup" : "login",
			initialReferral: ref ?? ""
		})]
	});
}
//#endregion
export { AuthRoute as component };
