import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  user: any;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void; // ✅ Updated function signature
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (email: string, password: string) => {
    console.log("Login function called with:", { email, password });
    set({ isLoggedIn: true, user: { email } });
  },

  register: (name: string, email: string, password: string) => {
    console.log("Register function called with:", { name, email, password }); // ✅ Now logs the name too
    set({ isLoggedIn: true, user: { name, email } }); // ✅ Store name in user state
  },

  logout: () => {
    console.log("Logout function called");
    set({ isLoggedIn: false, user: null });
  },
}));
