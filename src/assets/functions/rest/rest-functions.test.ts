import { vi } from 'vitest';
import { getRestAuthor, getRestSearch, processCardData, processSearch } from './rest-functions';
import { AuthorCardData } from 'interfaces';

describe('getRestSearch function', () => {
  it('returns search results when query is valid', async () => {
    const results = await getRestSearch('');
    expect(results).toBeDefined();
    expect(results?.length).toBeGreaterThan(0);
  });

  it('throws an error when unable to fetch data', async () => {
    await expect(getRestSearch('invalidQuery')).rejects.toThrow('Unable to fetch data');
  });
});

describe('getRestAuthor function', () => {
  it('returns when request is valid', async () => {
    const result = await getRestAuthor('OL146605A');
    expect(result).toBeDefined();
  });

  it('throws an error when unable to fetch data', async () => {
    await expect(getRestAuthor('invalid')).rejects.toThrow('Unable to fetch data');
  });
});

describe('processSearch function', () => {
  const responseCallBack = vi.fn();
  const notificationCallBack = vi.fn();

  beforeEach(() => {
    notificationCallBack.mockClear();
  });

  it('when result is empty', async () => {
    await processSearch('nothing', responseCallBack, notificationCallBack);
    expect(notificationCallBack).toHaveBeenCalledWith('nothing found');
  });

  it('when request invalid', async () => {
    await expect(
      processSearch('invalidQuery', responseCallBack, notificationCallBack)
    ).rejects.toThrow('Unable to process data');
    expect(notificationCallBack).toHaveBeenCalledWith('Unable to process data');
  });
});

describe('processCardData function', () => {
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
    expect(processCardData(testAuthor, clickHandler).bio).toEqual('unknown');
  });

  it('there is no photos', () => {
    const testAuthor = { ...author };
    testAuthor.photos = [0, 0];
    expect(processCardData(testAuthor, clickHandler).picture).toEqual('');
  });

  it('there is no date of Birth', () => {
    const testAuthor = { ...author };
    testAuthor.birth_date = undefined;
    expect(processCardData(testAuthor, clickHandler).dateOfBirth).toEqual('unknown');
  });

  it('there is no wikiLink', () => {
    const testAuthor = { ...author };
    testAuthor.wikipedia = undefined;
    expect(processCardData(testAuthor, clickHandler).wikiLink).toEqual(
      'https://wikipedia.org/wiki/' + testAuthor.personal_name
    );
  });

  it('there is a bio as obj', () => {
    const testAuthor = { ...author };
    expect(processCardData(testAuthor, clickHandler).bio).toEqual('Good man');
  });

  it('there is a clickHandler', () => {
    const testAuthor = { ...author };
    const cardData = processCardData(testAuthor, clickHandler);
    expect(cardData.clickHandler).toBeDefined();
    cardData.clickHandler();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
