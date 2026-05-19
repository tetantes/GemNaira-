declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
      };
    };
  }
}

export const triggerHaptic = {
  light: () => window.Telegram?.WebApp?.HapticFeedback.impactOccurred('light'),
  medium: () => window.Telegram?.WebApp?.HapticFeedback.impactOccurred('medium'),
  heavy: () => window.Telegram?.WebApp?.HapticFeedback.impactOccurred('heavy'),
  success: () => window.Telegram?.WebApp?.HapticFeedback.notificationOccurred('success'),
  warning: () => window.Telegram?.WebApp?.HapticFeedback.notificationOccurred('warning'),
  error: () => window.Telegram?.WebApp?.HapticFeedback.notificationOccurred('error'),
  selection: () => window.Telegram?.WebApp?.HapticFeedback.selectionChanged(),
};
