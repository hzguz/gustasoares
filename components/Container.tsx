import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Reusable container component with consistent max-width and padding.
 * Centralizes the repeated layout pattern: w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8
 */
const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
