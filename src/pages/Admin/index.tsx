import React, { useState } from 'react';
import { useTaskStore } from '../../stores/task.store';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { Input } from '../../components/ui/Input';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { triggerHaptic } from '../../utils/haptic';
import { Shield, PlusCircle } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { tasks, setTasks } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [ngn, setNgn] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !points || !ngn) return;

    triggerHaptic.heavy();
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      rewardPoints: parseInt(points),
      rewardNgn: parseFloat(ngn),
      category: 'social' as const,
      verificationMethod: 'instant' as const,
    };

    setTasks([newTask, ...tasks]);
    triggerHaptic.success();

    setTitle('');
    setDescription('');
    setPoints('');
    setNgn('');
  };

  return (
    <PageWrapper>
      <div className="mb-5 flex items-center gap-2">
        <Shield className="h-5 w-5 text-red-400" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Admin Headquarters</h1>
          <p className="text-xs text-gray-400">Global system configuration and task creation.</p>
        </div>
      </div>

      <GlassCard className="p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-0.5">Deploy New Verification Task</h3>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input label="Task Title" placeholder="e.g., Follow Telegram Channel" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="Description" placeholder="Provide specific operational steps" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Points Reward" type="number" placeholder="500" value={points} onChange={(e) => setPoints(e.target.value)} />
            <Input label="NGN Allocation" type="number" placeholder="50" value={ngn} onChange={(e) => setNgn(e.target.value)} />
          </div>
          <PremiumButton type="submit" fullWidth className="mt-2 flex items-center gap-2 variant-danger bg-gradient-to-r from-red-600 to-rose-700 shadow-red-900/30">
            <PlusCircle className="h-4 w-4" /> Push Task to Production
          </PremiumButton>
        </form>
      </GlassCard>
    </PageWrapper>
  );
};
