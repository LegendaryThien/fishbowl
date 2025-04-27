"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from 'next/navigation';



// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AddFishForm() {
  const router = useRouter();
  const [address, setAddress] = useState("")
  const [suffix, setSuffix] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage("")

    try {
      // Get coordinates from OpenStreetMap Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${address} ${suffix}`)}&format=json&polygon=1&addressdetails=1`,
      )

      if (!response.ok) {
        throw new Error("Address lookup failed")
      }

      const json = await response.json()

      if (!json.length) {
        throw new Error("Address not found")
      }

      const lat = json[0].lat
      const lon = json[0].lon

      // Insert marker into Supabase
      const { data, error: supabaseError } = await supabase.from("markers").insert({
        latitude: lat,
        longitude: lon,
        title: address,
      })

      if (supabaseError) {
        throw new Error("Failed to save location")
      }

      setSuccessMessage("Fish added successfully!")
      setAddress("")
      setSuffix("")

      // Optional: reload the page after a delay
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#d9edf9] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#b5e8f7"
            opacity="1"
          ></path>
        </svg>
      </div>

      <div className="w-full max-w-md z-10 mt-16">
        {/* Main heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1a3c6e] mb-12">Add your Fish</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="address" className="text-xl font-medium text-[#1a3c6e]">
              Address:
            </label>
            <Input
              id="address"
              type="text"
              placeholder="e.g. 8421 Greenwood Ave"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white rounded-md py-6 px-4 text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="suffix" className="text-xl font-medium text-[#1a3c6e]">
              Suffix:
            </label>
            <Input
              id="suffix"
              type="text"
              placeholder="e.g. Seattle, WA"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="bg-white rounded-md py-6 px-4 text-lg"
              required
            />
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#1a3c6e] hover:bg-[#0f2a50] text-white rounded-full px-8 py-6 text-lg"
              onClick={() => router.push('/')}
            >
              {loading ? "Adding..." : "Add Fish"}
            </Button>
          </div>
        </form>
      </div>

      {/* Navigation button */}
      <div className="absolute bottom-6 left-6">
        <Button
          variant="outline"
          className="rounded-full w-12 h-12 bg-gray-800 text-white border-none flex items-center justify-center"
          onClick={() => window.history.back()}
        >
          
        </Button>
      </div>
    </div>
  )
}
