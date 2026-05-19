import React from 'react';
import { useSettingsStore } from '../../stores/settings.store';
import { useNotificationStore } from '../../stores/notification.store';
import { useUserStore } from '../../stores/user.store';
import { triggerHaptic } from '../../utils/haptic';
import { Home, CheckSquare, Users, Wallet, Bell, Shield } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useSettingsStore();
  const { unreadCount } = useNotificationStore();
  const { profile } = useUserStore();

  const handleTabChange = (tab: typeof currentTab) => {
    triggerHaptic.selection();
    setCurrentTab(tab);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'referral', label: 'Ref', icon: Users },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'notifications', label: 'Logs', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#090A0F]/80 pb-safe-bottom backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`relative flex h-full flex-col items-center justify-center w-12 transition-all duration-200 ${
                isActive ? 'text-[#00F2FE]' : 'text-gray-500 hover:text-gray-400'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              <span className="mt-1 text-[10px] font-bold tracking-wide">{item.label}</span>
              {item.badge !== undefined && (
                <span className="absolute top-2.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF5252] px-1 text-[9px] font-black text-white ring-2 ring-[#090A0F]">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Dynamic Admin Dashboard Visibility */}
        {profile?.role === 'admin' && (
          <button
            onClick={() => handleTabChange('admin')}
            className={`flex h-full flex-col items-center justify-center w-12 transition-all duration-200 ${
              currentTab === 'admin' ? 'text-red-400' : 'text-gray-600'
            }`}
          >
            <Shield className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-bold tracking-wide">Admin</span>
          </button>
        )}
      </div>
    </nav>
  );
};
