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
    // Validación
    if (question.isRequired && !formData[question.id]) {
      setError(question.errorMessage || 'هذا الحقل مطلوب');
      return;
    }

    // Si es la última pregunta, enviamos el formulario
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

      // Enviar datos a la API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('حدث خطأ أثناء إرسال البيانات');
      }

      // Mostrar pantalla de éxito
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('حدث خطأ أثناء إرسال البيانات، يرجى المحاولة مرة أخرى');
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
          <RadioGroup
            name={question.id}
            value={value}
            onChange={handleChange}
            options={question.options}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Número y pregunta */}
      <div className="question-container">
        <motion.span 
          className="text-sm text-neutral-500 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {`${currentStep + 1} / ${totalQuestions}`}
        </motion.span>
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {question.question}
        </motion.h2>
      </div>

      {/* Campo de respuesta */}
      <div className="answer-container">
        {renderQuestionField()}
      </div>

      {/* Botones de navegación */}
      <motion.div 
        className="flex justify-between mt-8"
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