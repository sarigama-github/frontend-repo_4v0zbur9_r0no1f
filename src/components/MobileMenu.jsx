import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border border-black/5 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur"
      >
        Menu
      </button>
      {open && (
        <div className="absolute right-6 mt-2 w-56 rounded-lg border border-black/5 bg-white/90 p-3 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="hover:text-slate-900">Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="hover:text-slate-900">About Us</Link>
            <Link to="/products" onClick={() => setOpen(false)} className="hover:text-slate-900">Products</Link>
            <Link to="/solutions" onClick={() => setOpen(false)} className="hover:text-slate-900">Solutions</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-slate-900">Contact Us</Link>
          </div>
        </div>
      )}
    </div>
  )
}
