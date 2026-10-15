import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Locate, Search, Layers, Check } from 'lucide-react';

/**
 * Google Maps Satellite / Hybrid Interactive Location Picker.
 * Features:
 * - Google Hybrid tiles (Satellite imagery + road overlay & street names) by default.
 * - Interactive Google Maps-style "Layers" card button in bottom-left to toggle Satellite, Default, or Terrain.
 * - Precise Pin placement via drag, click, search, or device GPS.
 */
const MAP_LAYERS = {
  hybrid: {
    id: 'hybrid',
    label: 'Satellite',
    subLabel: 'Labels & Roads',
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20
  },
  roadmap: {
    id: 'roadmap',
    label: 'Default',
    subLabel: 'Street View',
    url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20
  },
  terrain: {
    id: 'terrain',
    label: 'Terrain',
    subLabel: 'Contours & Relief',
    url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20
  }
};

export default function LocationPickerMap({
  latitude = '11.9416',
  longitude = '79.8083',
  onChange = () => {},
  addressQuery = ''
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const currentTileLayerRef = useRef(null);
  const layerMenuRef = useRef(null);

  const [isMapReady, setIsMapReady] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeLayer, setActiveLayer] = useState('hybrid'); // Default: Satellite Hybrid as requested
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  const numericLat = parseFloat(latitude) || 11.9416;
  const numericLng = parseFloat(longitude) || 79.8083;

  // 1. Close layer menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (layerMenuRef.current && !layerMenuRef.current.contains(e.target)) {
        setShowLayerMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 2. Dynamically load Leaflet assets if not already loaded
  useEffect(() => {
    let isMounted = true;

    function loadLeaflet() {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

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

  // 3. Initialize the map once Leaflet script is loaded
  useEffect(() => {
    if (!isMapReady || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // High-visibility Google-style red teardrop pin with white beacon
    const customIcon = L.divIcon({
      className: 'custom-google-pin',
      html: `
        <div style="position: relative; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 18px; height: 18px; background: rgba(239, 68, 68, 0.4); border-radius: 50%; animation: pinPulse 2s infinite ease-out;"></div>
          <svg style="width: 36px; height: 36px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.45)); transform: translateY(-4px);" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EF4444" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="12" cy="9" r="3" fill="#FFFFFF"/>
          </svg>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 38],
      popupAnchor: [0, -36]
    });

    const map = L.map(mapContainerRef.current, {
      center: [numericLat, numericLng],
      zoom: 17, // Closer zoom like in the screenshot showing individual streets
      zoomControl: true,
      attributionControl: false
    });

    // Add initial Satellite Hybrid layer
    const layerConfig = MAP_LAYERS.hybrid;
    const tileLayer = L.tileLayer(layerConfig.url, {
      subdomains: layerConfig.subdomains,
      maxZoom: layerConfig.maxZoom
    }).addTo(map);

    currentTileLayerRef.current = tileLayer;

    // Initial Marker
    const marker = L.marker([numericLat, numericLng], {
      icon: customIcon,
      draggable: true
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; font-weight: 700; color: #EF4444; text-align: center; padding: 2px;">
        📍 Property Location Set
      </div>
    `);

    // Handle marker drag
    marker.on('dragend', (e) => {
      const position = e.target.getLatLng();
      const newLat = position.lat.toFixed(6);
      const newLng = position.lng.toFixed(6);
      onChange({ lat: newLat, lng: newLng });
    });

    // Handle clicking anywhere on map to drop/move the pin
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const newLat = lat.toFixed(6);
      const newLng = lng.toFixed(6);
      marker.setLatLng([lat, lng]);
      onChange({ lat: newLat, lng: newLng });
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
      currentTileLayerRef.current = null;
    };
  }, [isMapReady]);

  // 4. Handle Layer Swapping (Satellite Hybrid / Roadmap / Terrain)
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;
    const L = window.L;
    const config = MAP_LAYERS[activeLayer] || MAP_LAYERS.hybrid;

    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }

    const newLayer = L.tileLayer(config.url, {
      subdomains: config.subdomains,
      maxZoom: config.maxZoom
    }).addTo(mapInstanceRef.current);

    newLayer.bringToBack();
    currentTileLayerRef.current = newLayer;
  }, [activeLayer]);

  // 5. Keep marker & map in sync when props change externally
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
          mapInstanceRef.current.setView([pos.coords.latitude, pos.coords.longitude], 17, { animate: true });
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
          mapInstanceRef.current.setView([parseFloat(foundLat), parseFloat(foundLng)], 17, { animate: true });
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
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        .leaflet-container {
          cursor: crosshair !important;
          z-index: 10 !important;
          font-family: inherit;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          margin-top: 14px !important;
          margin-left: 14px !important;
        }
        .leaflet-control-zoom a {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #1E293B !important;
          font-weight: bold !important;
          width: 34px !important;
          height: 34px !important;
          line-height: 34px !important;
        }
      `}</style>

      {/* Map Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <MapPin className="w-4 h-4 text-[#EF4444]" />
          <span>Click on satellite view or drag the red pin to exact location</span>
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
      <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Loading overlay while Leaflet CDN loads */}
        {!isMapReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-white gap-2 z-20">
            <div className="w-7 h-7 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-200">Loading satellite map...</span>
          </div>
        )}

        {/* Top-Right Status Badge */}
        <div className="absolute top-3 right-3 z-[400] bg-black/65 backdrop-blur-md border border-white/20 text-white shadow-md px-3 py-1.5 rounded-xl flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
          <span className="text-[11.5px] font-bold tracking-wide">
            {activeLayer === 'hybrid' ? 'Satellite View' : activeLayer === 'roadmap' ? 'Map View' : 'Terrain View'}
          </span>
        </div>

        {/* Bottom-Left Google Maps "Layers" Button & Menu */}
        <div ref={layerMenuRef} className="absolute bottom-3 left-3 z-[400] select-none">
          {/* Layer Selector Popover Menu */}
          {showLayerMenu && (
            <div className="absolute bottom-16 left-0 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-2.5 flex gap-2 animate-fade-step min-w-[280px]">
              {Object.values(MAP_LAYERS).map((layer) => {
                const isSelected = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      setActiveLayer(layer.id);
                      setShowLayerMenu(false);
                    }}
                    className={`flex-1 flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#007F55] bg-emerald-50 text-slate-900 font-bold shadow-xs'
                        : 'border-transparent hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {/* Visual miniature box */}
                    <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-200 mb-1.5 relative shadow-2xs">
                      {layer.id === 'hybrid' && (
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://mt1.google.com/vt/lyrs=y&x=1477&y=944&z=11')" }}>
                          <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white font-extrabold text-center py-0.5">Sat</span>
                        </div>
                      )}
                      {layer.id === 'roadmap' && (
                        <div className="w-full h-full bg-[#E5E3DF] flex flex-col justify-between p-1">
                          <div className="w-full h-1 bg-white rounded-full"></div>
                          <div className="w-full h-1.5 bg-[#FBD060] rounded-full"></div>
                          <span className="text-[9px] text-slate-600 font-extrabold text-center">Map</span>
                        </div>
                      )}
                      {layer.id === 'terrain' && (
                        <div className="w-full h-full bg-[#CFE0C6] flex items-center justify-center">
                          <span className="text-[9px] text-slate-600 font-extrabold text-center">Terrain</span>
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-[#007F55] text-white flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11.5px] font-bold leading-tight">{layer.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Google Maps-style "Layers" card button */}
          <button
            type="button"
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="group relative flex flex-col items-center justify-end w-[64px] h-[64px] sm:w-[70px] sm:h-[70px] rounded-2xl border-2 border-white shadow-xl overflow-hidden cursor-pointer active:scale-95 transition-transform"
            title="Toggle Map Layers (Satellite / Map)"
          >
            {/* Background Thumbnail Preview (Shows Roadmap preview when on Satellite, and vice versa) */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
              style={{
                backgroundImage:
                  activeLayer === 'hybrid'
                    ? "url('https://mt1.google.com/vt/lyrs=m&x=1477&y=944&z=11')" // Shows street map preview to switch back
                    : "url('https://mt1.google.com/vt/lyrs=y&x=1477&y=944&z=11')" // Shows satellite preview
              }}
            >
              {/* Subtle road line graphic if preview image is slow */}
              <div className="w-full h-full bg-slate-800/10" />
            </div>

            {/* Dark bottom pill badge with icon and 'Layers' text */}
            <div className="relative z-10 w-full bg-[#202124]/90 backdrop-blur-xs py-1 px-1.5 flex items-center justify-center gap-1.5 border-t border-white/20">
              <Layers className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold text-white tracking-wide">Layers</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
