Dev.to Challenge Mapping

This example demonstrates the core requirements for the Dev.to GitHub challenge:

- Practical demonstration: OAuth/OIDC integration + Module Federation usage.
- Documentation: clear README with feature request, problem statement, and solution components.
- Runnable stubs: small illustrative host/remote components to show token passing.

How to extend for a full submission:
- Replace mock login with an actual Auth.js / OIDC provider configuration.
- Wire Module Federation configuration (producer/consumer) to expose and load the remote.
- Add a minimal CI / test that verifies the host can load the remote and the remote receives props.
