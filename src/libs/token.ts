export const TOKENS = {
  colors: {
    bg: {
      deepBlack: '#090A0F',
      surfaceDark: '#12141C',
      surfaceCard: 'rgba(22, 26, 38, 0.65)',
      glassBorder: 'rgba(255, 255, 255, 0.07)',
    },
    brand: {
      primary: '#00F2FE', // Electric Cyan
      secondary: '#4FACFE', // Digital Blue
      accent: '#00E676', // Emerald Glow
      accentGradient: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
      emeraldGradient: 'linear-gradient(135deg, #00E676 0%, #00B0FF 100%)',
    },
    feedback: {
      success: '#00E676',
      warning: '#FFB300',
      error: '#FF5252',
      info: '#29B6F6',
    },
  },
  animations: {
    springTight: { type: 'spring', stiffness: 400, damping: 28 },
    springSmooth: { type: 'spring', stiffness: 220, damping: 22 },
    easeOutSmooth: { cubicBezier: [0.25, 1, 0.5, 1], duration: 0.4 },
  },
  blur: {
    premiumCard: 'blur(20px)',
    floatingBg: 'blur(140px)',
  }
} as const;
