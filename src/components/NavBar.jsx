import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()
  const isActive = (path) => (location.pathname === path ? 'text-cyan-700' : 'text-slate-700 hover:text-slate-900')

  return (
    <nav className="hidden md:flex items-center gap-4 text-sm">
      <Link to="/" className={`transition ${isActive('/')}`}>Home</Link>
      <Link to="/about" className={`transition ${isActive('/about')}`}>About Us</Link>
      <Link to="/products" className={`transition ${isActive('/products')}`}>Products</Link>
      <Link to="/solutions" className={`transition ${isActive('/solutions')}`}>Solutions</Link>
      <Link to="/contact" className={`transition ${isActive('/contact')}`}>Contact Us</Link>
    </nav>
  )
}
