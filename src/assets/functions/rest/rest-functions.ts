import {
  AuthorCardData,
  CardAuthorProps,
  RestAuthor,
  RestAuthorData,
  RestSearchData,
  SearchCallBack,
} from 'interfaces';

const baseUrl = 'https://openlibrary.org'; // API root url

async function getRestSearch(query: string): Promise<RestAuthorData[] | void> {
  const baseSearcUrl = baseUrl + '/search/authors.json?q=';
  const searcUrl = query ? baseSearcUrl + query : baseSearcUrl + 'react';

  try {
    const response = await fetch(searcUrl);
    const searchResult = (await response.json()) as RestSearchData;
    return searchResult.docs;
  } catch {
    throw new Error('Unable to fetch data');
  }
}

async function getRestAuthor(authorId: string): Promise<RestAuthor | void> {
  const authorUrl = baseUrl + '/authors/' + authorId + '.json';

  try {
    const response = await fetch(authorUrl);
    return (await response.json()) as RestAuthor;
  } catch {
    throw new Error('Unable to fetch data');
  }
}

async function getRestAuthorCardData(authorId: string): Promise<AuthorCardData | void> {
  try {
    const data = await getRestAuthor(authorId);
    if (data) {
      return {
        photos: data.photos,
        personal_name: data.personal_name,
        birth_date: data.birth_date,
        entity_type: data.entity_type,
        wikipedia: data.wikipedia,
        bio: data.bio,
      };
    }
  } catch {
    throw new Error('Unable to process data');
  }
}

async function processSearch(searchQuery: string, responseCallBack: SearchCallBack) {
  try {
    const data = await getRestSearch(searchQuery);
    if (data) {
      responseCallBack(data);
    }
  } catch {
    throw new Error('Unable to process data');
  }
}

function processCardData(cardData: AuthorCardData, clickHandler: () => void): CardAuthorProps {
  return {
    picture: +cardData.photos?.[0]
      ? `http://covers.openlibrary.org/b/id/${cardData.photos[0]}-M.jpg`
      : '',
    name: cardData.personal_name,
    dateOfBirth: cardData.birth_date ?? 'unknown',
    autorType: cardData.entity_type ?? 'unknown',
    wikiLink: cardData.wikipedia ?? 'https://wikipedia.org/wiki/' + cardData.personal_name,
    bio:
      typeof cardData.bio === 'string'
        ? cardData.bio
        : cardData.bio?.value
        ? cardData.bio?.value
        : 'unknown',
    clickHandler: clickHandler
      ? () => {
          clickHandler();
          document.body.classList.remove('overlay');
        }
      : () => {
          throw new ErrorEvent('wrong event handling');
        },
  };
}

export { getRestSearch, processSearch, getRestAuthorCardData, processCardData };
