import { vi } from 'vitest';
import { AuthorCardData } from 'interfaces';
import { getAuthorCardProps } from './rest-functions';

describe('getAuthorCardProps function', () => {
  const clickHandler = vi.fn();
  const author: AuthorCardData = {
    photos: [400, 600],
    personal_name: 'Haruki Murakami',
    birth_date: 'January 12, 1949',
    entity_type: 'person',
    wikipedia: 'https://en.wikipedia.org/wiki/Haruki_Murakami',
    bio: {
      type: 'html',
      value: 'Good man',
    },
  };
  beforeEach(() => {
    clickHandler.mockClear();
  });

  it('there is no bio', () => {
    const testAuthor = { ...author };
    testAuthor.bio = {
      type: 'text',
      value: '',
    };
    expect(getAuthorCardProps(testAuthor, clickHandler).bio).toEqual('unknown');
  });

  it('there is no photos', () => {
    const testAuthor = { ...author };
    testAuthor.photos = [0, 0];
    expect(getAuthorCardProps(testAuthor, clickHandler).picture).toEqual('');
  });

  it('there is no date of Birth', () => {
    const testAuthor = { ...author };
    testAuthor.birth_date = undefined;
    expect(getAuthorCardProps(testAuthor, clickHandler).dateOfBirth).toEqual('unknown');
  });

  it('there is no wikiLink', () => {
    const testAuthor = { ...author };
    testAuthor.wikipedia = undefined;
    expect(getAuthorCardProps(testAuthor, clickHandler).wikiLink).toEqual(
      'https://wikipedia.org/wiki/' + testAuthor.personal_name
    );
  });

  it('there is a bio as obj', () => {
    const testAuthor = { ...author };
    expect(getAuthorCardProps(testAuthor, clickHandler).bio).toEqual('Good man');
  });

  it('there is a clickHandler', () => {
    const testAuthor = { ...author };
    const cardData = getAuthorCardProps(testAuthor, clickHandler);
    expect(cardData.clickHandler).toBeDefined();
    cardData.clickHandler();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
