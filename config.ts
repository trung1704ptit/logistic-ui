import { loadEnv } from 'vite';

process.env = { ...process.env, ...loadEnv('all', process.cwd()) };

enum LayoutType {
  MIX = 'mix',
  TOP = 'top',
  SIDE = 'side',
}

const CONFIG = {
  appName: process.env.VITE_APP_NAME || 'Vận Tải T&T',
  enablePWA: process.env.VITE_ENABLE_PWA === 'true',
  theme: {
    accentColor: process.env.VITE_THEME_ACCENT_COLOR || '#009900',
    sidebarLayout: process.env.VITE_THEME_SIDEBAR_LAYOUT || LayoutType.MIX,
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'Vận Tải T&T',
    description:
      'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    imageURL: 'logo.svg',
  },
};

export default CONFIG;
