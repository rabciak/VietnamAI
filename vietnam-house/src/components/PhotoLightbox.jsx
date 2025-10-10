import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogContent, DialogPortal, DialogOverlay } from './ui/dialog'
import { cn } from '../lib/utils'
import { useCarousel, useKeyboardNavigation, useSwipeGesture } from '../hooks/useCarousel'

/**
 * PhotoLightbox Component
 * A fullscreen lightbox/modal for viewing photos with navigation
 *
 * @param {Object} props
 * @param {Array} props.photos - Array of photo objects
 * @param {boolean} props.isOpen - Control lightbox visibility
 * @param {Function} props.onClose - Callback when lightbox closes
 * @param {number} props.startIndex - Initial photo index to display
 */
export default function PhotoLightbox({
  photos = [],
  isOpen = false,
  onClose,
  startIndex = 0
}) {
  const {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
    canGoNext,
    canGoPrevious
  } = useCarousel(photos.length, { loop: true })

  // Set initial index when lightbox opens
  useEffect(() => {
    if (isOpen && startIndex >= 0 && startIndex < photos.length) {
      goToIndex(startIndex)
    }
  }, [isOpen, startIndex, photos.length, goToIndex])

  // Keyboard navigation
  useKeyboardNavigation(
    {
      onNext: goToNext,
      onPrevious: goToPrevious,
      onEscape: onClose
    },
    isOpen
  )

  // Touch gestures
  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious
  })

  if (!photos || photos.length === 0) {
    return null
  }

  const currentPhoto = photos[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/95" />
        <DialogContent
          className="max-w-[100vw] w-full h-[100vh] p-0 border-0 bg-transparent flex items-center justify-center"
          aria-describedby="lightbox-description"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={onClose}
              className={cn(
                'absolute top-4 right-4 z-50',
                'bg-black/50 hover:bg-black/70 text-white rounded-full p-3',
                'transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary'
              )}
              aria-label="Zamknij galerię"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo Container */}
            <div
              className="relative w-full h-full flex items-center justify-center px-16"
              {...swipeHandlers}
            >
              <img
                src={currentPhoto.image}
                alt={currentPhoto.name || `Zdjęcie ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Photo Info */}
              {(currentPhoto.name || currentPhoto.category) && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-3 max-w-md">
                  {currentPhoto.category && (
                    <p className="text-xs text-gray-300 mb-1">{currentPhoto.category}</p>
                  )}
                  {currentPhoto.name && (
                    <p className="text-white text-base font-semibold">{currentPhoto.name}</p>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  disabled={!canGoPrevious}
                  className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2 z-40',
                    'bg-black/50 hover:bg-black/70 text-white rounded-full p-3',
                    'transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    'disabled:opacity-30 disabled:cursor-not-allowed'
                  )}
                  aria-label="Poprzednie zdjęcie"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={goToNext}
                  disabled={!canGoNext}
                  className={cn(
                    'absolute right-4 top-1/2 -translate-y-1/2 z-40',
                    'bg-black/50 hover:bg-black/70 text-white rounded-full p-3',
                    'transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    'disabled:opacity-30 disabled:cursor-not-allowed'
                  )}
                  aria-label="Następne zdjęcie"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {photos.length}
            </div>

            {/* Dot Indicators */}
            {photos.length > 1 && photos.length <= 10 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all',
                      'focus:outline-none focus:ring-2 focus:ring-primary',
                      currentIndex === index
                        ? 'bg-primary w-8'
                        : 'bg-white/50 hover:bg-white/70'
                    )}
                    aria-label={`Przejdź do zdjęcia ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Screen reader announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              Zdjęcie {currentIndex + 1} z {photos.length}
              {currentPhoto.name && `: ${currentPhoto.name}`}
            </div>

            <p id="lightbox-description" className="sr-only">
              Galeria zdjęć w trybie pełnoekranowym. Użyj strzałek lub gestu przesunięcia, aby nawigować.
              Naciśnij Escape lub przycisk zamknij, aby wyjść.
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
