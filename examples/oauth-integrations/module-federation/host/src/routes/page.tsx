import React, { useEffect, useState } from 'react'
import { authPlugin, AuthSession } from '../plugins/authPlugin'

export default function HostPage() {
  const [session, setSession] = useState<AuthSession>(null)
  const [RemoteApp, setRemoteApp] = useState<null | React.ComponentType<any>>(null)
  const [error, setError] = useState<string | null>(null)

  const { fetchSession, startLogin } = authPlugin()

  useEffect(() => {
    ;(async () => {
      try {
        // Always try to load the remote component
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mod = await import('remote/export-App')
        setRemoteApp(() => mod.default)
      } catch (err) {
        const errorMsg = `Failed to load remote MFE: ${err instanceof Error ? err.message : String(err)}`
        console.error(errorMsg, err)
        setError(errorMsg)
      }

      // Try to fetch session for authentication data
      try {
        const currentSession = await fetchSession()
        setSession(currentSession)
      } catch (err) {
        console.warn('Could not fetch session (expected in development without OAuth setup)', err)
        // Not authenticated is fine for demo
      }
    })()
  }, [])

  // Demo user for development
  const demoUser = { login: 'demo-user', name: 'Demo User' }
  const demoToken = 'demo-token-for-testing'

  // Use authenticated session if available, otherwise use demo data
  const userInfo = session?.authenticated ? session.user : demoUser
  const authToken = session?.authenticated ? session.token : demoToken
  const isAuthenticated = session?.authenticated || true // Demo mode is "authenticated"

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>🔐 Host Application — OAuth + Module Federation</h1>

      {error ? (
        <div style={{ color: 'red', padding: 16, backgroundColor: '#ffe0e0', borderRadius: 4 }}>
          <strong>Error loading remote:</strong> {error}
          <p style={{ fontSize: 12 }}>Make sure the remote app is running on http://localhost:3051</p>
        </div>
      ) : !RemoteApp ? (
        <div style={{ color: '#666' }}>
          <p>Loading remote micro-frontend component...</p>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
            <p style={{ margin: 0 }}>
              Status: <strong>{session?.authenticated ? '✅ Authenticated' : '🧪 Demo Mode (not authenticated)'}</strong>
            </p>
            {!session?.authenticated && (
              <p style={{ margin: '8px 0 0 0', fontSize: 12, color: '#666' }}>
                To use real authentication, set up GitHub OAuth and click the login button below.
              </p>
            )}
          </div>

          <h2>Remote Micro-Frontend Component</h2>
          <p>The component below is lazy-loaded from the remote app running on port 3051:</p>

          {RemoteApp && isAuthenticated && (
            <RemoteApp token={authToken} user={userInfo} />
          )}

          {!session?.authenticated && (
            <button
              onClick={startLogin}
              style={{
                marginTop: 20,
                padding: '10px 20px',
                fontSize: 16,
                backgroundColor: '#0366d6',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Sign in with GitHub
            </button>
          )}
        </div>
      )}
    </div>
  )
}
