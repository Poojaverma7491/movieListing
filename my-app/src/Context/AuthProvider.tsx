import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { auth } from "../Firebase";
import { browserLocalPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { AuthContextType, User } from "../Utils/Interfaces";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Not used in AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Call backend with Firebase ID token
  const authedFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken(false) : null;

    const headers = new Headers(init.headers || {});
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return fetch(input, { ...init, headers });
  };

  // Check profile from backend
  const checkUser = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await authedFetch("/api/user"); 

      if (res.status === 401) {
        setUser(null);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("checkUser failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Firebase auth state changes
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
    const unsubscribe = onAuthStateChanged(auth, async () => {
      await checkUser();
    });
    return () => unsubscribe();
  }, [checkUser]);

  return (
    <AuthContext.Provider
      value={{ user, loading, userLoggedIn: !!user, checkUser, setUser, authedFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

