'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFormStore } from '@/store/formStore';
import { TextInput } from '../ui/TextInput';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';
import { RadioGroup } from '../ui/RadioGroup';
import { Button } from '../ui/Button';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

export function StepQuestion({ question, currentStep, totalQuestions }) {
  const { formData, setField, nextStep, prevStep, isSubmitting, setSubmitting, setSubmitted } = useFormStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Enfoque automático en el input al mostrar la pregunta
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 500); // Pequeño retraso para la animación
    }
  }, [currentStep]);

  // Determinar si es la última pregunta
  const isLastQuestion = currentStep === totalQuestions - 1;

  // Función para manejar cambios en los campos
  const handleChange = (e) => {
    setError('');
    setField(question.id, e.target.value);
  };

  // Función para avanzar al siguiente paso
  const handleNext = async () => {
    // Only validate if the field is required
    if (question.isRequired && !formData[question.id]) {
      setError(question.errorMessage || 'هذا الحقل مطلوب');
      return;
    }

    if (isLastQuestion) {
      await handleSubmit();
    } else {
      nextStep();
    }
  };

  // Evento de tecla para avanzar con Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  // Función para enviar el formulario
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setSubmitting(true);

      // Only include fields that have values
      const cleanedFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value && value.trim() !== '')
      );

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'حدث خطأ أثناء إرسال البيانات');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'حدث خطأ أثناء إرسال البيانات');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Renderizar el tipo de campo según el tipo de pregunta
  const renderQuestionField = () => {
    const value = formData[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <TextInput
            ref={inputRef}
            name={question.id}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={question.placeholder}
            autoFocus={true}
            error={error}
          />
        );
      case 'textarea':
        return (
          <TextArea
            ref={inputRef}
            name={question.id}
            value={value}
            onChange={handleChange}
            placeholder={question.placeholder}
            autoFocus={true}
            error={error}
            rows={5}
          />
        );
      case 'select':
        return (
          <Select
            ref={inputRef}
            name={question.id}
            value={value}
            onChange={handleChange}
            options={question.options}
            autoFocus={true}
            error={error}
          />
        );
      case 'radio':
        return (
          <div className="flex justify-center gap-4 mt-4">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant={formData[question.id] === option.value ? 'solid' : 'outline'}
                onClick={() => {
                  setField(question.id, option.value);
                  nextStep();
                }}
                className="px-6 py-2 text-lg"
              >
                {option.label}
              </Button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* سؤال */}
      <div className="question-container text-center mb-6">
        <motion.h2
          className="text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {question.question}
        </motion.h2>
      </div>

      {/* Campo de respuesta */}
      <div className="answer-container w-full max-w-md">
        {renderQuestionField()}
      </div>

      {/* Botones de navegación */}
      <motion.div 
        className="flex justify-between mt-8 w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0 || loading}
          className="w-24"
        >
          السابق
        </Button>
        <Button
          onClick={handleNext}
          disabled={loading}
          className="w-36"
        >
          {loading ? 'جاري الإرسال...' : isLastQuestion ? 'إرسال' : 'التالي'}
        </Button>
      </motion.div>
    </motion.div>
  );
}