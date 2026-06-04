import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js-v3';

export default defineConfig({
  server: {
    ssr: true,
    port: 3000,
  },
  plugins: [appTools(), moduleFederationPlugin()],
});
