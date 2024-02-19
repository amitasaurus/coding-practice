import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { z } from 'zod';

/** Requirements
 * The form should contain the following elements:
 * Name field.
 * Email field.
 * Message field. Since the message can be long, a <textarea> will be more suitable.
 * Submit button: Contains the text "Send", Clicking on the submit button submits the form.
 */
const schema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  message: z.string().optional(),
});

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
type SchemaType = z.infer<typeof schema>;
type FlattenedErrors = z.inferFlattenedErrors<typeof schema>;

const defaultState = {
  name: undefined,
  email: undefined,
  message: undefined,
};
export default function Form({ ...props }: FormProps) {
  const [formData, setFormData] = useState<typeof defaultState>(defaultState);
  const [error, setError] = useState<FlattenedErrors>();

  function handleFormSubmit() {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const flattenedErrors = result.error.flatten();
      setError(flattenedErrors);
    } else {
      setError(undefined);
      // console.log(result.data);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <form
      {...props}
      className="p-4 border border-dashed border-slate-300 w-[500px]"
    >
      <Input
        title="Name"
        id="name"
        placeholder="John Doe"
        value={formData?.name}
        onChange={handleInputChange}
        error={error?.fieldErrors?.name?.[0]}
      />
      <Input
        title="email"
        id="email"
        placeholder="someone@example.com"
        type="email"
        className="mt-4"
        value={formData?.email}
        onChange={handleInputChange}
        error={error?.fieldErrors?.email?.[0]}
      />
      <Input
        title="Message"
        id="message"
        placeholder="Please enter your message"
        type="textarea"
        className="mt-4"
        value={formData?.message}
        onChange={handleInputChange}
      />
      <Button
        className="w-full mt-4 text-white bg-blue-600"
        type="button"
        onClick={handleFormSubmit}
      >
        Submit
      </Button>
    </form>
  );
}
