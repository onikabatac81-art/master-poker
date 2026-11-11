import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FloatingSuits-CJ6WQyVh.js
var import_jsx_runtime = require_jsx_runtime();
var SUITS = [
	{
		glyph: "♠",
		left: 4,
		size: 28,
		duration: 26,
		delay: 0,
		sway: 40,
		tone: "text-gold"
	},
	{
		glyph: "♥",
		left: 14,
		size: 18,
		duration: 21,
		delay: 7,
		sway: -30,
		tone: "text-burgundy"
	},
	{
		glyph: "♦",
		left: 23,
		size: 22,
		duration: 29,
		delay: 3,
		sway: 25,
		tone: "text-gold"
	},
	{
		glyph: "♣",
		left: 33,
		size: 34,
		duration: 34,
		delay: 12,
		sway: -45,
		tone: "text-live"
	},
	{
		glyph: "♠",
		left: 44,
		size: 16,
		duration: 19,
		delay: 5,
		sway: 20,
		tone: "text-gold"
	},
	{
		glyph: "♥",
		left: 53,
		size: 26,
		duration: 31,
		delay: 15,
		sway: -25,
		tone: "text-burgundy"
	},
	{
		glyph: "♦",
		left: 62,
		size: 20,
		duration: 24,
		delay: 1,
		sway: 35,
		tone: "text-gold"
	},
	{
		glyph: "♣",
		left: 71,
		size: 30,
		duration: 28,
		delay: 9,
		sway: -35,
		tone: "text-live"
	},
	{
		glyph: "♠",
		left: 80,
		size: 22,
		duration: 23,
		delay: 18,
		sway: 30,
		tone: "text-gold"
	},
	{
		glyph: "♥",
		left: 88,
		size: 32,
		duration: 33,
		delay: 4,
		sway: -40,
		tone: "text-burgundy"
	},
	{
		glyph: "♦",
		left: 95,
		size: 18,
		duration: 20,
		delay: 11,
		sway: 18,
		tone: "text-gold"
	}
];
function FloatingSuits({ intensity = .1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: SUITS.map((suit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `absolute -bottom-12 font-display ${suit.tone}`,
			style: {
				left: `${suit.left}%`,
				fontSize: suit.size,
				animation: `suit-drift ${suit.duration}s linear ${-suit.delay}s infinite`,
				["--sway"]: `${suit.sway}px`,
				["--suit-opacity"]: String(intensity)
			},
			children: suit.glyph
		}, index))
	});
}
//#endregion
export { FloatingSuits as t };
