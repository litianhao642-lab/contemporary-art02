/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play } from 'lucide-react';

export default function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const toggleAudio = () => {
    if (!audioStarted) {
      setAudioStarted(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#fcfcfd] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      {/* Background Radial Accents - Frosted Glass Feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 h-[40%] w-[40%] bg-[radial-gradient(circle_at_0%_0%,rgba(240,244,255,0.8),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[40%] w-[40%] bg-[radial-gradient(circle_at_100%_100%,rgba(245,245,250,0.8),transparent_70%)]" />
      </div>

      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
      />

      {/* Main Grid Layout */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid h-full w-full grid-cols-12 grid-rows-12 gap-[32px] p-10"
      >
        {/* Top Header */}
        <motion.header 
          variants={itemVariants}
          className="col-span-12 row-span-1 flex items-start justify-between border-b border-black/5 pb-3"
          id="header"
        >
          <div className="flex flex-col">
            <h1 className="text-[11px] font-medium tracking-[0.4em] uppercase text-[#94a3b8]">
              Contemporary Art
            </h1>
          </div>
          
          <button 
            onClick={toggleAudio}
            className="group flex items-center gap-3 text-[9px] tracking-widest uppercase opacity-40 transition-opacity hover:opacity-100"
            id="audio-toggle"
          >
            {!audioStarted ? (
              <span className="flex items-center gap-2">
                <Play size={10} strokeWidth={1.5} />
                Start Soundscape
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {isMuted ? <VolumeX size={10} strokeWidth={1.5} /> : <Volume2 size={10} strokeWidth={1.5} />}
                {isMuted ? 'Audio Off' : 'Audio On'}
              </span>
            )}
          </button>
        </motion.header>

        {/* Left Side: A4 Artist Statement */}
        <motion.section 
          variants={itemVariants}
          className="col-span-12 lg:col-span-8 lg:row-span-11 flex flex-col"
          id="statement-section"
        >
          <div className="flex-1 overflow-hidden bg-white border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-0">
            {/* A4 Landscape Container */}
            <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
               <img 
                src="statement.png" 
                alt="Artist Statement" 
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-[9px] tracking-[0.15em] text-[#cbd5e1] font-mono uppercase">Artist Statement — System v4.0.1</span>
          </div>
        </motion.section>

        {/* Right Side: Media Stack */}
        <div className="col-span-12 lg:col-span-4 lg:row-span-11 flex flex-col gap-[32px]">
          {/* Top Right: Video */}
          <div className="flex flex-col flex-1">
            <motion.div 
              variants={itemVariants}
              className="relative flex-1 overflow-hidden bg-[#0f172a] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group"
              id="video-container"
            >
              <video 
                src="32323.MP4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="h-full w-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-[7px] font-mono tracking-widest text-white/30 uppercase">32323.MP4 / Stream</span>
              </div>
            </motion.div>
            <div className="mt-2 text-[9px] tracking-[0.15em] text-[#cbd5e1] font-mono uppercase">Motion Visual — Reference 32323</div>
          </div>

          {/* Bottom Right: Image Board */}
          <div className="flex flex-col flex-1">
            <motion.div 
              variants={itemVariants}
              className="relative flex-1 overflow-hidden bg-[#f8fafc] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group"
              id="board-container"
            >
              <img 
                src="board.png" 
                alt="Art Board" 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="mt-2 text-[9px] tracking-[0.15em] text-[#cbd5e1] font-mono uppercase">Exhibition Board — Static_A1</div>
          </div>
        </div>
      </motion.main>

      {/* Tech Accent Decorative Text */}
      <div className="fixed bottom-10 right-10 z-20 pointer-events-none">
        <div className="text-[10px] font-mono text-[#e2e8f0] tracking-widest uppercase rotate-270 origin-bottom-right whitespace-nowrap">
          LAT: 35.6895° N // LONG: 139.6917° E
        </div>
      </div>
    </div>
  );
}
