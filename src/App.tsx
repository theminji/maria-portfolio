import { useEffect, useState } from 'react'

const capybaraAsset = '/capybara.svg'

const getTrackedElements = () => {
  const images = Array.from(document.images)
  const stylesheets = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
  )

  return [...new Set([...images, ...stylesheets])]
}

const isElementLoaded = (element: HTMLImageElement | HTMLLinkElement) => {
  if (element instanceof HTMLImageElement) {
    return element.complete
  }

  return Boolean(element.sheet)
}

function App() {
  const command = 'curl -s -L https://airamx112.com'
  const [copied, setCopied] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(() =>
    document.readyState === 'complete' ? 1 : 0,
  )
  const [loaderDismissed, setLoaderDismissed] = useState(() => document.readyState === 'complete')
  const showLoader = !loaderDismissed

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  useEffect(() => {
    if (document.readyState === 'complete') {
      return
    }

    let completed = 0
    const cleanups: Array<() => void> = []
    const publishProgress = () => {
      window.requestAnimationFrame(() => {
        setLoadingProgress(Math.min(1, completed / total))
      })
    }
    const markComplete = () => {
      completed += 1
      publishProgress()
    }

    const trackedElements = getTrackedElements()
    let total = trackedElements.length + 1

    if ('fonts' in document) {
      total += 1
      document.fonts.ready.then(markComplete)
    }

    trackedElements.forEach((element) => {
      if (isElementLoaded(element)) {
        completed += 1
        return
      }

      const onDone = () => {
        element.removeEventListener('load', onDone)
        element.removeEventListener('error', onDone)
        markComplete()
      }

      element.addEventListener('load', onDone)
      element.addEventListener('error', onDone)
      cleanups.push(() => {
        element.removeEventListener('load', onDone)
        element.removeEventListener('error', onDone)
      })
    })

    const onWindowLoad = () => markComplete()
    window.addEventListener('load', onWindowLoad, { once: true })
    cleanups.push(() => window.removeEventListener('load', onWindowLoad))

    publishProgress()

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  useEffect(() => {
    if (loadingProgress < 1) {
      return
    }

    const timeoutId = window.setTimeout(() => setLoaderDismissed(true), 220)
    return () => window.clearTimeout(timeoutId)
  }, [loadingProgress])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-linear-to-b from-rose-100 via-pink-100 to-pink-200 transition-opacity duration-300 ${
          showLoader ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-5 px-6 text-center">
          <div className="loader-bob relative h-44 w-44 sm:h-52 sm:w-52">
            <img
              src={capybaraAsset}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full opacity-20 grayscale"
            />
            <div
              className="absolute inset-x-0 bottom-0 overflow-hidden transition-[height] duration-200 ease-out"
              style={{ height: `${Math.max(loadingProgress * 100, 6)}%` }}
            >
              <img
                src={capybaraAsset}
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-44 w-44 sm:h-52 sm:w-52"
              />
            </div>
          </div>
          <div className="h-2 w-40 overflow-hidden rounded-full bg-white/65 shadow-inner">
            <div
              className="h-full rounded-full bg-pink-400 transition-[width] duration-200 ease-out"
              style={{ width: `${loadingProgress * 100}%` }}
            />
          </div>
          <p className="font-lexend text-xs uppercase tracking-[0.28em] text-pink-700/80">
            Loading {Math.round(loadingProgress * 100)}%
          </p>
        </div>
      </div>
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
    </>
  )
}

export default App
