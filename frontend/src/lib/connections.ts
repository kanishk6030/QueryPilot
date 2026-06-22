import { authFetch } from "@/lib/auth-fetch";

export type DBKind = "postgres" | "mysql" | "sqlite";

export interface ApiConnection {
  id: string;
  name: string;
  kind: string;
  host?: string;
  port?: number | null;
  username?: string;
  password?: string;
  status?: "connected" | "idle" | "error";
  database?: string | null;
  lastUsed?: string;
}

export function toDBKind(kind: string): DBKind {
  if (kind === "mysql" || kind === "sqlite") return kind;
  return "postgres";
}

export async function fetchConnections(): Promise<ApiConnection[]> {
  const response = await authFetch(`${import.meta.env.VITE_API_URL}/connections`);

  if (!response.ok) {
    throw new Error("Failed to fetch connections");
  }

  return response.json();
}
