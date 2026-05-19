import React, { useState } from 'react';
import { useWalletStore } from '../../stores/wallet.store';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatNgn } from '../../utils/format';
import { triggerHaptic } from '../../utils/haptic';
import { APP_CONSTANTS } from '../../lib/constants';
import { Building2, ArrowDownCircle } from 'lucide-react';

const NIGERIAN_BANKS = [
  { value: 'gtb', label: 'Guaranty Trust Bank' },
  { value: 'access', label: 'Access Bank' },
  { value: 'zenith', label: 'Zenith Bank' },
  { value: 'opay', label: 'OPay' },
  { value: 'palmpay', label: 'PalmPay' },
];

export const WalletPage: React.FC = () => {
  const { wallet, isProcessing, setProcessing } = useWalletStore();
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('gtb');
  const [error, setError] = useState('');

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount < APP_CONSTANTS.MIN_WITHDRAWAL_NGN) {
      setError(`Minimum settlement required is ${formatNgn(APP_CONSTANTS.MIN_WITHDRAWAL_NGN)}`);
      triggerHaptic.error();
      return;
    }

    if (wallet && numericAmount > wallet.balanceNgn) {
      setError('Insufficient fiat settlement balance available.');
      triggerHaptic.error();
      return;
    }

    if (accountNumber.length !== 10) {
      setError('Account number must be exactly 10 digits.');
      triggerHaptic.error();
      return;
    }

    setProcessing(true);
    triggerHaptic.heavy();

    // Emulate secure transactional core system processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setProcessing(false);
    triggerHaptic.success();
    alert('Settlement request queued successfully.');
    setAmount('');
    setAccountNumber('');
  };

  return (
    <PageWrapper>
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-white">Settlement System</h1>
        <p className="text-xs text-gray-400">Transfer your fiat balances directly to domestic banking ledger accounts.</p>
      </div>

      {/* Available Liquidity Display */}
      <GlassCard className="mb-6 bg-gradient-to-br from-[#12141C] to-[#161A26] border-white/[0.04]">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Available Liquidity</p>
        <p className="text-3xl font-black text-white mt-1">{formatNgn(wallet?.balanceNgn || 0)}</p>
      </GlassCard>

      {/* Secure Bank Transfer Processing Form */}
      <form onSubmit={handleWithdrawal} className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-0.5">Settlement Parameters</h3>
        
        <Input
          label="Settlement Amount (NGN)"
          placeholder={`Min ${APP_CONSTANTS.MIN_WITHDRAWAL_NGN}`}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={error && error.includes('Amount') ? error : undefined}
        />

        <Select
          label="Destination Bank Node"
          options={NIGERIAN_BANKS}
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
        />

        <Input
          label="NUBAN Account Number"
          placeholder="10-digit account number"
          type="text"
          maxLength={10}
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
          error={error && error.includes('Account') ? error : undefined}
        />

        {error && !error.includes('Amount') && !error.includes('Account') && (
          <p className="text-xs text-red-400 font-medium">{error}</p>
        )}

        <PremiumButton type="submit" fullWidth isLoading={isProcessing} className="mt-2 flex items-center gap-2">
          <ArrowDownCircle className="h-4 w-4" /> Request Settlement
        </PremiumButton>
      </form>
    </PageWrapper>
  );
};
