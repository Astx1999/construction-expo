import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import merge from 'lodash/merge';

import enTranslation from './locales/en/en.json';
import amTranslation from './locales/am/am.json';
import ruOverrides from './locales/ru/ru.json';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            am: {
                translation: amTranslation,
            },
            ru: {
                translation: merge({}, enTranslation, ruOverrides),
            },
        },
        supportedLngs: ['en', 'ru', 'am'],
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
    });

export default i18n;
