import { supabase } from './supabase';
import { UserProfile, WalletState } from '../types';

export const authService = {
  /**
   * Synchronizes the Telegram user data with the Supabase database.
   * If the user doesn't exist, it handles server-side sign-up and provisions a wallet.
   */
  async syncUserSession(tgUser: { id: number; username?: string; first_name: string; last_name?: string }): Promise<{ profile: UserProfile; wallet: WalletState } | null> {
    const telegramId = tgUser.id.toString();
    
    // 1. Check if the user profile already exists
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (userError && userError.code !== 'PGRST116') { // PGRST116 means row not found
      console.error('Error fetching user profile:', userError.message);
      return null;
    }

    // 2. If user doesn't exist, register them (Sign up flow)
    if (!user) {
      const generatedReferralCode = `NE_${telegramId}_${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          telegram_id: telegramId,
          username: tgUser.username || `user_${telegramId}`,
          first_name: tgUser.first_name,
          referral_code: generatedReferralCode,
          role: 'user'
        }])
        .select()
        .single();

      if (createError) {
        console.error('Failed to provision user profile:', createError.message);
        return null;
      }
      user = newUser;
    }

    // 3. Fetch or provision the linked wallet ledger asset
    let { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', telegramId)
      .single();

    if (!wallet) {
      const { data: newWallet, error: createWalletError } = await supabase
        .from('wallets')
        .insert([{ user_id: telegramId, balance_ngn: 0.00, balance_points: 0 }])
        .select()
        .single();

      if (createWalletError) {
        console.error('Failed to provision wallet ledger:', createWalletError.message);
        return null;
      }
      wallet = newWallet;
    }

    // 4. Map DB schema keys to our strict Frontend Domain types
    return {
      profile: {
        telegramId: user.telegram_id,
        username: user.username,
        firstName: user.first_name,
        referralCode: user.referral_code,
        role: user.role,
        createdAt: user.created_at,
        isPremiumUser: false
      },
      wallet: {
        id: wallet.id,
        userId: wallet.user_id,
        balanceNgn: Number(wallet.balance_ngn),
        balancePoints: wallet.balance_points,
        totalWithdrawn: Number(wallet.total_withdrawn || 0),
        updatedAt: wallet.updated_at
      }
    };
  }
};
