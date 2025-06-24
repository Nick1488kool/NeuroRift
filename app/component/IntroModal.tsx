'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

export interface UserInputData {
  name: string
  age: string
  email: string
  field: string
  goal: string
}

export default function IntroModal({
  onStart,
  onClose,
}: {
  onStart: (data: UserInputData) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [email, setEmail] = useState('')
  const [field, setField] = useState('')
  const [goal, setGoal] = useState('')

  const isValid = name && age && email && field && goal

  const years = Array.from({ length: 60 }, (_, i) => `${2025 - i}`)

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-[#111] text-white w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 space-y-6 border border-purple-600/30">

        {/* ❌ Крестик */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          aria-label="Close"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Before we begin...</h2>

        <div className="space-y-4">
          <InputField placeholder="Your name" value={name} onChange={setName} />
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full text-left px-4 py-3 bg-gray-800/70 rounded-lg placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-600 transition flex items-center justify-between"
            >
              <span className={age ? '' : 'text-gray-400'}>
                {age || 'Year of birth (e.g. 1997)'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showDropdown && (
              <div className="absolute z-10 bg-gray-900 border border-gray-700 mt-1 rounded-lg max-h-60 overflow-y-auto w-full">
                {years.map((y) => (
                  <div
                    key={y}
                    onClick={() => {
                      setAge(y)
                      setShowDropdown(false)
                    }}
                    className={`px-4 py-2 hover:bg-purple-700 cursor-pointer ${
                      y === age ? 'bg-purple-600 text-white' : 'text-gray-300'
                    }`}
                  >
                    {y}
                  </div>
                ))}
              </div>
            )}
          </div>
          <InputField placeholder="Your email" value={email} onChange={setEmail} type="email" />
          <InputField placeholder="Your field or interests" value={field} onChange={setField} />
          <InputField placeholder="Your goal (e.g. self-discovery)" value={goal} onChange={setGoal} />
        </div>

        <button
          onClick={() => isValid && onStart({ name, age, email, field, goal })}
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            isValid
              ? 'bg-purple-600 hover:bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Start the Test
        </button>
      </div>
    </div>
  )
}

function InputField({
  placeholder,
  value,
  onChange,
  type = 'text',
}: {
  placeholder: string
  value: string
  onChange: (val: string) => void
  type?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800/70 rounded-lg placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-600 transition"
    />
  )
}