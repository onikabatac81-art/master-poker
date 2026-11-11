import { r as __toESM } from "../_runtime.mjs";
import { S as tableBotLevel, t as BOT_LEVELS } from "./session-D4g7BORC.mjs";
import { S as fetchQRCodes, T as resolveTransaction, a as adminSetQrImage, c as adminUpdateTableRules, d as fetchAllPokerTables, f as fetchAllTransactions, i as adminSetPlayerStatus, l as createSignedProofUrl, m as fetchIsAdmin, o as adminSetSetting, p as fetchGameLogs, r as adminSetBalance, s as adminUpdateQrDetails, u as fetchAllPlayers } from "./api-Cf0drsAo.mjs";
import { a as methodLabel, i as formatPeso, n as formatChips, r as formatDateTime, t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useTableSettings, t as useLiveData } from "./useTableSettings-Bq7lZs-1.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $ as Bot, B as Image, C as ScrollText, D as QrCode, F as Lock, I as LockOpen, J as Coins, L as Loader, O as Pencil, T as RotateCcw, U as Gift, V as ImagePlus, Z as Check, _ as ShieldCheck, g as SlidersHorizontal, it as ArrowDownToLine, l as Trophy, o as Users, t as X, tt as ArrowUpFromLine, v as ShieldAlert, w as Save, x as Settings2 } from "../_libs/lucide-react.mjs";
import { n as Modal, r as fileToQrDataUrl, t as DEFAULT_QR_IMAGE } from "./qr-D3DG1lwB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C82oTNta.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProofImage({ path }) {
	const [url, setUrl] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		createSignedProofUrl(path).then((signed) => {
			if (!active) return;
			if (signed) setUrl(signed);
			else setFailed(true);
		});
		return () => {
			active = false;
		};
	}, [path]);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs text-slate-500",
		children: "Proof image could not be loaded."
	});
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs text-slate-500",
		children: "Loading proof..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: url,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "mt-1 block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: "Payment proof",
			className: "max-h-32 rounded-lg border border-white/10"
		})
	});
}
function ApprovalsPanel({ transactions, error, onChanged }) {
	const pending = transactions.filter((tx) => tx.status === "pending");
	const [busyId, setBusyId] = (0, import_react.useState)(null);
	const [actionError, setActionError] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)({});
	async function decide(tx, decision) {
		setBusyId(tx.id);
		setActionError(null);
		try {
			const note = notes[tx.id]?.trim() || null;
			await resolveTransaction(tx.id, decision, note);
			await onChanged();
		} catch (err) {
			setActionError(errorMessage(err));
		} finally {
			setBusyId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-white",
					children: "Pending requests"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-gold-400/15 px-3 py-1 text-xs font-semibold text-gold-300",
					children: [pending.length, " waiting"]
				})]
			}),
			(error || actionError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
				children: actionError ?? error
			}),
			pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-500",
				children: "No pending requests. New cash-in and withdrawal requests appear here instantly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: pending.map((tx) => {
					const isCashIn = tx.type === "cash_in";
					const Icon = isCashIn ? ArrowDownToLine : ArrowUpFromLine;
					const busy = busyId === tx.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-white/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${isCashIn ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold text-white",
										children: [tx.players?.display_name ?? "Unknown player", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-2 text-xs font-medium uppercase tracking-wider text-slate-400",
											children: [
												isCashIn ? "Cash in" : tx.type === "bonus" ? "Welcome bonus" : "Withdraw",
												" · ",
												methodLabel(tx.method)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-slate-400",
										children: ["Ref / account: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-200",
											children: tx.account_details
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-slate-500",
										children: [
											"Requested ",
											formatDateTime(tx.created_at),
											" · Current balance ",
											formatPeso(tx.players?.balance ?? 0)
										]
									}),
									tx.proof_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-xs font-medium text-emerald-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3.5 w-3.5" }), " Proof of payment:"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofImage, { path: tx.proof_url })]
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-bold tabular-nums text-white",
								children: formatPeso(tx.amount)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								maxLength: 200,
								placeholder: "Admin note (optional)",
								value: notes[tx.id] ?? "",
								onChange: (event) => setNotes((prev) => ({
									...prev,
									[tx.id]: event.target.value
								})),
								className: "min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-gold-400/60"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busy,
									onClick: () => decide(tx, "reject"),
									className: "inline-flex items-center gap-1.5 rounded-xl border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/10 disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), " Reject"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busy,
									onClick: () => decide(tx, "approve"),
									className: "inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
										" ",
										busy ? "Saving..." : "Approve"
									]
								})]
							})]
						})]
					}, tx.id);
				})
			})
		]
	});
}
function PlayersPanel() {
	const load = (0, import_react.useCallback)(() => fetchAllPlayers(), []);
	const { data: players, error, refresh } = useLiveData(load, ["players"], []);
	const [query, setQuery] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [actionError, setActionError] = (0, import_react.useState)(null);
	const visible = players.filter((player) => player.display_name.toLowerCase().includes(query.trim().toLowerCase()));
	async function toggleStatus(player) {
		setActionError(null);
		try {
			await adminSetPlayerStatus(player.id, player.status === "active" ? "frozen" : "active");
			await refresh();
		} catch (err) {
			setActionError(errorMessage(err));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					placeholder: "Search player name",
					value: query,
					onChange: (event) => setQuery(event.target.value),
					className: "w-full max-w-xs rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-gold-400/60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-slate-500",
					children: [players.length, " players"]
				})]
			}),
			(error || actionError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
				children: actionError ?? error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-2xl border border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-white/5 text-xs uppercase tracking-wider text-slate-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Player"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Referral code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Balance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Joined"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-medium",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "divide-y divide-white/5",
						children: [visible.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "transition hover:bg-white/[0.03]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium text-white",
									children: player.display_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-mono text-xs tracking-widest text-gold-300",
									children: player.referral_code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 tabular-nums text-emerald-300",
									children: formatPeso(player.balance)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${player.status === "active" ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-400/15 text-rose-300"}`,
										children: player.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-slate-400",
									children: formatDateTime(player.created_at)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setEditing(player),
											className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-gold-400/60 hover:text-gold-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Balance"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => toggleStatus(player),
											className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-rose-400/60 hover:text-rose-300",
											children: [player.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-3.5 w-3.5" }), player.status === "active" ? "Freeze" : "Unfreeze"]
										})]
									})
								})
							]
						}, player.id)), visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "px-4 py-8 text-center text-slate-500",
							children: "No players found."
						}) })]
					})]
				})
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BalanceEditor, {
				player: editing,
				onClose: () => setEditing(null),
				onSaved: () => {
					setEditing(null);
					refresh();
				}
			})
		]
	});
}
function BalanceEditor({ player, onClose, onSaved }) {
	const [value, setValue] = (0, import_react.useState)(String(player.balance));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const parsed = Number(value);
	const valid = value !== "" && Number.isFinite(parsed) && parsed >= 0;
	async function save() {
		setSaving(true);
		setError(null);
		try {
			await adminSetBalance(player.id, parsed);
			onSaved();
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: `Edit balance: ${player.display_name}`,
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-slate-400",
					children: [
						"Current balance ",
						formatPeso(player.balance),
						". The player sees the change instantly."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					min: 0,
					step: "0.01",
					"aria-label": "New balance",
					value,
					onChange: (event) => setValue(event.target.value),
					className: "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-lg font-semibold tabular-nums text-white outline-none focus:border-gold-400/60"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "text-sm text-rose-300",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !valid || saving,
					onClick: save,
					className: "w-full rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 py-2.5 text-sm font-bold text-slate-900 disabled:opacity-40",
					children: saving ? "Saving..." : "Save balance"
				})
			]
		})
	});
}
var INPUT = "mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-gold-400/60";
/** Admin: change the payment QR players scan when they recharge. */
function QrCodesPanel() {
	const [codes, setCodes] = (0, import_react.useState)([]);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busyId, setBusyId] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	async function load() {
		try {
			const rows = await fetchQRCodes();
			setCodes(rows);
			setDrafts(Object.fromEntries(rows.map((qr) => [qr.id, {
				label: qr.label,
				accountName: qr.account_name,
				accountNumber: qr.account_number
			}])));
			setError(null);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function run(qr, action, message) {
		setBusyId(qr.id);
		setError(null);
		setNotice(null);
		try {
			await action();
			await load();
			setNotice(message);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setBusyId(null);
		}
	}
	async function handleFile(qr, file) {
		if (!file.type.startsWith("image/")) {
			setError("Please choose an image file (PNG, JPEG or WebP).");
			return;
		}
		try {
			const dataUrl = await fileToQrDataUrl(file);
			await run(qr, () => adminSetQrImage(qr.id, dataUrl), "New QR code saved. Players see it on their next recharge.");
		} catch (err) {
			setError(errorMessage(err));
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-center text-sm text-slate-400",
		children: "Loading QR codes..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-bold text-white",
				children: "Payment QR code"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-slate-400",
				children: "This is the QR players scan to recharge. Upload a new image any time to change where payments go."
			})] }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
				children: error
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: codes.map((qr) => {
					const busy = busyId === qr.id;
					const hasCustomImage = !!qr.image_data;
					const draft = drafts[qr.id];
					if (!draft) return null;
					const dirty = draft.label !== qr.label || draft.accountName !== qr.account_name || draft.accountNumber !== qr.account_number;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass-panel flex flex-col gap-5 rounded-2xl p-5 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl bg-foreground p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: qr.image_data ?? DEFAULT_QR_IMAGE,
										alt: `${qr.label} QR code`,
										className: "h-44 w-44 rounded-xl object-contain"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300",
									children: hasCustomImage ? "Uploaded" : "Original"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid w-full grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `btn-gold inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold ${busy ? "pointer-events-none opacity-50" : ""}`,
										children: [
											busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-4 w-4" }),
											"Change QR",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/png,image/jpeg,image/webp",
												className: "hidden",
												disabled: busy,
												onChange: (event) => {
													const file = event.target.files?.[0];
													event.target.value = "";
													if (file) handleFile(qr, file);
												}
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: busy || !hasCustomImage,
										onClick: () => void run(qr, () => adminSetQrImage(qr.id, null), "Back to the original QR code."),
										className: "inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-white/30 disabled:opacity-40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Original"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs text-slate-400",
									children: ["Title shown above the QR", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: INPUT,
										maxLength: 40,
										value: draft.label,
										onChange: (event) => setDrafts((d) => ({
											...d,
											[qr.id]: {
												...draft,
												label: event.target.value
											}
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs text-slate-400",
									children: ["Account name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: INPUT,
										maxLength: 60,
										value: draft.accountName,
										onChange: (event) => setDrafts((d) => ({
											...d,
											[qr.id]: {
												...draft,
												accountName: event.target.value
											}
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs text-slate-400",
									children: ["Account number or note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: INPUT,
										maxLength: 60,
										value: draft.accountNumber,
										onChange: (event) => setDrafts((d) => ({
											...d,
											[qr.id]: {
												...draft,
												accountNumber: event.target.value
											}
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busy || !dirty,
									onClick: () => void run(qr, () => adminUpdateQrDetails(qr.id, draft.label, draft.accountName, draft.accountNumber), "QR details saved."),
									className: "btn-gold mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save details"]
								})
							]
						})]
					}, qr.id);
				})
			})
		]
	});
}
var LEVEL_STYLES = {
	info: "bg-sky-400/15 text-sky-300",
	warn: "bg-amber-400/15 text-amber-300",
	error: "bg-rose-400/15 text-rose-300",
	admin: "bg-gold-400/15 text-gold-300"
};
var FILTERS = [
	"all",
	"admin",
	"info",
	"warn",
	"error"
];
function SystemLogsPanel() {
	const load = (0, import_react.useCallback)(() => fetchGameLogs(), []);
	const { data: logs, error } = useLiveData(load, ["game_logs"], []);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const visible = (0, import_react.useMemo)(() => filter === "all" ? logs : logs.filter((log) => log.level === filter), [logs, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": "Log level",
					className: "flex flex-wrap gap-2",
					children: FILTERS.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": filter === level,
						onClick: () => setFilter(level),
						className: `rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${filter === level ? "bg-white text-slate-900" : "border border-white/10 text-slate-300 hover:border-white/25"}`,
						children: level
					}, level))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 text-xs text-slate-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-emerald-400" }), " Live"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[560px] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/80",
				children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-10 text-center text-sm text-slate-500",
					children: "No log entries yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-white/5 font-mono text-xs",
					children: visible.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3 px-4 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `mt-px shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${LEVEL_STYLES[log.level]}`,
								children: log.level
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 break-words text-slate-200",
								children: log.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-slate-500",
								children: formatDateTime(log.created_at)
							})
						]
					}, log.id))
				})
			})
		]
	});
}
var SKILL_LABEL = {
	easy: "Easy",
	normal: "Normal",
	hard: "Hard"
};
function draftOf(table) {
	return {
		level: tableBotLevel(table.bot_level),
		rake: table.rake_percent === null ? "" : String(Number(table.rake_percent))
	};
}
/** Admin: the bot skill is fixed per table (players cannot pick it), plus an optional house cut. */
function TableRulesPanel({ houseRake }) {
	const [tables, setTables] = (0, import_react.useState)([]);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		try {
			const rows = await fetchAllPokerTables();
			setTables(rows);
			setDrafts(Object.fromEntries(rows.map((row) => [row.id, draftOf(row)])));
			setError(null);
		} catch (err) {
			setError(errorMessage(err));
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	async function save(table) {
		const draft = drafts[table.id];
		const rake = draft.rake.trim() === "" ? null : Number(draft.rake);
		if (rake !== null && (!Number.isFinite(rake) || rake < 0 || rake > 20)) {
			setError("House cut must be between 0 and 20 percent, or blank for the house default.");
			return;
		}
		setSaving(table.id);
		setError(null);
		try {
			await adminUpdateTableRules(table.id, draft.level, rake);
			await load();
			setSaved(table.id);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setSaving(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-panel rounded-2xl p-5 lg:col-span-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" }), " Table rules"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: [
					"Each table plays with one fixed bot skill. Players can no longer choose an easier level. Leave the cut blank to use the house default (",
					houseRake,
					"%)."
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 divide-y divide-white/5",
				children: tables.map((table) => {
					const draft = drafts[table.id];
					if (!draft) return null;
					const original = draftOf(table);
					const dirty = original.level !== draft.level || original.rake !== draft.rake;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-[9rem] flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-white",
									children: table.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-500",
									children: [
										"Blinds ",
										formatPeso(Number(table.small_blind)),
										"/",
										formatPeso(Number(table.big_blind)),
										!table.is_active && " · closed"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								role: "radiogroup",
								"aria-label": `Bot skill for ${table.name}`,
								children: BOT_LEVELS.map((level) => {
									const on = draft.level === level;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "radio",
										"aria-checked": on,
										onClick: () => {
											setSaved(null);
											setDrafts((current) => ({
												...current,
												[table.id]: {
													...draft,
													level
												}
											}));
										},
										className: `rounded-full border px-3 py-1 text-xs font-bold transition ${on ? "border-gold/60 bg-gold/15 text-gold" : "border-white/10 text-slate-500 hover:border-white/25"}`,
										children: SKILL_LABEL[level]
									}, level);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-1.5 text-xs text-slate-400",
								children: [
									"Cut",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										max: 20,
										step: .5,
										placeholder: String(houseRake),
										"aria-label": `House cut for ${table.name}`,
										value: draft.rake,
										onChange: (event) => {
											setSaved(null);
											setDrafts((current) => ({
												...current,
												[table.id]: {
													...draft,
													rake: event.target.value
												}
											}));
										},
										className: "w-16 rounded-lg border border-white/10 bg-slate-950 px-2 py-1 text-sm text-white tabular-nums outline-none focus:border-gold-400/60"
									}),
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: !dirty || saving !== null,
								onClick: () => void save(table),
								className: "btn-gold inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold disabled:opacity-30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }),
									" ",
									saving === table.id ? "Saving…" : "Save"
								]
							}),
							saved === table.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-emerald-300",
								children: "Saved"
							})
						]
					}, table.id);
				})
			})
		]
	});
}
var AGGRESSION_OPTIONS = [
	{
		value: "passive",
		label: "Passive",
		hint: "Calls often, rarely bluffs or re-raises."
	},
	{
		value: "balanced",
		label: "Balanced",
		hint: "Mixed play with occasional bluffs."
	},
	{
		value: "aggressive",
		label: "Aggressive",
		hint: "Raises frequently and bluffs more."
	}
];
function TableSettingsPanel() {
	const { settings, error: loadError, refresh } = useTableSettings();
	const [rake, setRake] = (0, import_react.useState)(settings.rakePercent);
	const [minBuyIn, setMinBuyIn] = (0, import_react.useState)(String(settings.minBuyIn));
	const [maxBuyIn, setMaxBuyIn] = (0, import_react.useState)(String(settings.maxBuyIn));
	const [bonus, setBonus] = (0, import_react.useState)(String(settings.welcomeBonus));
	const [referralReward, setReferralReward] = (0, import_react.useState)(String(settings.referralReward));
	const [referralMin, setReferralMin] = (0, import_react.useState)(String(settings.referralMinRecharge));
	const [winRate, setWinRate] = (0, import_react.useState)(settings.playerWinRate);
	const [saving, setSaving] = (0, import_react.useState)(null);
	const [saveError, setSaveError] = (0, import_react.useState)(null);
	const [savedKey, setSavedKey] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setRake(settings.rakePercent);
		setMinBuyIn(String(settings.minBuyIn));
		setMaxBuyIn(String(settings.maxBuyIn));
		setBonus(String(settings.welcomeBonus));
		setReferralReward(String(settings.referralReward));
		setReferralMin(String(settings.referralMinRecharge));
		setWinRate(settings.playerWinRate);
	}, [settings]);
	async function save(key, value) {
		setSaving(key);
		setSaveError(null);
		setSavedKey(null);
		try {
			await adminSetSetting(key, value);
			await refresh();
			setSavedKey(key);
		} catch (err) {
			setSaveError(errorMessage(err));
		} finally {
			setSaving(null);
		}
	}
	const minValue = Number(minBuyIn);
	const maxValue = Number(maxBuyIn);
	const rewardValue = Number(referralReward);
	const referralMinValue = Number(referralMin);
	const referralValid = rewardValue >= 0 && rewardValue <= 1e4 && referralMinValue >= 1 && referralMinValue <= 1e6;
	const referralChanged = rewardValue !== settings.referralReward || referralMinValue !== settings.referralMinRecharge;
	const buyInValid = Number.isInteger(minValue) && Number.isInteger(maxValue) && minValue >= 100 && maxValue >= minValue;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [
			(loadError || saveError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300 lg:col-span-2",
				children: saveError ?? loadError
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-white/10 bg-slate-900/70 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold uppercase tracking-wider text-slate-400",
						children: "House cut (default)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "The house keeps this share of every pot as rake, unless a table has its own cut below. Players see the rate on the table, so it is transparent."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-4xl font-bold tabular-nums text-gold-300",
							children: [rake, "%"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-slate-500",
							children: [
								"Player return ",
								100 - rake,
								"%"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 20,
						step: 1,
						"aria-label": "House rake percent",
						value: rake,
						onChange: (event) => setRake(Number(event.target.value)),
						className: "mt-4 w-full accent-gold-400"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex justify-between text-xs text-slate-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0%" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "20%" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: rake === settings.rakePercent || saving !== null,
						onClick: () => save("rake_percent", rake),
						className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-4 py-2 text-sm font-bold text-slate-900 transition disabled:opacity-40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
							" ",
							saving === "rake_percent" ? "Saving..." : "Save rake"
						]
					}),
					savedKey === "rake_percent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-emerald-300",
						children: "Saved. New hands use this rate."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-white/10 bg-slate-900/70 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" }), " Bot aggression"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "Controls how the bots at the table raise, call, and bluff."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "radiogroup",
						"aria-label": "Bot aggression",
						className: "mt-5 grid gap-2",
						children: AGGRESSION_OPTIONS.map((option) => {
							const active = settings.botAggression === option.value;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "radio",
								"aria-checked": active,
								disabled: saving !== null,
								onClick: () => !active && save("bot_aggression", option.value),
								className: `rounded-xl border px-4 py-3 text-left transition ${active ? "border-gold-400/70 bg-gold-400/10" : "border-white/10 hover:border-white/25"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold text-white",
									children: option.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-slate-400",
									children: option.hint
								})]
							}, option.value);
						})
					}),
					saving === "bot_aggression" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-slate-400",
						children: "Saving..."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-white/10 bg-slate-900/70 p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4" }), " Player winning rate"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "Controls how often players win against the bots across all cash tables. 50% is neutral fair play — lower makes the bots tougher so players lose more, higher makes the bots looser so players win more. Applies to every new hand dealt after saving."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-4xl font-bold tabular-nums text-gold-300",
							children: [winRate, "%"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-slate-500",
							children: winRate < 35 ? "Bots play tough" : winRate > 65 ? "Players favored" : "Neutral"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						step: 1,
						"aria-label": "Player winning rate",
						value: winRate,
						onChange: (event) => setWinRate(Number(event.target.value)),
						className: "mt-4 w-full accent-gold-400"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex justify-between text-xs text-slate-600",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0% (house favored)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "50% neutral" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100% (player favored)" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: winRate === settings.playerWinRate || saving !== null,
						onClick: () => save("player_win_rate", winRate),
						className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-4 py-2 text-sm font-bold text-slate-900 transition disabled:opacity-40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
							" ",
							saving === "player_win_rate" ? "Saving..." : "Save winning rate"
						]
					}),
					savedKey === "player_win_rate" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-emerald-300",
						children: "Saved. New hands use this rate."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-white/10 bg-slate-900/70 p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold uppercase tracking-wider text-slate-400",
						children: "Table buy-in limits"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "Minimum is 100 chips. Maximum must be at least the minimum."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-slate-400",
								children: "Minimum buy-in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 100,
								step: 1,
								value: minBuyIn,
								onChange: (event) => setMinBuyIn(event.target.value),
								className: "mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-white tabular-nums outline-none focus:border-gold-400/60"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-slate-400",
								children: "Maximum buy-in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 100,
								step: 1,
								value: maxBuyIn,
								onChange: (event) => setMaxBuyIn(event.target.value),
								className: "mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-white tabular-nums outline-none focus:border-gold-400/60"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !buyInValid || saving !== null || minValue === settings.minBuyIn && maxValue === settings.maxBuyIn,
							onClick: async () => {
								await save("min_buy_in", minValue);
								await save("max_buy_in", maxValue);
							},
							className: "inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-4 py-2 text-sm font-bold text-slate-900 transition disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save buy-in limits"]
						}), buyInValid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-slate-500",
							children: [
								"Range ",
								formatChips(minValue),
								" to ",
								formatChips(maxValue),
								" chips"
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-rose-300",
							children: "Enter whole numbers, minimum 100, max at least min."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel rounded-2xl p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-4 w-4" }), " Welcome bonus"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "Every new player gets this amount in their wallet the first time they sign in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-xl border border-white/10 bg-slate-950 px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400",
									children: "₱"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									max: 1e4,
									"aria-label": "Welcome bonus amount",
									value: bonus,
									onChange: (event) => setBonus(event.target.value),
									className: "w-28 bg-transparent px-2 py-2 text-white tabular-nums outline-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: saving !== null || Number(bonus) === settings.welcomeBonus || !(Number(bonus) >= 0 && Number(bonus) <= 1e4),
								onClick: () => save("welcome_bonus", Number(bonus)),
								className: "btn-gold inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold disabled:opacity-40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
									" ",
									saving === "welcome_bonus" ? "Saving..." : "Save bonus"
								]
							}),
							savedKey === "welcome_bonus" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-emerald-300",
								children: "Saved. New players get this amount."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-panel rounded-2xl p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " Referral reward"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "When a player who joined with a referral code gets their first recharge of at least the minimum approved, the friend who invited them receives this reward. It is paid once per invited player."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-end gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-slate-400",
									children: "Reward to inviter"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center rounded-xl border border-white/10 bg-slate-950 px-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "₱"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										max: 1e4,
										"aria-label": "Referral reward amount",
										value: referralReward,
										onChange: (event) => setReferralReward(event.target.value),
										className: "w-28 bg-transparent px-2 py-2 text-white tabular-nums outline-none"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-slate-400",
									children: "Minimum first recharge"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center rounded-xl border border-white/10 bg-slate-950 px-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "₱"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										"aria-label": "Minimum recharge for referral reward",
										value: referralMin,
										onChange: (event) => setReferralMin(event.target.value),
										className: "w-28 bg-transparent px-2 py-2 text-white tabular-nums outline-none"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: saving !== null || !referralValid || !referralChanged,
								onClick: async () => {
									if (rewardValue !== settings.referralReward) await save("referral_reward", rewardValue);
									if (referralMinValue !== settings.referralMinRecharge) await save("referral_min_recharge", referralMinValue);
								},
								className: "btn-gold inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold disabled:opacity-40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
									" ",
									saving?.startsWith("referral") ? "Saving..." : "Save referral reward"
								]
							}),
							savedKey?.startsWith("referral") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-emerald-300",
								children: "Saved."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRulesPanel, { houseRake: settings.rakePercent })
		]
	});
}
var TABS = [
	{
		id: "approvals",
		label: "Approvals",
		icon: Coins
	},
	{
		id: "players",
		label: "Players",
		icon: Users
	},
	{
		id: "settings",
		label: "Table settings",
		icon: Settings2
	},
	{
		id: "qr",
		label: "Payment QR",
		icon: QrCode
	},
	{
		id: "logs",
		label: "System logs",
		icon: ScrollText
	}
];
function AdminPage() {
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetchIsAdmin().then((value) => active && setIsAdmin(value)).catch(() => active && setIsAdmin(false));
		return () => {
			active = false;
		};
	}, []);
	if (isAdmin === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center py-20 text-slate-400",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "mr-2 h-5 w-5 animate-spin" }), " Checking access..."]
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-[50vh] max-w-md flex-col justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 text-xl font-semibold text-white",
					children: "Admins only"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate-400",
					children: "Your account does not have admin access. Ask the room owner to give your account the admin role."
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {});
}
function AdminDashboard() {
	const [tab, setTab] = (0, import_react.useState)("approvals");
	const load = (0, import_react.useCallback)(() => fetchAllTransactions(), []);
	const transactions = useLiveData(load, ["transactions", "players"], []);
	const pendingCount = transactions.data.filter((tx) => tx.status === "pending").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "flex items-center gap-2 text-xl font-semibold text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-gold-300" }), " Admin control panel"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400",
					children: "Every change here is logged and visible to players where it applies."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				role: "tablist",
				"aria-label": "Admin sections",
				className: "flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/70 p-1",
				children: TABS.map(({ id, label, icon: Icon }) => {
					const active = tab === id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": active,
						onClick: () => setTab(id),
						className: `inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${active ? "btn-gold shadow" : "text-slate-300 hover:bg-white/5 hover:text-white"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
							label,
							id === "approvals" && pendingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-gold-400 px-2 py-0.5 text-[11px] font-bold text-slate-900",
								children: pendingCount
							})
						]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "animate-fade-in",
				children: [
					tab === "approvals" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalsPanel, {
						transactions: transactions.data,
						error: transactions.error,
						onChanged: transactions.refresh
					}),
					tab === "players" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayersPanel, {}),
					tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSettingsPanel, {}),
					tab === "qr" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCodesPanel, {}),
					tab === "logs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemLogsPanel, {})
				]
			}, tab)
		]
	});
}
var SplitComponent = AdminPage;
//#endregion
export { SplitComponent as component };
