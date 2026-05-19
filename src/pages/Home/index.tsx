import React, { useState } from 'react';
import { useUserStore } from '../../stores/user.store';
import { useWalletStore } from '../../stores/wallet.store';
import { useSettingsStore } from '../../stores/settings.store';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { formatNgn, formatPoints } from '../../utils/format';
import { triggerHaptic } from '../../utils/haptic';
import { APP_CONSTANTS } from '../../lib/constants';
import { Wallet, Award, TrendingUp, Zap, ChevronRight, Gift } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { profile, isDailyBonusClaimed, markDailyBonusClaimed } = useUserStore();
  const { wallet, updateBalances } = useWalletStore();
  const { setCurrentTab } = useSettingsStore();
  const [claiming, setClaiming] = useState(false);

  const handleClaimDailyBonus = async () => {
    if (isDailyBonusClaimed) return;
    setClaiming(true);
    triggerHaptic.medium();

    // Emulate server transaction delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (wallet) {
      const newPoints = wallet.balancePoints + APP_CONSTANTS.DAILY_BONUS_REWARD_POINTS;
      const newNgn = wallet.balanceNgn + APP_CONSTANTS.DAILY_BONUS_REWARD_NGN;
      updateBalances(newPoints, newNgn);
    }

    markDailyBonusClaimed();
    triggerHaptic.success();
    setClaiming(false);
  };

  return (
    <PageWrapper>
      {/* Premium Hero Identity Banner */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Welcome back</p>
          <h1 className="text-xl font-bold text-white tracking-tight">
            @{profile?.username || 'NairaEarner'}
          </h1>
        </div>
        <div className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#12141C]/80 px-3 backdrop-blur-md">
          <Zap className="h-4 w-4 text-[#00F2FE]" />
          <span className="text-xs font-bold text-white tracking-wide">PRO USER</span>
        </div>
      </div>

      {/* Primary Balance Display HUD */}
      <GlassCard gradient className="mb-5 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Total Valuation Balance</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tighter text-white">
            {formatPoints(wallet?.balancePoints || 0)}
          </span>
          <span className="text-sm font-bold text-gray-400 tracking-wide">POINTS</span>
        </div>
        <div className="mt-1 text-sm font-medium text-emerald-400">
          ≈ {formatNgn(wallet?.balanceNgn || 0)}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
              <Wallet className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Fiat Account</p>
              <p className="text-xs font-bold text-white">{formatNgn(wallet?.balanceNgn || 0)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Withdrawn</p>
              <p className="text-xs font-bold text-white">{formatNgn(wallet?.totalWithdrawn || 0)}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Daily Claim Mechanism */}
      <GlassCard className="mb-5 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <Gift className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Daily Check-in Bonus</h3>
            <p className="text-xs text-gray-400">+{APP_CONSTANTS.DAILY_BONUS_REWARD_POINTS} pts / +{formatNgn(APP_CONSTANTS.DAILY_BONUS_REWARD_NGN)}</p>
          </div>
        </div>
        <PremiumButton
          variant={isDailyBonusClaimed ? 'secondary' : 'primary'}
          disabled={isDailyBonusClaimed}
          isLoading={claiming}
          onClick={handleClaimDailyBonus}
          className="py-2 px-4 text-xs"
        >
          {isDailyBonusClaimed ? 'Claimed' : 'Claim'}
        </PremiumButton>
      </GlassCard>

      {/* Context Navigation Shortcuts */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-0.5">Quick Operations</h4>
        
        <div onClick={() => { triggerHaptic.light(); setCurrentTab('tasks'); }} className="cursor-pointer">
          <GlassCard clickable className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Award className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Earning Tasks</h5>
                <p className="text-xs text-gray-400">Complete social campaigns to earn rewards</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  );
};
