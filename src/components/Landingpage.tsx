'use client';
import React, { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Save, Globe, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONFIG, initialForm } from '../utils/constants/config';
import { validate } from '../utils/validate';
import Modal from '../components/common/Modal';
import Step1 from '../components/steps/Step1';
import Step2 from '../components/steps/Step2';
import Step3 from '../components/steps/Step3';
import { useFormPersistence } from '../hooks/useFormPersistence';
import { useAIHelper } from '../hooks/useAIHelper';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage: React.FC = () => {
    const { t, isRTL } = useApp();
    const [step, setStep] = useState(1);
    const { form, setForm, saved, clearForm } = useFormPersistence(initialForm);
    const {
        apiKey,
        setApiKey,
        keyModal,
        setKeyModal,
        aiModal,
        setAiModal,
        aiLoading,
        handleAI,
        saveKey,
    } = useAIHelper(t);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
        },
        [setForm, errors]
    );

    const handleNext = useCallback(() => {
        const errs = validate(form, step, t);
        setErrors(errs);
        if (Object.keys(errs).length === 0) setStep((s) => s + 1);
    }, [form, step, t]);

    const handlePrev = useCallback(() => setStep((s) => s - 1), []);

    const handleSubmit = useCallback(() => {
        const errs = validate(form, step, t);
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            console.log('Submitted:', form);
            alert(t.successSubmit);
            clearForm();
            setStep(1);
        }
    }, [form, step, t, clearForm]);

    const progress = Math.round((step / CONFIG.STEPS) * 100);

    return (
        <div
            className={`min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 bg-[length:400%_400%] animate-gradient-move py-6 px-4 ${isRTL ? 'rtl' : 'ltr'
                }`}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="mb-6">
                    <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>
                            {t.step} {step} {t.of} {CONFIG.STEPS}
                        </span>
                        {saved && (
                            <span className="flex items-center gap-1 text-green-600">
                                <Save size={14} /> {t.saved}
                            </span>
                        )}
                    </div>
                    <div className="mb-6">
                        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-[#021936] h-4 rounded-full transition-[width] duration-500 ease-in-out"
                                style={{ width: `${progress}%` }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                                {progress}%
                            </span>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="w-full"
                    >
                        {step === 1 && <Step1 form={form} errors={errors} onChange={handleChange} />}
                        {step === 2 && <Step2 form={form} errors={errors} onChange={handleChange} />}
                        {step === 3 && <Step3 form={form} errors={errors} onChange={handleChange} onHelp={handleAI} />}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={step === 1}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        <ChevronLeft size={20} /> {t.previous}
                    </button>

                    {step < CONFIG.STEPS ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center px-8 bg-[#021936] text-white rounded-lg hover:bg-[#03204a] transition-all duration-200 active:scale-95"
                        >
                            {t.next} <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center px-5 bg-[#021936] text-white rounded-lg hover:bg-[#03204a] transition-all duration-200 active:scale-95"
                        >
                            <Check size={20} /> {t.submit}
                        </button>
                    )}
                </div>
            </div>

            <Modal
                open={aiModal.open}
                onClose={() => setAiModal({ open: false, field: '', text: '' })}
                title={t.aiSuggestion}
            >
                {aiLoading ? (
                    <div className="flex flex-col items-center py-10 text-gray-600">
                        <Loader2 className="animate-spin mb-3" size={28} />
                        <p>{t.generating}</p>
                    </div>
                ) : (
                    <>
                        <textarea
                            value={aiModal.text}
                            onChange={(e) => setAiModal((p) => ({ ...p, text: e.target.value }))}
                            rows={6}
                            className="w-full px-3 py-2 border rounded-lg mb-4"
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setAiModal({ open: false, field: '', text: '' })}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                {t.discard}
                            </button>
                            <button
                                onClick={() => {
                                    setForm((prev) => ({ ...prev, [aiModal.field]: aiModal.text }));
                                    setAiModal({ open: false, field: '', text: '' });
                                }}
                                className="px-4 py-2 bg-[#021936] text-white rounded-lg hover:bg-[#03204a]"
                            >
                                {t.accept}
                            </button>
                        </div>
                    </>
                )}
            </Modal>

            <Modal open={keyModal} onClose={() => setKeyModal(false)} title={t.apiKey}>
                <p className="text-gray-600 mb-4">{t.apiKeyMsg}</p>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 border rounded-lg mb-4"
                />
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setKeyModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        {t.cancel}
                    </button>
                    <button
                        onClick={saveKey}
                        className="px-4 py-2 bg-[#021936] text-white rounded-lg hover:bg-[#03204a]"
                    >
                        {t.save}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default LandingPage;
