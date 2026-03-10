import { next } from '@vercel/functions'
import fs from 'node:fs'

const portfolioText = fs.readFileSync(
  new URL('./portfolio.ansi', import.meta.url),
  'utf8',
).trimEnd()

const isCliRequest = (userAgent: string | null) =>
  /(?:curl|wget|httpie)/i.test(userAgent ?? '')

export const config = {
  matcher: ['/'],
}

export default function middleware(request: Request) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    return next()
  }

  if (!isCliRequest(request.headers.get('user-agent'))) {
    return next()
  }

  return new Response(
    request.method === 'HEAD' ? null : `${portfolioText}\n`,
    {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    },
  )
}
