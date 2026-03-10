import { useState } from 'react'

function App() {
  const command = 'curl -s https://airamx112.com'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-rose-100 via-pink-100 to-pink-200 px-4 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-pink-900">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4">
        <h1 className="font-lexend text-center text-4xl font-semibold tracking-[0.18em] text-pink-700 drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)] sm:text-5xl margin-title">
          Maria Hall
        </h1>
        <div className="animate-card-float flex items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50/80 p-3 shadow-[0_8px_30px_rgba(244,114,182,0.18)] backdrop-blur-sm">
          <code className="rounded-xl bg-white/80 px-4 py-2 text-sm text-pink-800 shadow-inner sm:text-base">
            {command}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-xl bg-pink-300 px-4 py-2 text-sm font-semibold text-pink-900 transition hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
