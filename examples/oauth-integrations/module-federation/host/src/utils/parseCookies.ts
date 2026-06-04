export function parseCookies(cookieHeader?: string) {
  const out: Record<string,string> = {}
  if (!cookieHeader) return out
  cookieHeader.split(';').forEach(c => {
    const [k, ...v] = c.split('=')
    out[k.trim()] = decodeURIComponent((v || []).join('='))
  })
  return out
}
