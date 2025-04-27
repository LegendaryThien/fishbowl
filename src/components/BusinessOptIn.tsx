import { Button } from "~/components/ui/button"

export default function BusinessScreen() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1a3c6e] mb-8">Add your business to fish.bowl!</h1>

        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-1">Address:</h2>
          <p className="text-gray-700">Suffix:</p>
        </div>
      </div>
    </div>
  )
}
