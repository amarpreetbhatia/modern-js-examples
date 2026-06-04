import React, {useEffect, useState} from 'react'
import { authPlugin, AuthSession } from '../plugins/authPlugin'

export default function HostPage() {
  const [session, setSession] = useState<AuthSession>(null)
  const [RemoteApp, setRemoteApp] = useState<null | React.ComponentType<any>>(null)
  const [loading, setLoading] = useState(true)

  const { fetchSession, startLogin } = authPlugin()

  useEffect(() => {
    ;(async () => {
      const currentSession = await fetchSession()
      setSession(currentSession)

      if (currentSession?.authenticated && currentSession.token) {
        try {
          // Replace this dynamic import with `loadRemote` if you use a federation helper.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const mod = await import('remote/export-App')
          setRemoteApp(() => mod.default)
        } catch (err) {
          console.warn('Failed to load remote — ensure Module Federation remote is available', err)
        }
      }

      setLoading(false)
    })()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>Host — OAuth Integration Demo (GitHub)</h2>

      {loading ? (
        <p>Checking authentication status…</p>
      ) : !session?.authenticated ? (
        <button onClick={startLogin}>Sign in with GitHub</button>
      ) : (
        <div>
          <p>
            Signed in as <strong>{session.user?.login || session.user?.name || 'GitHub user'}</strong>
          </p>
          {RemoteApp ? (
            <RemoteApp token={session.token} user={session.user} />
          ) : (
            <p>Remote component not loaded yet — make sure the remote app is running on port 3051.</p>
          )}
        </div>
      )}
    </div>
  )
}
