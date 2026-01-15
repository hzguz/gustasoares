import React from 'react';
import { motion } from 'framer-motion';

const LoadingDots = () => {
    const dotTransition = {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-3 h-3 bg-textPrimary rounded-full"
                    initial={{ y: 0 }}
                    animate={{ y: -8 }}
                    transition={{
                        ...dotTransition,
                        delay: index * 0.15
                    }}
                />
            ))}
        </div>
    );
};

export default LoadingDots;
