import { z } from 'zod';
import Input from './Input';
import React from 'react';
import Button from './Button';

const schema = z.object({
  amount: z.number().positive({
    message: 'Please enter an amount',
  }),
  interest: z.number().positive({
    message: 'Please enter a rate of interest',
  }),
  term: z.number().positive({
    message: 'Please enter a term period',
  }),
});
type TSchema = z.infer<typeof schema>;
type TFlattenedErrors = z.inferFlattenedErrors<typeof schema>;
type TFormData = {
  amount: number;
  interest: number;
  term: number;
};
type TField = {
  component: string;
  title: string;
  id: string;
  type: string;
  placeholder: string;
};
const defaultFormData: TFormData = {
  amount: 0,
  interest: 0,
  term: 0,
};
const inputFields: TField[] = [
  {
    component: 'Input',
    title: 'Loan Amount',
    id: 'amount',
    type: 'number',
    placeholder: 'Loan amount (￥)',
  },
  {
    component: 'Input',
    title: 'Interest Rate',
    id: 'interest',
    type: 'number',
    placeholder: 'Annual interest rate (%) | APR',
  },
  {
    component: 'Input',
    title: 'Loan Term',
    id: 'term',
    type: 'number',
    placeholder: 'Loan term (in years)',
  },
];

export default function MortgageCalculator() {
  const [formData, updateFormData] = React.useState<TFormData>(defaultFormData);
  const [mortgage, setMortgage] = React.useState<number>(0);
  const [formErrors, setFormErrors] = React.useState<
    TFlattenedErrors | undefined
  >(undefined);
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    const updatedFormData = {
      ...formData,
      ...{
        [id]: Number(value),
      },
    };
    updateFormData(updatedFormData);
  }
  function handleSubmit() {
    setFormErrors(undefined);
    const result = schema.safeParse(formData);
    if (!result.success) {
      setFormErrors(result.error.flatten());
    }
    const { data } = result;
    setMortgage((data.amount * data.interest * data.term) / 100);
  }
  return (
    <div className="border border-dashed border-slate-300 w-[500px]">
      <div className="py-2 text-3xl font-semibold text-slate-800">
        {new Intl.NumberFormat('ja-JP', {
          style: 'currency',
          currency: 'JPY',
        }).format(mortgage)}
      </div>
      <form>
        {inputFields.map((field) => (
          <Input
            title={field.title}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            onChange={handleInputChange}
            key={field.id}
            error={formErrors?.fieldErrors?.[field.id]?.[0]}
          />
        ))}
        <Button
          className="w-full mt-4 text-white bg-blue-600"
          onClick={handleSubmit}
          type="button"
        >
          Calculate
        </Button>
      </form>
    </div>
  );
}
