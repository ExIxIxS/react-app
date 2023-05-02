import { AuthorCardData, CardAuthorProps, RestAuthor } from 'interfaces';

function getSerializedAuthorCardData(data: RestAuthor): AuthorCardData {
  return {
    photos: data.photos,
    personal_name: data.personal_name,
    birth_date: data.birth_date,
    entity_type: data.entity_type,
    wikipedia: data.wikipedia,
    bio: data.bio,
  };
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

export { getAuthorCardProps, getSerializedAuthorCardData };
