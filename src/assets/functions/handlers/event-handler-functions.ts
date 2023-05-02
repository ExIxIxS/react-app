import { CardData, SearchStateCallBack } from 'interfaces';

function getKeyDownHandler(keyType: string, searchStateCallBack: SearchStateCallBack) {
  return async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keyType) {
      const currentValue = (e.target as HTMLInputElement).value;
      searchStateCallBack(currentValue);
    }
  };
}

function getNewCard(cardObj?: CardData): CardData {
  return {
    name: cardObj?.name ?? 'User name',
    dateOfBirth: cardObj?.dateOfBirth ?? '-',
    country: cardObj?.country ?? '-',
    status: cardObj?.status ?? ['-'],
    gender: cardObj?.gender ?? 'male',
    notifications: cardObj?.notifications ?? true,
    picture: cardObj?.picture ?? '../src/assets/img/react.png',
  };
}

export { getKeyDownHandler, getNewCard };
