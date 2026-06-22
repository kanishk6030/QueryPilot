import { authFetch } from "@/lib/auth-fetch";

export interface CurrentUserClaims {
  sub: string;
  email?: string;
  name?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    avatar_url?: string;
  };
}

export interface CurrentUserResponse {
  user: CurrentUserClaims;
}

export function getDisplayName(user: CurrentUserClaims | null | undefined) {
  return user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.name ?? user?.email ?? "Signed in user";
}

export function getInitials(user: CurrentUserClaims | null | undefined) {
  const label = getDisplayName(user);
  const parts = label.split(/[\s@._-]+/).filter(Boolean);

  return (parts[0]?.[0] ?? "U").concat(parts[1]?.[0] ?? "").toUpperCase();
}

export async function fetchCurrentUser(): Promise<CurrentUserClaims> {
  const response = await authFetch(`${import.meta.env.VITE_API_URL}/me`);

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  const data = (await response.json()) as CurrentUserResponse;

  return data.user;
}
