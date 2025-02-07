import { loadEnv } from 'vite';

process.env = { ...process.env, ...loadEnv('all', process.cwd()) };

enum LayoutType {
  MIX = 'mix',
  TOP = 'top',
  SIDE = 'side',
}

const CONFIG = {
  appName: process.env.VITE_APP_NAME || 'Vận Tải TT',
  enablePWA: process.env.VITE_ENABLE_PWA === 'true',
  theme: {
    accentColor: process.env.VITE_THEME_ACCENT_COLOR || '#009900',
    sidebarLayout: process.env.VITE_THEME_SIDEBAR_LAYOUT || LayoutType.MIX,
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'Vận Tải TT',
    description:
      'Vận Tải TT – Giải pháp vận chuyển hàng hóa nhanh chóng, an toàn và chuyên nghiệp. Chúng tôi cung cấp dịch vụ logistics, cho thuê xe tải, đáp ứng mọi nhu cầu vận chuyển với chi phí tối ưu. 🚛',
    imageURL: 'logo.svg',
  },
};

export default CONFIG;
