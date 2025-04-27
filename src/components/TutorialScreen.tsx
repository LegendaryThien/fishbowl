"use client"
import Image from "next/image"
import { Button } from "~/components/ui/button"
import { useRouter } from 'next/navigation';

export default function FishBowlLanding() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#d9edf9] flex items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-[#1a3c6e]">fish.bowl</h1>
            <p className="text-[#4a6275] text-lg">Your friendly neighborhood fish helping you find water near you!</p>
            <div className="pt-4">
              <p className="text-[#4a6275] text-lg">
                Your Guide to Cleaner, Fresher, and Crispier Water-
                <br />
                Right Here in Seattle.
              </p>
            </div>
          </div>

          {/* Right content with overlapping cards */}
          <div className="relative h-[500px]">
            {/* Background card */}
            <div className="absolute right-0 top-0 w-[90%] h-[90%] bg-[#7a96c2] rounded-lg"></div>

            {/* Foreground card */}
            <div className="absolute left-0 top-10 w-[90%] bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Fountain image */}
              <div className="w-full h-64 relative">
                <Image
                  src="/fountain image.jpg"
                  alt="Water fountain in a park"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card footer */}
              <div className="p-6 bg-[#d9edf9] text-center">
              <Button
    className="bg-[#fffef0] hover:bg-[#f5f4e8] text-[#1a3c6e] font-medium rounded-full px-6 py-6"
    onClick={() => router.push('/')}
  >
    Check Out Our Features
  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
