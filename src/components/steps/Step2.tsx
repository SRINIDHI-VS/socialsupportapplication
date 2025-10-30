import React from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import { useApp } from '../../context/AppContext';
import { FormData } from '../../types/form';

interface StepProps {
  form: FormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step2: React.FC<StepProps> = ({ form, errors, onChange }) => {
  const { t } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t.step2}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Select
          label={t.marital}
          name="maritalStatus"
          value={form.maritalStatus}
          onChange={onChange}
          error={errors.maritalStatus}
          options={[
            { value: 'single', label: t.single },
            { value: 'married', label: t.married },
            { value: 'divorced', label: t.divorced },
            { value: 'widowed', label: t.widowed },
          ]}
        />

        <Input
          label={t.dependents}
          name="dependents"
          type="number"
          value={form.dependents}
          onChange={onChange}
          error={errors.dependents}
        />

        <Select
          label={t.employment}
          name="employmentStatus"
          value={form.employmentStatus}
          onChange={onChange}
          error={errors.employmentStatus}
          options={[
            { value: 'employed', label: t.employed },
            { value: 'unemployed', label: t.unemployed },
            { value: 'self-employed', label: t.selfEmployed },
            { value: 'retired', label: t.retired },
          ]}
        />

        <Input
          label={t.income}
          name="monthlyIncome"
          type="number"
          value={form.monthlyIncome}
          onChange={onChange}
          error={errors.monthlyIncome}
        />

        <Select
          label={t.housing}
          name="housingStatus"
          value={form.housingStatus}
          onChange={onChange}
          error={errors.housingStatus}
          options={[
            { value: 'owned', label: t.owned },
            { value: 'rented', label: t.rented },
            { value: 'homeless', label: t.homeless },
          ]}
        />
      </div>
    </div>
  );
};

export default Step2;
