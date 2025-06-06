'use client';

import { motion } from 'framer-motion';

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  className = '', 
  type = 'button',
  ...props 
}) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseClass} ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  );
}