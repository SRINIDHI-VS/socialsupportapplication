import { useEffect, useState } from 'react';
import { CONFIG } from '../utils/constants/config';
import { FormData } from '../types/form';

export function useFormPersistence(initialForm: FormData) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedData = localStorage.getItem(CONFIG.STORAGE_KEYS.FORM);
      if (savedData) setForm(JSON.parse(savedData));
    } catch (err) {
      console.warn('⚠️ Failed to parse saved form data:', err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      localStorage.setItem(CONFIG.STORAGE_KEYS.FORM, JSON.stringify(form));
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1200);
      return () => clearTimeout(t);
    }, 400);
    return () => clearTimeout(timer);
  }, [form]);

  const clearForm = () => {
    if (typeof window !== 'undefined')
      localStorage.removeItem(CONFIG.STORAGE_KEYS.FORM);
    setForm(initialForm);
  };

  return { form, setForm, saved, clearForm };
}
