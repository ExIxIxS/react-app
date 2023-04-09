import { render, fireEvent } from '@testing-library/react';
import SearchBar from './search-bar';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

describe('SearchBar', () => {
  it('renders input field', () => {
    const responseCallBack = vi.fn();
    const notificationCallBack = vi.fn();
    const progressCallBack = vi.fn();
    const { getByRole } = render(
      <SearchBar
        responseCallBack={responseCallBack}
        notificationCallBack={notificationCallBack}
        progressCallBack={progressCallBack}
      />
    );
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('calls the response callback on Enter key press', async () => {
    const responseCallBack = vi.fn();
    const notificationCallBack = vi.fn();
    const progressCallBack = vi.fn();
    const { getByRole } = render(
      <SearchBar
        responseCallBack={responseCallBack}
        notificationCallBack={notificationCallBack}
        progressCallBack={progressCallBack}
      />
    );
    const input = getByRole('textbox');
    await act(() => fireEvent.keyDown(input, { key: 'Enter' }));

    expect(responseCallBack).toHaveBeenCalled();
  });

  it('updates the search query on input change', () => {
    const responseCallBack = vi.fn();
    const notificationCallBack = vi.fn();
    const progressCallBack = vi.fn();
    const { getByRole } = render(
      <SearchBar
        responseCallBack={responseCallBack}
        notificationCallBack={notificationCallBack}
        progressCallBack={progressCallBack}
      />
    );
    const input = getByRole('textbox');
    act(() => fireEvent.change(input, { target: { value: 'test' } }));
    expect(input).toHaveValue('test');
  });

  it('receive rest data on input change', async () => {
    const responseCallBack = vi.fn();
    const notificationCallBack = vi.fn();
    const progressCallBack = vi.fn();
    const { getByRole } = render(
      <SearchBar
        responseCallBack={responseCallBack}
        notificationCallBack={notificationCallBack}
        progressCallBack={progressCallBack}
      />
    );
    const input = getByRole('textbox');
    act(() => fireEvent.change(input, { target: { value: 'test' } }));
    await act(() => fireEvent.keyDown(input, { key: 'Enter' }));
    expect(input).toHaveValue('test');
  });
});
