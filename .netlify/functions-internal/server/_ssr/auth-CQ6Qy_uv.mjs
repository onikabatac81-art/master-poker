import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CQ6Qy_uv.js
var $$splitComponentImporter = () => import("./auth-B2-ICEa1.mjs");
function safeRedirect(value) {
	if (typeof value !== "string") return void 0;
	if (!value.startsWith("/") || value.startsWith("//")) return void 0;
	return value;
}
var Route = createFileRoute("/auth")({
	validateSearch: (search) => ({
		redirect: safeRedirect(search["redirect"]),
		mode: search["mode"] === "signup" || typeof search["ref"] === "string" ? "signup" : void 0,
		ref: typeof search["ref"] === "string" ? search["ref"].toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || void 0 : void 0
	}),
	head: () => ({ meta: [
		{ title: "Sign in · Master Poker" },
		{
			name: "description",
			content: "Sign in or create a Master Poker account. New players get a ₱20 welcome bonus."
		},
		{
			property: "og:title",
			content: "Sign in · Master Poker"
		},
		{
			property: "og:description",
			content: "Sign in or create a Master Poker account. New players get a ₱20 welcome bonus."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
