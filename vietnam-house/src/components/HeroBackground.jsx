import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'

/**
 * HeroBackground Component
 * Professional background image with sophisticated gradient overlays and edge treatments
 *
 * @param {Object} props
 * @param {string} props.src - Image source path
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} props.opacity - Background opacity (0-100, default: 40)
 * @param {boolean} props.enableBlur - Apply subtle blur effect (default: false)
 * @param {string} props.overlayColor - Brand color tint (default: 'black')
 * @param {number} props.overlayOpacity - Overlay opacity (0-100, default: 60)
 * @param {boolean} props.enableVignette - Radial vignette effect (default: true)
 * @param {boolean} props.topFade - Top-to-bottom gradient fade (default: true)
 * @param {boolean} props.bottomFade - Bottom-to-top gradient fade (default: true)
 * @param {boolean} props.leftFade - Left-to-right gradient fade (default: false)
 * @param {boolean} props.rightFade - Right-to-left gradient fade (default: false)
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to render over background
 */
export default function HeroBackground({
  src,
  alt = 'Hero background',
  opacity = 40,
  enableBlur = false,
  overlayColor = 'black',
  overlayOpacity = 60,
  enableVignette = true,
  topFade = true,
  bottomFade = true,
  leftFade = false,
  rightFade = false,
  className = '',
  children
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    // Preload image for smooth fade-in
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImageSrc(src)
      setImageLoaded(true)
    }
  }, [src])

  // Calculate gradient overlays
  const gradients = []

  // Top fade
  if (topFade) {
    gradients.push('linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 20%)')
  }

  // Bottom fade
  if (bottomFade) {
    gradients.push('linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 20%)')
  }

  // Left fade
  if (leftFade) {
    gradients.push('linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 25%)')
  }

  // Right fade
  if (rightFade) {
    gradients.push('linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 25%)')
  }

  // Vignette effect (radial gradient from center)
  if (enableVignette) {
    gradients.push(
      'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)'
    )
  }

  // Color overlay
  const colorMap = {
    black: '0, 0, 0',
    primary: '245, 166, 35', // Golden yellow #F5A623
    secondary: '196, 30, 58', // Deep red #C41E3A
    blue: '59, 130, 246',
    purple: '168, 85, 247'
  }

  const colorRgb = colorMap[overlayColor] || colorMap.black
  gradients.push(`linear-gradient(to bottom, rgba(${colorRgb}, ${overlayOpacity / 100}), rgba(${colorRgb}, ${overlayOpacity / 100}))`)

  const gradientOverlay = gradients.join(', ')

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Background Image Layer */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-1000',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: opacity / 100,
          filter: enableBlur ? 'blur(2px)' : 'none',
          transform: enableBlur ? 'scale(1.05)' : 'none', // Prevent blur edge artifacts
        }}
        role="img"
        aria-label={alt}
      />

      {/* Gradient Overlay Layer */}
      <div
        className="absolute inset-0"
        style={{
          background: gradientOverlay
        }}
        aria-hidden="true"
      />

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Loading State */}
      {!imageLoaded && (
        <div
          className="absolute inset-0 bg-background animate-pulse"
          aria-label="Ładowanie tła"
        />
      )}
    </div>
  )
}

/**
 * Preset configurations for common use cases
 */
export const BackgroundPresets = {
  // Subtle, professional look
  subtle: {
    opacity: 30,
    enableBlur: false,
    overlayColor: 'black',
    overlayOpacity: 70,
    enableVignette: true,
    topFade: true,
    bottomFade: true
  },

  // Bold, dramatic look
  dramatic: {
    opacity: 50,
    enableBlur: false,
    overlayColor: 'black',
    overlayOpacity: 50,
    enableVignette: true,
    topFade: true,
    bottomFade: true
  },

  // Blurred for text readability
  blurred: {
    opacity: 60,
    enableBlur: true,
    overlayColor: 'black',
    overlayOpacity: 60,
    enableVignette: false,
    topFade: true,
    bottomFade: true
  },

  // Brand-colored tint
  branded: {
    opacity: 40,
    enableBlur: false,
    overlayColor: 'primary',
    overlayOpacity: 30,
    enableVignette: true,
    topFade: true,
    bottomFade: true
  },

  // Full edge fade-out
  edgeFade: {
    opacity: 50,
    enableBlur: false,
    overlayColor: 'black',
    overlayOpacity: 50,
    enableVignette: true,
    topFade: true,
    bottomFade: true,
    leftFade: true,
    rightFade: true
  }
}

/**
 * Responsive background component with optimized image loading
 * Automatically selects appropriate image size based on viewport
 */
export function ResponsiveHeroBackground({
  imagePath,
  preset = 'subtle',
  className = '',
  children,
  ...props
}) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Select appropriate image size based on viewport
  // In production, you'd have multiple image sizes generated
  // For now, we'll use the single source
  const getOptimizedImagePath = () => {
    // Example of how you'd implement responsive images:
    // if (windowWidth < 768) return `${imagePath}-mobile.jpg`
    // if (windowWidth < 1200) return `${imagePath}-tablet.jpg`
    // return `${imagePath}-desktop.jpg`

    // For now, return the original path
    return imagePath
  }

  const presetConfig = BackgroundPresets[preset] || BackgroundPresets.subtle

  return (
    <HeroBackground
      src={getOptimizedImagePath()}
      {...presetConfig}
      {...props}
      className={className}
    >
      {children}
    </HeroBackground>
  )
}
