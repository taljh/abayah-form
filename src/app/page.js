'use client';

import { TypeformContainer } from "@/components/TypeformSurvey/TypeformContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center">
      {/* Contenido principal */}
      <main className="py-4 px-4 w-full max-w-3xl">
        <div className="container-custom">
          {/* Formulario Typeform */}
          <div className="mt-6">
            <TypeformContainer />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-3 border-t border-gray-200 w-full text-center">
        <div className="container-custom">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} | جميع الحقوق محفوظة لطلال الجهني
          </p>
        </div>
      </footer>
    </div>
  );
}
