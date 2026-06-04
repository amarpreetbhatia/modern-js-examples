import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'remote',
  manifest: {
    filePath: 'static',
  },
  filename: 'static/remoteEntry.js',
  exposes: {
    './export-App': './src/export-App.tsx',
  },
  shared: {
    react: { singleton: true, strictVersion: false, requiredVersion: '18.2.0' },
    'react-dom': { singleton: true, strictVersion: false, requiredVersion: '18.2.0' },
  },
});
