import { ref } from 'vue';
import en from '@/languages/en';
import hu from '@/languages/hu';

const currentLocale = ref('en');
const messages = {
  en,
  hu
};

const t = (key: string): string => {
  return key.split('.').reduce((o, i) => (o as any)[i], messages[currentLocale.value]);
};

const changeLanguage = (language: string) => {
  currentLocale.value = language;
};

export { t, changeLanguage, currentLocale };