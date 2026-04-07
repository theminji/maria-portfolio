import { useEffect, useRef, useState } from 'react'

const capybaraAsset = '/capybara.svg'
const copyTickAsset = '/copy-tick.mp3'
const blobAsset = '/blob-idle.webm'
const webPortfolioHash = '#portfolio'
const currentYear = new Date().getFullYear()

const profileItems = [
  { label: 'Name', value: 'Maria Hall' },
  { label: 'Focus', value: 'Programming, problem-solving, filmmaking, VFX' },
  { label: 'Style', value: 'Creative tools, cute sites, visual projects' },
  { label: 'Status', value: 'Open to cool projects and work' },
]

const skills = [
  'Python',
  'Rust',
  'HTML/CSS',
  'Scripting',
  'Editing',
  'Motion graphics',
  'Compositing',
  'Automation',
  'TouchDesigner',
  'VFX',
  'Video production'
]

const certifications = [
  'Nvidia Intro to Deep Learning',
  'Adobe Certified Graphic Designer',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe InDesign',
  'Adobe Premiere Pro',
  'Adobe After Effects',
]

const socialLinks = [
  {
    site: 'GitHub',
    label: 'github.com/theminji',
    href: 'https://github.com/theminji',
    description: 'Code, experiments, and open source projects.',
  },
  {
    site: 'Website',
    label: 'airamx112.com',
    href: 'https://airamx112.com',
    description: 'My main portfolio site and project hub.',
  },
  {
    site: 'Discord',
    label: '@theminji',
    href: '',
    description: 'Best place to message me directly about anything.',
  },
]

const projects = [
  {
    name: 'Portfolio',
    stack: 'Tailwind / CSS / Cloud hosting',
    description: [
      'You\'re looking at it now! I wanted something unique and fun to represent me!',
    ],
    href: 'https://airamx112.com',
    label: 'airamx112.com',
  },
  {
    name: 'VType',
    stack: 'Rust / Python / AI',
    description: [
      'Small tool for voice typing on Linux and Windows.',
      'I was tired of not having accurate transcription tools on my computer, so I made my own tool and open sourced it.',
    ],
    href: 'https://github.com/theminji/VType',
    label: 'github.com/theminji/VType',
  },
  {
    name: 'TTS MCP Server',
    stack: 'Python / MCP / AI',
    description: [
      'A simple text-to-speech MCP server for local AI to generate speech files with.',
      "It uses Supertonic-2 TTS for the backend, which runs faster than realtime.",
    ],
    href: 'https://github.com/theminji/tts-mcp',
    label: 'github.com/theminji/tts-mcp',
  },
  {
    name: 'Lemod AI Discord moderator',
    stack: 'Python / Discord.py / OpenAI Moderation Toolkit',
    description: [
      'Discord bot that uses OpenAI moderation tooling to handle community moderation.',
      'It also supports admin commands through natural-language tool calls.',
    ],
    href: 'https://discord.gg/mattvidpro',
    label: 'discord.gg/mattvidpro',
  },
]

const nowItems = [
  'Exploring creative coding',
  'Creating AI models',
  'Mixing dev + film + VFX work',
]

const contactItems = [
  { label: 'Email', value: 'maria.a.hall.112@gmail.com', href: 'mailto:maria.a.hall.112@gmail.com' },
  { label: 'GitHub', value: 'github.com/theminji', href: 'https://github.com/theminji' },
  { label: 'Site', value: 'airamx112.com', href: 'https://airamx112.com' },
  { label: 'Discord', value: '@theminji' },
]

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

const isWebPortfolioRoute = () => window.location.hash === webPortfolioHash

type SectionCardProps = {
  title: string
  children: React.ReactNode
}

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-pink-200/80 bg-pink-50/85 p-5 shadow-[0_12px_35px_rgba(244,114,182,0.14)] backdrop-blur-sm">
      <p className="font-lexend text-xs uppercase tracking-[0.26em] text-pink-600">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-4 pb-6 pt-4 text-center text-xs text-pink-700/75 sm:text-sm">
      Made with {'<3'} by Maria | &copy; {currentYear} Maria Hall
    </footer>
  )
}

function LandingView({
  command,
  copied,
  onCopy,
}: {
  command: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col bg-linear-to-b from-rose-100 via-pink-100 to-pink-200 px-4 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-pink-900">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-1 flex-col items-center justify-center py-12 sm:py-0">
        <div className="flex w-full flex-col items-center">
          <h1 className="mb-6 text-center font-lexend text-3xl font-semibold tracking-[0.12em] text-pink-700 drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)] sm:text-5xl sm:tracking-[0.18em]">
            Maria Hall
          </h1>
          <div className="relative flex w-full max-w-md flex-col items-center gap-4 pt-6 sm:max-w-none sm:pt-0">
            <video
              className="blob-float pointer-events-none h-40 w-40 shrink-0 drop-shadow-[0_18px_34px_rgba(255,146,184,0.28)] sm:absolute sm:left-[calc(50%+14rem)] sm:top-1/2 sm:h-64 sm:w-64 sm:-translate-y-1/2"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={blobAsset} type="video/webm" />
            </video>
            <div className="animate-card-float relative z-20 flex w-full flex-row items-center gap-3 rounded-2xl border border-pink-200 bg-pink-50/80 p-3 shadow-[0_8px_30px_rgba(244,114,182,0.18)] backdrop-blur-sm sm:mx-auto sm:w-auto sm:min-w-[30rem]">
              <code className="min-w-0 flex-1 overflow-x-auto rounded-xl bg-white/80 px-4 py-2 text-left text-sm text-pink-800 shadow-inner sm:text-base">
                {command}
              </code>
              <button
                type="button"
                onClick={onCopy}
                className="shrink-0 rounded-xl bg-pink-300 px-4 py-2 text-sm font-semibold text-pink-900 transition hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 sm:min-w-28"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <a
            href={webPortfolioHash}
            className="mt-16 rounded-xl border border-pink-300 bg-white/80 px-4 py-2 text-center text-sm font-semibold text-pink-800 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 sm:mt-24 sm:min-w-52"
          >
            Scared of the terminal?
          </a>
        </div>
      </div>
      <Footer />
    </main>
  )
}

