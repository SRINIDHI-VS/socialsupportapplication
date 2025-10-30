import { useState, useCallback, useEffect } from 'react';
import { CONFIG } from '../utils/constants/config';
import { callOpenAI } from '../utils/callOpenAI';

export function useAIHelper(t: any) {
  const [apiKey, setApiKey] = useState('');
  const [keyModal, setKeyModal] = useState(false);
  const [aiModal, setAiModal] = useState({ open: false, field: '', text: '' });
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedKey = localStorage.getItem(CONFIG.STORAGE_KEYS.API_KEY);
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleAI = useCallback(
    async (field: string) => {
      if (!apiKey) {
        setKeyModal(true);
        return;
      }
      setAiLoading(true);
      setAiModal({ open: true, field, text: '' });
      const result = await callOpenAI(field, apiKey);
      setAiLoading(false);
      setAiModal((prev) => ({
        ...prev,
        text: result.ok ? result.text : t.errorAI,
      }));
    },
    [apiKey, t]
  );

  const saveKey = useCallback(() => {
    if (typeof window !== 'undefined')
      localStorage.setItem(CONFIG.STORAGE_KEYS.API_KEY, apiKey);
    setKeyModal(false);
  }, [apiKey]);

  return {
    apiKey,
    setApiKey,
    keyModal,
    setKeyModal,
    aiModal,
    setAiModal,
    aiLoading,
    handleAI,
    saveKey,
  };
}
