import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({
  text,
  el: Wrapper = 'h1',
  className,
}) => {
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const MotionWrapper = motion[Wrapper];

  return (
    <MotionWrapper
      className={className}
      variants={textContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          style={{ display: 'inline-block' }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionWrapper>
  );
};

export default AnimatedText;