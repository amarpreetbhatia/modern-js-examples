# Feature request: Module Federation + OAuth/OIDC example

Linked to: https://github.com/web-infra-dev/modern-js-examples/issues/59

## Summary
Provide an Modern.js example demonstrating how to handle OAuth/OIDC authentication in a Module Federation micro-frontend architecture where the Host performs authentication and passes authenticated state (token/session) to a Remote component.

## Motivation
Teams building micro-frontends often struggle to wire authentication correctly between host and remote applications. A canonical example reduces guesswork and prevents insecure patterns, such as exposing refresh tokens or duplicating login UI inside remotes.

## Proposed Example
See `examples/oauth-integrations/module-federation` in this repo for a stubbed example.

### Host responsibilities
- Integrate an OAuth/OIDC client (Auth.js, next-auth, or direct OIDC client) and perform sign-in.
- Store minimal client-side state (access token) or maintain a secure server-side session and provide a short-lived token to frontends.
- Dynamically load remotes only after authentication (or render them in a protected area).
- Pass token or user object to the remote component as a prop or via a shared runtime module.

### Remote responsibilities
- Export UI components via Module Federation.
- Accept token/user props and use them to call protected APIs.
- Render a safe fallback if no token is provided.

## Security Considerations
- Do not embed refresh tokens in client-side remotes.
- Prefer backend-for-frontend or server-side token exchange when remotes need to call sensitive APIs.
- Use short-lived access tokens and rotate them.

## Implementation Notes
- Provide a server-side example for handling OIDC callback and session creation.
- Provide a client-side example showing `loadRemote` usage and prop-based token passing.
- Optionally show how to share an `auth` helper via Module Federation shared scope for advanced workflows.

## Acceptance Criteria
- Example repo contains host and remote with runnable stubs.
- README documents flow, security guidance, and how to replace mock login with real providers.
