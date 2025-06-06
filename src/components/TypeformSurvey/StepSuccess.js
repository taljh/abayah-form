'use client';

import { motion } from 'framer-motion';

export function StepSuccess() {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto text-center py-16 px-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success Icon */}
      <motion.div 
        className="success-icon mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-green-600"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="space-y-8">
        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            شكرًا لك على اهتمامك وثقتك
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            تم استلام بياناتك بنجاح، وسيتم التواصل معك عبر واتساب في حال تم اختيارك.
          </p>
        </motion.div>

        {/* Note Section */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Pin Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <span className="text-3xl inline-block transform -rotate-12">📌</span>
          </motion.div>

          {/* Note Content */}
          <div className="bg-gray-50 px-8 py-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">ملاحظة:</span> نختار فقط البراندات الجاهزة للتوسع واللي نؤمن إنها تستحق الفرصة.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}