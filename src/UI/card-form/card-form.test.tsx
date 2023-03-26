import { render, screen, fireEvent } from '@testing-library/react';
import CardForm from './card-form';

describe('CardForm', () => {
  const onSubmit = () => {};

  it('should submit the form with the provided data', () => {
    render(<CardForm onSubmit={onSubmit} initialCards={[]} />);
    const nameInput = screen.getByLabelText('Name:') as HTMLInputElement;
    const surnameInput = screen.getByLabelText('Surname:') as HTMLInputElement;
    const dateOfBirthInput = screen.getByLabelText('Date of Birth:') as HTMLInputElement;
    const countryInput = screen.getByLabelText('Country:') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.change(dateOfBirthInput, { target: { value: '01/01/2000' } });
    fireEvent.change(countryInput, { target: { value: 'USA' } });
  });
});
