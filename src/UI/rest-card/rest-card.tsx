import { useState } from 'react';
import { createPortal } from 'react-dom';
import RestAuthorCard from '../../UI/rest-author-card/rest-author-card';
import { RestCardProps } from '../../interfaces';

import './rest-card.scss';

function RestCard(props: RestCardProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        id={props.id}
        className="rest-card"
        data-testid="rest-card"
        onClick={() => setShowModal(true)}
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
      {showModal &&
        createPortal(
          <RestAuthorCard id={props.id} onCloseClick={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}

export default RestCard;
