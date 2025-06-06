'use client';

import { motion } from 'framer-motion';

export function StepSuccess() {
  return (
    <motion.div
      className="w-full text-center py-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        شكرًا لك!
      </motion.h2>
      
      <motion.p
        className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        تم استلام بياناتك بنجاح، وسيتم التواصل معك في حال تم اختيارك في الفرصة التسويقية الخاصة.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="text-sm text-neutral-500 mt-12">
          © {new Date().getFullYear()} | تحدي العبايات
        </p>
      </motion.div>
    </motion.div>
  );
}