'use client';

import { useEffect, useState } from 'react';
import type { MapData, Marker } from '../types/map';

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function HomePage() {
  
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMapData() {
      try {
        const response = await fetch('/api/map');
        const data = await response.json();
        setMapData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchMapData();
  }, []);

  useEffect(() => {
    if (!mapData) return;

    let map: google.maps.Map;

    async function initMap() {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      map = new Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: mapData!.zoom,
          center: mapData!.position,
          mapId: mapData!.mapId,
        }
      );

      mapData!.markers.forEach((markerData: Marker) => {
        new AdvancedMarkerElement({
          map: map,
          position: markerData.position,
          title: markerData.title
        });
      });
    }

    initMap();
  }, [mapData]);

  return (
    <main>
      <div id="map" className="w-full h-[500px] rounded-lg"></div>
    </main>
  );
}
