import { b as fetchPokerTable } from "./api-DH6oy-PM.mjs";
import { Kt as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/table._tableId-DfZGSERQ.js
var $$splitComponentImporter = () => import("./table._tableId-BHnbAcis.mjs");
var $$splitNotFoundComponentImporter = () => import("./table._tableId-CczABWiF.mjs");
var Route = createFileRoute("/_authenticated/table/$tableId")({
	loader: async ({ params }) => {
		const table = await fetchPokerTable(params.tableId);
		if (!table) throw notFound();
		return { table };
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: `${loaderData?.table.name ?? "Table"} · Master Poker` },
		{
			name: "description",
			content: "Take a seat, buy in from your wallet and play Texas Hold’em against the table."
		},
		{
			property: "og:title",
			content: `${loaderData?.table.name ?? "Table"} · Master Poker`
		},
		{
			property: "og:description",
			content: "Take a seat and play Texas Hold’em."
		}
	] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
