'use client';

import { motion } from 'framer-motion';

export function RadioGroup({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  className = '',
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="form-label mb-4">
          {label}
        </label>
      )}
      
      <div className="flex flex-col gap-3 md:flex-row md:gap-6">
        {options.map((option, index) => (
          <motion.div
            key={option.value}
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="h-5 w-5 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="mr-3 text-lg cursor-pointer"
            >
              {option.label}
            </label>
          </motion.div>
        ))}
      </div>
      
      {error && (
        <motion.p 
          className="mt-3 text-red-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}