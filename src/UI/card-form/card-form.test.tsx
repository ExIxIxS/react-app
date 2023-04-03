import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CardForm from './card-form';

const mockCreateObjectURL = vi.fn();
global.URL.createObjectURL = mockCreateObjectURL;

describe('CardForm component', () => {
  const testCallBack = vi.fn();

  const { getByTestId } = render(<CardForm addCardCallBack={testCallBack} />);
  const nameInput = getByTestId('name-input');
  const surnameInput = getByTestId('surname-input');
  const dobInput = getByTestId('dob-input');
  const countrySelect = getByTestId('country-select');
  const maleRadio = getByTestId('male-radio');
  const notificationsCheckbox = getByTestId('notifications-checkbox');
  const pictureInput = getByTestId('picture-upload') as HTMLInputElement;
  const submitButton = getByTestId('submit-button');

  beforeEach(() => {
    testCallBack.mockClear();
  });

  it('should submit the form with the correct data', async () => {
    const user = userEvent.setup();
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
    fireEvent.change(countrySelect, { target: { value: 'usa' } });
    fireEvent.click(maleRadio);
    fireEvent.click(notificationsCheckbox);
    const testFile = new File(['testFile'], 'test.png', { type: 'image/png' });
    await user.upload(pictureInput, testFile);

    await new Promise((resolve) => setTimeout(resolve, 0));

    act(() => {
      fireEvent.click(submitButton);
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(testCallBack).toHaveBeenCalledTimes(1);
  });

  it('should not submit the form when there are errors', async () => {
    fireEvent.change(nameInput, { target: { value: 'John' } });

    act(() => {
      fireEvent.click(submitButton);
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(testCallBack).toHaveBeenCalledTimes(0);
  });
});
