import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DQTJBoLu.mjs";
import { C as fetchTableSettings, n as DEFAULT_TABLE_SETTINGS } from "./api-Cf0drsAo.mjs";
import { t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTableSettings-Bq7lZs-1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLiveData(load, tables, initial) {
	const [data, setData] = (0, import_react.useState)(initial);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadRef = (0, import_react.useRef)(load);
	(0, import_react.useEffect)(() => {
		loadRef.current = load;
	}, [load]);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			setData(await loadRef.current());
			setError(null);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setLoading(false);
		}
	}, []);
	const tablesKey = tables.join(",");
	(0, import_react.useEffect)(() => {
		refresh();
		let channel = supabase.channel(`live-${tablesKey}-${Math.random().toString(36).slice(2, 8)}`);
		for (const table of tablesKey.split(",")) channel = channel.on("postgres_changes", {
			event: "*",
			schema: "public",
			table
		}, () => {
			refresh();
		});
		channel.subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [refresh, tablesKey]);
	return {
		data,
		error,
		loading,
		refresh
	};
}
var SETTINGS_TABLES = ["settings"];
function useTableSettings() {
	const { data, error, refresh } = useLiveData((0, import_react.useCallback)(() => fetchTableSettings(), []), SETTINGS_TABLES, DEFAULT_TABLE_SETTINGS);
	return {
		settings: data,
		error,
		refresh
	};
}
//#endregion
export { useTableSettings as n, useLiveData as t };
