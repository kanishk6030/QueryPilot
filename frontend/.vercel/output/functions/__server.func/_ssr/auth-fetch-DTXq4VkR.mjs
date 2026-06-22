import { t as supabase } from "./supabase-29OZpDu2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-fetch-DTXq4VkR.js
async function authFetch(input, init = {}) {
	const { data: { session } } = await supabase.auth.getSession();
	const headers = new Headers(init.headers);
	if (session?.access_token) headers.set("Authorization", `Bearer ${session.access_token}`);
	return fetch(input, {
		...init,
		headers
	});
}
//#endregion
export { authFetch as t };
