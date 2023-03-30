import { useState } from 'react';
import CardWrapper from '../UI/card-wrapper/card-wrapper';
import CardForm from '../UI/card-form/card-form';
import { CardData } from '../interfaces';

function FormPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  function addNewCard(cardObj?: CardData): void {
    const newCard = {
      name: cardObj?.name ?? 'User name',
      dateOfBirth: cardObj?.dateOfBirth ?? '-',
      country: cardObj?.country ?? '-',
      status: cardObj?.status ?? ['-'],
      gender: cardObj?.gender ?? 'male',
      notifications: cardObj?.notifications ?? true,
      picture: cardObj?.picture ?? '../src/assets/img/react.png',
    };

    setCards([...cards, newCard]);
  }

  return (
    <>
      <CardForm addCardCallBack={addNewCard} />
      <CardWrapper cards={cards} />
    </>
  );
}

export default FormPage;
