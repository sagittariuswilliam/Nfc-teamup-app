import { create } from 'zustand';

// API 基础 URL - 根据环境配置
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api/v1' 
  : 'https://api.nfcteamup.com/api/v1';

export interface User {
  id: string;
  username: string;
  nickname?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  token?: string;
}

interface UserState {
  // 用户信息
  user: User | null;
  
  // 认证状态
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // 操作
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // 实际 API 调用
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '登录失败');
      }
      
      const user: User = {
        id: data.user.id,
        username: data.user.username,
        nickname: data.user.nickname,
        avatar: data.user.avatar,
        phone: data.user.phone,
        email: data.user.email,
        token: data.token,
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '登录失败';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  register: async (username, password, phone) => {
    set({ isLoading: true, error: null });
    
    try {
      // 实际 API 调用
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, phone }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '注册失败');
      }
      
      const user: User = {
        id: data.user.id,
        username: data.user.username,
        nickname: data.user.nickname,
        phone: data.user.phone,
        avatar: data.user.avatar,
        email: data.user.email,
        token: data.token,
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '注册失败';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateUser: (updates) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useUserStore;
