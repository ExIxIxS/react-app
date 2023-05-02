import { render } from '@testing-library/react';
import AboutUsPage from './about-us-page';

describe('AboutUsPage', () => {
  it('renders the about us page heading', () => {
    const { getByRole } = render(<AboutUsPage />);
    const heading = getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('About us PAGE');
  });
});
