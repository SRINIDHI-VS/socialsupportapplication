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

const Step1: React.FC<StepProps> = ({ form, errors, onChange }) => {
  const { t } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t.step1}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Input label={t.name} name="name" value={form.name} onChange={onChange} error={errors.name} />
        <Input
          label={t.nationalId}
          name="nationalId"
          value={form.nationalId}
          onChange={onChange}
          error={errors.nationalId}
        />
        <Input label={t.dob} name="dob" type="date" value={form.dob} onChange={onChange} error={errors.dob} />
        <Select
          label={t.gender}
          name="gender"
          value={form.gender}
          onChange={onChange}
          error={errors.gender}
          options={[
            { value: 'male', label: t.male },
            { value: 'female', label: t.female },
            { value: 'other', label: t.other },
          ]}
        />
      </div>

      <Input label={t.address} name="address" value={form.address} onChange={onChange} error={errors.address} />

      <div className="grid md:grid-cols-3 gap-4">
        <Input label={t.city} name="city" value={form.city} onChange={onChange} error={errors.city} />
        <Input label={t.state} name="state" value={form.state} onChange={onChange} error={errors.state} />
        <Input label={t.country} name="country" value={form.country} onChange={onChange} error={errors.country} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input label={t.phone} name="phone" value={form.phone} onChange={onChange} error={errors.phone} />
        <Input
          label={t.email}
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          error={errors.email}
        />
      </div>
    </div>
  );
};

export default Step1;
