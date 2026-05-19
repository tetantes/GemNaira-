import { create } from 'zustand';
import { WalletState } from '../types';

interface WalletStore {
  wallet: WalletState | null;
  isProcessing: boolean;
  setWallet: (wallet: WalletState) => void;
  setProcessing: (processing: boolean) => void;
  updateBalances: (points: number, ngn: number) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: null,
  isProcessing: false,
  setWallet: (wallet) => set({ wallet }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  updateBalances: (points, ngn) => set((state) => ({
    wallet: state.wallet ? { ...state.wallet, balancePoints: points, balanceNgn: ngn } : null
  })),
}));
  
