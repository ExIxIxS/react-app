import { render } from '@testing-library/react';
import FormError from './form-error';

describe('FormError', () => {
  const props = {
    errors: { exampleField: { message: 'This field is required' } },
    name: 'exampleField',
  };

  it('renders error message', () => {
    const { getByText } = render(<FormError {...props} />);
    expect(getByText(props.errors.exampleField.message)).toBeInTheDocument();
  });

  it('does not render without errors', () => {
    const { queryByText } = render(<FormError {...props} errors={{}} />);
    expect(queryByText(props.errors.exampleField.message)).toBeNull();
  });
});
