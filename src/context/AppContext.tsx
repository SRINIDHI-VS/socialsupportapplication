'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { CONFIG } from '../utils/constants/config';
import { TRANSLATIONS } from '../utils/constants/translations';

interface AppContextType {
    lang: 'en' | 'ar';
    t: typeof TRANSLATIONS['en'];
    isRTL: boolean;
    toggleLang: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const getInitialLang = (): 'en' | 'ar' => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.LANG);
            if (stored === 'ar' || stored === 'en') return stored;
        }
        return 'en';
    };

    const [lang, setLang] = useState<'en' | 'ar'>(getInitialLang);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CONFIG.STORAGE_KEYS.LANG, lang);
        }
    }, [lang]);

    const toggleLang = useCallback(() => {
        setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
    }, []);

    const t = TRANSLATIONS[lang];
    const isRTL = lang === 'ar';

    return (
        <AppContext.Provider value={{ lang, toggleLang, t, isRTL }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
};
