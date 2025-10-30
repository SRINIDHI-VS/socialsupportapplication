import React from 'react';
import TextArea from '../form/TextArea';
import { useApp } from '../../context/AppContext';
import { FormData } from '../../types/form';

interface StepProps {
  form: FormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHelp: (field: string) => void;
}

const Step3: React.FC<StepProps> = ({ form, errors, onChange, onHelp }) => {
  const { t } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t.step3}</h2>

      <TextArea
        label={t.financial}
        name="financialSituation"
        value={form.financialSituation}
        onChange={onChange}
        onHelp={onHelp}
        error={errors.financialSituation}
      />

      <TextArea
        label={t.employmentCirc}
        name="employmentCircumstances"
        value={form.employmentCircumstances}
        onChange={onChange}
        onHelp={onHelp}
        error={errors.employmentCircumstances}
      />

      <TextArea
        label={t.reason}
        name="reasonForApplying"
        value={form.reasonForApplying}
        onChange={onChange}
        onHelp={onHelp}
        error={errors.reasonForApplying}
      />
    </div>
  );
};

export default Step3;
