"use client"
import { useEffect, useState } from "react"
import type React from "react"

import type { MapData, Marker } from "../types/map"
import { createClient } from "@supabase/supabase-js"
import { Button } from "~/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { supabase } from "~/lib/supabase"

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

declare global {
  interface Window {
    google: typeof google
  }
}

export default function HomePage() {
  const [mapData, setMapData] = useState<MapData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState("")
  const [suffix, setSuffix] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${address} ${suffix}`)}&format=json&polygon=1&addressdetails=1`,
      )
      if (!response.ok) {
        throw new Error("API request failed")
      }
      const json = await response.json()
      if (json.length === 0) {
        throw new Error("Address not found")
      }

      const lat = json[0].lat
      const lon = json[0].lon

      const { data, error: supabaseError } = await supabaseClient.from("markers").insert({
        latitude: lat,
        longitude: lon,
        title: address,
      })

      if (supabaseError) throw Error("Supabase insert failed")
      setSuccessMessage("Location added successfully!")
      setAddress("")
      setSuffix("")

      // Reload after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    }
  }

  useEffect(() => {
    async function fetchMapData() {
      try {
        const response = await fetch("/api/map")
        const data = await response.json()
        setMapData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchMapData()
  }, [])

  useEffect(() => {
    // Fetch user info on mount
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null)
    })
  }, [])

  useEffect(() => {
    if (!mapData) return

    let map: google.maps.Map

    async function initMap() {
      const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary
      const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary

      map = new Map(document.getElementById("map") as HTMLElement, {
        zoom: mapData!.zoom,
        center: mapData!.position,
        mapId: mapData!.mapId,
      })

      mapData!.markers.forEach((markerData: Marker) => {

        const beachFlagImg = document.createElement('img');
        beachFlagImg.src = 'https://i.imgur.com/9M2BfXq.png';

        const marker = new AdvancedMarkerElement({
          map: map,
          position: markerData.position,
          content: beachFlagImg,
          title: markerData.title
        })

        const infoWindow = new google.maps.InfoWindow({
          content: "<div>Address: </div>" + markerData.title,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
          setSelectedMarker(markerData)
        })
      })
    }

    initMap()
  }, [mapData])

  const deleteMarker = async () => {
    if (!selectedMarker) return

    try {
      setIsDeleting(true)
      const { error: deleteError } = await supabaseClient.from("markers").delete().eq("id", selectedMarker.id)

      if (deleteError) throw Error("Delete failed")

      setSuccessMessage("Location deleted successfully!")
      setSelectedMarker(null)

      // Reload after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <main className="relative">
      {/* Signed in as message */}
      {user && user.email && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded text-[#1a3c6e] font-light text-base tracking-wide z-20" style={{ fontFamily: 'Inter, Roboto, Helvetica Neue, Arial, sans-serif', backgroundColor: 'rgba(229, 231, 235, 0.7)' }}>
          Signed in as {user.email}
        </div>
      )}
      {/* Map container */}
      <div id="map" className="w-screen h-screen"></div>

      {/* Floating action buttons */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3">
        {/* Add new location button */}
        <Link href="/BusinessScreen">
          <Button
            className="w-12 h-12 rounded-full bg-[#1a3c6e] hover:bg-[#0f2a50] text-white shadow-lg"
            aria-label="Add new location"
          >
            <Plus size={24} />
          </Button>
        </Link>

        {/* LoginScreen button */}
        <Link href="/LoginScreen">
          <Button
            className="w-12 h-12 rounded-full bg-[#4B9CD3] hover:bg-[#357ABD] text-white shadow-lg font-light text-base"
            aria-label="Go to Login Screen"
          >
            Login
          </Button>
        </Link>

        {/* Delete button - only visible when a marker is selected */}
        {selectedMarker && (
          <Button
            onClick={deleteMarker}
            disabled={isDeleting}
            className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
            aria-label="Delete selected location"
          >
            <Trash2 size={24} />
          </Button>
        )}
      </div>

      {/* Success message toast */}
      {successMessage && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      {/* Error message toast */}
      {error && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          {error}
        </div>
      )}
    </main>
  )
}
