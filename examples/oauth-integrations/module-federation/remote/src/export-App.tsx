import React from 'react'

type RemoteUser = {
  login?: string
  name?: string
  avatar_url?: string
}

type Props = {
  token?: string
  user?: RemoteUser
}

export default function RemoteApp({ token, user }: Props) {
  const displayName = user?.name || user?.login || 'authenticated user'
  const hasAuth = !!token

  return (
    <div style={{ 
      border: '2px solid #28a745', 
      padding: 20, 
      marginTop: 20, 
      borderRadius: 8,
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#28a745' }}>✨ Welcome from Remote Micro-Frontend</h3>
        <p style={{ margin: 0, fontSize: 14, color: '#666' }}>Lazy-loaded from port 3051</p>
      </div>

      {hasAuth ? (
        <div style={{ backgroundColor: 'white', padding: 16, borderRadius: 4, marginBottom: 12 }}>
          <p style={{ margin: 0, marginBottom: 8 }}>
            👋 Hello, <strong>{displayName}</strong>!
          </p>
          <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
            Access Token (truncated): <code>{token?.slice(0, 20)}...</code>
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: 13, color: '#666' }}>
            This remote component received your authentication token from the host. You can now make authenticated API calls! 🔒
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', padding: 16, borderRadius: 4 }}>
          <p style={{ margin: 0 }}>
            No authentication token provided — remote is running in demo mode.
          </p>
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 12, color: '#999' }}>
        <p style={{ margin: 0 }}>
          This is a remote app exposed via Module Federation. It's loaded dynamically from the host application.
        </p>
      </div>
    </div>
  )
}
