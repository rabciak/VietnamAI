import { useState } from 'react'
import { ChevronRight, Flame } from 'lucide-react'
import { menuCategories } from '../data/menuData'
import HeroBackground from '../components/HeroBackground'

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]?.id || null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory)

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <a href="/" className="hover:text-white transition-colors">Główna</a>
          <ChevronRight size={16} />
          <span className="text-gray-500">Nasze menu</span>
          {currentCategory && (
            <>
              <ChevronRight size={16} />
              <span className="text-white">{currentCategory.name}</span>
            </>
          )}
        </div>

        {/* Mobile Category Selector */}
        <div className="lg:hidden mb-6">
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-300 mb-2">
            Wybierz kategorię
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {menuCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Nasze menu</h2>
              <nav className="space-y-1">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-gray-800 text-white font-medium border-l-2 border-secondary'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full lg:w-auto">
            {currentCategory && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {currentCategory.name}
                  </h1>
                </div>

                {/* Menu Items */}
                {currentCategory.items.length === 0 ? (
                  <div className="bg-card rounded-lg p-12 text-center border border-gray-800">
                    <p className="text-gray-400 text-lg mb-2">
                      Menu w tej kategorii będzie wkrótce dostępne.
                    </p>
                    <p className="text-gray-500 text-sm">
                      Zadzwoń do nas pod numer{' '}
                      <a href="tel:665559841" className="text-white hover:underline">
                        665 559 841
                      </a>
                      {' '}aby poznać szczegóły
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentCategory.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-card rounded-lg border border-gray-800 hover:border-gray-700 transition-all overflow-hidden"
                      >
                        <div className="flex gap-6 p-6">
                          {/* Item Image */}
                          <div className="w-24 h-24 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-3xl">
                                🍜
                              </div>
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-1">
                                  {item.name}
                                  {item.spicy > 0 && (
                                    <span className="flex">
                                      {Array(item.spicy).fill(0).map((_, i) => (
                                        <Flame key={i} size={16} className="text-red-500" />
                                      ))}
                                    </span>
                                  )}
                                </h3>
                                {item.description && (
                                  <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.description}
                                  </p>
                                )}
                                {item.vegetarian && (
                                  <span className="inline-block mt-2 px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded border border-green-800">
                                    Wegetariańskie
                                  </span>
                                )}
                              </div>

                              <div className="text-right flex-shrink-0 min-w-[80px]">
                                <div className="text-2xl font-bold text-white whitespace-nowrap">
                                  {item.price}{' '}
                                  <span className="text-lg text-gray-400">zł</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Info Banner */}
                <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400">
                    ℹ️ Informacja o alergenach dostępna pod numerem telefonu{' '}
                    <a href="tel:665559841" className="text-white hover:underline">
                      665 559 841
                    </a>
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-12 bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Chcesz zarezerwować stolik?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Zadzwoń do nas i zarezerwuj stolik lub zamów na wynos
                  </p>
                  <a
                    href="tel:665559841"
                    className="inline-block bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full font-semibold transition-colors"
                  >
                    Zadzwoń: 665 559 841
                  </a>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      </div>
    </HeroBackground>
  )
}
