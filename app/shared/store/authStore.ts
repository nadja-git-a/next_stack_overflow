import { UiUser } from "@/app/types/types";
import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  user: UiUser | null;
  login: (user: UiUser | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  user: null,
  login: (user) => {
    set({ isAuth: Boolean(user), user });
    console.log("LOGIN CALLED", user);
  },
  logout: async () => {
    console.log("LOGOUT CALLED");
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
    set({ isAuth: false, user: null });
  },
}));
