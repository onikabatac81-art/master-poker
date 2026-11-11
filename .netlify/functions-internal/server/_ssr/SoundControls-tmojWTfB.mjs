import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { J as Coins, R as Layers, et as Bell, i as Volume2, r as VolumeX } from "../_libs/lucide-react.mjs";
import { a as playSound, o as primeAudio } from "./sounds-vUSvDDZ3.mjs";
import { t as useSoundPrefs } from "./useTableSounds-B9nrkivm.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SoundControls-tmojWTfB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var GROUPS = [
	{
		group: "card",
		label: "Cards",
		hint: "Shuffle, deal, fold",
		icon: Layers,
		sample: "deal"
	},
	{
		group: "chip",
		label: "Chips",
		hint: "Bets, raises, pots",
		icon: Coins,
		sample: "raise"
	},
	{
		group: "table",
		label: "Table",
		hint: "Check knocks, your-turn bell",
		icon: Bell,
		sample: "check"
	}
];
/** Mute switch and one volume slider each for card, chip and table sounds. */
function SoundControls() {
	const [prefs, setPrefs] = useSoundPrefs();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => {
				primeAudio();
				const muted = !prefs.muted;
				setPrefs({ muted });
				if (!muted) playSound("chip");
			},
			"aria-pressed": !prefs.muted,
			className: `flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm font-semibold transition ${prefs.muted ? "border-border text-muted-foreground" : "border-gold/40 bg-gold/10 text-gold"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2",
				children: [prefs.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }), prefs.muted ? "Sounds off" : "Sounds on"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium",
				children: prefs.muted ? "Tap to turn on" : "Tap to mute"
			})]
		}), GROUPS.map(({ group, label, hint, icon: Icon, sample }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: prefs.muted ? "opacity-50" : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-semibold text-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] text-muted-foreground",
						children: hint
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "w-10 text-right text-xs font-bold tabular-nums text-gold",
					children: [prefs[group], "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				value: [prefs[group]],
				min: 0,
				max: 100,
				step: 5,
				disabled: prefs.muted,
				"aria-label": `${label} volume`,
				onValueChange: ([value]) => setPrefs({ [group]: value ?? 0 }),
				onValueCommit: () => {
					primeAudio();
					playSound(sample);
				}
			})]
		}, group))]
	});
}
//#endregion
export { cn as n, SoundControls as t };
