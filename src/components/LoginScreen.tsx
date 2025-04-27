"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { useRouter } from 'next/navigation';


export default function LoginScreen() {
  const router = useRouter();

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
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1a3c6e] mb-8">Lets Create Your Fish!</h1>

        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-1">Welcome!</h2>
          <p className="text-gray-700">Lets get you signed in.</p>
        </div>

        {/* Social login buttons */}
        <div className="space-y-4 mb-8">
          <Button
            variant="outline"
            className="w-full bg-[#fffef0] hover:bg-[#f5f4e8] border-none rounded-full py-6 flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>

          <Button
            variant="outline"
            className="w-full bg-[#fffef0] hover:bg-[#f5f4e8] border-none rounded-full py-6 flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1877F2]" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Sign in with Facebook
          </Button>

          <Button
            variant="outline"
            className="w-full bg-[#fffef0] hover:bg-[#f5f4e8] border-none rounded-full py-6 flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="black">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Sign in with Apple
          </Button>
        </div>

        {/* Continue button */}
        <div className="flex justify-end">
        <Button
  className="bg-[#fffef0] hover:bg-[#f5f4e8] text-[#1a3c6e] font-medium rounded-full px-6 py-6"
  onClick={() => router.push('/')} // Move onClick here
>
  Continue to <span className="font-bold ml-1">fish.bowl</span>
</Button>

        </div>
      </div>
    </div>
  )
}
