import { FormData } from "../types/form";

export const validate = (
  data: FormData,
  step: number,
  t: any
): Record<string, string> => {
  const errors: Record<string, string> = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\+?[\d\s\-()]{10,}$/;

  if (step === 1) {
    if (!data.name?.trim()) errors.name = t.required;
    if (!data.nationalId?.trim()) errors.nationalId = t.required;
    if (!data.dob) errors.dob = t.required;
    if (!data.gender) errors.gender = t.required;
    if (!data.address?.trim()) errors.address = t.required;
    if (!data.city?.trim()) errors.city = t.required;
    if (!data.state?.trim()) errors.state = t.required;
    if (!data.country?.trim()) errors.country = t.required;
    if (!data.phone?.trim()) errors.phone = t.required;
    else if (!phoneRe.test(data.phone)) errors.phone = t.invalidPhone;
    if (!data.email?.trim()) errors.email = t.required;
    else if (!emailRe.test(data.email)) errors.email = t.invalidEmail;
  }

  if (step === 2) {
    if (!data.maritalStatus) errors.maritalStatus = t.required;
    if (!data.dependents) errors.dependents = t.required;
    if (!data.employmentStatus) errors.employmentStatus = t.required;
    if (!data.monthlyIncome) errors.monthlyIncome = t.required;
    if (!data.housingStatus) errors.housingStatus = t.required;
  }

  if (step === 3) {
    if (!data.financialSituation?.trim())
      errors.financialSituation = t.required;
    if (!data.employmentCircumstances?.trim())
      errors.employmentCircumstances = t.required;
    if (!data.reasonForApplying?.trim()) errors.reasonForApplying = t.required;
  }

  return errors;
};
