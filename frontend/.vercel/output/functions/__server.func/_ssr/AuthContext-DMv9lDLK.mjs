import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-29OZpDu2.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-DMv9lDLK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var signup = async (email, password, name) => {
	return await supabase.auth.signUp({
		email,
		password,
		options: { data: { name } }
	});
};
var login = async (email, password) => {
	return await supabase.auth.signInWithPassword({
		email,
		password
	});
};
var loginWithGithub = async () => {
	return await supabase.auth.signInWithOAuth({
		provider: "github",
		options: { redirectTo: `${window.location.origin}/dashboard` }
	});
};
var logout = async () => {
	return await supabase.auth.signOut();
};
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			setSession(nextSession);
			setUser(nextSession?.user ?? null);
			setLoading(false);
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		session,
		loading,
		login,
		signup,
		logout
	}), [
		user,
		session,
		loading
	]);
	return (0, import_react.createElement)(AuthContext.Provider, { value }, children);
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used inside AuthProvider");
	return context;
}
//#endregion
export { loginWithGithub as n, useAuth as r, AuthProvider as t };