function WebPortfolioView() {
  return (
    <main className="flex min-h-screen flex-col bg-linear-to-b from-rose-100 via-pink-100 to-pink-200 px-4 py-10 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-pink-900 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-5">
        <section className="rounded-[2rem] border border-pink-200 bg-pink-50/85 p-6 shadow-[0_14px_40px_rgba(244,114,182,0.16)] backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-lexend text-xs uppercase tracking-[0.3em] text-pink-600">
                Web Portfolio
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-pink-700 sm:text-5xl">
                Maria Hall
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-pink-800/85">
                Same portfolio, less terminal. Creative development, filmmaking, VFX, and
                experimental tools in one place.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <a
                href="#"
                className="rounded-xl bg-pink-300 px-4 py-2 text-center text-sm font-semibold text-pink-900 transition hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              >
                Wait! Take me back!
              </a>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionCard title="Profile">
            <dl className="grid gap-3">
              {profileItems.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 rounded-2xl bg-white/70 px-4 py-3 shadow-inner sm:grid-cols-[7rem_1fr] sm:items-start"
                >
                  <dt className="font-lexend text-xs uppercase tracking-[0.18em] text-pink-500">
                    {item.label}
                  </dt>
                  <dd className="m-0 text-sm leading-6 text-pink-900">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          <SectionCard title="About">
            <p className="rounded-2xl bg-white/70 px-4 py-4 text-sm leading-7 text-pink-900 shadow-inner">
              I love making projects that solve problems and look fun! Websites,
              tools, video creation, graphics, and interactive ideas are the kind of work I
              enjoy most.
            </p>
          </SectionCard>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionCard title="Skills">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-sm text-pink-800 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Certifications">
            <ul className="grid gap-3">
              {certifications.map((certification) => (
                <li
                  key={certification}
                  className="rounded-2xl border border-pink-200/70 bg-white/80 px-4 py-3 text-sm text-pink-900 shadow-sm"
                >
                  {certification}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionCard title="Links">
            <div className="grid gap-3">
              {socialLinks.map((link) => (
                <article
                  key={link.site}
                  className="rounded-2xl border border-pink-200/70 bg-white/80 p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-pink-700">{link.site}</h2>
                      <p className="mt-1 text-sm leading-6 text-pink-900/80">{link.description}</p>
                    </div>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-pink-300 bg-pink-100 px-3 py-2 text-sm font-semibold text-pink-800 transition hover:bg-pink-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="rounded-xl border border-pink-200 bg-pink-100/70 px-3 py-2 text-sm font-semibold text-pink-800">
                        {link.label}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Featured Projects">
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-[1.5rem] border border-pink-200/80 bg-white/80 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-pink-700">{project.name}</h2>
                    <p className="mt-1 text-sm uppercase tracking-[0.16em] text-pink-500">
                      {project.stack}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-pink-900/85">
                  {project.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-xl bg-pink-300 px-4 py-2 text-sm font-semibold text-pink-900 transition hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                >
                  {project.label}
                </a>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionCard title="Now">
            <ul className="grid gap-3">
              {nowItems.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-white/75 px-4 py-3 text-sm text-pink-900 shadow-inner"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Contact">
            <dl className="grid gap-3">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 rounded-2xl bg-white/75 px-4 py-3 shadow-inner sm:grid-cols-[6rem_1fr]"
                >
                  <dt className="font-lexend text-xs uppercase tracking-[0.18em] text-pink-500">
                    {item.label}
                  </dt>
                  <dd className="m-0 text-sm text-pink-900">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                        className="font-semibold text-pink-700 underline decoration-pink-300 underline-offset-4"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </div>
      </div>
      <Footer />
    </main>
  )
}

function App() {
  const command = 'curl -s -L https://airamx112.com'
  const [copied, setCopied] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(() =>
    document.readyState === 'complete' ? 1 : 0,
  )
  const [loaderDismissed, setLoaderDismissed] = useState(() => document.readyState === 'complete')
  const [showWebPortfolio, setShowWebPortfolio] = useState(() => isWebPortfolioRoute())
  const copyTickRef = useRef<HTMLAudioElement | null>(null)
  const showLoader = !loaderDismissed

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      if (copyTickRef.current) {
        copyTickRef.current.currentTime = 0
        void copyTickRef.current.play().catch(() => {})
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  useEffect(() => {
    const syncRoute = () => setShowWebPortfolio(isWebPortfolioRoute())
    syncRoute()
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

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
      <audio ref={copyTickRef} preload="auto" src={copyTickAsset} />
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
      
      {showWebPortfolio ? (
        <WebPortfolioView />
      ) : (
        <LandingView command={command} copied={copied} onCopy={handleCopy} />
      )}
    </>
  )
}

export default App
