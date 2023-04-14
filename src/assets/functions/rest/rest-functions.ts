import {
  AuthorCardData,
  CardAuthorProps,
  NotificationCallBack,
  RestAuthor,
  RestAuthorData,
  RestSearchData,
  SearchCallBack,
} from 'interfaces';

const baseUrl = 'https://openlibrary.org'; // API root url

async function getRestSearch(query: string): Promise<RestAuthorData[] | void> {
  const baseSearcUrl = baseUrl + '/search/authors.json?q=';
  const searcUrl = query ? baseSearcUrl + query : baseSearcUrl + 'king';

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
}

function serializeAuthorCardData(data: RestAuthor): AuthorCardData {
  return {
    photos: data.photos,
    personal_name: data.personal_name,
    birth_date: data.birth_date,
    entity_type: data.entity_type,
    wikipedia: data.wikipedia,
    bio: data.bio,
  };
}

async function processSearch(
  searchQuery: string,
  responseCallBack: SearchCallBack,
  notificationCallBack: NotificationCallBack
) {
  try {
    notificationCallBack('');
    const data = await getRestSearch(searchQuery);
    if (data) {
      responseCallBack(data);
    }
    if (!data?.length) {
      notificationCallBack('nothing found');
    }
  } catch {
    const errorMessage = 'Unable to process data';
    notificationCallBack(errorMessage);
    throw new Error(errorMessage);
  }
}

function getAuthorCardProps(cardData: AuthorCardData, clickHandler: () => void): CardAuthorProps {
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
    clickHandler: () => {
      clickHandler();
      document.body.classList.remove('overlay');
    },
  };
}

export {
  getRestSearch,
  processSearch,
  getRestAuthorCardData,
  getAuthorCardProps,
  getRestAuthor,
  serializeAuthorCardData,
};
