import React, { useState } from 'react';
import { useTaskStore } from '../../stores/task.store';
import { useWalletStore } from '../../stores/wallet.store';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { Badge } from '../../components/ui/Badge';
import { formatNgn } from '../../utils/format';
import { triggerHaptic } from '../../utils/haptic';
import { Task } from '../../types';
import { CheckCircle2, Clock, Globe, ArrowUpRight } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const { tasks, progress, updateTaskStatus } = useTaskStore();
  const { wallet, updateBalances } = useWalletStore();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleExecuteTask = (task: Task) => {
    triggerHaptic.light();
    if (task.url) {
      window.open(task.url, '_blank');
    }
    updateTaskStatus(task.id, 'verifying');
  };

  const handleVerifyTask = async (task: Task) => {
    setProcessingId(task.id);
    triggerHaptic.medium();

    // Emulate strict asynchronous compliance verification mapping
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (wallet) {
      updateBalances(
        wallet.balancePoints + task.rewardPoints,
        wallet.balanceNgn + task.rewardNgn
      );
    }

    updateTaskStatus(task.id, 'completed');
    triggerHaptic.success();
    setProcessingId(null);
  };

  return (
    <PageWrapper>
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-white">Earning Portal</h1>
        <p className="text-xs text-gray-400">Complete premium verification requests to earn direct distributions.</p>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const currentStatus = progress[task.id]?.status || 'available';

          return (
            <GlassCard key={task.id} className="p-4 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <Globe className="h-5 w-5 text-[#00F2FE]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white tracking-wide">{task.title}</h3>
                      <Badge variant={task.category === 'premium' ? 'cyan' : 'neutral'}>
                        {task.category}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-400 leading-normal">{task.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Payout Allocation</p>
                  <p className="text-xs font-bold text-emerald-400">
                    +{task.rewardPoints} pts <span className="text-gray-400 font-medium">({formatNgn(task.rewardNgn)})</span>
                  </p>
                </div>

                {currentStatus === 'available' && (
                  <PremiumButton onClick={() => handleExecuteTask(task)} className="py-2 px-3 text-xs flex items-center gap-1">
                    Start <ArrowUpRight className="h-3 w-3" />
                  </PremiumButton>
                )}

                {currentStatus === 'verifying' && (
                  <PremiumButton
                    variant="secondary"
                    isLoading={processingId === task.id}
                    onClick={() => handleVerifyTask(task)}
                    className="py-2 px-3 text-xs border-[#00F2FE]/30 text-[#00F2FE]"
                  >
                    Verify
                  </PremiumButton>
                )}

                {currentStatus === 'completed' && (
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Settled
                  </div>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageWrapper>
  );
};
      
