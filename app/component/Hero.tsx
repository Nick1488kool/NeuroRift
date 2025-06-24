'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { names } from './names'
import DailyCycleCounter from './DailyCycleCounter'
import { useRouter } from 'next/navigation'
import IntroModal, { UserInputData } from './IntroModal'

export default function HomePage() {
  const [currentName, setCurrentName] = useState<{ name: string; flag: string } | null>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getRandomName = () => names[Math.floor(Math.random() * names.length)]
    setCurrentName(getRandomName())
    const interval = setInterval(() => setCurrentName(getRandomName()), 4000)
    return () => clearInterval(interval)
  }, [])

  const handleStart = (data: UserInputData) => {
    console.log('User data:', data)
    setShowModal(false)
    router.push('/test')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-violet-800 to-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <Image src="/brain.png" alt="Logo" width={40} height={40} className="object-contain" />
          <span className="font-semibold text-lg">NeuroRift</span>
        </div>
        {currentName && (
          <div className="text-sm md:text-base flex items-center gap-2 animate-pulse">
            <Image
              src={currentName.flag}
              alt="Flag"
              width={40}
              height={25}
              className="object-contain rounded-sm"
            />
            {currentName.name} just paid for the full result
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-center items-center text-center pt-72 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Neuroanalysis of personality</h1>
        <p className="mb-8 max-w-xl text-lg text-white/80">
          A unique AI-based test that reveals who you really are — and who youre truly compatible with.
        </p>
        <button
          className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition"
          onClick={() => setShowModal(true)}
        >
          Start NR test
        </button>

        {/* Counter */}
        <DailyCycleCounter />
      </div>

      {/* Modal */}
      {showModal && (
      <IntroModal onStart={handleStart} onClose={() => setShowModal(false)} />)}

    </div>
  )
}
