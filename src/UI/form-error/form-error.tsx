import { ErrorMessage } from '@hookform/error-message';
import { FormErrorProps } from 'interfaces';

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
