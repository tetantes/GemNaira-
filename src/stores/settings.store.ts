import { create } from 'zustand';

interface SettingsStore {
  currentTab: 'home' | 'tasks' | 'referral' | 'wallet' | 'notifications' | 'admin';
  themeMode: 'dark';
  setCurrentTab: (tab: 'home' | 'tasks' | 'referral' | 'wallet' | 'notifications' | 'admin') => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  currentTab: 'home',
  themeMode: 'dark',
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));
