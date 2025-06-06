'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

export const TextInput = forwardRef(({
  label,
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  type = 'text',
  error,
  autoFocus = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <motion.input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        className="input-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
      {error && (
        <motion.p 
          className="mt-2 text-red-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
})

TextInput.displayName = 'TextInput';