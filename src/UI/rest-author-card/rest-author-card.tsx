import { CardAuthorProps } from '../../interfaces';

import './rest-author-card.scss';

function RestAuthorCard(cardData: CardAuthorProps): JSX.Element {
  return (
    <>
      <div className="overlay-click-catcher" onClick={cardData.clickHandler}></div>
      <div className="rest-author-card" data-testid="rest-author-card">
        <button className="rest-author-card__close-button" onClick={cardData.clickHandler}></button>
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
  );
}

export default RestAuthorCard;
