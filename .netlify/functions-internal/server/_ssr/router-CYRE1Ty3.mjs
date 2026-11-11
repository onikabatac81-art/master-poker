import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-SAOWSTXM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as useRouter, Ut as redirect, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AuthProvider } from "./useAuth-BRiQAX8u.mjs";
import { t as Route$8 } from "./auth-CQ6Qy_uv.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$9 } from "./table._tableId-DfZGSERQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CYRE1Ty3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DQjKnfbo.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Master Poker" },
			{
				name: "description",
				content: "Master Poker: Texas Hold’em tables, Sit & Go tournaments and a peso wallet."
			},
			{
				property: "og:title",
				content: "Master Poker"
			},
			{
				property: "og:description",
				content: "Master Poker: Texas Hold’em tables, Sit & Go tournaments and a peso wallet."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$6 = () => import("./routes-CzS4Xc7P.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Master Poker · Strategy, Skill, Victory" },
		{
			name: "description",
			content: "Play Texas Hold’em at Master Poker. Tables from ₱1 to ₱1000, free Sit & Go tournaments, ₱20 welcome bonus and quick QR recharge."
		},
		{
			property: "og:title",
			content: "Master Poker · Strategy, Skill, Victory"
		},
		{
			property: "og:description",
			content: "Texas Hold’em tables from ₱1 to ₱1000, ₱20 welcome bonus, and quick QR recharge."
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
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./route-DLY5oVAY.mjs");
var Route$5 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		return { userId: data.user.id };
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./reset-password-Daqv4RLY.mjs");
var Route$4 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Set a new password · Master Poker" },
		{
			name: "description",
			content: "Choose a new password for your Master Poker account."
		},
		{
			property: "og:title",
			content: "Set a new password · Master Poker"
		},
		{
			property: "og:description",
			content: "Choose a new password for your Master Poker account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin-CpX2bk0v.mjs");
var Route$3 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Admin Control Panel · Master Poker" },
		{
			name: "description",
			content: "Approve cash-ins and withdrawals, manage players, table settings and payment QR codes."
		},
		{
			property: "og:title",
			content: "Admin Control Panel · Master Poker"
		},
		{
			property: "og:description",
			content: "Manage wallet approvals, players and table settings."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./lobby-DWOIrRLa.mjs");
var Route$2 = createFileRoute("/_authenticated/lobby")({
	head: () => ({ meta: [
		{ title: "Choose a Table · Master Poker" },
		{
			name: "description",
			content: "Pick a Texas Hold’em table that fits your budget, from ₱1 beginner games to ₱1000 whale stakes."
		},
		{
			property: "og:title",
			content: "Choose a Table · Master Poker"
		},
		{
			property: "og:description",
			content: "Pick a Texas Hold’em table that fits your budget."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./settings-D0pw0v31.mjs");
var Route$1 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "Profile Settings · Master Poker" },
		{
			name: "description",
			content: "Change your display name, profile photo and avatar emoji."
		},
		{
			property: "og:title",
			content: "Profile Settings · Master Poker"
		},
		{
			property: "og:description",
			content: "Change your display name, profile photo and avatar emoji."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./tournament-DHZcViWs.mjs");
var Route = createFileRoute("/_authenticated/tournament")({
	head: () => ({ meta: [
		{ title: "Sit & Go Tournament · Master Poker" },
		{
			name: "description",
			content: "Eight players, rising blinds, last one standing wins. Free entry with play chips."
		},
		{
			property: "og:title",
			content: "Sit & Go Tournament · Master Poker"
		},
		{
			property: "og:description",
			content: "Eight players, rising blinds, last one standing wins."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var AuthenticatedRouteRoute = Route$5.update({
	id: "/_authenticated",
	getParentRoute: () => Route$7
});
var AuthRoute = Route$8.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$7
});
var ResetPasswordRoute = Route$4.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$7
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute: Route$3.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedLobbyRoute: Route$2.update({
		id: "/lobby",
		path: "/lobby",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedSettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedTournamentRoute: Route.update({
		id: "/tournament",
		path: "/tournament",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedTableTableIdRoute: Route$9.update({
		id: "/table/$tableId",
		path: "/table/$tableId",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ResetPasswordRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
