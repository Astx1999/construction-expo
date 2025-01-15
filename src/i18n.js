import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/en.json';
import amTranslation from './locales/am/am.json';


i18n
    .use(initReactI18next)
    .use(LanguageDetector) // Use the language detector plugin
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            am: {
                translation: amTranslation,
            },
        },
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false, // Not needed for React
        },
    });

export default i18n;
