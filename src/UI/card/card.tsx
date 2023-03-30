import './card.scss';
import { CardProps } from '../../interfaces';

function Card({
  name = '',
  dateOfBirth = '',
  country = '',
  status = [],
  gender = '',
  notifications = false,
  picture = '',
}: CardProps): JSX.Element {
  return (
    <div className="card" data-testid="card">
      <img
        className="card__image"
        src={picture ? picture : '../src/assets/img/react.png'}
        alt={`${name} profile picture`}
      />
      <div className="card__content">
        <div className="card__info">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Date of Birth:</strong> {dateOfBirth}
          </p>
          <p>
            <strong>Country:</strong> {country}
          </p>
          <p>
            <strong>Status:</strong> {status.length ? status.join(', ') : ''}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
          <p>
            <strong>Notifications:</strong> {notifications ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
