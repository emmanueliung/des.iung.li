'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type TypewriterProps = {
  text: string;
  className?: string;
  delay?: number;
};

const Typewriter = ({ text, className, delay = 0 }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset the text when the `text` prop changes
    setDisplayedText(''); 
    let i = 0;
    
    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, 150);

      return () => clearInterval(intervalId);
    }, delay);
    
    return () => clearTimeout(startTimeout);

  }, [text, delay]);

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1]
      }
    }
  };
  
  const isAnimating = displayedText.length < text.length;

  return (
    <span className={className}>
      {displayedText}
      {isAnimating && (
        <motion.span
            variants={cursorVariants}
            animate="blinking"
            className="inline-block"
        >
            |
        </motion.span>
      )}
    </span>
  );
};

export default Typewriter;
