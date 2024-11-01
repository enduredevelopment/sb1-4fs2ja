import { create } from 'zustand';
import Parse from 'parse';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await Parse.User.logIn(username, password);
      set({
        user: {
          id: user.id,
          username: user.get('username'),
          email: user.get('email'),
          role: user.get('role'),
          department: user.get('department'),
          status: user.get('status'),
          createdAt: user.get('createdAt'),
        },
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await Parse.User.logOut();
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const user = new Parse.User();
      Object.entries(userData).forEach(([key, value]) => {
        user.set(key, value);
      });
      await user.signUp();
      set({
        user: {
          id: user.id,
          username: user.get('username'),
          email: user.get('email'),
          role: user.get('role'),
          department: user.get('department'),
          status: user.get('status'),
          createdAt: user.get('createdAt'),
        },
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));