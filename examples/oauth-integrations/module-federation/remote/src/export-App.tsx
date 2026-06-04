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

  return (
    <div style={{ border: '1px solid #ddd', padding: 16, marginTop: 16, borderRadius: 8 }}>
      <h3>Remote Micro-Frontend</h3>
      {token ? (
        <div>
          <p>Welcome, <strong>{displayName}</strong>!</p>
          <p>Received token (truncated): {token.slice(0, 20)}…</p>
          <p>Remote can now call protected APIs using this token.</p>
        </div>
      ) : (
        <p>No auth token received — remote should render a safe fallback.</p>
      )}
    </div>
  )
}
