import { supabase } from './supabase';
import { Task, UserTaskProgress } from '../types';

export const apiService = {
  async fetchGlobalTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to parse global database tasks:', error.message);
      return [];
    }

    return (data || []).map(t => ({
      id: t.id,
      title: t.title,
      description: t.description,
      rewardPoints: t.reward_points,
      rewardNgn: Number(t.reward_ngn),
      category: t.category,
      url: t.url,
      verificationMethod: t.verification_method
    }));
  },

  async fetchUserProgress(userId: string): Promise<Record<string, UserTaskProgress>> {
    const { data, error } = await supabase
      .from('user_completed_tasks')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error downloading validation history charts:', error.message);
      return {};
    }

    const progressMap: Record<string, UserTaskProgress> = {};
    (data || []).forEach(row => {
      progressMap[row.task_id] = {
        taskId: row.task_id,
        status: row.status as any,
        lastCompletedAt: row.completed_at
      };
    });

    return progressMap;
  },

  async claimTaskRewards(userId: string, task: Task): Promise<boolean> {
    // Perform a transactional upsert tracking task completion
    const { error: progressError } = await supabase
      .from('user_completed_tasks')
      .upsert({
        user_id: userId,
        task_id: task.id,
        status: 'completed',
        completed_at: new Date().toISOString()
      });

    if (progressError) return false;

    // Increment wallet assets securely inside database tiers using RPC functions
    const { error: walletError } = await supabase.rpc('increment_wallet_balances', {
      target_user_id: userId,
      points_to_add: task.rewardPoints,
      ngn_to_add: task.rewardNgn
    });

    return !walletError;
  }
};
        
