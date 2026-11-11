import { r as __toESM } from "../_runtime.mjs";
import { l as require_react_dom, u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-D3DG1lwB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function Modal({ title, onClose, children }) {
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = previousOverflow;
		};
	}, [onClose]);
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: "flex max-h-[92dvh] w-full max-w-md animate-modal-in flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-slate-900 shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6 sm:py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold text-white",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Close",
					className: "-mr-1 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-5 sm:pt-5",
				children
			})]
		})
	}), document.body);
}
/** The owner's payment QR, used until the admin uploads a different one. */
var DEFAULT_QR_IMAGE = {
	version: 1,
	asset_id: "4b5131f9-b0d9-4ba4-959b-bb964a7bf3e9",
	project_id: "de3d16fa-9fe6-498e-ac1a-6cfb192db38d",
	url: "/__l5e/assets-v1/4b5131f9-b0d9-4ba4-959b-bb964a7bf3e9/payment-qr.jpg",
	r2_key: "a/v1/de3d16fa-9fe6-498e-ac1a-6cfb192db38d/4b5131f9-b0d9-4ba4-959b-bb964a7bf3e9/payment-qr.jpg",
	original_filename: "payment-qr.jpg",
	size: 162348,
	content_type: "image/jpeg",
	created_at: "2026-11-11T00:51:12Z"
}.url;
var MAX_QR_IMAGE_CHARS = 5e5;
var MAX_QR_IMAGE_SIDE = 640;
async function fileToQrDataUrl(file) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, MAX_QR_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bitmap.width * scale);
	canvas.height = Math.round(bitmap.height * scale);
	const context = canvas.getContext("2d");
	if (!context) throw new Error("Could not read this image.");
	context.fillStyle = "#ffffff";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();
	let dataUrl = canvas.toDataURL("image/png");
	if (dataUrl.length > MAX_QR_IMAGE_CHARS) dataUrl = canvas.toDataURL("image/jpeg", .9);
	if (dataUrl.length > MAX_QR_IMAGE_CHARS) throw new Error("This image is too large. Try a smaller screenshot.");
	return dataUrl;
}
//#endregion
export { Modal as n, fileToQrDataUrl as r, DEFAULT_QR_IMAGE as t };
