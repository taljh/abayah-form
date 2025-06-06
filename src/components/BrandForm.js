'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const BrandForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        console.error('Error enviando el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-md p-8 text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-2xl font-bold mb-2">شكرًا!</h3>
          <p className="text-gray-600">تم استلام بياناتك بنجاح، وسيتم التواصل معك في حال تم اختيارك.</p>
        </motion.div>
      ) : (
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="brandName" className="form-label">اسم البراند</label>
            <input
              id="brandName"
              type="text"
              className="form-input"
              {...register('brandName', { required: 'هذا الحقل مطلوب' })}
            />
            {errors.brandName && <p className="text-red-500 text-sm mt-1">{errors.brandName.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="storeLink" className="form-label">رابط المتجر أو الإنستقرام</label>
            <input
              id="storeLink"
              type="text"
              className="form-input"
              {...register('storeLink', { required: 'هذا الحقل مطلوب' })}
            />
            {errors.storeLink && <p className="text-red-500 text-sm mt-1">{errors.storeLink.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="productsCount" className="form-label">كم عدد المنتجات تقريبًا؟</label>
            <input
              id="productsCount"
              type="text"
              className="form-input"
              {...register('productsCount', { required: 'هذا الحقل مطلوب' })}
            />
            {errors.productsCount && <p className="text-red-500 text-sm mt-1">{errors.productsCount.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="monthlySales" className="form-label">كم مبيعاتك الشهرية؟</label>
            <select
              id="monthlySales"
              className="form-input"
              {...register('monthlySales', { required: 'هذا الحقل مطلوب' })}
            >
              <option value="">-- اختر --</option>
              <option value="أقل من 5,000">أقل من 5,000</option>
              <option value="بين 5,000 – 20,000">بين 5,000 – 20,000</option>
              <option value="أكثر من 20,000">أكثر من 20,000</option>
            </select>
            {errors.monthlySales && <p className="text-red-500 text-sm mt-1">{errors.monthlySales.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="adsExperience" className="form-label">هل سبق أطلقت إعلانات؟ كيف كانت تجربتك؟</label>
            <textarea
              id="adsExperience"
              rows="3"
              className="form-input"
              {...register('adsExperience', { required: 'هذا الحقل مطلوب' })}
            ></textarea>
            {errors.adsExperience && <p className="text-red-500 text-sm mt-1">{errors.adsExperience.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="marketingChallenge" className="form-label">ما هو أكبر تحدي تواجهه في التسويق؟</label>
            <textarea
              id="marketingChallenge"
              rows="3"
              className="form-input"
              {...register('marketingChallenge', { required: 'هذا الحقل مطلوب' })}
            ></textarea>
            {errors.marketingChallenge && <p className="text-red-500 text-sm mt-1">{errors.marketingChallenge.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="form-label">هل أنت مستعد تشارك في فرصة تسويقية بدون دفعات مسبقة؟</label>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="marketingOptYes"
                  value="نعم"
                  className="h-5 w-5"
                  {...register('readyForMarketing', { required: 'هذا الحقل مطلوب' })}
                />
                <label htmlFor="marketingOptYes" className="mr-2">نعم</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="marketingOptNo"
                  value="لا"
                  className="h-5 w-5"
                  {...register('readyForMarketing', { required: 'هذا الحقل مطلوب' })}
                />
                <label htmlFor="marketingOptNo" className="mr-2">لا</label>
              </div>
            </div>
            {errors.readyForMarketing && <p className="text-red-500 text-sm mt-1">{errors.readyForMarketing.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="whatsapp" className="form-label">رقم الواتساب للتواصل (اختياري)</label>
            <input
              id="whatsapp"
              type="text"
              className="form-input"
              {...register('whatsapp')}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال البيانات'}
            </button>
          </motion.div>
        </motion.form>
      )}
    </>
  );
};

export default BrandForm;