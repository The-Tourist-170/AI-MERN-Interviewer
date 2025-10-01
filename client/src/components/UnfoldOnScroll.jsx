import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const UnfoldOnScroll = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const unfoldVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
      originY: 0,
      transition: { duration: 1.2, ease: 'easeInOut' },
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 1.2, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      ref={ref} 
      variants={unfoldVariants}
      initial="hidden" 
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default UnfoldOnScroll;