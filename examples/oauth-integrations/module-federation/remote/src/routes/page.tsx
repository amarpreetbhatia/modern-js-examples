import React from 'react'
import RemoteApp from '../export-App'

export default function Page() {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>📦 Remote Micro-Frontend App</h1>
      <p>This application is exposed via Module Federation as <code>./export-App</code> on port 3051.</p>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: 12, borderRadius: 4, marginBottom: 20, fontSize: 14 }}>
        <strong>Development Preview:</strong> This component is being displayed here with demo data and will be lazy-loaded by the host application.
      </div>

      <h2>Component Preview</h2>
      <p>Below is the same component that the host will load dynamically:</p>
      
      <RemoteApp 
        token="demo-token-from-development" 
        user={{ login: 'dev-user', name: 'Development User' }} 
      />

      <div style={{ marginTop: 40, padding: 16, backgroundColor: '#e8f4f8', borderRadius: 4 }}>
        <h3 style={{ marginTop: 0 }}>How it works:</h3>
        <ol>
          <li>The host application (port 3000) loads this remote component dynamically</li>
          <li>The host handles GitHub OAuth authentication</li>
          <li>The host passes the auth token and user info as props to this component</li>
          <li>This component uses the token to make authenticated API calls</li>
        </ol>
      </div>
    </div>
  )
}
