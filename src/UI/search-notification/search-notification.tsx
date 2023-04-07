import { NotificationProps } from 'interfaces';

import './search-notification.scss';

function SearchNotification(props: NotificationProps): JSX.Element {
  return (
    <div className="notification-bar">
      <p className="notification-bar__message">{props.notification}</p>
    </div>
  );
}

export default SearchNotification;
