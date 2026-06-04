import {IncomingMessage, ServerResponse} from 'http'

import { parseCookies } from '../utils/parseCookies'

export default async function handler(req: IncomingMessage & { headers?: any }, res: ServerResponse) {
  const cookies = parseCookies(req.headers?.cookie)
  const token = cookies['access_token']
  if (!token) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ authenticated: false }))
    return
  }

  // Optionally fetch user info from GitHub
  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}`, Accept: 'application/json' }
    })
    const user = await userRes.json()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ authenticated: true, token, user }))
  } catch (err) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ authenticated: true, token }))
  }
}
