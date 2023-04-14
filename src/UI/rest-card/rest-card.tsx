import { useState } from 'react';
import { createPortal } from 'react-dom';
import { getCardClickHandler } from '../../assets/functions/handlers/event-handler-functions';
import RestAuthorCard from '../../UI/rest-author-card/rest-author-card';
import { CardAuthorProps, RestCardProps } from '../../interfaces';

import './rest-card.scss';

function RestCard(props: RestCardProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [cardData, setCardData] = useState<CardAuthorProps>({
    picture: '',
    name: '',
    dateOfBirth: 'unknown',
    autorType: 'unknown',
    wikiLink: '',
    bio: 'unknown',
    clickHandler: () => null,
  });

  return (
    <>
      <div
        id={props.id}
        className="rest-card"
        data-testid="rest-card"
        onClick={() => setShowModal(true)}
        // onClick={getCardClickHandler(setShowModal, setCardData, () => setShowModal(false))}
      >
        <div className="rest-card__content">
          <div className="rest-card__info">
            <p>
              <strong>Name:</strong> {props.name}
            </p>
            <p>
              <strong>Date of birth:</strong> {props.birthDate}
            </p>
            <p>
              <strong>Top work:</strong> {props.topWork}
            </p>
            <p>
              <strong>Work counts:</strong> {props.workCount}
            </p>
          </div>
        </div>
      </div>
      {showModal && createPortal(<RestAuthorCard {...cardData} />, document.body)}
    </>
  );
}

export default RestCard;
