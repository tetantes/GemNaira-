import { create } from 'zustand';
import { UserProfile } from '../types';

interface UserStore {
  profile: UserProfile | null;
  isLoading: boolean;
  isDailyBonusClaimed: boolean;
  setProfile: (profile: UserProfile) => void;
  setLoading: (loading: boolean) => void;
  markDailyBonusClaimed: () => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  isLoading: true,
  isDailyBonusClaimed: false,
  setProfile: (profile) => set({ profile, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  markDailyBonusClaimed: () => set({ isDailyBonusClaimed: true }),
  reset: () => set({ profile: null, isLoading: false, isDailyBonusClaimed: false }),
}));
