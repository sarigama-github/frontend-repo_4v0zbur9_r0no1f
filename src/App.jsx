import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wrench,
  Workflow,
  Bot,
  KanbanSquare,
  Factory,
  Stethoscope,
  Palette,
  Send,
  CheckCircle2,
} from 'lucide-react'

const THEMES = {
  ocean: {
    name: 'Ocean',
    bg: 'from-sky-50 via-blue-50 to-cyan-100',
    heroGlow: 'bg-cyan-400/30',
    card: 'hover:border-cyan-300/60 hover:shadow-cyan-200/50',
    accent: 'text-cyan-700',
    button: 'bg-cyan-600 hover:bg-cyan-700',
    ring: 'focus:ring-cyan-500/40',
  },
  violet: {
    name: 'Violet',
    bg: 'from-fuchsia-50 via-purple-50 to-indigo-100',
    heroGlow: 'bg-fuchsia-400/30',
    card: 'hover:border-fuchsia-300/60 hover:shadow-fuchsia-200/50',
    accent: 'text-fuchsia-700',
    button: 'bg-fuchsia-600 hover:bg-fuchsia-700',
    ring: 'focus:ring-fuchsia-500/40',
  },
  sunset: {
    name: 'Sunset',
    bg: 'from-rose-50 via-orange-50 to-amber-100',
    heroGlow: 'bg-amber-400/30',
    card: 'hover:border-amber-300/60 hover:shadow-amber-200/50',
    accent: 'text-orange-700',
    button: 'bg-orange-600 hover:bg-orange-700',
    ring: 'focus:ring-orange-500/40',
  },
  slate: {
    name: 'Slate',
    bg: 'from-slate-50 via-slate-100 to-zinc-100',
    heroGlow: 'bg-slate-400/20',
    card: 'hover:border-slate-300/60 hover:shadow-slate-200/50',
    accent: 'text-slate-700',
    button: 'bg-slate-800 hover:bg-slate-900',
    ring: 'focus:ring-slate-500/40',
  },
}

const SERVICES = [
  {
    icon: Wrench,
    title: 'Systems Integrations',
    desc: 'Connect ERPs, MES, LIMS, and devices for real-time data flow.',
  },
  {
    icon: KanbanSquare,
    title: 'Project Management Apps',
    desc: 'Custom workflows, dashboards, and role-based operations.',
  },
  {
    icon: Workflow,
    title: 'AI Workflows & Automations',
    desc: 'Predictive, rules-driven, and LLM-powered automations.',
  },
  {
    icon: Bot,
    title: 'Custom Chatbots',
    desc: 'Domain-trained assistants for teams and customers.',
  },
]

const INDUSTRIES = [
  {
    icon: Factory,
    title: 'Manufacturing',
    bullets: [
      'ERP/MES integrations',
      'Predictive maintenance',
      'Quality automation',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    bullets: [
      'EHR/EMR integrations',
      'Clinical workflows',
      'HIPAA-ready foundations',
    ],
  },
]

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'ocean')
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])
  const data = useMemo(() => THEMES[theme], [theme])
  return { theme, setTheme, data }
}

