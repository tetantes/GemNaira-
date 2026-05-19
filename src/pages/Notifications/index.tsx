import React from 'react';
import { useNotificationStore } from '../../stores/notification.store';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { GlassCard } from '../../components/ui/GlassCard';
import { triggerHaptic } from '../../utils/haptic';
import { Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead } = useNotificationStore();

  const handleNotificationClick = (id: string) => {
    triggerHaptic.light();
    markAsRead(id);
  };

  return (
    <PageWrapper>
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-white">System Logs</h1>
        <p className="text-xs text-gray-400">Real-time settlement states and validation logs.</p>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-12 text-center">
            <Bell className="h-8 w-8 text-gray-600 stroke-[1.5] mb-2 animate-pulse" />
            <p className="text-xs text-gray-500 font-medium">No system notifications present.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} onClick={() => handleNotificationClick(notif.id)} className="cursor-pointer">
              <GlassCard
                className={`transition-colors duration-200 border-l-2 p-4 ${
                  notif.isRead ? 'border-l-gray-700 opacity-60' : 'border-l-[#00F2FE] bg-[#161A26]/80'
                }`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 shrink-0">
                    {notif.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                    {notif.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                    {notif.type === 'info' && <Info className="h-4 w-4 text-cyan-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-xs font-bold text-white truncate ${!notif.isRead && 'text-[#00F2FE]'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-[9px] text-gray-500 font-medium font-mono shrink-0">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 leading-normal">{notif.message}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))
        )}
      </div>
    </PageWrapper>
  );
};
