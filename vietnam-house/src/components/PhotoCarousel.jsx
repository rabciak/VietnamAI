import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'
import { useCarousel, useKeyboardNavigation, useSwipeGesture } from '../hooks/useCarousel'
import PhotoLightbox from './PhotoLightbox'

/**
 * PhotoCarousel Component
 * A responsive, interactive photo carousel with touch gestures, keyboard navigation,
 * and lightbox functionality
 *
 * @param {Object} props
 * @param {Array} props.photos - Array of photo objects with shape: { image, name, category }
 * @param {boolean} props.autoPlay - Enable auto-play (default: false)
 * @param {number} props.autoPlayInterval - Auto-play interval in ms (default: 5000)
 * @param {boolean} props.loop - Enable looping (default: true)
 * @param {boolean} props.showDots - Show dot indicators (default: true)
 * @param {boolean} props.showArrows - Show navigation arrows (default: true)
 * @param {boolean} props.enableLightbox - Enable click to enlarge (default: true)
 * @param {string} props.className - Additional CSS classes
 */
export default function PhotoCarousel({
  photos = [],
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  showDots = true,
  showArrows = true,
  enableLightbox = true,
  className = ''
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0)

  const {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
    resetAutoPlay,
    canGoNext,
    canGoPrevious
  } = useCarousel(photos.length, { autoPlay, autoPlayInterval, loop })

  // Keyboard navigation for carousel (not lightbox)
  useKeyboardNavigation(
    {
      onNext: () => {
        goToNext()
        resetAutoPlay()
      },
      onPrevious: () => {
        goToPrevious()
        resetAutoPlay()
      }
    },
    !lightboxOpen
  )

  // Touch gestures for carousel
  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: () => {
      goToNext()
      resetAutoPlay()
    },
    onSwipeRight: () => {
      goToPrevious()
      resetAutoPlay()
    }
  })

  const handleDotClick = (index) => {
    goToIndex(index)
    resetAutoPlay()
  }

  const handlePhotoClick = (index) => {
    if (enableLightbox) {
      setLightboxStartIndex(index)
      setLightboxOpen(true)
    }
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        Brak zdjęć do wyświetlenia
      </div>
    )
  }

  return (
    <>
      <div className={cn('relative group', className)}>
        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-lg"
          {...swipeHandlers}
          role="region"
          aria-roledescription="carousel"
          aria-label="Galeria zdjęć"
        >
          {/* Photos Container */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {photos.map((photo, index) => (
              <div
                key={index}
                className="min-w-full relative"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} z ${photos.length}`}
              >
                <div
                  className={cn(
                    'relative overflow-hidden h-[450px] lg:h-[550px] xl:h-[600px]',
                    enableLightbox && 'cursor-pointer hover:opacity-90 transition-opacity'
                  )}
                  onClick={() => handlePhotoClick(index)}
                >
                  <img
                    src={photo.image}
                    alt={photo.name || `Zdjęcie ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Photo Info Overlay */}
                  {(photo.name || photo.category) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
                      {photo.category && (
                        <p className="text-xs text-gray-400 mb-1">{photo.category}</p>
                      )}
                      {photo.name && (
                        <p className="text-white text-sm font-semibold">{photo.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {showArrows && photos.length > 1 && (
            <>
              <button
                onClick={() => {
                  goToPrevious()
                  resetAutoPlay()
                }}
                disabled={!canGoPrevious}
                className={cn(
                  'absolute left-2 top-1/2 -translate-y-1/2 z-10',
                  'bg-black/50 hover:bg-black/70 text-white rounded-full p-2',
                  'transition-all opacity-0 group-hover:opacity-100',
                  'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary',
                  'disabled:opacity-30 disabled:cursor-not-allowed'
                )}
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  goToNext()
                  resetAutoPlay()
                }}
                disabled={!canGoNext}
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2 z-10',
                  'bg-black/50 hover:bg-black/70 text-white rounded-full p-2',
                  'transition-all opacity-0 group-hover:opacity-100',
                  'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary',
                  'disabled:opacity-30 disabled:cursor-not-allowed'
                )}
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        {showDots && photos.length > 1 && (
          <div
            className="flex justify-center mt-4 gap-2"
            role="tablist"
            aria-label="Wskaźniki slajdów"
          >
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  currentIndex === index
                    ? 'bg-primary w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                )}
                aria-label={`Przejdź do zdjęcia ${index + 1}`}
                aria-selected={currentIndex === index}
                role="tab"
              />
            ))}
          </div>
        )}

        {/* Current Position Indicator */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Zdjęcie {currentIndex + 1} z {photos.length}
        </div>
      </div>

      {/* Lightbox */}
      {enableLightbox && (
        <PhotoLightbox
          photos={photos}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          startIndex={lightboxStartIndex}
        />
      )}
    </>
  )
}
