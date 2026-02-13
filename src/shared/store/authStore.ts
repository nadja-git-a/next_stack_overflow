import { UiUser } from "@/src/types/types";
import { clientFetch } from "@/src/utilities/fetch/clientFetch";
import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  user: UiUser | null;
  hydrate: () => void;
  setUser: (user: UiUser | null) => void;
  login: (user: UiUser | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  user: null,

  hydrate: async () => {
    const res = await clientFetch("/api/auth", {
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    const user = data?.user ?? null;
    set({ isAuth: !!user });
  },

  setUser: (user) => {
    set({ user });
  },

  login: (user) => {
    set({ isAuth: Boolean(user), user });
  },

  logout: async () => {
    await clientFetch("/api/logout", {
      method: "POST",
      cache: "no-store",
    });

    set({ isAuth: false, user: null });
  },
}));
