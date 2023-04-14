import { CardAuthorProps, SearchStateCallBack } from 'interfaces';
import { getRestAuthorCardData, getAuthorCardProps } from '../rest/rest-functions';

function getKeyDownHandler(keyType: string, searchStateCallBack: SearchStateCallBack) {
  return async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keyType) {
      const currentValue = (e.target as HTMLInputElement).value;
      searchStateCallBack(currentValue);
    }
  };
}

// onClick={getCardClickHandler(setShowModal, setCardData, () => setShowModal(false))}

function getCardClickHandler(
  cardShowStateSetter: React.Dispatch<React.SetStateAction<boolean>>,
  cardDataSetter: React.Dispatch<React.SetStateAction<CardAuthorProps>>,
  clickHandler: () => void
) {
  return async (e: React.MouseEvent) => {
    const authorId = (e.currentTarget as HTMLElement).id;
    const cardData = await getRestAuthorCardData(authorId);
    if (cardData) {
      cardDataSetter(getAuthorCardProps(cardData, clickHandler));
      cardShowStateSetter(true);
      document.body.classList.add('overlay');
    }
  };
}

export { getKeyDownHandler, getCardClickHandler };
