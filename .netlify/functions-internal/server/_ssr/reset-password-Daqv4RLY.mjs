import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-SAOWSTXM.mjs";
import { t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { L as Loader, z as KeyRound } from "../_libs/lucide-react.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-Daqv4RLY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "PASSWORD_RECOVERY" || session) {
				setReady(true);
				setChecked(true);
			}
		});
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setReady(true);
			setTimeout(() => setChecked(true), 1500);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	const valid = password.length >= 6 && password === confirm;
	async function handleSubmit(event) {
		event.preventDefault();
		if (!valid || busy) return;
		setBusy(true);
		setError(null);
		try {
			const { error: updateError } = await supabase.auth.updateUser({ password });
			if (updateError) throw updateError;
			navigate({
				to: "/lobby",
				replace: true
			});
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-950 px-4 text-slate-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 text-2xl font-semibold text-white",
						children: "Set a new password"
					}),
					!ready && checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-4 text-sm text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This reset link is invalid or has expired. Request a new one from the sign-in page." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "font-semibold text-gold-300 hover:text-gold-400",
							children: "Back to sign in"
						})]
					}) : !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 inline-flex items-center gap-2 text-sm text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }), " Checking your reset link..."]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-slate-400",
									children: "New password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									autoComplete: "new-password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									placeholder: "At least 6 characters",
									className: "mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-gold-400/60"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-slate-400",
										children: "Confirm password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										autoComplete: "new-password",
										value: confirm,
										onChange: (event) => setConfirm(event.target.value),
										className: "mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-gold-400/60"
									}),
									confirm && password !== confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-xs text-amber-300",
										children: "Passwords do not match."
									})
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
								className: "w-full rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 py-3 text-sm font-bold text-slate-900 transition hover:brightness-105 disabled:opacity-40",
								children: busy ? "Saving..." : "Save new password"
							})
						]
					})
				]
			})
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
