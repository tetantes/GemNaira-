import { TelegramUser } from '../types';

class TelegramService {
  private get webApp() {
    return window.Telegram?.WebApp;
  }

  public init() {
    this.webApp?.ready();
    this.webApp?.expand();
    if (this.webApp) {
      this.webApp.headerColor = '#090A0F';
      this.webApp.backgroundColor = '#090A0F';
    }
  }

  public getInitData(): string {
    return this.webApp?.initData || '';
  }

  public getUserData(): TelegramUser | null {
    if (!this.webApp?.initDataUnsafe?.user) return null;
    return this.webApp.initDataUnsafe.user as TelegramUser;
  }

  public getStartParam(): string {
    return this.webApp?.initDataUnsafe?.start_param || '';
  }

  public configureBackButton(visible: boolean, onClick?: () => void) {
    const btn = this.webApp?.BackButton;
    if (!btn) return;

    if (visible) {
      btn.show();
      if (onClick) {
        btn.onClick(onClick);
      }
    } else {
      btn.hide();
      btn.offClick(() => {});
    }
  }

  public configureMainButton(text: string, visible: boolean, onClick?: () => void) {
    const btn = this.webApp?.MainButton;
    if (!btn) return;

    btn.setText(text);
    if (visible) {
      btn.show();
      btn.enable();
      if (onClick) btn.onClick(onClick);
    } else {
      btn.hide();
    }
  }

  public showAlert(message: string) {
    this.webApp?.showAlert(message);
  }
}

export const telegramService = new TelegramService();

