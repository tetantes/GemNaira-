import React, { useEffect } from 'react';
import { useSettingsStore } from '../stores/settings.store';
import { useTelegram } from '../hooks/useTelegram';
import { telegramService } from '../services/telegram.service';
import { BottomNav } from '../components/layout/BottomNav';
import { FloatingBg } from '../components/layout/FloatingBg';
import { AnimatePresence } from 'framer-motion';

// Lazy loading view components for optimized routing bundle splits
import { HomePage } from '../pages/Home';
import { TasksPage } from '../pages/Tasks';
import { ReferralPage } from '../pages/Referral';
import { WalletPage } from '../pages/Wallet';
import { NotificationsPage } from '../pages/Notifications';
import { AdminPage } from '../pages/Admin';

export const AppLayout: React.FC = () => {
  const { currentTab, setCurrentTab } = useSettingsStore();
  useTelegram(); // Core Telegram system connection link initialization hook

  // Synchronize the Telegram BackButton lifecycle with the state router
  useEffect(() => {
    if (currentTab !== 'home') {
      telegramService.configureBackButton(true, () => {
        setCurrentTab('home');
      });
    } else {
      telegramService.configureBackButton(false);
    }
  }, [currentTab, setCurrentTab]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-[#090A0F]">
      <FloatingBg />
      
      <main className="mx-auto h-screen max-w-md overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && <HomePage key="home" />}
          {currentTab === 'tasks' && <TasksPage key="tasks" />}
          {currentTab === 'referral' && <ReferralPage key="referral" />}
          {currentTab === 'wallet' && <WalletPage key="wallet" />}
          {currentTab === 'notifications' && <NotificationsPage key="notifications" />}
          {currentTab === 'admin' && <AdminPage key="admin" />}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
};