export default function App() {
  const { theme, setTheme, data } = useTheme()

  // Force ocean for now as requested
  useEffect(() => {
    if (theme !== 'ocean') setTheme('ocean')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: 'Manufacturing',
    services: [],
    budget: '',
    timeline: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onToggleService = (title) => {
    setForm((f) => {
      const s = new Set(f.services)
      if (s.has(title)) s.delete(title)
      else s.add(title)
      return { ...f, services: Array.from(s) }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const payload = {
        ...form,
        source: 'website',
      }
      const res = await fetch(`${backend}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('success')
      setForm({
        name: '', email: '', company: '', industry: 'Manufacturing', services: [], budget: '', timeline: '', message: '',
      })
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${data.bg} text-slate-800`}>
      {/* Animated background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className={`absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl ${data.heroGlow}`}
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 20, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className={`absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl ${data.heroGlow}`}
          animate={{ x: [0, -30, 10, 0], y: [0, 25, -15, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        />
      </div>

      {/* Nav */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className={`inline-flex items-center gap-2 rounded-lg bg-white/80 px-2 py-1 shadow ${data.card}`}>
              <MeghamSysLogo className="h-8 w-8" />
              <span className="hidden sm:inline">MeghamSys</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeSelector theme={theme} setTheme={setTheme} />
            <Link
              to="/test"
              className="rounded-md border border-black/5 bg-white/70 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur hover:bg-white/90"
            >
              Check backend
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Build reliable software for Manufacturing and Healthcare
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Integrations, project management apps, AI workflows, and custom chatbots — delivered with compliance and reliability.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#contact" className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-white ${data.button} focus:outline-none ${data.ring}`}>
                  <Send className="h-4 w-4" /> Start a conversation
                </a>
                <a href="#ai" className="inline-flex items-center gap-2 rounded-md border border-black/5 bg-white/70 px-4 py-2 text-slate-800 shadow-sm backdrop-blur hover:bg-white/90">
                  Explore AI workflows
                </a>
              </div>
              <div className={`mt-6 text-sm ${data.accent}`}>Trusted by builders across regulated industries</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-6 rounded-3xl bg-white/30 blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />
                <div className="relative rounded-3xl border border-black/5 bg-white/80 p-6 shadow-xl backdrop-blur">
                  <div className="grid grid-cols-2 gap-4">
                    {SERVICES.map((s, i) => (
                      <motion.div
                        key={s.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className={`group rounded-xl border border-transparent bg-white/70 p-4 shadow-sm backdrop-blur transition-all ${data.card}`}
                      >
                        <s.icon className="h-6 w-6 text-slate-700" />
                        <div className="mt-2 font-semibold">{s.title}</div>
                        <div className="text-sm text-slate-600">{s.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Workflows Gallery */}
      <section id="ai" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">AI Workflows that feel promising</h2>
            <p className={`text-sm ${data.accent}`}>Ocean theme visuals</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <IllustrationCard title="LLM + RAG Pipeline" description="Search, retrieve, and ground answers with your data." data={data}>
              <RagPipelineSVG />
            </IllustrationCard>

            <IllustrationCard title="Predictive Maintenance" description="Sensor streams → feature store → anomaly alerts." data={data}>
              <PredictiveSVG />
            </IllustrationCard>

            <IllustrationCard title="Chat Automation" description="Multi-step agent orchestrates tasks and approvals." data={data}>
              <ChatAgentSVG />
            </IllustrationCard>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">Services</h2>
            <p className={`text-sm ${data.accent}`}>From discovery to deployment</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6, rotate: [-0.2, 0.2, 0] }}
                className={`rounded-xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur transition-all ${data.card}`}
              >
                <s.icon className="h-6 w-6 text-slate-700" />
                <div className="mt-2 font-semibold">{s.title}</div>
                <div className="text-sm text-slate-600">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-bold">Industries</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur ${data.card}`}
              >
                <div className="flex items-center gap-3">
                  <ind.icon className="h-6 w-6 text-slate-700" />
                  <div className="font-semibold">{ind.title}</div>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  {ind.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-2xl font-bold">Start a conversation</h2>
              <p className="mt-2 text-slate-600">
                Tell us a bit about your goals. We’ll reply within one business day.
              </p>
              <div className={`mt-4 text-sm ${data.accent}`}>We never share your data.</div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {SERVICES.map((s) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => onToggleService(s.title)}
                    className={`rounded-lg border border-black/5 bg-white/70 px-3 py-2 text-left text-sm shadow-sm backdrop-blur transition-all ${data.card} ${form.services.includes(s.title) ? 'ring-2 ring-black/10' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-slate-700" />
                      <span>{s.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`rounded-2xl border border-black/5 bg-white/80 p-6 shadow-xl backdrop-blur ${data.card}`}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm outline-none transition ${data.ring}`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm outline-none transition ${data.ring}`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={`mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm outline-none transition ${data.ring}`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className={`mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm outline-none transition ${data.ring}`}
                  >
                    {INDUSTRIES.map((i) => (
                      <option key={i.title} value={i.title}>{i.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className={`mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm outline-none transition ${data.ring}`}
                  >
                    <option value="">Select…</option>
                    <option value="< $10k">Less than $10k</option>
                    <option value="$10k–$50k">$10k–$50k</option>
                    <option value="> $50k">More than $50k</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Timeline</label>
                  <select
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className={`mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm outline-none transition ${data.ring}`}
                  >
                    <option value="">Select…</option>
                    <option value="ASAP">ASAP</option>
                    <option value="This quarter">This quarter</option>
                    <option value="This year">This year</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className={`mt-1 w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm outline-none transition ${data.ring}`}
                    placeholder="What would you like to build?"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-white ${data.button} disabled:opacity-60`}
                >
                  <AnimatePresence initial={false} mode="wait">
                    {status === 'loading' ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Spinner /> Sending
                      </motion.span>
                    ) : status === 'success' ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Sent
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" /> Send
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {status === 'error' && (
                  <div className="text-sm text-rose-600">{error}</div>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-black/5 bg-white/60 py-6 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MeghamSysLogo className="h-5 w-5" />
            <span>© {new Date().getFullYear()} MeghamSys • Cloud Systems</span>
          </div>
          <div className="text-sm text-slate-600">Built with FastAPI, React, and Tailwind</div>
        </div>
      </footer>
    </div>
  )
}

function ThemeSelector({ theme, setTheme }) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-black/5 bg-white/70 p-1 shadow-sm backdrop-blur">
      {Object.entries(THEMES).map(([key, t]) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`inline-flex items-center gap-1 rounded px-2 py-1 text-sm transition ${theme === key ? 'bg-black/5' : ''}`}
          title={t.name}
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">{t.name}</span>
        </button>
      ))}
    </div>
  )
}

function Spinner() {
  return (
    <motion.svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="4"
      />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

function IllustrationCard({ title, description, data, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur ${data.card}`}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-white to-white/60">
        <div className="h-full w-full">
          {children}
        </div>
      </div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="text-sm text-slate-600">{description}</div>
    </motion.div>
  )
}

// Simple ocean-themed SVG illustrations
function RagPipelineSVG() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#g1)" opacity="0.08" />
      <g stroke="#0ea5e9" strokeWidth="2" fill="none">
        <rect x="30" y="120" width="90" height="60" rx="10" fill="#e6f9ff" />
        <rect x="155" y="120" width="90" height="60" rx="10" fill="#e6f9ff" />
        <rect x="280" y="120" width="90" height="60" rx="10" fill="#e6f9ff" />
        <path d="M120 150 H155" />
        <path d="M245 150 H280" />
        <text x="75" y="155" textAnchor="middle" fontSize="12" fill="#0369a1">Query</text>
        <text x="200" y="155" textAnchor="middle" fontSize="12" fill="#0369a1">Retrieve</text>
        <text x="325" y="155" textAnchor="middle" fontSize="12" fill="#0369a1">Answer</text>
      </g>
      <g>
        <circle cx="75" cy="80" r="8" fill="#22d3ee" />
        <circle cx="200" cy="220" r="6" fill="#06b6d4" />
        <circle cx="325" cy="60" r="10" fill="#0891b2" />
      </g>
    </svg>
  )
}

function PredictiveSVG() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <rect x="0" y="0" width="400" height="300" fill="#0ea5e9" opacity="0.06" />
      <g stroke="#06b6d4" strokeWidth="2" fill="none">
        <polyline points="30,220 80,180 130,200 180,140 230,160 280,110 330,130 370,90" />
        <line x1="30" y1="240" x2="370" y2="240" stroke="#94a3b8" strokeDasharray="4 4" />
      </g>
      <g fill="#22d3ee">
        <circle cx="80" cy="180" r="5" />
        <circle cx="180" cy="140" r="5" />
        <circle cx="280" cy="110" r="5" />
        <circle cx="370" cy="90" r="5" />
      </g>
    </svg>
  )
}

function ChatAgentSVG() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <rect x="0" y="0" width="400" height="300" fill="#06b6d4" opacity="0.06" />
      <g>
        <rect x="40" y="60" width="130" height="70" rx="12" fill="#e0f7ff" stroke="#06b6d4" />
        <rect x="230" y="60" width="130" height="70" rx="12" fill="#e0f7ff" stroke="#06b6d4" />
        <rect x="135" y="170" width="130" height="70" rx="12" fill="#e0f7ff" stroke="#06b6d4" />
        <path d="M170 130 L230 130" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M170 130 C170 180, 230 180, 230 180" stroke="#0ea5e9" strokeWidth="2" fill="none" />
        <path d="M270 130 C270 180, 230 180, 230 180" stroke="#0ea5e9" strokeWidth="2" fill="none" />
        <text x="105" y="100" textAnchor="middle" fontSize="12" fill="#0369a1">User</text>
        <text x="295" y="100" textAnchor="middle" fontSize="12" fill="#0369a1">Tools</text>
        <text x="200" y="210" textAnchor="middle" fontSize="12" fill="#0369a1">Agent</text>
      </g>
    </svg>
  )
}

// MeghamSys (Cloud Systems) logo: cloud + nodes + wordmark
function MeghamSysLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-label="MeghamSys logo">
      <defs>
        <linearGradient id="ms-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      {/* Cloud */}
      <g fill="url(#ms-g)" stroke="#0284c7" strokeWidth="2">
        <path d="M60 110c-14 0-26-10-26-24s12-24 26-24c3-12 16-22 31-22 18 0 33 12 35 28 12-2 24 7 24 19 0 13-11 23-25 23H60z" opacity="0.9" />
      </g>
      {/* Nodes */}
      <g fill="#22d3ee">
        <circle cx="75" cy="70" r="5" />
        <circle cx="120" cy="55" r="5" />
        <circle cx="145" cy="90" r="5" />
      </g>
      <g stroke="#0ea5e9" strokeWidth="2">
        <line x1="75" y1="70" x2="120" y2="55" />
        <line x1="120" y1="55" x2="145" y2="90" />
        <line x1="75" y1="70" x2="145" y2="90" />
      </g>
      {/* Wordmark M */}
      <g fill="none" stroke="url(#ms-g)" strokeWidth="10" strokeLinecap="round" filter="url(#soft)">
        <path d="M40 140 L60 90 L80 120 L100 80 L120 130" />
      </g>
    </svg>
  )
}
