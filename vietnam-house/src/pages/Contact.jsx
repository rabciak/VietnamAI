import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import HeroBackground from '../components/HeroBackground'
import RestaurantMap from '../components/RestaurantMap'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to a backend
    console.log('Reservation request:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', phone: '', date: '', time: '', guests: '2' })
    }, 5000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <HeroBackground
      src="/background.jpg?v=2"
      alt="Vietnam House Background"
      opacity={40}
      overlayColor="black"
      overlayOpacity={65}
      enableVignette={true}
      topFade={true}
      bottomFade={true}
      className="min-h-screen"
    >
      <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Kontakt
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Information */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Skontaktuj się z nami
          </h2>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                  <Phone className="text-secondary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Telefon</h3>
                <a
                  href="tel:665559841"
                  className="text-gray-300 hover:text-white text-lg transition-colors"
                >
                  665 559 841
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                  <Mail className="text-secondary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                <a
                  href="mailto:kontakt@vietnamhouse.pl"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  kontakt@vietnamhouse.pl
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                  <MapPin className="text-secondary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Adres</h3>
                <p className="text-gray-300">
                  Prymasa Stefana Wyszyńskiego 4<br />
                  22-400 Zamość
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                  <Clock className="text-secondary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Godziny otwarcia</h3>
                <p className="text-gray-300">
                  Poniedziałek - Piątek: 10:00 - 19:30<br />
                  Sobota: 11:00 - 19:30
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                  <Facebook className="text-secondary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Social Media</h3>
                <a
                  href="https://facebook.com/vietnam.house.zamosc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  @vietnam.house.zamosc
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Jak do nas trafić
          </h2>
          <div className="bg-card border border-gray-800 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Lokalizacja</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-white">Adres</p>
                      <p>Prymasa Stefana Wyszyńskiego 4</p>
                      <p>22-400 Zamość, Polska</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-white">Telefon</p>
                      <a href="tel:665559841" className="hover:text-white transition-colors">
                        665 559 841
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-white">Godziny otwarcia</p>
                      <p>Poniedziałek - Piątek: 10:00 - 19:30</p>
                      <p>Sobota: 11:00 - 19:30</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-xl font-semibold text-white text-center">
                  Odwiedź nas w Zamościu
                </h4>
                <RestaurantMap />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </HeroBackground>
  )
}
