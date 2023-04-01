import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface FormErrorProps {
  errors: FieldErrors<FieldValues>;
  name: string;
}

function FormError({ errors, name }: FormErrorProps) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <span className="form__error">{message}</span>}
    />
  );
}

export default FormError;
