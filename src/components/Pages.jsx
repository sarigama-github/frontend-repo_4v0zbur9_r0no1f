import { motion } from 'framer-motion'

export function AboutPage() {
  return (
    <Section title="About Us" subtitle="Who we are and what we believe">
      <p className="text-slate-700">
        We design and deliver reliable software for Manufacturing and Healthcare. Our team integrates systems,
        builds project management apps, ships AI workflows, and crafts custom chatbots that respect compliance
        and security requirements.
      </p>
    </Section>
  )
}

export function ProductsPage() {
  return (
    <Section title="Products" subtitle="Platforms and accelerators">
      <ul className="list-disc pl-5 text-slate-700 space-y-2">
        <li>Manufacturing Ops Hub — ERP/MES connectors, dashboards, and SOP automation.</li>
        <li>Healthcare Workflow Studio — EHR/EMR bridges, clinical pathways, and audit trails.</li>
        <li>AI Automation Kit — RAG pipelines, agent orchestration, and monitoring.</li>
      </ul>
    </Section>
  )
}

export function SolutionsPage() {
  return (
    <Section title="Solutions" subtitle="Tailored outcomes for your use case">
      <ul className="list-disc pl-5 text-slate-700 space-y-2">
        <li>Predictive maintenance and quality automation for factories.</li>
        <li>Care team coordination, prior auth automation, and patient triage.</li>
        <li>Secure chatbots for internal knowledge and customer support.</li>
      </ul>
    </Section>
  )
}

export function ContactPage() {
  return (
    <Section title="Contact Us" subtitle="We’ll respond within one business day">
      <a href="/#contact" className="inline-block rounded-md bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2">Open contact form</a>
    </Section>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-slate-600">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </motion.div>
    </div>
  )
}
