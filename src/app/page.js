'use client';

import { motion } from "framer-motion";
import { TypeformContainer } from "@/components/TypeformSurvey/TypeformContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Encabezado */}
      <header className="bg-white shadow-sm py-5">
        <div className="container-custom">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-center">تحدي العبايات</h1>
          </motion.div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="py-8">
        <div className="container-custom">
          <motion.div
            className="text-center mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              📌 عندك براند عبايات؟
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              جاوب على الأسئلة التالية وقد تكون أحد البراندات المختارة في فرصة
              تسويقية خاصة.
              <br />
              التسجيل لا يعني القبول، وسيتم التواصل فقط مع البراندات المناسبة بعد
              مراجعة البيانات.
            </p>
          </motion.div>

          {/* Formulario Typeform */}
          <TypeformContainer />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t border-gray-200 mt-12">
        <div className="container-custom">
          <p className="text-neutral-500 text-center text-sm">
            © {new Date().getFullYear()} | تحدي العبايات - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}
