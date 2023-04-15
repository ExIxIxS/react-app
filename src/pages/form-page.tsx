import { useState } from 'react';
import CardWrapper from '../UI/card-wrapper/card-wrapper';
import CardForm from '../UI/card-form/card-form';
import { CardData } from '../interfaces';
import { getNewCard } from '../assets/functions/handlers/event-handler-functions';

function FormPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  function addNewCard(cardObj: CardData): void {
    const newCard = getNewCard(cardObj);
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
