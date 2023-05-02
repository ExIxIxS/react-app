import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CardForm from './card-form';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import appStore from '../../appStore/reduxStore';

const mockCreateObjectURL = vi.fn();
global.URL.createObjectURL = mockCreateObjectURL;

describe('CardForm component', () => {
  const testCallBack = vi.fn();

  const { getByTestId } = render(
    <Provider store={appStore}>
      <CardForm addCardCallBack={testCallBack} />
    </Provider>
  );
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
    const testFile = new File(['testFile'], 'test.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.change(surnameInput, { target: { value: 'Doe' } });
      fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
      fireEvent.change(countrySelect, { target: { value: 'usa' } });
      fireEvent.click(maleRadio);
      fireEvent.click(notificationsCheckbox);
      await user.upload(pictureInput, testFile);
      fireEvent.click(submitButton);
    });

    expect(testCallBack).toHaveBeenCalledTimes(1);
  });

  it('should not submit the form when there are errors', async () => {
    act(() => {
      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.click(submitButton);
    });

    expect(testCallBack).toHaveBeenCalledTimes(0);
  });
});
