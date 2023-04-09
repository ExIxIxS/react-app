import { render, screen } from '@testing-library/react';
import RestAuthorCard from './rest-author-card';

import { CardAuthorProps } from 'interfaces';

describe('RestAuthorCard', () => {
  const props: CardAuthorProps = {
    picture: '',
    name: 'string',
    dateOfBirth: 'string',
    autorType: 'string',
    wikiLink: 'string',
    bio: 'string',
    clickHandler: () => {
      return;
    },
  };

  const { container, unmount } = render(<RestAuthorCard {...props} />);

  beforeEach(() => {
    render(<RestAuthorCard {...props} />);
  });

  afterEach(() => {
    unmount();
  });

  it('mounts in the document', () => {
    expect(container).toBeInTheDocument();
  });

  it('should be default image path', () => {
    const imgElement = screen.getByTestId('rest-author-card__image') as HTMLImageElement;
    expect(imgElement.src).toContain('src/assets/img/react.png');
  });
});
