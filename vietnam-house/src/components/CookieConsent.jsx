import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Cookie className="text-primary" size={28} />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3">
                Pliki Cookie
              </h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                Używamy plików cookie, aby poprawić Twoje doświadczenia na naszej stronie.
                Pliki cookie pomagają nam zapamiętać Twoje preferencje i zrozumieć, jak korzystasz z naszej witryny.
                Kontynuując przeglądanie, zgadzasz się na użycie plików cookie zgodnie z naszą{' '}
                <Link
                  to="/polityka-prywatnosci"
                  className="text-primary hover:text-primary/80 underline font-medium"
                >
                  Polityką Prywatności
                </Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAccept}
                  className="bg-primary hover:bg-primary/90 text-black font-semibold"
                  size="lg"
                >
                  Akceptuję
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                  size="lg"
                >
                  Odrzuć
                </Button>
              </div>
            </div>

            <button
              onClick={handleReject}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              aria-label="Zamknij banner cookie"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
