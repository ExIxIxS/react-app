import { CardAuthorProps, SearchCallBack } from 'interfaces';
import { getRestAuthorCardData, processCardData, processSearch } from '../rest/rest-functions';

function getKeyDownHandler<T extends SearchCallBack>(keyType: string, callBack: T) {
  return async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keyType) {
      await processSearch((e.target as HTMLInputElement).value, callBack);
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
