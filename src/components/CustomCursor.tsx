import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse/trackpad), not touch screen
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('.interactive-target'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Cyan Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400 pointer-events-none"
        style={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 240, 255, 0.6), inset 0 0 10px rgba(0, 240, 255, 0.4)'
            : '0 0 10px rgba(0, 240, 255, 0.3)',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
        }}
        animate={{
          x: pos.x - (isHovered ? 24 : 16),
          y: pos.y - (isHovered ? 24 : 16),
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 350,
          mass: 0.2,
        }}
      />

      {/* Center Glowing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-300 pointer-events-none shadow-[0_0_8px_#00f0ff]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isClicking ? 1.4 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 800,
          mass: 0.1,
        }}
      />
    </div>
  );
};
