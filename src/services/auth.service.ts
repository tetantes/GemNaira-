import { supabase } from './supabase';
import { UserProfile, WalletState } from '../types';

export const authService = {
  async syncUserSession(
    tgUser: { id: number; username?: string; first_name: string; last_name?: string },
    startParam?: string
  ): Promise<{ profile: UserProfile; wallet: WalletState } | null> {
    const telegramId = tgUser.id.toString();

    // Fetch existing user parameters from table structures
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      console.error('Error fetching user:', userError.message);
      return null;
    }

    // Handshake signup flow if the account record does not exist
    if (!user) {
      const uniqueReferralCode = `NE_${telegramId}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      let validatedReferrer: string | null = null;

      if (startParam && startParam.trim() !== '') {
        const { data: referrerCheck } = await supabase
          .from('users')
          .select('telegram_id')
          .eq('referral_code', startParam.trim())
          .single();
        if (referrerCheck) validatedReferrer = referrerCheck.telegram_id;
      }

      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          telegram_id: telegramId,
          username: tgUser.username || `user_${telegramId}`,
          first_name: tgUser.first_name,
          referral_code: uniqueReferralCode,
          referred_by: validatedReferrer,
          role: 'user'
        }])
        .select()
        .single();

      if (createError) {
        console.error('Profile creation transaction failed:', createError.message);
        return null;
      }
      user = newUser;
    }

    // Fetch or provision linked wallet balance asset row
    let { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', telegramId)
      .single();

    if (!wallet) {
      const { data: newWallet, error: createWalletError } = await supabase
        .from('wallets')
        .insert([{ user_id: telegramId, balance_ngn: 0.00, balance_points: 0, total_withdrawn: 0.00 }])
        .select()
        .single();

      if (createWalletError) {
        console.error('Wallet provisioning error transaction:', createWalletError.message);
        return null;
      }
      wallet = newWallet;
    }

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
