import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Coordinates for Prymasa Stefana Wyszyńskiego 4, 22-400 Zamość
// Source: OpenStreetMap way/166716709
const RESTAURANT_COORDS = [50.7169741, 23.2661972]

export default function RestaurantMap() {
  const mapContainerRef = useRef(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    // Intersection Observer to load map only when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showMap) {
            setShowMap(true)
          }
        })
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    )

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current)
    }

    return () => {
      if (mapContainerRef.current) {
        observer.unobserve(mapContainerRef.current)
      }
    }
  }, [showMap])

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full rounded-lg overflow-hidden border border-gray-700"
      style={{ height: '400px' }}
    >
      {!showMap ? (
        <div className="absolute inset-0 bg-gray-800/50 flex flex-col items-center justify-center gap-4 z-10">
          <MapPin className="text-secondary animate-pulse" size={48} />
          <p className="text-gray-400 text-sm">Ładowanie mapy...</p>
        </div>
      ) : (
        <MapContainer
          center={RESTAURANT_COORDS}
          zoom={16}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={RESTAURANT_COORDS}>
            <Popup>
              <div style={{ fontFamily: 'sans-serif', textAlign: 'center', minWidth: '200px' }}>
                <strong style={{ fontSize: '16px', color: '#C41E3A' }}>Vietnam House</strong><br/>
                <span style={{ fontSize: '14px', color: '#333', marginTop: '4px', display: 'block' }}>
                  Prymasa Stefana Wyszyńskiego 4
                </span>
                <span style={{ fontSize: '14px', color: '#333' }}>22-400 Zamość</span><br/>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${RESTAURANT_COORDS[0]}&mlon=${RESTAURANT_COORDS[1]}&zoom=16`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#F5A623', textDecoration: 'none', fontSize: '12px', marginTop: '8px', display: 'inline-block' }}
                >
                  Otwórz w OpenStreetMap →
                </a>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  )
}
