import {IncomingMessage, ServerResponse} from 'http'

export default function handler(req: IncomingMessage & { url?: string }, res: ServerResponse) {
  const clientId = process.env.GITHUB_CLIENT_ID
  const hostOrigin = process.env.HOST_ORIGIN || 'http://localhost:3000'
  if (!clientId) {
    res.statusCode = 500
    res.end('GITHUB_CLIENT_ID not configured')
    return
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${hostOrigin}/api/auth/callback`,
    scope: 'read:user user:email',
    // production: generate a random state and validate it in callback
    state: 'devstate'
  })

  res.statusCode = 302
  res.setHeader('Location', `https://github.com/login/oauth/authorize?${params.toString()}`)
  res.end()
}
