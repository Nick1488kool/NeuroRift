"use client";
import { useEffect, useState, useRef } from "react";
import { animate } from "framer-motion";

function getSeededStartValue(): number {
  const now = new Date();
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return 5000 + Math.floor(pseudoRandom(daySeed) * 1000);
}

const STORAGE_KEY = "daily_test_counter";

export default function DailyCycleCounter() {
  const [count, setCount] = useState<number | null>(null);
  const countRef = useRef(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    const initial = getSeededStartValue();
    const startingCount = isNaN(saved) ? initial : Math.max(initial, saved);

    setCount(startingCount);
    countRef.current = startingCount;

    let animationControls: { stop: () => void } | null = null;

    const incrementCount = () => {
      const increment = Math.floor(Math.random() * 3) + 1;
      const target = countRef.current + increment;

      animationControls = animate(countRef.current, target, {
        duration: 2,
        onUpdate: (val) => {
          const floored = Math.floor(val);
          countRef.current = floored;
          setCount(floored);
          localStorage.setItem(STORAGE_KEY, String(floored));
        },
      });
    };

    incrementCount();
    const interval = setInterval(incrementCount, 5000);

    return () => {
      clearInterval(interval);
      if (animationControls) animationControls.stop();
    };
  }, []);

  if (count === null) return null; // <== ждём пока загрузится client-only логика

  return (
    <p className="mt-8 text-sm text-white">
      👥  Over: {count.toLocaleString("en-US")} tests taken today | Average rating: ⭐ 4.9
    </p>
  );
}