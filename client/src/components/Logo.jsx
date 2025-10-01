import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import AnimatedText from './AnimatedText';

const Logo = () => {
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  return (
    <div
      onClick={handleHome}
      style={{ cursor: 'pointer' }}
      className="flex items-center gap-2">
      <motion.div
        className="p-2 bg-primary/20 border border-primary/50 rounded-lg"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        <Bot className="w-6 h-6 text-secondary" />
      </motion.div>

      <AnimatedText
        el="h1"
        text="AI Interviewer"
        className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-400"
      />
    </div>
  );
};

export default Logo;