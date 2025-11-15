import { useState } from 'react'

const servicesList = [
  { title: 'Systems Integrations', desc: 'Connect ERPs, MES, EHR/EMR, CRMs and shop-floor systems with robust, secure pipelines.' },
  { title: 'Project Management Apps', desc: 'Custom dashboards, workflows, and role-based portals for execution and governance.' },
  { title: 'AI Workflows & Automations', desc: 'Orchestrate LLMs, RPA, ETL and APIs to automate repetitive tasks and insights.' },
  { title: 'Custom Chatbots', desc: 'Domain-tuned assistants for manufacturing and healthcare use cases.' },
]

const industries = [
  { title: 'Manufacturing', points: ['ERP/MES integrations', 'Predictive maintenance', 'Quality automation'] },
  { title: 'Healthcare', points: ['EHR/EMR integrations', 'Clinical workflows', 'Secure data handling (HIPAA)'] },
]

function App() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', industry: 'Manufacturing',
    services: [], message: '', budget: '', timeline: '', source: 'Website'
  })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const toggleService = (s) => {
    setForm((f) => {
      const exists = f.services.includes(s)
      const services = exists ? f.services.filter(x => x !== s) : [...f.services, s]
      return { ...f, services }
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: 'Submitting...' })
    try {
      const res = await fetch(`${backend}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setStatus({ state: 'success', msg: 'Thanks! We will reach out shortly.' })
      setForm({ name: '', email: '', company: '', industry: 'Manufacturing', services: [], message: '', budget: '', timeline: '', source: 'Website' })
    } catch (err) {
      setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">FB</div>
          <div>
            <p className="text-lg font-semibold text-slate-900">Flames.Blue</p>
            <p className="text-xs text-slate-500">Integrations • PM Apps • AI Workflows • Chatbots</p>
          </div>
        </div>
        <a href="/test" className="text-sm text-blue-700 hover:underline">Check backend</a>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className="py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Software for Manufacturing & Healthcare</h1>
            <p className="mt-4 text-slate-600 text-lg">We build integrations, project management apps, AI workflows, automations, and custom chatbots tailored to regulated and industrial environments.</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {servicesList.map(s => (
                <li key={s.title} className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm border border-slate-100">
                  <p className="font-semibold text-slate-900">{s.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
            <h3 className="text-xl font-semibold text-slate-900">Start a conversation</h3>
            <p className="text-sm text-slate-600 mb-4">Tell us about your project. We’ll follow up within 1 business day.</p>
            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Company" className="w-full px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})} className="px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Manufacturing</option>
                  <option>Healthcare</option>
                  <option>Other</option>
                </select>
                <select value={form.timeline} onChange={e=>setForm({...form,timeline:e.target.value})} className="px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Timeline</option>
                  <option>ASAP</option>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-slate-700 mb-1">Services needed</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {servicesList.map(s => (
                    <label key={s.title} className={`flex items-center gap-2 px-3 py-2 rounded border cursor-pointer ${form.services.includes(s.title) ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                      <input type="checkbox" checked={form.services.includes(s.title)} onChange={()=>toggleService(s.title)} />
                      <span className="text-sm">{s.title}</span>
                    </label>
                  ))}
                </div>
              </div>
              <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Project details" rows={4} className="w-full px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} className="px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Budget</option>
                  <option>Under $10k</option>
                  <option>$10k–$50k</option>
                  <option>$50k–$200k</option>
                  <option>$200k+</option>
                </select>
                <input value={form.source} onChange={e=>setForm({...form,source:e.target.value})} placeholder="How did you hear about us?" className="px-3 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" disabled={status.state==='loading'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
                {status.state==='loading' ? 'Sending...' : 'Request a proposal'}
              </button>
              {status.state !== 'idle' && (
                <p className={`text-sm ${status.state==='success' ? 'text-green-600' : status.state==='error' ? 'text-red-600' : 'text-slate-600'}`}>{status.msg}</p>
              )}
            </form>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <h2 className="text-2xl font-bold text-slate-900">Industries</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {industries.map(i => (
              <div key={i.title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <p className="font-semibold text-slate-900">{i.title}</p>
                <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
                  {i.points.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Flames.Blue — All rights reserved.
        </footer>
      </main>
    </div>
  )
}

export default App
