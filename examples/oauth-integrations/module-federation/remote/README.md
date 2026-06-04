# Remote — Module Federation (OAuth integration)

This remote app exposes a component that expects authenticated props from the host.

Responsibilities:
- Do not perform the login flow.
- Render UI only after the host supplies `token` and `user`.
- Use the provided token to call protected APIs when needed.

Security notes:
- Avoid storing long-lived refresh tokens in client-side remotes.
- Prefer backend-for-frontend or server-side API calls for sensitive token exchange.

Files of interest:
- `src/export-App.tsx` — exported component that receives `token` and `user` props.
- `module-federation.config.ts` — exposes `./export-App` via Module Federation.
