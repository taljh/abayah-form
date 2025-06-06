'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormStore } from '@/store/formStore';
import { StepQuestion } from './StepQuestion';
import { StepSuccess } from './StepSuccess';
import { Button } from '../ui/Button';

// Definición de las preguntas
const questions = [
	{
		id: 'brandName',
		question: 'ما اسم البراند؟',
		type: 'text',
		placeholder: 'اكتب اسم البراند هنا...',
		isRequired: true,
		errorMessage: 'يرجى إدخال اسم البراند',
	},
	{
		id: 'storeLink',
		question: 'رابط المتجر أو الإنستقرام؟',
		type: 'text',
		placeholder: 'https://...',
		isRequired: true,
		errorMessage: 'يرجى إدخال رابط صحيح',
	},
	{
		id: 'productsCount',
		question: 'كم عدد المنتجات عندك تقريبًا؟',
		type: 'text',
		placeholder: 'اكتب عدد المنتجات...',
		isRequired: true,
		errorMessage: 'يرجى إدخال عدد المنتجات',
	},
	{
		id: 'monthlySales',
		question: 'كم مبيعاتك الشهرية؟',
		type: 'select',
		options: [
			{ value: 'أقل من 5,000', label: 'أقل من 5,000' },
			{ value: 'بين 5,000 – 20,000', label: 'بين 5,000 – 20,000' },
			{ value: 'أكثر من 20,000', label: 'أكثر من 20,000' },
		],
		isRequired: true,
		errorMessage: 'يرجى اختيار إحدى الخيارات',
	},
	{
		id: 'adsExperience',
		question: 'هل سبق أطلقت إعلانات؟ كيف كانت تجربتك؟',
		type: 'textarea',
		placeholder: 'اكتب تجربتك هنا...',
		isRequired: true,
		errorMessage: 'يرجى مشاركة تجربتك',
	},
	{
		id: 'marketingChallenge',
		question: 'ما هو أكبر تحدي تواجهه في التسويق؟',
		type: 'textarea',
		placeholder: 'اكتب التحديات التي تواجهها...',
		isRequired: true,
		errorMessage: 'يرجى ذكر التحدي الذي تواجهه',
	},
	{
		id: 'readyForMarketing',
		question: 'هل أنت مستعد للمشاركة في فرصة تسويقية بدون دفعات مسبقة؟',
		type: 'radio',
		options: [
			{ value: 'نعم', label: 'نعم' },
			{ value: 'لا', label: 'لا' },
		],
		isRequired: true,
		errorMessage: 'يرجى اختيار إحدى الإجابات',
	},
	{
		id: 'whatsapp',
		question: 'رقم الواتساب للتواصل (اختياري)',
		type: 'text',
		placeholder: 'مثال: +966 55 123 4567',
		isRequired: false,
	},
];

export function TypeformContainer() {
	// const { currentStep, totalSteps, isSubmitted, formData } = useFormStore();
	const { currentStep, totalSteps, isSubmitted, formData, goToStep } = useFormStore();
	const [mounted, setMounted] = useState(false);

	// Prevents hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	// Calcular el progreso
	const progress = (currentStep / questions.length) * 100;

	const renderWelcomeScreen = () => (
		<motion.div
			className="welcome-screen"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
		>
			<motion.h1
				className="text-4xl md:text-5xl font-bold mb-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				تحدي العبايات
			</motion.h1>
			<motion.p
				className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
			>
				نرحب بك في استبيان تحدي العبايات. شاركنا معلوماتك لنساعدك في تنمية علامتك التجارية
			</motion.p>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
			>
				<Button onClick={() => goToStep(1)} className="text-lg px-8 py-4">
					ابدأ التقديم
				</Button>
			</motion.div>
		</motion.div>
	);

	return (
		<div className="min-h-screen flex flex-col">
			{/* Barra de progreso */}
			{currentStep > 0 && (
				<div className="progress-container">
					<motion.div
						className="progress-bar"
						style={{ width: `${progress}%` }}
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
					/>
				</div>
			)}

			<div className="typeform-container">
				<AnimatePresence mode="wait">
					{currentStep === 0 ? (
						renderWelcomeScreen()
					) : isSubmitted ? (
						<StepSuccess key="success" />
					) : (
						<StepQuestion
							key={`question-${currentStep}`}
							question={questions[currentStep - 1]}
							currentStep={currentStep - 1}
							totalQuestions={questions.length}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}