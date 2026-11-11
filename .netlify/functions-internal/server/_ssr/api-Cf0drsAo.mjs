import { t as supabase } from "./client-DQTJBoLu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-Cf0drsAo.js
var DEFAULT_TABLE_SETTINGS = {
	rakePercent: 5,
	botAggression: "balanced",
	minBuyIn: 500,
	maxBuyIn: 2e4,
	welcomeBonus: 20,
	referralReward: 20,
	referralMinRecharge: 100,
	playerWinRate: 50
};
var AVATAR_EMOJIS = [
	"🙂",
	"😎",
	"🤓",
	"😤",
	"🥳",
	"🦊",
	"🐉",
	"🦁",
	"🐺",
	"🦅",
	"🐅",
	"🦈",
	"🐍",
	"🦝",
	"🐗",
	"🦏"
];
function must(result) {
	if (result.error) throw new Error(result.error.message);
	return result.data;
}
var AVATAR_LINK_SECONDS = 31536e3;
var PROOF_LINK_SECONDS = 3600;
async function currentAuthId() {
	const { data, error } = await supabase.auth.getUser();
	if (error || !data.user) throw new Error("Please sign in again.");
	return data.user.id;
}
async function fetchPlayerByAuthId(authId) {
	return must(await supabase.from("players").select("*").eq("auth_id", authId).maybeSingle());
}
async function fetchPlayer(playerId) {
	return must(await supabase.from("players").select("*").eq("id", playerId).maybeSingle());
}
async function fetchAllPlayers() {
	return must(await supabase.from("players").select("*").order("created_at", { ascending: false }).limit(500));
}
async function fetchPlayerTransactions(playerId) {
	return must(await supabase.from("transactions").select("*").eq("player_id", playerId).order("created_at", { ascending: false }).limit(20));
}
async function fetchAllTransactions() {
	return must(await supabase.from("transactions").select("*, players!transactions_player_id_fkey(display_name, balance)").order("created_at", { ascending: false }).limit(200));
}
async function submitTransactionRequest(input) {
	must(await supabase.from("transactions").insert({
		player_id: input.playerId,
		type: input.type,
		amount: input.amount,
		method: input.method,
		account_details: input.accountDetails,
		proof_url: input.proofUrl ?? null,
		qr_code_id: input.qrCodeId ?? null
	}));
}
async function fetchGameLogs() {
	return must(await supabase.from("game_logs").select("*").order("id", { ascending: false }).limit(200));
}
async function fetchTableSettings() {
	const rows = must(await supabase.from("settings").select("key, value"));
	const map = new Map(rows.map((row) => [row.key, row.value]));
	const aggression = map.get("bot_aggression");
	return {
		rakePercent: Number(map.get("rake_percent") ?? DEFAULT_TABLE_SETTINGS.rakePercent),
		botAggression: aggression === "passive" || aggression === "aggressive" || aggression === "balanced" ? aggression : DEFAULT_TABLE_SETTINGS.botAggression,
		minBuyIn: Number(map.get("min_buy_in") ?? DEFAULT_TABLE_SETTINGS.minBuyIn),
		maxBuyIn: Number(map.get("max_buy_in") ?? DEFAULT_TABLE_SETTINGS.maxBuyIn),
		welcomeBonus: Number(map.get("welcome_bonus") ?? DEFAULT_TABLE_SETTINGS.welcomeBonus),
		referralReward: Number(map.get("referral_reward") ?? DEFAULT_TABLE_SETTINGS.referralReward),
		referralMinRecharge: Number(map.get("referral_min_recharge") ?? DEFAULT_TABLE_SETTINGS.referralMinRecharge),
		playerWinRate: Number(map.get("player_win_rate") ?? DEFAULT_TABLE_SETTINGS.playerWinRate)
	};
}
async function fetchPokerTables() {
	return must(await supabase.from("poker_tables").select("*").eq("is_active", true).order("display_order", { ascending: true }));
}
async function fetchPokerTable(tableId) {
	return must(await supabase.from("poker_tables").select("*").eq("id", tableId).eq("is_active", true).maybeSingle());
}
async function fetchQRCodes() {
	return must(await supabase.from("qr_codes").select("*").eq("is_active", true).order("display_order", { ascending: true }));
}
/** Admin status comes from the signed-in account's role, checked again by every admin action on the server. */
async function fetchIsAdmin() {
	const authId = await currentAuthId();
	const { data, error } = await supabase.rpc("has_role", {
		_user_id: authId,
		_role: "admin"
	});
	if (error) throw new Error(error.message);
	return Boolean(data);
}
async function resolveTransaction(transactionId, decision, note) {
	must(await supabase.rpc("resolve_transaction", {
		p_id: transactionId,
		p_decision: decision,
		...note ? { p_note: note } : {}
	}));
}
async function adminSetBalance(playerId, balance) {
	must(await supabase.rpc("admin_set_balance", {
		p_player: playerId,
		p_balance: balance
	}));
}
async function adminSetPlayerStatus(playerId, status) {
	must(await supabase.rpc("admin_set_player_status", {
		p_player: playerId,
		p_status: status
	}));
}
async function adminSetQrImage(qrId, image) {
	must(await supabase.rpc("admin_set_qr_image", {
		p_id: qrId,
		p_image: image
	}));
}
async function adminSetSetting(key, value) {
	must(await supabase.rpc("admin_set_setting", {
		p_key: key,
		p_value: value
	}));
}
async function updateProfile(input) {
	must(await supabase.rpc("update_profile", {
		p_player: input.playerId,
		...input.displayName ? { p_display_name: input.displayName } : {},
		...input.avatarUrl !== void 0 ? { p_avatar_url: input.avatarUrl ?? "" } : {},
		...input.avatarEmoji ? { p_avatar_emoji: input.avatarEmoji } : {}
	}));
}
/** Uploads into the signed-in account's own folder and returns a long-lived private link. */
async function uploadAvatar(file) {
	const authId = await currentAuthId();
	const ext = file.name.split(".").pop() ?? "png";
	const path = `${authId}/avatar-${Date.now()}.${ext}`;
	must(await supabase.storage.from("avatars").upload(path, file, { upsert: true }));
	const { data, error } = await supabase.storage.from("avatars").createSignedUrl(path, AVATAR_LINK_SECONDS);
	if (error || !data) throw new Error(error?.message ?? "Could not save the photo.");
	return data.signedUrl;
}
/** Stores the proof privately; the returned storage path is saved on the request. */
async function uploadPaymentProof(file) {
	const authId = await currentAuthId();
	const ext = file.name.split(".").pop() ?? "png";
	const path = `${authId}/proof-${Date.now()}.${ext}`;
	must(await supabase.storage.from("payment-proofs").upload(path, file, { upsert: false }));
	return path;
}
async function createSignedProofUrl(pathOrUrl) {
	if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
	const { data } = await supabase.storage.from("payment-proofs").createSignedUrl(pathOrUrl, PROOF_LINK_SECONDS);
	return data?.signedUrl ?? null;
}
async function fetchAllPokerTables() {
	return must(await supabase.from("poker_tables").select("*").order("display_order", { ascending: true }));
}
async function adminUpdateTableRules(tableId, botLevel, rake) {
	must(await supabase.rpc("admin_update_table_rules", {
		p_table_id: tableId,
		p_bot_level: botLevel,
		p_rake: rake
	}));
}
async function adminUpdateQrDetails(qrId, label, accountName, accountNumber) {
	must(await supabase.rpc("admin_update_qr_details", {
		p_id: qrId,
		p_label: label,
		p_account_name: accountName,
		p_account_number: accountNumber
	}));
}
async function fetchMyReferralCount() {
	return Number(must(await supabase.rpc("my_referral_count")) ?? 0);
}
async function referralCodeExists(code) {
	return Boolean(must(await supabase.rpc("referral_code_exists", { p_code: code })));
}
async function fetchMyReferralEarnings() {
	return Number(must(await supabase.rpc("my_referral_earnings")) ?? 0);
}
//#endregion
export { fetchTableSettings as C, updateProfile as D, submitTransactionRequest as E, uploadAvatar as O, fetchQRCodes as S, resolveTransaction as T, fetchPlayer as _, adminSetQrImage as a, fetchPokerTable as b, adminUpdateTableRules as c, fetchAllPokerTables as d, fetchAllTransactions as f, fetchMyReferralEarnings as g, fetchMyReferralCount as h, adminSetPlayerStatus as i, uploadPaymentProof as k, createSignedProofUrl as l, fetchIsAdmin as m, DEFAULT_TABLE_SETTINGS as n, adminSetSetting as o, fetchGameLogs as p, adminSetBalance as r, adminUpdateQrDetails as s, AVATAR_EMOJIS as t, fetchAllPlayers as u, fetchPlayerByAuthId as v, referralCodeExists as w, fetchPokerTables as x, fetchPlayerTransactions as y };
