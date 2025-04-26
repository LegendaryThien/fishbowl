'use client';

import { useEffect, useState } from 'react';
import type { MapData, Marker } from '../types/map';
import { createClient } from '@supabase/supabase-js'
import { title } from 'process';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


declare global {
  interface Window {
    google: typeof google;
  }
}

export default function HomePage() {
  
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [address  , setAddress] = useState('');
  const [suffix  , setSuffix] = useState('');
  const [successMessage , setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(address)
    console.log(suffix)
    let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${address} ${suffix}`)}&format=json&polygon=1&addressdetails=1`);
  if (!response.ok) {
    throw new Error("api request failed");
  }
  let json = await response.json();
  // console.log(json);
  let lat = json[0].lat;
  let lon = json[0].lon;
  console.log(address, lat, lon);
  const {data, error} = await supabase.
  from("markers")
  .insert({
    latitude: lat,
    longitude: lon,
    title: address,
  });
  if (error !== null) throw Error("supabase failed");
  else {
    setSuccessMessage('Insert Successful');
    window.location.reload();
  } 
  };

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
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Suffix"
        value={suffix}
        onChange={e => setSuffix(e.target.value)}
        required
      />
      <button type="submit">Add Marker</button>
    </form>
    <h1>{successMessage}</h1>
    <h1>address example: 8421 Greenwood Ave</h1>  
    <h1>suffix example: Seattle, WA</h1>  
    </main>
  );
}
