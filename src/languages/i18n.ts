import { ref } from 'vue';
import en from '@/languages/en';
import hu from '@/languages/hu';

interface LanguageMessages {
  greeting: string;
  home: {
    myname: string;
    ima: string;
    desc: string;
    desc2: string;
  };
  footer: {
    english: string;
    hungarian: string;
  };
}

interface Messages {
  en: LanguageMessages;
  hu: LanguageMessages;
}

const currentLocale = ref<'en' | 'hu'>('en');

const messages: Messages = {
  en,
  hu
};

const t = (key: string): string => {
  return key.split('.').reduce((o, i) => (o as any)[i], messages[currentLocale.value] as any);
};

const changeLanguage = (language: 'en' | 'hu') => {
  currentLocale.value = language;
};

export { t, changeLanguage, currentLocale };
