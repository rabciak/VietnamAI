import { Heart, Award, Sparkles } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Autentyczność',
      description: 'Wszystkie nasze dania przygotowujemy według tradycyjnych wietnamskich przepisów przekazywanych z pokolenia na pokolenie.'
    },
    {
      icon: Award,
      title: 'Jakość Składników',
      description: 'Używamy wyłącznie świeżych, wysokiej jakości składników, aby zapewnić naszym gościom najlepsze smaki.'
    },
    {
      icon: Sparkles,
      title: 'Pasja i Doświadczenie',
      description: 'Nasz zespół z pasją przygotowuje każde danie, dbając o najmniejsze szczegóły i autentyczny smak.'
    }
  ]

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
            O Nas
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl border border-gray-800 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Witamy w Vietnam House
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300 space-y-4">
              <p>
                Vietnam House to miejsce, gdzie tradycyjna kuchnia wietnamska spotyka się z polską gościnnością.
                Nasza restauracja powstała z pasji do autentycznych smaków Wietnamu i chęci podzielenia się nimi
                z mieszkańcami Zamościa i okolic.
              </p>
              <p>
                Każde danie w naszym menu jest starannie przygotowywane według oryginalnych receptur,
                z wykorzystaniem świeżych składników i aromatycznych przypraw sprowadzanych bezpośrednio z Azji.
                Dbamy o to, aby każdy kęs był podróżą kulinarną do egzotycznego Wietnamu.
              </p>
              <p>
                W Vietnam House wierzymy, że jedzenie to nie tylko pożywienie, ale także sposób na
                odkrywanie nowych kultur i tworzenie wspólnych wspomnień. Dlatego zapraszamy Państwa do
                naszej restauracji, gdzie w ciepłej atmosferze możecie delektować się autentycznymi
                smakami kuchni orientalnej.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Nasze Wartości
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center p-6 bg-card rounded-xl border border-gray-800 hover:border-secondary/50 transition-colors">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mb-6">
                    <IconComponent className="text-secondary" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
            Nasza Restauracja
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Odwiedź nas, aby doświadczyć autentycznej atmosfery wietnamskiej kuchni w sercu Zamościa
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { emoji: '🍜', label: 'Świeże Zupy' },
              { emoji: '🥢', label: 'Tradycyjne Dania' },
              { emoji: '🌶️', label: 'Pikantne Smaki' },
              { emoji: '🥗', label: 'Zdrowe Składniki' },
              { emoji: '🍛', label: 'Bogata Oferta' },
              { emoji: '☕', label: 'Kawa & Herbata' }
            ].map((item, index) => (
              <div
                key={index}
                className="aspect-square bg-card rounded-lg flex flex-col items-center justify-center border border-gray-800 hover:border-secondary/50 transition-all hover:scale-105"
              >
                <span className="text-5xl md:text-6xl mb-3">{item.emoji}</span>
                <span className="text-sm md:text-base text-gray-300 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Gotowi na kulinarną podróż?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Odwiedźcie nas i przekonajcie się sami, dlaczego kochamy wietnamską kuchnię
          </p>
          <a
            href="tel:665559841"
            className="inline-block bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Zarezerwuj Stolik: 665 559 841
          </a>
        </div>
      </section>
      </div>
    </HeroBackground>
  )
}
