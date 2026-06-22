import { t as authFetch } from "./auth-fetch-DTXq4VkR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-D41I0xfV.js
function getVerificationStatus(verification) {
	return (typeof verification === "string" ? verification : verification?.status)?.trim().toUpperCase() === "PASS" ? "PASS" : "FAIL";
}
function getVerificationReason(verification) {
	if (!verification || typeof verification === "string") return "";
	return verification.reason ?? "";
}
function formatHistoryDate(value) {
	if (!value) return "Unknown";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(date);
}
async function fetchHistory() {
	const response = await authFetch(`http://localhost:8000/history`);
	if (!response.ok) throw new Error("Failed to fetch history");
	return response.json();
}
//#endregion
export { getVerificationStatus as i, formatHistoryDate as n, getVerificationReason as r, fetchHistory as t };
