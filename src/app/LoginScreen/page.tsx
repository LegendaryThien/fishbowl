"use client"

import { supabase } from "~/lib/supabase";
import type React from "react"
import { Button } from "~/components/ui/button"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };


  return (
    <div className="min-h-screen bg-[#d9edf9] flex flex-col items-center justify-between p-4 relative overflow-hidden">
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

        {/* Signed in as message or Google Sign-In button */}
        <div className="space-y-4 mb-8">
          {user && user.email ? (
            <div className="w-full bg-[#fffef0] border-none rounded-full py-6 flex items-center justify-center gap-3 text-[#1a3c6e] text-lg font-medium shadow">
              Signed in as {user.email}
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full bg-[#fffef0] hover:bg-[#f5f4e8] border-none rounded-full py-6 flex items-center justify-center gap-3"
              onClick={handleSignIn}
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
          )}
        </div>

        <div className="flex justify-between items-center w-full max-w-md mt-8">
  

  {/* New "Add your fish!" button */}
  <Button
    className="bg-[#fffef0] hover:bg-[#f5f4e8] text-[#1a3c6e] font-medium rounded-full px-6 py-6"
    onClick={() => router.push('/BusinessScreen')} // Adjust the route
  >
    Add your fish!
  </Button>

  {/* Continue button */}
  <Button
    className="bg-[#fffef0] hover:bg-[#f5f4e8] text-[#1a3c6e] font-medium rounded-full px-6 py-6"
    onClick={() => router.push('/')}
  >
    Continue to <span className="font-bold ml-1">fish.bowl</span>
  </Button>
</div>

      </div>
    </div>
  )
}
