import { render, fireEvent, ByRoleMatcher, ByRoleOptions, waitFor } from '@testing-library/react';
import SearchBar from './search-bar';
import { Mock, beforeEach, vi } from 'vitest';
import { act } from 'react-dom/test-utils';

describe('SearchBar', () => {
  let getByRole: (role: ByRoleMatcher, options?: ByRoleOptions | undefined) => HTMLElement;
  let unmount: () => void;
  let searchQuerySetter: Mock<string[], string>;
  const searchQuery = 'Query text';

  beforeEach(() => {
    const searchQuerySetter = vi.fn();
    const renderObj = render(
      <SearchBar searchQuery={searchQuery} updateSearchQuery={searchQuerySetter} />
    );

    getByRole = renderObj.getByRole;
    unmount = renderObj.unmount;
  });

  afterEach(() => {
    unmount();
  });

  it('renders input field', () => {
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('updates the input onChange', () => {
    const input = getByRole('textbox');
    act(() => fireEvent.change(input, { target: { value: 'test' } }));
    expect(input).toHaveValue('test');
  });

  it('calls the response callback on Enter key press', async () => {
    const input = getByRole('textbox');
    await act(() => fireEvent.keyDown(input, { key: 'Enter' }));
    waitFor(() => {
      expect(searchQuerySetter).toHaveBeenCalled();
    });
  });
});
