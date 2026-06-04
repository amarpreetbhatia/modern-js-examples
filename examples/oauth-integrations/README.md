OAuth Integrations — Module Federation Example

This folder contains a proposed example that demonstrates how to handle OAuth / OIDC authentication in a Modern.js + Module Federation micro-frontend setup.

## Feature Request
Good to have an example demonstrating the recommended approach for handling authentication across Host and Remote applications using Module Federation within the Modern.js framework.

## Problem Statement
In a micro-frontend architecture built with Modern.js and Module Federation, the host application needs to handle OAuth authentication (e.g., using Auth.js or similar with a provider like Okta or GitHub or any other) and then conditionally load a remote micro-frontend upon successful login, passing the authenticated state/token to it.

Currently, there is no official sample that covers this specific combination of technologies and patterns, making implementation challenging.

## Proposed Solution / Example Components
Example should demonstrate two main projects:

1. Host App (Modern.js + Module Federation Consumer):
   - Integrates Auth.js (or a similar standard authentication library) configured with either GitHub or Okta (or both).
   - Checks the authentication status (session or token).
   - Upon successful authentication, dynamically loads a remote application component using `loadRemote` (or equivalent).
   - Crucially: Shows how to pass the authentication data (e.g., a JWT, access token, or user object) from the host to the remote component as a prop or through a shared context.

2. Remote App (Modern.js + Module Federation Producer):
   - Exposes a component.
   - Receives and consumes the authentication data passed from the Host (e.g., to render user-specific data or make authenticated API calls).

## Missing / Optional Points to Consider
- Sharing a small, secure helper for token exchange (e.g., a signed cookie or short-lived token) when you cannot pass the full JWT.
- Using a shared runtime module to expose an auth helper via Module Federation's shared scope (for advanced use cases).
- Example code for server-side callback handling for OIDC providers (Okta/GitHub) in a Modern.js API route.
- Security notes: never expose refresh tokens to client-side remotes; prefer access tokens with short TTLs or use backend-for-frontend patterns.

## Contents
- `module-federation/host` — Host example (consumer) with a mock login and dynamic remote load.
- `module-federation/remote` — Remote example (producer) that accepts an auth token prop and demonstrates an authenticated API call stub.

## Dev.to Challenge
This example maps to the Dev.to GitHub challenge guidelines: it demonstrates a practical integration (OAuth + Module Federation) and includes documentation, runnable stubs, and an explanation of the security considerations.

---
See the subfolders for host and remote details and code examples.
