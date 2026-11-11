import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-SAOWSTXM.mjs";
import { v as fetchPlayerByAuthId } from "./api-DH6oy-PM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-BRiQAX8u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "poker-room-player";
function writeStoredPlayer(player) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
}
function clearStoredPlayer() {
	localStorage.removeItem(STORAGE_KEY);
}
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const router = useRouter();
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [player, setPlayer] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadPlayerForUser = (0, import_react.useCallback)(async (u) => {
		try {
			const p = await fetchPlayerByAuthId(u.id);
			setPlayer(p);
			if (p) writeStoredPlayer({
				id: p.id,
				name: p.display_name,
				avatarUrl: p.avatar_url,
				avatarEmoji: p.avatar_emoji
			});
			return p;
		} catch (error) {
			console.error("Could not load player profile", error);
			setPlayer(null);
			return null;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
			if (!active) return;
			setSession(sess);
			setUser(sess?.user ?? null);
			setTimeout(() => {
				if (!active) return;
				if (sess?.user) loadPlayerForUser(sess.user).finally(() => active && setLoading(false));
				else {
					setPlayer(null);
					clearStoredPlayer();
					setLoading(false);
				}
				if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") router.invalidate();
			}, 0);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!active) return;
			setSession(data.session);
			setUser(data.session?.user ?? null);
			if (data.session?.user) loadPlayerForUser(data.session.user).finally(() => active && setLoading(false));
			else setLoading(false);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, [loadPlayerForUser, router]);
	async function signIn(email, password) {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
	}
	async function signUp(email, password, displayName, referralCode) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}/lobby`,
				data: {
					display_name: displayName,
					...referralCode ? { referral_code: referralCode } : {}
				}
			}
		});
		if (error) throw error;
		return !data.session;
	}
	async function sendPasswordReset(email) {
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		if (error) throw error;
	}
	async function signOut() {
		clearStoredPlayer();
		setPlayer(null);
		await supabase.auth.signOut();
	}
	async function refreshPlayer() {
		if (user) await loadPlayerForUser(user);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			session,
			user,
			player,
			loading,
			signIn,
			signUp,
			sendPasswordReset,
			signOut,
			refreshPlayer
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
