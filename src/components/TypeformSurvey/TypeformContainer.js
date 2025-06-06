'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormStore } from '@/store/formStore';
import { StepQuestion } from './StepQuestion';
import { StepSuccess } from './StepSuccess';
import { Button } from '../ui/Button';

// Updated the questions array to match the user's requested order and content
const questions = [
	{
		id: 'brandName',
		question: 'اسم البراند؟',
		type: 'text',
		placeholder: 'Your store name',
		isRequired: true,
		errorMessage: 'يرجى إدخال اسم البراند',
	},
	{
		id: 'storeLink',
		question: 'رابط المتجر الإلكتروني؟',
		type: 'text',
		placeholder: 'Your website',
		isRequired: true,
		errorMessage: 'يرجى إدخال رابط صحيح',
	},
	{
		id: 'phoneNumber',
		question: 'رقم جوالك طال عمرك؟',
		type: 'text',
		placeholder: 'Your phone number',
		isRequired: true,
		errorMessage: 'يرجى إدخال رقم الجوال',
	},
	{
		id: 'monthlyRevenue',
		question: 'هل مبيعاتك الشهرية تتجاوز 5 الف ريال؟',
		type: 'radio',
		options: [
			{ label: 'نعم', value: 'yes' },
			{ label: 'لا', value: 'no' },
		],
		isRequired: true,
		errorMessage: 'يرجى اختيار إجابة',
	},
	{
		id: 'abayasCount',
		question: 'كم عدد العبايات في المتجر حاليًا؟',
		type: 'radio',
		options: [
			{ label: 'أقل من 10', value: 'less_than_10' },
			{ label: '10 إلى 20', value: '10_to_20' },
			{ label: '20 إلى 50', value: '20_to_50' },
			{ label: 'أكثر من 50', value: 'more_than_50' },
		],
		isRequired: true,
		errorMessage: 'يرجى اختيار عدد العبايات',
	},
	{
		id: 'marketingBudget',
		question: 'كم ميزانيتك الشهرية للتسويق؟',
		type: 'text',
		placeholder: 'Advertising monthly budget',
		isRequired: true,
		errorMessage: 'يرجى إدخال الميزانية الشهرية',
	},
	{
		id: 'agencyExperience',
		question: 'هل سبق لك التعامل مع وكالة تسويق؟ إذا نعم، اوصف لنا تجربتك بإيجاز',
		type: 'textarea',
		placeholder: 'Have you worked with a marketing agency before? If yes, briefly describe your experience',
		isRequired: true,
		errorMessage: 'يرجى الإجابة على هذا السؤال',
	},
	{
		id: 'startDate',
		question: 'إذا تم قبولك، متى أقرب موعد تقدر تبدأ فيه؟',
		type: 'text',
		placeholder: 'If you\'re accepted, how soon can you get started?',
		isRequired: true,
		errorMessage: 'يرجى تحديد موعد البدء المتوقع',
	},
];

// Added functionality to separate the title and description from the form
export function TypeformContainer() {
	const { currentStep, totalSteps, isSubmitted, formData, goToStep } = useFormStore();
	const [showWelcome, setShowWelcome] = useState(true);
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
			className="welcome-screen text-center"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
		>
			<motion.h1
				className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				هل عندك براند عبايات؟
			</motion.h1>
			<motion.p
				className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
			>
				وتحسين إنه يستاهل يوصل لأكثر؟ خلينا نتولى المهمة وندبل مبيعاتك — بدون أي رسوم مقدماً.
			</motion.p>

			{/* Limited Registration Notice */}
			<motion.div
				className="mb-8"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5 }}
			>
				<span className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-medium transform hover:scale-105 transition-transform duration-200">
					التسجيل متاح لعدد محدود جدًا
				</span>
			</motion.div>

			<motion.div
				className="mt-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
			>
				<p className="text-lg font-medium text-gray-700 mb-4">إذا تحسين إنك جاهزة للتحدي، قدّمي الآن ✨</p>
				<Button onClick={() => setShowWelcome(false)} variant="primary" className="text-lg px-8 py-4">
					ابدأ التقديم
				</Button>
			</motion.div>
		</motion.div>
	);

	return (
		<div className="min-h-screen flex flex-col">
			{showWelcome ? (
				renderWelcomeScreen()
			) : (
				<div className="typeform-container">
					<AnimatePresence mode="wait">
						{currentStep === 0 ? (
							<StepQuestion
								key={`question-${currentStep}`}
								question={questions[currentStep]}
								currentStep={currentStep}
								totalQuestions={questions.length}
							/>
						) : isSubmitted ? (
							<StepSuccess key="success" />
						) : (
							<StepQuestion
								key={`question-${currentStep}`}
								question={questions[currentStep]}
								currentStep={currentStep}
								totalQuestions={questions.length}
							/>
						)}
					</AnimatePresence>
				</div>
			)}
		</div>
	);
}