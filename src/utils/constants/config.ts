import { FormData } from '../../types/form';
export const CONFIG = {
  STORAGE_KEYS: {
    FORM: "form_v1",
    API_KEY: "api_key_v1",
    LANG: "lang_v1",
  },
  OPENAI: {
    URL: "https://api.openai.com/v1/chat/completions",
    MODEL: "gpt-3.5-turbo",
    TIMEOUT: 30000,
  },
  STEPS: 3,
} as const;

export const initialForm: FormData = {
    name: '',
    nationalId: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    maritalStatus: '',
    dependents: '',
    employmentStatus: '',
    monthlyIncome: '',
    housingStatus: '',
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
};