import {
  CardAuthorProps,
  NotificationCallBack,
  SearchCallBack,
  SearchProgressCallBack,
} from 'interfaces';
import { getRestAuthorCardData, processCardData, processSearch } from '../rest/rest-functions';

function getKeyDownHandler<
  T extends SearchCallBack,
  U extends NotificationCallBack,
  X extends SearchProgressCallBack
>(keyType: string, searchCallBack: T, notificationCallBack: U, searchProgressCallBack: X) {
  return async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keyType) {
      searchProgressCallBack(true);
      await processSearch(
        (e.target as HTMLInputElement).value,
        searchCallBack,
        notificationCallBack
      );
      searchProgressCallBack(false);
    }
  };
}

function getCardClickHandler(
  cardShowStateSetter: React.Dispatch<React.SetStateAction<boolean>>,
  cardDataSetter: React.Dispatch<React.SetStateAction<CardAuthorProps>>,
  clickHandler: () => void
) {
  return async (e: React.MouseEvent) => {
    const authorId = (e.currentTarget as HTMLElement).id;
    const cardData = await getRestAuthorCardData(authorId);
    if (cardData) {
      cardDataSetter(processCardData(cardData, clickHandler));
      cardShowStateSetter(true);
      document.body.classList.add('overlay');
    }
  };
}

export { getKeyDownHandler, getCardClickHandler };
