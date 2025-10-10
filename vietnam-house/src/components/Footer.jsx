import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Cookie } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleCookieSettings = () => {
    // Clear cookie consent to show banner again
    localStorage.removeItem('cookieConsent')
    window.location.reload()
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Vietnam House</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Autentyczna kuchnia wietnamska w sercu Zamościa. Odkryj bogactwo smaków Orientu.
            </p>
            <p className="text-gray-500 text-sm italic">
              Kuchnia Orientalna
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-secondary mt-1 flex-shrink-0" size={18} />
                <div className="text-gray-400 text-sm">
                  <p>Prymasa Stefana Wyszyńskiego 4</p>
                  <p>22-400 Zamość, Polska</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-secondary flex-shrink-0" size={18} />
                <a
                  href="tel:665559841"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  665 559 841
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-secondary flex-shrink-0" size={18} />
                <a
                  href="mailto:kontakt@vietnamhouse.pl"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  kontakt@vietnamhouse.pl
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="text-secondary flex-shrink-0" size={18} />
                <a
                  href="https://facebook.com/vietnam.house.zamosc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  @vietnam.house.zamosc
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Godziny otwarcia</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex justify-between">
                <span>Poniedziałek - Piątek:</span>
                <span className="text-white font-medium">10:00 - 19:30</span>
              </div>
              <div className="flex justify-between">
                <span>Sobota:</span>
                <span className="text-white font-medium">11:00 - 19:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; {currentYear} Vietnam House. Wszelkie prawa zastrzeżone.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                to="/polityka-prywatnosci"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Polityka Prywatności
              </Link>
              <button
                onClick={handleCookieSettings}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                aria-label="Otwórz ustawienia cookie"
              >
                <Cookie size={16} />
                Ustawienia Cookie
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              Strona internetowa zgodna z RODO i polskimi przepisami o ochronie danych osobowych.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
