import { S as tableBotLevel, _ as reconcileSeats, c as effectiveRake, f as isValidAction, i as autoStep, m as myIndex, o as createHumanSeat, r as applyAction, s as delayFor, u as isBotLevel, v as redactFor, y as settleForExit } from "./session-D4g7BORC.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CMevzYJH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/table-game.functions-Cb2wlUzX.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
var CLOCK_TOLERANCE_MS = 300;
/** Service-role client, loaded inside handlers only (never shipped to the browser). */
async function adminDb() {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	return supabaseAdmin;
}
async function loadPlayer(db, authId) {
	const { data, error } = await db.from("players").select("id, display_name, avatar_url, avatar_emoji, status").eq("auth_id", authId).maybeSingle();
	if (error) throw new Error(error.message);
	if (!data) throw new Error("Player profile not found");
	return data;
}
async function loadRules(db, row) {
	const { data, error } = await db.from("settings").select("key, value").in("key", [
		"rake_percent",
		"bot_aggression",
		"player_win_rate"
	]);
	if (error) throw new Error(error.message);
	const map = new Map((data ?? []).map((entry) => [entry.key, entry.value]));
	const houseRake = Number(map.get("rake_percent") ?? 5);
	const aggression = map.get("bot_aggression");
	const winRate = Number(map.get("player_win_rate") ?? 50);
	let tableRake = null;
	if (row.table_id) {
		const { data: tbl } = await db.from("poker_tables").select("rake_percent").eq("id", row.table_id).maybeSingle();
		tableRake = tbl?.rake_percent ?? null;
	}
	return {
		rakePercent: effectiveRake(tableRake, Number.isFinite(houseRake) ? houseRake : 5),
		botAggression: aggression === "passive" || aggression === "aggressive" ? aggression : "balanced",
		botLevel: isBotLevel(row.bot_level) ? row.bot_level : "normal",
		winRate: Number.isFinite(winRate) ? Math.min(Math.max(winRate, 0), 100) : 50
	};
}
var GAME_COLUMNS = "session_id, player_id, table_id, bot_level, state, version, next_at";
/** Load a game only if it belongs to this player. */
async function loadGame(db, playerId, sessionId) {
	const { data, error } = await db.from("table_game_states").select(GAME_COLUMNS).eq("session_id", sessionId).eq("player_id", playerId).maybeSingle();
	if (error) throw new Error(error.message);
	return data ?? null;
}
function tableOf(row) {
	return row.state;
}
function toView(row) {
	return {
		sessionId: row.session_id,
		version: row.version,
		botLevel: isBotLevel(row.bot_level) ? row.bot_level : "normal",
		table: redactFor(tableOf(row)),
		msUntilNext: Math.max(0, new Date(row.next_at).getTime() - Date.now())
	};
}
/** Save with an optimistic version check; on conflict return the latest stored row. */
async function saveGame(db, row, table) {
	const nextAt = new Date(Date.now() + delayFor(table)).toISOString();
	const { data, error } = await db.from("table_game_states").update({
		state: table,
		version: row.version + 1,
		next_at: nextAt,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("session_id", row.session_id).eq("player_id", row.player_id).eq("version", row.version).select(GAME_COLUMNS).maybeSingle();
	if (error) throw new Error(error.message);
	if (data) return data;
	const latest = await loadGame(db, row.player_id, row.session_id);
	if (!latest) throw new Error("Table session not found");
	return latest;
}
async function cashOut(db, sessionId, amount) {
	const { data, error } = await db.rpc("server_cash_out", {
		p_session: sessionId,
		p_amount: amount
	});
	if (error) throw new Error(error.message);
	return Number(data ?? 0);
}
async function closeGame(db, row) {
	const rules = await loadRules(db, row);
	const stack = Math.max(0, Math.floor(settleForExit(tableOf(row), rules)));
	return cashOut(db, row.session_id, stack);
}
/** Close any open session the player left behind (closed tab, lost connection). */
async function settleOpenSessions(db, playerId) {
	const { data: sessions, error } = await db.from("table_sessions").select("id, buy_in").eq("player_id", playerId).eq("status", "open");
	if (error) throw new Error(error.message);
	for (const session of sessions ?? []) {
		const row = await loadGame(db, playerId, session.id);
		if (row) await closeGame(db, row);
		else await cashOut(db, session.id, Number(session.buy_in));
	}
}
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
var getTableGame_createServerFn_handler = createServerRpc({
	id: "d3be1dad2b7745a03e80556a51bc3958ad020d97dcd99af6eedfb16b7bb90695",
	name: "getTableGame",
	filename: "src/lib/table-game.functions.ts"
}, (opts) => getTableGame.__executeServer(opts));
var getTableGame = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ({ tableId: requireUuid(input?.tableId, "table") })).handler(getTableGame_createServerFn_handler, async ({ data, context }) => {
	const db = await adminDb();
	const player = await loadPlayer(db, context.userId);
	const { data: row, error } = await db.from("table_game_states").select(GAME_COLUMNS).eq("player_id", player.id).eq("table_id", data.tableId).limit(1).maybeSingle();
	if (error) throw new Error(error.message);
	return row ? {
		closed: false,
		view: toView(row)
	} : {
		closed: true,
		view: null
	};
});
var sitDownAtTable_createServerFn_handler = createServerRpc({
	id: "ce6defde78d9f551b049a7d6c727648e4816ee0b23b9e8a8b6945f8cd7a55086",
	name: "sitDownAtTable",
	filename: "src/lib/table-game.functions.ts"
}, (opts) => sitDownAtTable.__executeServer(opts));
var sitDownAtTable = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	const buyIn = Number(input?.buyIn);
	if (!Number.isFinite(buyIn) || buyIn <= 0) throw new Error("Invalid buy-in");
	return {
		tableId: requireUuid(input?.tableId, "table"),
		buyIn: Math.floor(buyIn)
	};
}).handler(sitDownAtTable_createServerFn_handler, async ({ data, context }) => {
	const db = await adminDb();
	const player = await loadPlayer(db, context.userId);
	await settleOpenSessions(db, player.id);
	const { data: tableRow, error: tableError } = await db.from("poker_tables").select("id, small_blind, big_blind, min_buy_in, max_buy_in, bot_level").eq("id", data.tableId).eq("is_active", true).maybeSingle();
	if (tableError) throw new Error(tableError.message);
	if (!tableRow) throw new Error("Table not found or not active");
	const botLevel = tableBotLevel(tableRow.bot_level);
	const { data: sessionId, error: buyError } = await db.rpc("server_buy_in", {
		p_auth: context.userId,
		p_amount: data.buyIn,
		p_table_id: data.tableId
	});
	if (buyError) throw new Error(buyError.message);
	const base = {
		seats: [createHumanSeat(player.id, player.display_name, data.buyIn, 0, player.avatar_url, player.avatar_emoji), ...Array(7).fill(null)],
		dealer: 0,
		hand: null,
		handCount: 0,
		config: {
			smallBlind: Number(tableRow.small_blind),
			bigBlind: Number(tableRow.big_blind),
			minBuyIn: Number(tableRow.min_buy_in),
			maxBuyIn: Number(tableRow.max_buy_in)
		}
	};
	const table = reconcileSeats(base, []);
	const { data: created, error: insertError } = await db.from("table_game_states").insert({
		session_id: sessionId,
		player_id: player.id,
		table_id: data.tableId,
		bot_level: botLevel,
		state: table,
		next_at: new Date(Date.now() + delayFor(table)).toISOString()
	}).select(GAME_COLUMNS).maybeSingle();
	if (insertError || !created) {
		await cashOut(db, sessionId, data.buyIn);
		throw new Error(insertError?.message ?? "Could not open the table");
	}
	return {
		closed: false,
		view: toView(created)
	};
});
var tickTableGame_createServerFn_handler = createServerRpc({
	id: "d2afbab39247f69a4809efdc381e88fc289ddbae3e9953a499c1b65d0bbbb52b",
	name: "tickTableGame",
	filename: "src/lib/table-game.functions.ts"
}, (opts) => tickTableGame.__executeServer(opts));
var tickTableGame = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ({
	sessionId: requireUuid(input?.sessionId, "session"),
	remotes: sanitizeRemotes(input?.remotes)
})).handler(tickTableGame_createServerFn_handler, async ({ data, context }) => {
	const db = await adminDb();
	const row = await loadGame(db, (await loadPlayer(db, context.userId)).id, data.sessionId);
	if (!row) return {
		closed: true,
		view: null
	};
	if (Date.now() < new Date(row.next_at).getTime() - CLOCK_TOLERANCE_MS) return {
		closed: false,
		view: toView(row)
	};
	const rules = await loadRules(db, row);
	const step = autoStep(tableOf(row), data.remotes, rules);
	if (step.kind === "bust") return {
		closed: true,
		view: null,
		balance: await closeGame(db, row)
	};
	return {
		closed: false,
		view: toView(await saveGame(db, row, step.table))
	};
});
var actAtTable_createServerFn_handler = createServerRpc({
	id: "b5269c5f506b85a24fe4785674219f2be35ac8b37a0e8ceafbe410f100006911",
	name: "actAtTable",
	filename: "src/lib/table-game.functions.ts"
}, (opts) => actAtTable.__executeServer(opts));
var actAtTable = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!isValidAction(input?.action)) throw new Error("Invalid action");
	return {
		sessionId: requireUuid(input?.sessionId, "session"),
		action: input.action
	};
}).handler(actAtTable_createServerFn_handler, async ({ data, context }) => {
	const db = await adminDb();
	const row = await loadGame(db, (await loadPlayer(db, context.userId)).id, data.sessionId);
	if (!row) return {
		closed: true,
		view: null
	};
	const table = tableOf(row);
	const me = myIndex(table);
	if (me === -1 || table.hand?.toAct !== me) return {
		closed: false,
		view: toView(row)
	};
	const next = applyAction(table, me, data.action);
	if (next === table) return {
		closed: false,
		view: toView(row)
	};
	return {
		closed: false,
		view: toView(await saveGame(db, row, next))
	};
});
var leaveTable_createServerFn_handler = createServerRpc({
	id: "6b32d6fed5f396a9226fa85eb076e86753742a9d70a4c534d0a90bb90e7d4c31",
	name: "leaveTable",
	filename: "src/lib/table-game.functions.ts"
}, (opts) => leaveTable.__executeServer(opts));
var leaveTable = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ({ sessionId: requireUuid(input?.sessionId, "session") })).handler(leaveTable_createServerFn_handler, async ({ data, context }) => {
	const db = await adminDb();
	const row = await loadGame(db, (await loadPlayer(db, context.userId)).id, data.sessionId);
	if (!row) return {
		closed: true,
		view: null
	};
	return {
		closed: true,
		view: null,
		balance: await closeGame(db, row)
	};
});
//#endregion
export { actAtTable_createServerFn_handler, getTableGame_createServerFn_handler, leaveTable_createServerFn_handler, sitDownAtTable_createServerFn_handler, tickTableGame_createServerFn_handler };
