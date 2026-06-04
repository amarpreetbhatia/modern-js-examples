# Host — Module Federation (OAuth integration)

This host app performs GitHub OAuth and then dynamically loads a remote micro-frontend only after authentication succeeds.

Features:
- Host-side GitHub login flow using API routes.
- HttpOnly cookie storage for the access token.
- `/api/session` endpoint that returns the authenticated user and token.
- Lazy-loading of a remote component via Module Federation.
- Passes `token` and `user` props to the remote component.

Files of interest:
- `src/routes/page.tsx` — host UI with sign-in button and remote loading.
- `src/plugins/authPlugin.ts` — simple host-side authentication helper.
- `src/api/auth/login.ts` — GitHub OAuth redirect.
- `src/api/auth/callback.ts` — OAuth code exchange and cookie set.
- `src/api/session.ts` — session endpoint used by the host UI.

## GitHub OAuth setup (dev)

1. Register a GitHub OAuth App at https://github.com/settings/developers -> `OAuth Apps`.
   - Set the Authorization callback URL to `http://localhost:3000/api/auth/callback`.
2. Create a `.env.local` or export env vars when running the host:

```bash
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
HOST_ORIGIN=http://localhost:3000
NODE_ENV=development
```

3. Start the remote app first:

```bash
cd examples/oauth-integrations/module-federation/remote
npm install
npm run dev
```

4. Start the host app:

```bash
cd examples/oauth-integrations/module-federation/host
npm install
npm run dev
```

5. Open the host at `http://localhost:3000` and click `Sign in with GitHub`.

Notes:
- The host only loads the remote component when authentication is confirmed.
- For production, validate OAuth `state`, use secure cookies, and avoid exposing refresh tokens in client-side remotes.

