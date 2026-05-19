import { create } from 'zustand';
import { AppNotification } from '../types';

interface NotificationStore {
  notifications: AppNotification[];
  unreadCount: number;
  setNotifications: (notifications: AppNotification[]) => void;
  addNotification: (notification: AppNotification) => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) => set({
    notifications,
    unreadCount: notifications.filter(n => !n.isRead).length
  }),
  addNotification: (notification) => set((state) => {
    const updated = [notification, ...state.notifications];
    return { notifications: updated, unreadCount: updated.filter(n => !n.isRead).length };
  }),
  markAsRead: (id) => set((state) => {
    const updated = state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    return { notifications: updated, unreadCount: updated.filter(n => !n.isRead).length };
  }),
}));
  
