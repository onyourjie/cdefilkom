import { create } from 'zustand';

export const useAdminAuthStore = create((set, get) => ({
  user: null,
  role: 'guest', // 'guest', 'admin'
  isAuthenticated: false,

  // Set user data
  setUser: (userData) => 
    set({ 
      user: userData, 
      role: userData?.role || 'admin',
      isAuthenticated: !!userData 
    }),

  // Logout
  logout: () => 
    set({ 
      user: null, 
      role: 'guest', 
      isAuthenticated: false 
    }),

  // Check if admin
  isAdmin: () => get().role === 'admin',

  // Verify admin access
  verifyAdminAccess: () => get().isAuthenticated && get().role === 'admin',
}));
