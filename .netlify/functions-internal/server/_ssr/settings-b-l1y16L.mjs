import { r as __toESM } from "../_runtime.mjs";
import { D as updateProfile, O as uploadAvatar, g as fetchMyReferralEarnings, h as fetchMyReferralCount, t as AVATAR_EMOJIS } from "./api-Cf0drsAo.mjs";
import { i as formatPeso, t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useTableSettings } from "./useTableSettings-Bq7lZs-1.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { L as Loader, Q as Camera, U as Gift, V as ImagePlus, Y as CircleUser, Z as Check, f as Trash2, o as Users, q as Copy, w as Save, y as Share2 } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./useAuth-D_f7uHyK.mjs";
import { t as SoundControls } from "./SoundControls-tmojWTfB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-b-l1y16L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_PHOTO_BYTES = 5242880;
function SettingsPage({ player }) {
	const { refreshPlayer } = useAuth();
	const [name, setName] = (0, import_react.useState)(player.display_name);
	const [emoji, setEmoji] = (0, import_react.useState)(player.avatar_emoji);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [referrals, setReferrals] = (0, import_react.useState)(null);
	const [earnings, setEarnings] = (0, import_react.useState)(null);
	const { settings } = useTableSettings();
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		fetchMyReferralCount().then(setReferrals).catch(() => setReferrals(null));
		fetchMyReferralEarnings().then(setEarnings).catch(() => setEarnings(null));
	}, []);
	const trimmedName = name.trim();
	const nameChanged = trimmedName !== player.display_name;
	const emojiChanged = emoji !== player.avatar_emoji;
	const canSave = trimmedName.length >= 2 && trimmedName.length <= 24 && (nameChanged || emojiChanged);
	const referralLink = typeof window === "undefined" ? "" : `${window.location.origin}/auth?ref=${player.referral_code}`;
	async function handleUpload(file) {
		if (!/^image\/(png|jpeg|webp)$/.test(file.type)) {
			setError("Please choose a PNG, JPEG or WebP photo.");
			return;
		}
		if (file.size > MAX_PHOTO_BYTES) {
			setError("Photo must be under 5 MB.");
			return;
		}
		setUploading(true);
		setError(null);
		setNotice(null);
		try {
			const url = await uploadAvatar(file);
			await updateProfile({
				playerId: player.id,
				avatarUrl: url
			});
			await refreshPlayer();
			setNotice("Profile photo updated.");
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setUploading(false);
		}
	}
	async function handleRemovePhoto() {
		setUploading(true);
		setError(null);
		setNotice(null);
		try {
			await updateProfile({
				playerId: player.id,
				avatarUrl: null
			});
			await refreshPlayer();
			setNotice("Profile photo removed.");
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setUploading(false);
		}
	}
	async function handleSave() {
		if (!canSave) return;
		setSaving(true);
		setError(null);
		setSaved(false);
		try {
			if (nameChanged) await updateProfile({
				playerId: player.id,
				displayName: trimmedName
			});
			if (emojiChanged) await updateProfile({
				playerId: player.id,
				avatarEmoji: emoji
			});
			await refreshPlayer();
			setSaved(true);
			setTimeout(() => setSaved(false), 3e3);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setSaving(false);
		}
	}
	async function copy(text, what) {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(what);
			setTimeout(() => setCopied(null), 2e3);
		} catch {
			setError("Could not copy. Select the text and copy it manually.");
		}
	}
	async function share() {
		if (navigator.share) await navigator.share({
			title: "Master Poker",
			text: `Join me on Master Poker with my code ${player.referral_code}`,
			url: referralLink
		}).catch(() => {});
		else copy(referralLink, "link");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "flex items-center gap-2 font-display text-2xl font-bold text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, { className: "h-6 w-6 text-gold" }), " Profile Settings"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-slate-400",
				children: "Your photo, name, game sounds and referral code."
			})] }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
				children: error
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold uppercase tracking-wider text-gold-300",
					children: "Profile photo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							disabled: uploading,
							"aria-label": "Change profile photo",
							className: "group relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gold/50 bg-slate-950 shadow-[var(--shadow-gold)]",
							children: [player.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: player.avatar_url,
								alt: "Your profile",
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-5xl",
								children: player.avatar_emoji
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 flex items-center justify-center bg-room/60 opacity-0 transition group-hover:opacity-100",
								children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-7 w-7 animate-spin text-gold" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-7 w-7 text-gold" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 text-center sm:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-white",
									children: player.display_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-500",
									children: "PNG, JPEG or WebP, up to 5 MB. Players see it at the table."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap justify-center gap-2 sm:justify-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: uploading,
										onClick: () => fileRef.current?.click(),
										className: "btn-gold inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold disabled:opacity-40",
										children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-4 w-4" }), player.avatar_url ? "Change photo" : "Upload photo"]
									}), player.avatar_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: uploading,
										onClick: () => void handleRemovePhoto(),
										className: "inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400/50 hover:text-rose-300 disabled:opacity-40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Remove"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/png,image/jpeg,image/webp",
							className: "hidden",
							onChange: (event) => {
								const file = event.target.files?.[0];
								event.target.value = "";
								if (file) handleUpload(file);
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold uppercase tracking-wider text-gold-300",
						children: "Game sounds"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-slate-400",
						children: "Set card, chip and table sounds separately. Saved to your account on every device."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundControls, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-spin rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-4 w-4" }), " Your referral code"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-slate-400",
						children: [
							"Share it with friends. When a friend who joined with your code makes their first recharge of ",
							formatPeso(settings.referralMinRecharge),
							" or more, you get ",
							formatPeso(settings.referralReward),
							" in your wallet."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-xl border border-gold/40 bg-room/70 px-5 py-3 font-mono text-2xl font-bold tracking-[0.35em] text-gold",
								children: player.referral_code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void copy(player.referral_code, "code"),
								className: "inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-gold/50 hover:text-gold",
								children: [
									copied === "code" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }),
									" ",
									copied === "code" ? "Copied" : "Copy code"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void share(),
								className: "btn-gold inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold",
								children: [
									copied === "link" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }),
									" ",
									copied === "link" ? "Link copied" : "Share invite link"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex items-center gap-2 text-sm text-slate-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-gold" }),
							" Friends joined with your code:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-white",
								children: referrals ?? "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-2 text-sm text-slate-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-4 w-4 text-gold" }),
							" Referral rewards earned:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-gold",
								children: earnings === null ? "—" : formatPeso(earnings)
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold uppercase tracking-wider text-gold-300",
						children: "Player name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						maxLength: 24,
						value: name,
						onChange: (event) => setName(event.target.value),
						className: "mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-gold-400/60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-slate-500",
						children: "2 to 24 characters. Other players see this at the table."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold uppercase tracking-wider text-gold-300",
						children: "Avatar emoji"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-slate-500",
						children: "Shown when you have no profile photo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-8 gap-2",
						children: AVATAR_EMOJIS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setEmoji(option),
							className: `flex h-12 items-center justify-center rounded-xl border text-2xl transition ${emoji === option ? "border-gold-400 bg-gold-400/10" : "border-white/10 hover:border-white/25"}`,
							children: option
						}, option))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !canSave || saving,
					onClick: handleSave,
					className: "btn-gold inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold disabled:opacity-40",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), saving ? "Saving..." : "Save changes"]
				}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 text-sm text-emerald-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Saved"]
				})]
			})
		]
	});
}
function SettingsRoute() {
	const { player } = useAuth();
	if (!player) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, { player }, player.id);
}
//#endregion
export { SettingsRoute as component };
