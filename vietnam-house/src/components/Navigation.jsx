import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'GŁÓWNA' },
    { path: '/menu', label: 'MENU' },
    { path: '/about', label: 'O NAS' },
    { path: '/contact', label: 'KONTAKT' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Social Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
            <Link to="/" className="flex items-center">
              <img
                src="/logo_no_bg.png"
                alt="Vietnam House - Kuchnia Orientalna"
                className="h-12 sm:h-14 md:h-16 w-auto"
              />
            </Link>

            {/* Social Icons - Always visible */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://www.facebook.com/vietnam.house.zamosc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-gray-300 hover:text-white" />
              </a>

              {/* Phone Icon - Mobile/Tablet */}
              <a
                href="tel:665559841"
                className="md:hidden w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Zadzwoń: 665 559 841"
              >
                <Phone size={16} className="text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Phone Number */}
            <a
              href="tel:665559841"
              className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
            >
              <Phone size={18} />
              <span className="text-sm font-medium">665 559 841</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-gray-300 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-primary bg-gray-800'
                    : 'text-gray-300 hover:text-primary hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Phone */}
            <a
              href="tel:665559841"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-primary"
            >
              <Phone size={18} />
              <span>665 559 841</span>
            </a>

            {/* Mobile Social Icons */}
            <div className="flex items-center gap-3 px-3 py-2">
              <a
                href="https://www.facebook.com/vietnam.house.zamosc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
              >
                <Facebook size={16} className="text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
