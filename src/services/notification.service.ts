import { supabase } from './supabase';
import { AppNotification } from '../types';

export const notificationService = {
  async fetchUserNotifications(userId: string): Promise<AppNotification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) return [];

    return (data || []).map(n => ({
      id: n.id,
      title: n.title,
      message: n.message,
      type: n.type,
      isRead: n.is_read,
      createdAt: n.created_at
    }));
  }
};
