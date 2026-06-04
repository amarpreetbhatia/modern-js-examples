import {IncomingMessage, ServerResponse} from 'http'

export default async function handler(req: IncomingMessage & { url?: string; headers?: any }, res: ServerResponse) {
  const url = req.url || ''
  const u = new URL(url, 'http://localhost')
  const code = u.searchParams.get('code')
  const state = u.searchParams.get('state')
  if (!code) {
    res.statusCode = 400
    res.end('Missing code')
    return
  }

  // exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  })
  const tokenJson = await tokenRes.json()
  const accessToken = tokenJson?.access_token
  if (!accessToken) {
    res.statusCode = 500
    res.end('Failed to obtain access token')
    return
  }

  // set HttpOnly cookie; in production set Secure and use proper SameSite
  const maxAge = 60 * 60 // 1 hour
  const cookieParts = [`access_token=${accessToken}`, `HttpOnly`, `Path=/`, `Max-Age=${maxAge}`, `SameSite=Lax`]
  if (process.env.NODE_ENV === 'production') cookieParts.push('Secure')
  res.setHeader('Set-Cookie', cookieParts.join('; '))

  // redirect back to host UI
  const hostOrigin = process.env.HOST_ORIGIN || '/'
  res.statusCode = 302
  res.setHeader('Location', hostOrigin)
  res.end()
}
