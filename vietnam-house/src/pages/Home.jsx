import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PhotoCarousel from '../components/PhotoCarousel'
import HeroBackground from '../components/HeroBackground'

export default function Home() {

  const featuredDishes = [
    {
      name: 'Pad Thai',
      category: 'Makarony',
      image: '/Pad thai.jpg'
    },
    {
      name: 'Kurczak Po Wietnamsku',
      category: 'Kurczak',
      image: '/Kurczak po wietnamsku.jpg'
    },
    {
      name: 'Kaczka Po Chińsku',
      category: 'Kaczka',
      image: '/Kaczka po chińsku.png'
    },
    {
      name: 'Kurczak Tokyo',
      category: 'Kurczak',
      image: '/Kurczak tokyo.png'
    },
    {
      name: 'Kurczak Po Singapursku',
      category: 'Kurczak',
      image: '/Kurczak po singapursku.jpg'
    },
    {
      name: 'Kurczak Grillowany Po Tajsku',
      category: 'Kurczak',
      image: '/Kurczak grillowany po tajsku.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <HeroBackground
        src="/background.jpg?v=2"
        alt="Vietnam House Restaurant Background"
        opacity={40}
        enableBlur={false}
        overlayColor="black"
        overlayOpacity={65}
        enableVignette={true}
        topFade={true}
        bottomFade={true}
        className="min-h-[calc(100vh-80px)]"
      >
        <section className="relative min-h-[calc(100vh-80px)] flex items-center py-12">
          <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[45%_55%] gap-12 xl:gap-16 2xl:gap-20 items-center">
              {/* Left Content */}
              <div className="mb-8 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
                  Eksplozja smaków w sercu kuchni azjatyckiej – świeżo, intensywnie, autentycznie.
                </h1>

                <div className="w-20 h-1 bg-primary mb-8 shadow-lg"></div>

                <a
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 text-lg rounded-lg shadow-2xl hover:shadow-primary/50 transition-all"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="uppercase tracking-wide">Menu</span>
                </a>
              </div>

              {/* Right - Interactive Photo Carousel */}
              <div className="relative w-full">
                <PhotoCarousel
                  photos={featuredDishes}
                  autoPlay={true}
                  autoPlayInterval={5000}
                  loop={true}
                  showDots={true}
                  showArrows={true}
                  enableLightbox={true}
                />

                {/* Zobacz więcej link */}
                <div className="text-right mt-4">
                  <Link
                    to="/menu"
                    className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 text-sm font-medium"
                  >
                    <span>Zobacz więcej</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBackground>

      {/* Footer Section */}
      <section className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
            <p>Polityka poufności i ochrona danych. Copyright 2025 ©</p>
            <p className="text-gray-600">
              Strona stworzona przez{' '}
              <span className="text-gray-400">Vietnam House</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
