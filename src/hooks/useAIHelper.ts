import { useState, useCallback, useEffect } from "react";
import { CONFIG } from "../utils/constants/config";
import { callOpenAI } from "../utils/callOpenAI";

export function useAIHelper(t: any) {
  const [apiKey, setApiKey] = useState("");
  const [keyModal, setKeyModal] = useState(false);
  const [aiModal, setAiModal] = useState({ open: false, field: "", text: "" });
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
      setAiModal({ open: true, field, text: "" });

      try {
        const result = await callOpenAI(field, apiKey);
        setAiModal((prev) => ({
          ...prev,
          text: result.ok ? result.text : t.errorAI,
        }));
      } catch (err) {
        console.error("AI Error:", err);
        setAiModal((prev) => ({ ...prev, text: t.errorAI }));
      } finally {
        setAiLoading(false);
      }
    },
    [apiKey, t.errorAI]
  );

  const saveKey = useCallback(() => {
    if (typeof window !== "undefined")
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
