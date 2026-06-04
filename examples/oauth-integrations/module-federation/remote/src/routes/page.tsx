import React from 'react'
import RemoteApp from '../export-App'

export default function Page() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Remote App (Module Federation)</h1>
      <p>This remote app is exposed via Module Federation as `./export-App`</p>
      <hr />
      <RemoteApp token="demo-token-for-dev" user={{ login: 'demo-user', name: 'Demo User' }} />
    </div>
  )
}
