"use client"
import { Button } from "~/components/ui/button"
import { useRouter } from 'next/navigation'


export default function Intro() {
    const router = useRouter();
  
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[#d9edf9]">
        <Button
        onClick={() => router.push('/LoginScreen')}
            className="flex flex-col items-center justify-center w-full h-screen bg-transparent text-[#1a3c6e] hover:bg-[#d9edf9] rounded-xl p-8"
        >
            <div className="text-center">
                <div className="flex flex-col items-center mb-2">
                </div>
                <h1 className="text-[#1a3c6e] text-4xl font-bold">fish.bowl</h1>
            </div>
        </Button>
        </div>
    )
}
