'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';


const reviews = [
  { name: 'Anna R.', text: 'Absolutely stunning experience! Really opened my mind.', avatar: '/avatars/avatar1.jpg' },
  { name: 'Marco D.', text: 'Highly accurate and insightful. Worth every cent.', avatar: '/avatars/avatar2.jpg' },
  { name: 'Katia K.', text: 'Loved the design and the result! Shared it with friends.', avatar: '/avatars/avatar3.jpg' },
  { name: 'Giovanni P.', text: 'Interesting perspective on my personality.', avatar: '/avatars/avatar4.jpg' },
  { name: 'Sophia T.', text: 'Great tool for reflection and fun too!', avatar: '/avatars/avatar5.jpg' },
  { name: 'Natali B.', text: 'The AI personality match was surprisingly accurate. I didn’t expect that!', avatar: '/avatars/avatar6.jpg' },
  { name: 'Valentina S.', text: 'Clean design, easy flow, and the final result really made me think.', avatar: '/avatars/avatar7.jpg' },
  { name: 'Francesco N.', text: 'I shared it with my friends — they all said it described them perfectly!', avatar: '/avatars/avatar8.jpg' },
  { name: 'Giulia C.', text: 'The premium version had so much more insight. Definitely worth upgrading.', avatar: '/avatars/avatar9.jpg' },
];

const CARD_WIDTH = 320;
const GAP = 24;
const VISIBLE_COUNT = 3;
const CONTAINER_WIDTH = CARD_WIDTH * VISIBLE_COUNT + GAP * (VISIBLE_COUNT - 1); // 320*3 + 24*2 = 1008

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const buffer = 2; // буфер по краям для плавности
  const visibleReviews = [];
  for (let i = 0; i < VISIBLE_COUNT + buffer; i++) {
    visibleReviews.push(reviews[(startIndex + i) % reviews.length]);
  }

  const offsetX = -(CARD_WIDTH + GAP); // сдвигаем на ширину карточки + gap

  return (
    <section className="px-6 py-12 bg-gradient-to-b from-indigo-600 to-black text-white select-none overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What people say?</h2>

        <div
          className="relative overflow-hidden mx-auto"
          style={{ width: CONTAINER_WIDTH }}
        >
          <motion.div
            key={startIndex}
            className="flex"
            style={{ gap: GAP }}
            initial={{ x: 0 }}
            animate={{ x: offsetX }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {visibleReviews.map((review, i) => (
              <div
                key={review.name + i}
                style={{ minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH }}
                className={`bg-white/10 rounded-2xl p-6 text-center backdrop-blur-lg border border-white/10 shadow-xl transition-transform duration-500 ${
                  i === 2 ? 'scale-100 opacity-100' : 'scale-95 opacity-50 blur-[2px]'
                }`}
              >
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={64}
                  height={64}
                  className="rounded-full mx-auto mb-4 border-2 border-white object-cover"
                />
                <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                <p className="text-white/80 text-sm">{review.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
