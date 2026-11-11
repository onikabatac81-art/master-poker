import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-SAOWSTXM.mjs";
import { E as submitTransactionRequest, S as fetchQRCodes, _ as fetchPlayer, k as uploadPaymentProof, y as fetchPlayerTransactions } from "./api-DH6oy-PM.mjs";
import { i as formatPeso, t as errorMessage } from "./format-GXPsoUco.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as QrCode, G as Download, L as Loader, V as ImagePlus, X as CircleCheck, h as Smartphone, t as X } from "../_libs/lucide-react.mjs";
import { n as Modal, t as DEFAULT_QR_IMAGE } from "./qr-D3DG1lwB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useWallet-QjkQKyog.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PaymentQrCard({ qr }) {
	const src = qr.image_data ?? DEFAULT_QR_IMAGE;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-gold/30 bg-room/70 p-3 sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-4 w-4" }),
				" ",
				qr.label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-col items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-2xl bg-foreground p-2 shadow-[var(--shadow-gold)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: `${qr.label} QR code`,
						className: "aspect-square w-[min(15rem,62vw,34dvh)] rounded-xl object-contain sm:w-64"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-x-3 top-3 h-0.5 animate-scan-line rounded-full bg-gold/80 shadow-[0_0_12px_var(--gold)]"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "break-words text-sm font-semibold text-white",
						children: qr.account_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "break-all text-xs text-slate-400",
						children: qr.account_number
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 text-center text-xs text-slate-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-3.5 w-3.5 text-gold" }), " Open GCash, Maya or your bank app and scan this code."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: src,
					download: "master-poker-payment-qr",
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-1.5 rounded-lg border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Save QR to phone"]
				})
			]
		})]
	});
}
var WITHDRAW_METHODS = [
	{
		value: "gcash",
		label: "GCash"
	},
	{
		value: "maya",
		label: "Maya"
	},
	{
		value: "bank",
		label: "Bank"
	}
];
var CASH_IN_PRESETS = [
	100,
	200,
	500,
	1e3,
	2e3,
	5e3
];
var MAX_DETAILS_LENGTH = 60;
var MAX_PROOF_BYTES = 5242880;
function Step({ n, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-primary-foreground",
			children: n
		}), title]
	});
}
function RequestModal({ mode, playerId, balance, onClose }) {
	const isCashIn = mode === "cash_in";
	const [method, setMethod] = (0, import_react.useState)("gcash");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [details, setDetails] = (0, import_react.useState)("");
	const [proofFile, setProofFile] = (0, import_react.useState)(null);
	const [proofPreview, setProofPreview] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	const [qr, setQr] = (0, import_react.useState)(null);
	const [qrLoading, setQrLoading] = (0, import_react.useState)(isCashIn);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!isCashIn) return;
		let active = true;
		fetchQRCodes().then((codes) => active && setQr(codes[0] ?? null)).catch(() => {}).finally(() => active && setQrLoading(false));
		return () => {
			active = false;
		};
	}, [isCashIn]);
	(0, import_react.useEffect)(() => () => {
		if (proofPreview) URL.revokeObjectURL(proofPreview);
	}, [proofPreview]);
	const amountValue = Number(amount);
	const amountError = amount === "" ? null : !(amountValue > 0) ? "Enter an amount greater than zero." : !isCashIn && amountValue > balance ? `You can withdraw up to ${formatPeso(balance)}.` : null;
	function handleFileSelect(file) {
		if (!/^image\/(png|jpeg|webp)$/.test(file.type)) {
			setError("Please upload a PNG, JPEG or WebP screenshot.");
			return;
		}
		if (file.size > MAX_PROOF_BYTES) {
			setError("Screenshot must be under 5 MB.");
			return;
		}
		setProofFile(file);
		setProofPreview(URL.createObjectURL(file));
		setError(null);
	}
	async function handleSubmit(event) {
		event.preventDefault();
		if (amountError || !(amountValue > 0)) {
			setError(amountError ?? "Enter an amount greater than zero.");
			return;
		}
		if (isCashIn && !proofFile) {
			setError("Upload a screenshot of your payment so the admin can approve it.");
			return;
		}
		if (!isCashIn && details.trim().length < 4) {
			setError("Enter your account number and name.");
			return;
		}
		setSubmitting(true);
		setError(null);
		try {
			const proofUrl = isCashIn && proofFile ? await uploadPaymentProof(proofFile) : null;
			await submitTransactionRequest({
				playerId,
				type: mode,
				amount: amountValue,
				method: isCashIn ? qr?.method ?? "qrph" : method,
				accountDetails: isCashIn ? details.trim() || "QR payment" : details.trim(),
				proofUrl,
				qrCodeId: isCashIn ? qr?.id ?? null : null
			});
			window.__lovableEvents?.track?.("project.wallet_request_submitted", {
				request_type: mode,
				method: isCashIn ? "qr" : method,
				amount: amountValue
			});
			setDone(true);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: isCashIn ? "Recharge your wallet" : "Withdraw from your wallet",
		onClose,
		children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 py-4 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-14 w-14 text-live" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-bold text-white",
					children: "Request sent"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-300",
					children: "The admin will check it shortly. Your balance updates automatically once it is approved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "btn-gold w-full rounded-xl py-2.5 text-sm font-bold",
					children: "Done"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4 sm:space-y-5",
			children: [
				isCashIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							n: 1,
							title: "Scan and pay"
						}), qrLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center py-16 text-slate-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "mr-2 h-5 w-5 animate-spin" }), " Loading QR code..."]
						}) : qr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentQrCard, { qr }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-200",
							children: "Payment QR is not available right now. Please contact the admin."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								n: 2,
								title: "Amount you paid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: CASH_IN_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAmount(String(preset)),
									"aria-pressed": amountValue === preset,
									className: `rounded-lg border py-2 text-sm font-semibold tabular-nums transition ${amountValue === preset ? "border-gold bg-gold/15 text-gold" : "border-white/10 text-slate-300 hover:border-gold/40"}`,
									children: ["₱", preset.toLocaleString()]
								}, preset))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "request-amount",
								type: "number",
								min: "1",
								step: "0.01",
								"aria-label": "Amount in pesos",
								placeholder: "Or type another amount",
								value: amount,
								onChange: (event) => setAmount(event.target.value),
								className: "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-lg font-semibold tabular-nums text-white outline-none placeholder:text-base placeholder:font-normal sm:placeholder:text-sm placeholder:text-slate-600 focus:border-gold-400/60"
							}),
							amountError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-300",
								children: amountError
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								n: 3,
								title: "Upload proof of payment"
							}),
							proofPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative inline-block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: proofPreview,
									alt: "Payment proof",
									className: "max-h-40 rounded-xl border border-white/10"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Remove screenshot",
									onClick: () => {
										setProofFile(null);
										setProofPreview(null);
									},
									className: "absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gold/40 bg-slate-950 py-6 text-sm text-slate-300 transition hover:border-gold hover:text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-6 w-6" }), "Tap to upload your payment screenshot"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/png,image/jpeg,image/webp",
								className: "hidden",
								onChange: (event) => {
									const file = event.target.files?.[0];
									event.target.value = "";
									if (file) handleFileSelect(file);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								maxLength: MAX_DETAILS_LENGTH,
								value: details,
								onChange: (event) => setDetails(event.target.value),
								placeholder: "Reference number (optional)",
								"aria-label": "Reference number",
								className: "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-base text-white outline-none placeholder:text-slate-600 sm:text-sm focus:border-gold-400/60"
							})
						]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl border border-gold/30 bg-room/70 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wider text-slate-400",
							children: "Available to withdraw"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-bold tabular-nums text-gold",
							children: formatPeso(balance)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-400",
						children: "Tell us where to send your money. Your balance is deducted once the admin approves it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mb-2 text-xs font-medium uppercase tracking-wider text-slate-400",
							children: "Send to"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: WITHDRAW_METHODS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMethod(option.value),
								"aria-pressed": method === option.value,
								className: `rounded-lg border py-2 text-sm font-medium transition ${method === option.value ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-slate-300 hover:border-white/30"}`,
								children: option.label
							}, option.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "request-amount",
								className: "text-xs font-medium uppercase tracking-wider text-slate-400",
								children: "Amount (PHP)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "request-amount",
								type: "number",
								min: "1",
								step: "0.01",
								value: amount,
								onChange: (event) => setAmount(event.target.value),
								className: "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-lg font-semibold tabular-nums text-white outline-none focus:border-gold-400/60"
							}),
							amountError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-amber-300",
								children: amountError
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "request-details",
							className: "text-xs font-medium uppercase tracking-wider text-slate-400",
							children: "Account number and name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "request-details",
							type: "text",
							maxLength: MAX_DETAILS_LENGTH,
							value: details,
							onChange: (event) => setDetails(event.target.value),
							placeholder: "e.g. 09XX XXX XXXX - Juan D.",
							className: "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none placeholder:text-slate-600 sm:text-sm focus:border-gold-400/60"
						})]
					})
				] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: submitting || !!amountError || isCashIn && !qr,
					className: "btn-gold w-full rounded-xl py-3 text-sm font-bold disabled:opacity-40",
					children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }), " Sending..."]
					}) : isCashIn ? "Submit recharge" : "Submit withdrawal"
				})
			]
		})
	});
}
function useWallet(playerId) {
	const [player, setPlayer] = (0, import_react.useState)(null);
	const [transactions, setTransactions] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	const reload = (0, import_react.useCallback)(async () => {
		try {
			const [nextPlayer, nextTransactions] = await Promise.all([fetchPlayer(playerId), fetchPlayerTransactions(playerId)]);
			setPlayer(nextPlayer);
			setTransactions(nextTransactions);
			setError(null);
		} catch (err) {
			setError(errorMessage(err));
		}
	}, [playerId]);
	(0, import_react.useEffect)(() => {
		reload();
		const channel = supabase.channel(`wallet-${playerId}`).on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "players",
			filter: `id=eq.${playerId}`
		}, (payload) => {
			setPlayer((previous) => previous ? {
				...previous,
				...payload.new
			} : previous);
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "transactions",
			filter: `player_id=eq.${playerId}`
		}, () => {
			reload();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [playerId, reload]);
	return {
		player,
		transactions,
		error,
		reload
	};
}
//#endregion
export { useWallet as n, RequestModal as t };
