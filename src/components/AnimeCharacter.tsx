import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export type CharacterPose = 'hero' | 'about' | 'experience' | 'contact';

interface AnimeCharacterProps {
  pose?: CharacterPose;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
}

export const AnimeCharacter: React.FC<AnimeCharacterProps> = ({
  pose = 'hero',
  className = '',
  size = 'lg',
  interactive = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouse reaction tracking
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72',
    lg: 'w-96 h-96 sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px]',
    xl: 'w-full max-w-[560px] aspect-square',
  }[size];

  // Pupil offset from mouse
  const pupilOffsetX = mousePos.x * 2.8;
  const pupilOffsetY = mousePos.y * 2.2;

  // Head tilt from mouse
  const headRotate = mousePos.x * 4;
  const headTranslateX = mousePos.x * 3;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}
    >
      {/* 1. Holographic Aura & Cyber Rings under/around platform */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Soft glowing ambient circle */}
        <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-600/15 to-purple-500/20 blur-3xl animate-pulse" />

        {/* Orbiting cyber ring 1 */}
        <div
          className="absolute w-[88%] h-[88%] rounded-full border border-cyan-400/20 border-dashed animate-orbit-slow"
          style={{ transform: 'rotateX(65deg)' }}
        />
        {/* Orbiting cyber ring 2 */}
        <div
          className="absolute w-[74%] h-[74%] rounded-full border border-purple-400/25 animate-orbit-reverse"
          style={{ transform: 'rotateX(65deg) rotateY(15deg)' }}
        />
      </div>

      {/* 2. Floating Cyber Butterfly */}
      <motion.div
        className="absolute top-4 right-10 pointer-events-none z-20"
        animate={{
          x: [0, 8, -6, 0],
          y: [0, -14, -6, 0],
          rotate: [0, 6, -4, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className="drop-shadow-[0_0_10px_#00f0ff]">
          {/* Left Wing */}
          <path
            d="M20 20 C10 10, 0 14, 5 26 C8 32, 17 24, 20 20 Z"
            fill="url(#butterflyGradL)"
            opacity="0.85"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 20 20; 25 20 20; 0 20 20"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </path>
          {/* Right Wing */}
          <path
            d="M20 20 C30 10, 40 14, 35 26 C32 32, 23 24, 20 20 Z"
            fill="url(#butterflyGradR)"
            opacity="0.85"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 20 20; -25 20 20; 0 20 20"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </path>
          {/* Body */}
          <ellipse cx="20" cy="20" rx="1.5" ry="5" fill="#ffffff" />
          <defs>
            <linearGradient id="butterflyGradL" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="butterflyGradR" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 3. Main Character Illustration (High-fidelity Layered Vector SVG) */}
      <motion.div
        className="relative w-full h-full z-10"
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Skin Shading */}
            <linearGradient id="skinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#fff1ea" />
              <stop offset="70%" stopColor="#fed7c7" />
              <stop offset="100%" stopColor="#fbc5b3" />
            </linearGradient>

            {/* Hair Gradients - Deep Dark Hair with Neon Cyan & Lavender Highlights */}
            <linearGradient id="hairBaseGrad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#1e1b2e" />
              <stop offset="50%" stopColor="#131525" />
              <stop offset="100%" stopColor="#0a0c16" />
            </linearGradient>
            <linearGradient id="hairCyanGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="hairPurpleGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
            </linearGradient>

            {/* Hoodie Gradient - Navy Blue with Cyan / Lavender Accents */}
            <linearGradient id="hoodieGrad" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#1e2442" />
              <stop offset="50%" stopColor="#151930" />
              <stop offset="100%" stopColor="#0b0e1d" />
            </linearGradient>
            <linearGradient id="hoodieAccentGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Anime Eye Irises */}
            <linearGradient id="irisGrad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="45%" stopColor="#3b82f6" />
              <stop offset="85%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* Laptop Glow */}
            <linearGradient id="laptopScreenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="laptopBodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Floating Platform */}
            <linearGradient id="platformGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.6)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.5)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.6)" />
            </linearGradient>
            <linearGradient id="platformBaseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Eye Blink Filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* === A. FLOATING CYBER PLATFORM (Base) === */}
          <g transform="translate(0, 395)">
            {/* Outer Energy Halo */}
            <ellipse cx="250" cy="40" rx="190" ry="38" fill="url(#platformGrad)" opacity="0.3" filter="url(#glow)" />
            {/* Solid Platform Disc */}
            <ellipse cx="250" cy="38" rx="160" ry="28" fill="url(#platformBaseGrad)" stroke="#38bdf8" strokeWidth="2" />
            {/* Inner Cyber Concentric Ring */}
            <ellipse cx="250" cy="38" rx="130" ry="22" stroke="url(#hoodieAccentGrad)" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.75" />
            <ellipse cx="250" cy="38" rx="80" ry="14" stroke="#c084fc" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Platform Emitter Glyphs */}
            <circle cx="150" cy="38" r="3" fill="#00f0ff" />
            <circle cx="350" cy="38" r="3" fill="#c084fc" />
            <circle cx="250" cy="56" r="3" fill="#38bdf8" />
          </g>

          {/* === B. CHARACTER BODY & POSE === */}
          <g>
            {/* 1. Back Hair (Long flowing dark hair behind shoulders) */}
            <g id="back-hair">
              {/* Left long tresses */}
              <path
                d="M175 190 C150 250, 130 330, 160 410 C175 370, 190 320, 195 270 Z"
                fill="url(#hairBaseGrad)"
              />
              <path
                d="M160 210 C140 270, 125 350, 145 425 C160 380, 175 320, 185 270 Z"
                fill="#151728"
                opacity="0.8"
              />
              {/* Left hair cyan streak */}
              <path
                d="M170 230 C150 290, 140 360, 155 415"
                stroke="url(#hairCyanGlow)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Right long tresses */}
              <path
                d="M325 190 C350 250, 370 330, 340 410 C325 370, 310 320, 305 270 Z"
                fill="url(#hairBaseGrad)"
              />
              <path
                d="M340 210 C360 270, 375 350, 355 425 C340 380, 325 320, 315 270 Z"
                fill="#151728"
                opacity="0.8"
              />
              {/* Right hair lavender streak */}
              <path
                d="M330 230 C350 290, 360 360, 345 415"
                stroke="url(#hairPurpleGlow)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* 2. Sitting Legs & Lower Body */}
            <g id="lower-body">
              {/* Dark tech pants / folded legs */}
              <path
                d="M170 375 C180 340, 220 345, 250 350 C280 345, 320 340, 330 375 C345 415, 155 415, 170 375 Z"
                fill="#0d1122"
              />
              {/* Cyber sneaker accents */}
              <ellipse cx="195" cy="405" rx="22" ry="10" fill="#1e2442" stroke="#00f0ff" strokeWidth="1.2" />
              <ellipse cx="305" cy="405" rx="22" ry="10" fill="#1e2442" stroke="#c084fc" strokeWidth="1.2" />
            </g>

            {/* 3. Modern Hoodie Torso */}
            <g id="torso">
              {/* Main hoodie shape */}
              <path
                d="M185 240 C170 270, 165 330, 180 370 C205 380, 295 380, 320 370 C335 330, 330 270, 315 240 C285 245, 215 245, 185 240 Z"
                fill="url(#hoodieGrad)"
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              {/* Hoodie pocket */}
              <path
                d="M210 330 C235 325, 265 325, 290 330 C295 355, 205 355, 210 330 Z"
                fill="#111628"
                stroke="#2a3356"
                strokeWidth="1"
              />
              {/* Chest Cyber Tech Crest */}
              <polygon
                points="245,268 255,268 250,278"
                fill="#00f0ff"
                opacity="0.85"
                filter="url(#glow)"
              />
              <path
                d="M235 272 H265"
                stroke="url(#hoodieAccentGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Hoodie drawstrings with cyan beads */}
              <path d="M232 250 Q230 290, 226 310" stroke="#f8fafc" strokeWidth="1.5" fill="none" opacity="0.8" />
              <circle cx="226" cy="310" r="2.5" fill="#00f0ff" />
              <path d="M268 250 Q270 290, 274 310" stroke="#f8fafc" strokeWidth="1.5" fill="none" opacity="0.8" />
              <circle cx="274" cy="310" r="2.5" fill="#c084fc" />
            </g>

            {/* 4. Arms & Laptop / Pose Item */}
            {pose === 'contact' ? (
              // CONTACT POSE: One hand typing, other hand waving with a glowing cyber paper plane!
              <g id="arms-contact">
                {/* Left arm typing */}
                <path d="M185 255 C170 290, 195 340, 225 345" stroke="url(#hoodieGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
                {/* Right arm waving up */}
                <path d="M315 255 C335 240, 355 200, 365 170" stroke="url(#hoodieGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
                <circle cx="365" cy="170" r="11" fill="url(#skinGrad)" />
                {/* Glowing Cyber Paper Plane in Hand */}
                <g transform="translate(365, 145) rotate(-20) scale(0.9)">
                  <polygon points="0,0 35,-15 15,25" fill="#00f0ff" opacity="0.9" filter="url(#glow)" />
                  <polygon points="0,0 35,-15 20,5" fill="#ffffff" />
                  <path d="M-5 10 Q -25 25, -45 15" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                </g>
              </g>
            ) : pose === 'experience' ? (
              // EXPERIENCE POSE: Holding a sleek cyber briefcase / developer badge
              <g id="arms-experience">
                <path d="M185 255 C165 300, 195 350, 225 350" stroke="url(#hoodieGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
                <path d="M315 255 C335 300, 305 350, 275 350" stroke="url(#hoodieGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
                {/* Hands */}
                <circle cx="225" cy="350" r="10" fill="url(#skinGrad)" />
                <circle cx="275" cy="350" r="10" fill="url(#skinGrad)" />
              </g>
            ) : (
              // HERO / ABOUT POSE: Coding on futuristic laptop
              <g id="arms-coding">
                {/* Left arm */}
                <path d="M185 255 C170 300, 195 340, 218 340" stroke="url(#hoodieGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
                {/* Right arm */}
                <path d="M315 255 C330 300, 305 340, 282 340" stroke="url(#hoodieGrad)" strokeWidth="26" strokeLinecap="round" fill="none" />
                {/* Hands */}
                <circle cx="218" cy="340" r="9" fill="url(#skinGrad)" />
                <circle cx="282" cy="340" r="9" fill="url(#skinGrad)" />
              </g>
            )}

            {/* 5. Sleek Holographic Laptop (Hero / About) */}
            {pose !== 'contact' && (
              <g id="laptop" transform="translate(0, 5)">
                {/* Screen Base & Keyboard Base */}
                <path
                  d="M195 340 L305 340 L320 365 L180 365 Z"
                  fill="url(#laptopBodyGrad)"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                />
                {/* Keyboard keys glow */}
                <path
                  d="M205 345 L295 345 L305 360 L195 360 Z"
                  fill="#030712"
                  stroke="#1e293b"
                  strokeWidth="0.8"
                />
                <rect x="235" y="358" width="30" height="4" rx="2" fill="#00f0ff" opacity="0.6" />

                {/* Holographic Screen Display (Upright angled toward character) */}
                <path
                  d="M190 340 L205 285 L295 285 L310 340 Z"
                  fill="url(#laptopScreenGrad)"
                  opacity="0.88"
                  filter="url(#glow)"
                />
                {/* Screen bezel & dark IDE background */}
                <path
                  d="M194 338 L207 290 L293 290 L306 338 Z"
                  fill="#0a0f24"
                  opacity="0.95"
                />
                {/* Code on screen */}
                <text x="212" y="303" fill="#00f0ff" fontSize="7" fontFamily="monospace" fontWeight="bold">const dev = &#123;</text>
                <text x="216" y="313" fill="#c084fc" fontSize="6.5" fontFamily="monospace">  name: 'Shakthi',</text>
                <text x="216" y="323" fill="#38bdf8" fontSize="6.5" fontFamily="monospace">  status: 'Building'</text>
                <text x="212" y="333" fill="#00f0ff" fontSize="7" fontFamily="monospace">&#125;;</text>

                {/* Screen Ambient Light Cone projecting onto her face */}
                <polygon
                  points="207,290 293,290 310,230 190,230"
                  fill="url(#hairCyanGlow)"
                  opacity="0.12"
                  pointerEvents="none"
                />
              </g>
            )}

            {/* 6. Head & Face (Interactive Mouse Tilt & Blink) */}
            <g
              id="head"
              style={{
                transform: `rotate(${headRotate}deg) translateX(${headTranslateX}px)`,
                transformOrigin: '250px 220px',
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Neck */}
              <path d="M238 215 L238 245 L262 245 L262 215 Z" fill="url(#skinGrad)" />
              <path d="M238 232 C245 238, 255 238, 262 232 L262 245 L238 245 Z" fill="#fbc5b3" opacity="0.6" />

              {/* Face Shape (Cute anime jawline with soft cheeks) */}
              <path
                d="M205 160 C200 200, 220 232, 250 236 C280 232, 300 200, 295 160 C290 120, 210 120, 205 160 Z"
                fill="url(#skinGrad)"
              />

              {/* Soft Anime Blush */}
              <ellipse cx="220" cy="188" rx="8" ry="4" fill="#fb7185" opacity="0.45" />
              <ellipse cx="280" cy="188" rx="8" ry="4" fill="#fb7185" opacity="0.45" />

              {/* Nose */}
              <circle cx="250" cy="184" r="1.5" fill="#f43f5e" opacity="0.4" />

              {/* Expressive Anime Mouth (Friendly confident smile) */}
              <path
                d="M243 197 Q250 203, 257 197"
                stroke="#e11d48"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Left Eye */}
              <g transform="translate(222, 168)">
                {/* Eyebrow */}
                <path d="M-10 -15 Q 0 -18, 12 -13" stroke="#1e1b2e" strokeWidth="2" strokeLinecap="round" fill="none" />
                {isBlinking ? (
                  // Closed eye curve when blinking
                  <path d="M-8 0 Q 2 6, 12 0" stroke="#1e1b2e" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                ) : (
                  // Open Anime Eye
                  <>
                    {/* Eye White */}
                    <ellipse cx="2" cy="0" rx="10" ry="11" fill="#ffffff" />
                    {/* Top Eyelash */}
                    <path d="M-10 -4 Q 2 -14, 14 -3" stroke="#1e1b2e" strokeWidth="3" strokeLinecap="round" fill="none" />
                    {/* Iris with mouse gaze */}
                    <ellipse
                      cx={2 + pupilOffsetX}
                      cy={0 + pupilOffsetY}
                      rx="7"
                      ry="8.5"
                      fill="url(#irisGrad)"
                    />
                    {/* Pupil */}
                    <ellipse
                      cx={2 + pupilOffsetX}
                      cy={1 + pupilOffsetY}
                      rx="3.5"
                      ry="4"
                      fill="#030712"
                    />
                    {/* Primary Catchlight / Sparkle */}
                    <circle cx={-0.5 + pupilOffsetX} cy={-3.5 + pupilOffsetY} r="2.8" fill="#ffffff" />
                    {/* Secondary Catchlight */}
                    <circle cx={4.5 + pupilOffsetX} cy={3 + pupilOffsetY} r="1.5" fill="#a5f3fc" />
                  </>
                )}
              </g>

              {/* Right Eye */}
              <g transform="translate(278, 168)">
                {/* Eyebrow */}
                <path d="M-12 -13 Q 0 -18, 10 -15" stroke="#1e1b2e" strokeWidth="2" strokeLinecap="round" fill="none" />
                {isBlinking ? (
                  // Closed eye curve when blinking
                  <path d="M-12 0 Q -2 6, 8 0" stroke="#1e1b2e" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                ) : (
                  // Open Anime Eye
                  <>
                    {/* Eye White */}
                    <ellipse cx="-2" cy="0" rx="10" ry="11" fill="#ffffff" />
                    {/* Top Eyelash */}
                    <path d="M-14 -3 Q -2 -14, 10 -4" stroke="#1e1b2e" strokeWidth="3" strokeLinecap="round" fill="none" />
                    {/* Iris with mouse gaze */}
                    <ellipse
                      cx={-2 + pupilOffsetX}
                      cy={0 + pupilOffsetY}
                      rx="7"
                      ry="8.5"
                      fill="url(#irisGrad)"
                    />
                    {/* Pupil */}
                    <ellipse
                      cx={-2 + pupilOffsetX}
                      cy={1 + pupilOffsetY}
                      rx="3.5"
                      ry="4"
                      fill="#030712"
                    />
                    {/* Primary Catchlight / Sparkle */}
                    <circle cx={-4.5 + pupilOffsetX} cy={-3.5 + pupilOffsetY} r="2.8" fill="#ffffff" />
                    {/* Secondary Catchlight */}
                    <circle cx={0.5 + pupilOffsetX} cy={3 + pupilOffsetY} r="1.5" fill="#a5f3fc" />
                  </>
                )}
              </g>

              {/* 7. Front Hair (Bangs & Framing Strands) */}
              <g id="front-hair">
                {/* Center Forehead Bangs */}
                <path
                  d="M205 130 C220 160, 235 170, 248 165 C260 170, 275 160, 295 130 C270 120, 230 120, 205 130 Z"
                  fill="url(#hairBaseGrad)"
                />
                {/* Left Side Bang Strand */}
                <path
                  d="M202 145 C190 180, 195 210, 205 225 C210 205, 208 175, 215 155 Z"
                  fill="#151728"
                />
                {/* Right Side Bang Strand */}
                <path
                  d="M298 145 C310 180, 305 210, 295 225 C290 205, 292 175, 285 155 Z"
                  fill="#151728"
                />
                {/* Gentle Neon Hair Glint */}
                <path
                  d="M218 138 C232 144, 268 144, 282 138"
                  stroke="url(#hairCyanGlow)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="235" cy="142" r="1.5" fill="#ffffff" />
                <circle cx="265" cy="142" r="1.5" fill="#ffffff" />
              </g>

              {/* Stylish Cyber Headset / Ear Cuff */}
              <g id="cyber-accessory">
                <circle cx="198" cy="178" r="7" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.5" />
                <circle cx="198" cy="178" r="3" fill="#00f0ff" filter="url(#glow)" />
                <circle cx="302" cy="178" r="7" fill="#0f172a" stroke="#c084fc" strokeWidth="1.5" />
                <circle cx="302" cy="178" r="3" fill="#c084fc" filter="url(#glow)" />
              </g>
            </g>
          </g>
        </svg>
      </motion.div>

      {/* 4. Floating Holographic Tech Badges (Hero Pose) */}
      {pose === 'hero' && (
        <>
          {/* Python Orb */}
          <motion.div
            className="absolute -left-4 sm:left-2 top-20 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 border border-cyan-400/40 shadow-lg glow-cyan pointer-events-auto"
            animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-semibold text-cyan-300">Python</span>
          </motion.div>

          {/* Flask Orb */}
          <motion.div
            className="absolute -right-4 sm:right-2 top-28 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 border border-purple-400/40 shadow-lg glow-purple pointer-events-auto"
            animate={{ y: [8, -8, 8], rotate: [2, -2, 2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="font-mono text-xs font-semibold text-purple-300">Flask API</span>
          </motion.div>

          {/* TiDB Cloud Orb */}
          <motion.div
            className="absolute left-6 bottom-16 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 border border-blue-400/40 shadow-lg glow-blue pointer-events-auto"
            animate={{ y: [-6, 6, -6], rotate: [1, -1, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="font-mono text-xs font-semibold text-blue-300">TiDB Cloud</span>
          </motion.div>

          {/* JavaScript / SQL Orb */}
          <motion.div
            className="absolute right-6 bottom-20 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 border border-emerald-400/40 shadow-lg pointer-events-auto"
            animate={{ y: [6, -6, 6], rotate: [-1, 1, -1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs font-semibold text-emerald-300">SQL & JS</span>
          </motion.div>
        </>
      )}
    </div>
  );
};
