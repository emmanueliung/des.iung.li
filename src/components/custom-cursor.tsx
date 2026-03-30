'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnterLink = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        setIsHoveringLink(true);
      }
    };

    const onMouseLeaveLink = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnterLink);
    document.addEventListener('mouseout', onMouseLeaveLink);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnterLink);
      document.removeEventListener('mouseout', onMouseLeaveLink);
    };
  }, [isClient]);

  const cursorVariants = {
    initial: {
      scale: 1,
      opacity: 1,
      width: '1.25rem', // 20px
      height: '1.25rem',
    },
    hover: {
      scale: 1,
      opacity: 1, // Changed from 0.8 to 1 for full opacity
      width: '5rem', // 80px
      height: '5rem',
    },
  };
  
  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground backdrop-filter-none"
      style={{
        left: position.x,
        top: position.y,
        x: '-50%',
        y: '-50%',
      }}
      variants={cursorVariants}
      animate={isHoveringLink ? 'hover' : 'initial'}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
        <AnimatePresence>
        {isHoveringLink && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0 }}
          >
            view
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
