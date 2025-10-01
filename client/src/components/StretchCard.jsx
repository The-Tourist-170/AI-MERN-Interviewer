// src/components/StretchCard.jsx
import React, { useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const StretchCard = ({ children }) => {
    const controls = useAnimationControls();
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        if (Math.abs(x) > Math.abs(y)) {
            controls.start({
                scaleX: 1.1,
                scaleY: 1,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
            });
        } else {
            controls.start({
                scaleX: 1,
                scaleY: 1.1,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
            });
        }
    };

    const handleMouseLeave = () => {
        controls.start({
            scaleX: 1,
            scaleY: 1,
            transition: { type: 'spring', stiffness: 400, damping: 15 },
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};

export default StretchCard;