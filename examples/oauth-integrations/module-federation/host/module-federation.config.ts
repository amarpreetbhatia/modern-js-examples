import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    remote: 'remote@http://localhost:3051/static/mf-manifest.json',
  },
  shared: {
    react: { singleton: true, strictVersion: false, requiredVersion: '18.2.0' },
    'react-dom': { singleton: true, strictVersion: false, requiredVersion: '18.2.0' },
  },
});
