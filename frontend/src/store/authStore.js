import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  role: 'guest', // 'guest', 'user', 'admin'
  isAuthenticated: false,

  // Set user data
  setUser: (userData) => 
    set({ 
      user: userData, 
      role: userData?.role || 'user',
      isAuthenticated: !!userData 
    }),

  // Logout
  logout: () => 
    set({ 
      user: null, 
      role: 'guest', 
      isAuthenticated: false 
    }),

  // Check permission
  hasPermission: (requiredRole) => {
    const { role } = get();
    const roleHierarchy = { guest: 0, user: 1, admin: 2 };
    return roleHierarchy[role] >= roleHierarchy[requiredRole];
  },

  // Check if admin
  isAdmin: () => get().role === 'admin',

  // Check if user
  isUser: () => get().role === 'user' || get().role === 'admin',
}));
