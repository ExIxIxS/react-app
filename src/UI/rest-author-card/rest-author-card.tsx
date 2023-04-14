import { useEffect, useState } from 'react';
import { useGetAuthorByIdQuery } from '../../services/openlibraryApi';
import { getAuthorCardProps } from '../../assets/functions/rest/rest-functions';
import { CardAuthorProps } from '../../interfaces';

import './rest-author-card.scss';

function RestAuthorCard({
  id,
  onCloseClick,
}: {
  id: string;
  onCloseClick: () => void;
}): JSX.Element {
  const { data, error, isLoading } = useGetAuthorByIdQuery(id);
  const [cardData, setCardData] = useState<CardAuthorProps>({
    picture: '',
    name: '',
    dateOfBirth: 'unknown',
    autorType: 'unknown',
    wikiLink: '',
    bio: 'unknown',
    clickHandler: () => null,
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      const cardProps = getAuthorCardProps({ ...data }, onCloseClick);
      setCardData(cardProps);
    }
  }, [isLoading, error, data]);

  return (
    <>
      {!error && !isLoading && (
        <>
          <div className="overlay-click-catcher" onClick={cardData.clickHandler}></div>
          <div className="rest-author-card" data-testid="rest-author-card">
            <button
              className="rest-author-card__close-button"
              onClick={cardData.clickHandler}
            ></button>
            <img
              className="rest-author-card__image"
              data-testid="rest-author-card__image"
              src={cardData.picture ? String(cardData.picture) : '../src/assets/img/react.png'}
              alt={`${cardData.name} profile picture`}
            />
            <div className="rest-author-card__content">
              <div className="rest-author-card__info">
                <p>
                  <strong>Name:</strong> {cardData.name}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {cardData.dateOfBirth}
                </p>
                <p>
                  <strong>Author type:</strong> {cardData.autorType}
                </p>
                <p>
                  <a href={cardData.wikiLink} target="_blank" rel="noreferrer">
                    wiki
                  </a>
                </p>
                <p>
                  <strong>Biography: </strong>
                  {cardData.bio}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RestAuthorCard;
