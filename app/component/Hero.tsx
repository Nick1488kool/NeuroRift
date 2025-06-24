
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { names } from './names';
import DailyCycleCounter from './DailyCycleCounter';

// Тип для элемента массива имён
type Person = {
  name: string;
  flag: string;
};

export default function HomePage() {
  const [currentName, setCurrentName] = useState<Person | null>(null);

  useEffect(() => {
    const getRandomName = () => names[Math.floor(Math.random() * names.length)];
    setCurrentName(getRandomName());

    const interval = setInterval(() => {
      setCurrentName(getRandomName());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-violet-800 to-black text-white">
      
      {/* Верхняя панель */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 backdrop-blur-md flex items-center justify-between px-6 py-3">
        {/* Логотип + название */}
        <div className="flex items-center space-x-2">
          <Image src="/brain.png" alt="Логотип" width={40} height={40} className="object-contain" />
          <span className="font-semibold text-lg">NeuroRift</span>
        </div>

        {/* Динамический текст */}
        {currentName && (
          <div className="text-sm md:text-base flex items-center gap-2 animate-pulse">
            <Image
              src={currentName.flag}
              alt="Флаг"
              width={40}
              height={25}
              className="object-contain rounded-sm"
            />
            {currentName.name} just paid for the full result
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-col justify-center items-center text-center pt-72 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Neuroanalysis of personality</h1>
        <p className="mb-8 max-w-xl text-lg text-white/80">
          Neuroanalysis of personality
          A unique test based on artificial intelligence that will show who you really are and who you are on the same path with.
        </p>
        <button className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-300 transition">
          Start NR test
        </button>

        {/* Вставляем счётчик */}
        <DailyCycleCounter />
      </div>
    </div>
  );
}

  