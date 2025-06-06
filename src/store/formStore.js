'use client';

import { create } from 'zustand';

export const useFormStore = create((set, get) => ({
  // Datos del formulario
  formData: {
    brandName: '',
    storeLink: '',
    phoneNumber: '',
    monthlyRevenue: '',
    abayasCount: '',
    marketingBudget: '',
    agencyExperience: '',
    startDate: ''
  },
  // Estado del formulario
  currentStep: 0,
  totalSteps: 8,
  isSubmitting: false,
  isSubmitted: false,

  // Acciones
  setField: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value,
    },
  })),

  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps),
  })),

  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0),
  })),

  goToStep: (step) => set({
    currentStep: step,
  }),

  setSubmitting: (isSubmitting) => set({
    isSubmitting,
  }),

  setSubmitted: (isSubmitted) => set({
    isSubmitted,
    currentStep: isSubmitted ? get().totalSteps : get().currentStep,
  }),

  resetForm: () => set({
    formData: {
      brandName: '',
      storeLink: '',
      phoneNumber: '',
      monthlyRevenue: '',
      abayasCount: '',
      marketingBudget: '',
      agencyExperience: '',
      startDate: ''
    },
    currentStep: 0,
    isSubmitting: false,
    isSubmitted: false,
  }),
}));