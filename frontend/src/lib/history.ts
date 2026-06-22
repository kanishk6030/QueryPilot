import { authFetch } from "@/lib/auth-fetch";

export type VerificationPayload = string | { status?: string; reason?: string | null } | null;

export interface QueryHistoryItem {
  id: string;
  user_id?: string;
  connection_id?: string | null;
  question: string;
  sql_query?: string | null;
  verification?: VerificationPayload;
  created_at?: string;
}

export function getVerificationStatus(verification: VerificationPayload | undefined): "PASS" | "FAIL" {
  const status = typeof verification === "string" ? verification : verification?.status;

  return status?.trim().toUpperCase() === "PASS" ? "PASS" : "FAIL";
}

export function getVerificationReason(verification: VerificationPayload | undefined) {
  if (!verification || typeof verification === "string") {
    return "";
  }

  return verification.reason ?? "";
}

export function formatHistoryDate(value: string | undefined) {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function fetchHistory(): Promise<QueryHistoryItem[]> {
  const response = await authFetch(`${import.meta.env.VITE_API_URL}/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  return response.json();
}
