import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for managing carousel state and navigation
 * @param {number} totalItems - Total number of items in the carousel
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoPlay - Enable auto-play functionality
 * @param {number} options.autoPlayInterval - Auto-play interval in milliseconds (default: 5000)
 * @param {boolean} options.loop - Enable looping (default: true)
 * @returns {Object} Carousel state and controls
 */
export function useCarousel(totalItems, options = {}) {
  const {
    autoPlay = false,
    autoPlayInterval = 5000,
    loop = true
  } = options

  const [currentIndex, setCurrentIndex] = useState(0)
  const autoPlayRef = useRef(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === totalItems - 1) {
        return loop ? 0 : prevIndex
      }
      return prevIndex + 1
    })
  }, [totalItems, loop])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return loop ? totalItems - 1 : prevIndex
      }
      return prevIndex - 1
    })
  }, [totalItems, loop])

  const goToIndex = useCallback((index) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index)
    }
  }, [totalItems])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && totalItems > 1) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval)
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }
  }, [autoPlay, autoPlayInterval, goToNext, totalItems])

  // Reset auto-play timer on manual navigation
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval)
    }
  }, [goToNext, autoPlayInterval])

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
    resetAutoPlay,
    isFirst: currentIndex === 0,
    isLast: currentIndex === totalItems - 1,
    canGoNext: loop || currentIndex < totalItems - 1,
    canGoPrevious: loop || currentIndex > 0
  }
}

/**
 * Custom hook for keyboard navigation
 * @param {Object} callbacks - Navigation callback functions
 * @param {Function} callbacks.onNext - Callback for next action
 * @param {Function} callbacks.onPrevious - Callback for previous action
 * @param {Function} callbacks.onEscape - Callback for escape action
 * @param {boolean} enabled - Enable/disable keyboard navigation
 */
export function useKeyboardNavigation(callbacks = {}, enabled = true) {
  const { onNext, onPrevious, onEscape } = callbacks

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          onNext?.()
          break
        case 'ArrowLeft':
          event.preventDefault()
          onPrevious?.()
          break
        case 'Escape':
          event.preventDefault()
          onEscape?.()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onPrevious, onEscape, enabled])
}

/**
 * Custom hook for touch/swipe gestures
 * @param {Object} callbacks - Swipe callback functions
 * @param {Function} callbacks.onSwipeLeft - Callback for left swipe
 * @param {Function} callbacks.onSwipeRight - Callback for right swipe
 * @param {number} threshold - Minimum swipe distance in pixels (default: 50)
 * @returns {Object} Touch event handlers
 */
export function useSwipeGesture(callbacks = {}, threshold = 50) {
  const { onSwipeLeft, onSwipeRight } = callbacks
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = useCallback((event) => {
    touchStartX.current = event.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((event) => {
    touchEndX.current = event.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > threshold
    const isRightSwipe = distance < -threshold

    if (isLeftSwipe) {
      onSwipeLeft?.()
    } else if (isRightSwipe) {
      onSwipeRight?.()
    }
  }, [onSwipeLeft, onSwipeRight, threshold])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  }
}
