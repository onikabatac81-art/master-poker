//#region node_modules/.nitro/vite/services/ssr/assets/format-GXPsoUco.js
function formatPeso(amount) {
	return `\u20B1${amount.toLocaleString("en-PH", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
function formatChips(amount) {
	return amount.toLocaleString("en-PH");
}
function formatDateTime(iso) {
	return new Date(iso).toLocaleString("en-PH", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function errorMessage(error) {
	return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
var METHOD_LABELS = {
	qrph: "QR payment",
	gcash: "GCash",
	maya: "Maya",
	bank: "Bank",
	bonus: "Bonus"
};
function methodLabel(method) {
	return METHOD_LABELS[method] ?? method;
}
function transactionTypeLabel(type) {
	if (type === "cash_in") return "Cash in";
	if (type === "bonus") return "Welcome bonus";
	if (type === "referral") return "Referral reward";
	return "Withdrawal";
}
//#endregion
export { methodLabel as a, formatPeso as i, formatChips as n, transactionTypeLabel as o, formatDateTime as r, errorMessage as t };
