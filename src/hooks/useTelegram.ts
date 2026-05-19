import { useEffect, useState } from 'react';
import { telegramService } from '../services/telegram.service';
import { TelegramUser } from '../types';

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [startParam, setStartParam] = useState<string>('');

  useEffect(() => {
    telegramService.init();
    setUser(telegramService.getUserData());
    setStartParam(telegramService.getStartParam());
  }, []);

  return {
    user,
    startParam,
    initData: telegramService.getInitData(),
    showAlert: telegramService.showAlert
  };
}
