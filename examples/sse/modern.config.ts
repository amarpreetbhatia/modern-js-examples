import { appTools, defineConfig } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
// import { ssgPlugin } from '@modern-js/plugin-ssg';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  dev: {
    server: {
      compress: false,
    },
  },
  server: {
    // ssr: true,
  },
  plugins: [appTools(), bffPlugin()],
});
