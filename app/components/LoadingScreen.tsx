'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    // Animate counter from 1 to 100 over 5 seconds
    const duration = 5000; // 5 seconds
    const totalSteps = 100;
    const stepDuration = duration / totalSteps;
    
    const counterInterval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          setTimeout(() => {
            onLoadingComplete();
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(counterInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-8xl font-light"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ color: '#9b59b6' }} // Muted neon purple
        >
          {counter}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}