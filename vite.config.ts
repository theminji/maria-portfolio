import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import fs from 'node:fs'

const portfolioTextPath = path.resolve(__dirname, 'portfolio.ansi')
const renderPortfolioText = () => fs.readFileSync(portfolioTextPath, 'utf8').trimEnd()

const isCliRequest = (req: IncomingMessage) => {
  const userAgent = req.headers['user-agent'] ?? ''
  return /(?:curl|wget|httpie)/i.test(userAgent)
}

const hasFileExtension = (urlPath: string) =>
  path.posix.basename(urlPath).includes('.')

const shouldServeCliText = (req: IncomingMessage) => {
  if (!req.method || !['GET', 'HEAD'].includes(req.method)) {
    return false
  }

  if (!isCliRequest(req)) {
    return false
  }

  const urlPath = (req.url ?? '/').split('?')[0]
  return !hasFileExtension(urlPath)
}

const sendCliText = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.method === 'HEAD') {
    res.end()
    return
  }
  res.end(`${renderPortfolioText()}\n`)
}

const middlewareHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
) => {
  if (shouldServeCliText(req)) {
    sendCliText(req, res)
    return
  }
  next()
}

const cliTextMiddleware = (): Plugin => ({
  name: 'cli-text-middleware',
  configureServer(server) {
    server.middlewares.use(middlewareHandler)
  },
  configurePreviewServer(server) {
    server.middlewares.use(middlewareHandler)
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cliTextMiddleware()],
})
