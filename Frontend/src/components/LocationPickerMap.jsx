import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Locate, Search } from 'lucide-react';

/**
 * Robust Leaflet-based interactive map for dropping/dragging a pin
 * and capturing exact Latitude & Longitude in the background.
 */
export default function LocationPickerMap({
  latitude = '11.9416',
  longitude = '79.8083',
  onChange = () => {},
  addressQuery = ''
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const numericLat = parseFloat(latitude) || 11.9416;
  const numericLng = parseFloat(longitude) || 79.8083;

  // 1. Dynamically load Leaflet assets if not already loaded in the document
  useEffect(() => {
    let isMounted = true;

    function loadLeaflet() {
      // CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Script
      if (window.L) {
        if (isMounted) setIsMapReady(true);
        return;
      }

      if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => {
          if (isMounted) setIsMapReady(true);
        };
        document.body.appendChild(script);
      } else {
        const existingScript = document.getElementById('leaflet-js');
        existingScript.addEventListener('load', () => {
          if (isMounted) setIsMapReady(true);
        });
      }
    }

    loadLeaflet();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Initialize the map once Leaflet script is loaded
  useEffect(() => {
    if (!isMapReady || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // Custom pulse pin HTML
    const customIcon = L.divIcon({
      className: 'custom-tripverse-pin',
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 14px; height: 14px; background: rgba(0, 127, 85, 0.35); border-radius: 50%; transform: scale(2.2); animation: pinPulse 2s infinite ease-out;"></div>
          <svg style="width: 32px; height: 32px; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#007F55" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round"/>
            <circle cx="12" cy="9" r="3" fill="#FFFFFF"/>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 34],
      popupAnchor: [0, -32]
    });

    const map = L.map(mapContainerRef.current, {
      center: [numericLat, numericLng],
      zoom: 15,
      zoomControl: true,
      attributionControl: false
    });

    // High quality OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    // Initial Marker
    const marker = L.marker([numericLat, numericLng], {
      icon: customIcon,
      draggable: true
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; font-weight: 700; color: #007F55; text-align: center; padding: 2px;">
        📍 Property Location Set
      </div>
    `);

    // Handle marker drag
    marker.on('dragend', (e) => {
      const position = e.target.getLatLng();
      const newLat = position.lat.toFixed(6);
      const newLng = position.lng.toFixed(6);
      onChange({ lat: newLat, lng: newLng });
      marker.setPopupContent(`
        <div style="font-family: inherit; font-size: 12px; font-weight: 700; color: #007F55; text-align: center; padding: 2px;">
          📍 Property Location Set
        </div>
      `);
    });

    // Handle clicking anywhere on map to drop/move the pin
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const newLat = lat.toFixed(6);
      const newLng = lng.toFixed(6);
      marker.setLatLng([lat, lng]);
      onChange({ lat: newLat, lng: newLng });
      marker.setPopupContent(`
        <div style="font-family: inherit; font-size: 12px; font-weight: 700; color: #007F55; text-align: center; padding: 2px;">
          📍 Property Location Set
        </div>
      `);
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Small timeout to invalidate map size after initial modal/container layout
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, [isMapReady]);

  // 3. Keep marker & map in sync when props change externally
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    const currentLatLng = markerRef.current.getLatLng();
    if (
      Math.abs(currentLatLng.lat - numericLat) > 0.0001 ||
      Math.abs(currentLatLng.lng - numericLng) > 0.0001
    ) {
      markerRef.current.setLatLng([numericLat, numericLng]);
      mapInstanceRef.current.panTo([numericLat, numericLng], { animate: true });
    }
  }, [numericLat, numericLng]);

  // Geolocation button: Use device GPS
  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const userLat = pos.coords.latitude.toFixed(6);
        const userLng = pos.coords.longitude.toFixed(6);
        onChange({ lat: userLat, lng: userLng });
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView([pos.coords.latitude, pos.coords.longitude], 16, { animate: true });
          markerRef.current.setLatLng([pos.coords.latitude, pos.coords.longitude]);
        }
      },
      (err) => {
        setIsLocating(false);
        alert(`Could not fetch location: ${err.message}. Please click directly on the map.`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [onChange]);

  // Geocode address search: Center map on street / city
  const handleSearchAddress = useCallback(async () => {
    if (!addressQuery || !addressQuery.trim()) {
      alert('Please enter an address or city first to search on the map.');
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          addressQuery.trim()
        )}`
      );
      const data = await res.json();
      setIsSearching(false);
      if (data && data.length > 0) {
        const foundLat = parseFloat(data[0].lat).toFixed(6);
        const foundLng = parseFloat(data[0].lon).toFixed(6);
        onChange({ lat: foundLat, lng: foundLng });
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView([parseFloat(foundLat), parseFloat(foundLng)], 16, { animate: true });
          markerRef.current.setLatLng([parseFloat(foundLat), parseFloat(foundLng)]);
        }
      } else {
        alert('Could not find exact coordinates for this address. You can click directly on the map to pin it.');
      }
    } catch {
      setIsSearching(false);
      alert('Address search failed. Please click on the map to place the pin.');
    }
  }, [addressQuery, onChange]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <style>{`
        @keyframes pinPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .leaflet-container {
          cursor: crosshair !important;
          z-index: 10 !important;
        }
      `}</style>

      {/* Map Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <MapPin className="w-4 h-4 text-[#007F55]" />
          <span>Click anywhere or drag the pin to set exact location</span>
        </div>

        <div className="flex items-center gap-2">
          {addressQuery && (
            <button
              type="button"
              onClick={handleSearchAddress}
              disabled={isSearching}
              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-xs disabled:opacity-50"
              title="Search address on map"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>{isSearching ? 'Searching...' : 'Locate Address'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-[#007F55] text-white hover:bg-[#006644] transition cursor-pointer shadow-xs disabled:opacity-50"
            title="Use current device GPS"
          >
            <Locate className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'GPS Auto-Pin'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Box */}
      <div className="relative w-full h-[320px] sm:h-[350px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Loading overlay while Leaflet CDN loads */}
        {!isMapReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100/90 gap-2 z-20">
            <div className="w-7 h-7 border-3 border-[#007F55] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-600">Loading interactive map...</span>
          </div>
        )}

        {/* Discreet pin status badge */}
        <div className="absolute top-2.5 right-2.5 z-[400] bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#007F55]" />
          <span className="text-[11px] font-bold text-slate-700">Location Pinned</span>
        </div>
      </div>
    </div>
  );
}
