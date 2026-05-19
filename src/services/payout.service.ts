import { supabase } from './supabase';

export const payoutService = {
  async requestSettlement(params: {
    userId: string;
    username: string;
    amountNgn: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
  }): Promise<{ success: boolean; message: string }> {
    
    // 1. Fetch current live balance parameters to prevent double-spending anomalies
    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance_ngn')
      .eq('user_id', params.userId)
      .single();

    if (!wallet || Number(wallet.balance_ngn) < params.amountNgn) {
      return { success: false, message: 'Insufficient clear settlement assets.' };
    }

    // 2. Queue payout log entry row inside the database ledger tables
    const { error: txError } = await supabase
      .from('payouts')
      .insert([{
        user_id: params.userId,
        username: params.username,
        amount_ngn: params.amountNgn,
        bank_name: params.bankName,
        account_number: params.accountNumber,
        account_name: params.accountName,
        status: 'pending'
      }]);

    if (txError) return { success: false, message: txError.message };

    // 3. Deduct requested amount from available live wallet balances
    const { error: deductError } = await supabase.rpc('deduct_fiat_balance', {
      target_user_id: params.userId,
      amount_to_deduct: params.amountNgn
    });

    if (deductError) return { success: false, message: 'Deduction routine transactional fault.' };

    return { success: true, message: 'Settlement pipeline queued for administrative clearance.' };
  }
};
