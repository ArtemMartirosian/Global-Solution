import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uz from './uz.json'
import ru from './ru'
import en from './en'

i18n.use(initReactI18next).init({
    resources: { uz, ru, en },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {escapeValue: false},
    keySeparator: false,
    react: {
        useSuspense: true
    },
    defaultNS: ['translations']
})

export default i18n
