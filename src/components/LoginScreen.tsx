import { Button } from "~/components/ui/button"

export default function LoginScreen() {
  return (
    <div className="min-h-screen bg-[#d4e8f7] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-2xl font-bold">Logo</span>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-1">Welcome!</h2>
          <p className="text-gray-700">Let's get you signed in.</p>
        </div>

        {/* Social login buttons */}
        <div className="space-y-3 mb-8">
          <Button variant="outline" className="w-full bg-[#f8f8e8] hover:bg-[#f0f0d8] border-none rounded-full py-6">
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-full bg-[#f8f8e8] hover:bg-[#f0f0d8] border-none rounded-full py-6">
            Sign in with Facebook
          </Button>
          <Button variant="outline" className="w-full bg-[#f8f8e8] hover:bg-[#f0f0d8] border-none rounded-full py-6">
            Sign in with Apple
          </Button>
        </div>

        {/* Continue button */}
        <div className="flex justify-end">
          <Button className="bg-[#f8f8e8] hover:bg-[#f0f0d8] text-black rounded-full px-6 py-6">Continue to app</Button>
        </div>
      </div>
    </div>
  )
}
