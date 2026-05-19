import React, { useEffect } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { useUserStore } from './stores/user.store';
import { useWalletStore } from './stores/wallet.store';
import { useTaskStore } from './stores/task.store';
import { useNotificationStore } from './stores/notification.store';
import { telegramService } from './services/telegram.service';
import { authService } from './services/auth.service';
import { apiService } from './services/api.service';
import { referralService } from './services/referral.service';
import { notificationService } from './services/notification.service';

export const App: React.FC = () => {
  const { setProfile, setLoading: setUserLoading } = useUserStore();
  const { setWallet } = useWalletStore();
  const { setTasks, setProgress, setLoading: setTaskLoading } = useTaskStore();
  const { setNotifications } = useNotificationStore();

  useEffect(() => {
    const bootstrapProductionApp = async () => {
      // 1. Gather secure metadata handshake parameters from Telegram frame context
      const tgUser = telegramService.getUserData();
      const startParam = telegramService.getStartParam();

      if (!tgUser) {
        console.warn('Telegram Context isolated or running inside standard web browser. Initializing fallback states.');
        setUserLoading(false);
        setTaskLoading(false);
        return;
      }

      try {
        // Trigger global load indicators across domain segments
        setUserLoading(true);
        setTaskLoading(true);

        // 2. Synchronize Profile and Wallet Core ledger rows via Supabase
        const session = await authService.syncUserSession(tgUser, startParam);
        if (!session) throw new Error('Core session authentication pipeline failure.');

        setProfile(session.profile);
        setWallet(session.wallet);

        // 3. Concurrently pull distributed configurations, task logs, and notifications
        const [availableTasks, userProgress, platformNotifications] = await Promise.all([
          apiService.fetchGlobalTasks(),
          apiService.fetchUserProgress(tgUser.id.toString()),
          notificationService.fetchUserNotifications(tgUser.id.toString())
        ]);

        // 4. Hydrate Zustand state slices with live cloud records
        setTasks(availableTasks);
        setProgress(userProgress);
        setNotifications(platformNotifications);

      } catch (error) {
        console.error('Critical initialization failure during cloud synchronization:', error);
        telegramService.showAlert('Network synchronization failed. Please check connection and reload.');
      } finally {
        setUserLoading(false);
        setTaskLoading(false);
      }
    };

    bootstrapProductionApp();
  }, [setProfile, setWallet, setTasks, setProgress, setNotifications, setUserLoading, setTaskLoading]);

  return <AppLayout />;
};

export default App;
