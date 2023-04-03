import React from 'react';
import Card from '../card/card';
import './card-wrapper.scss';
import { CardWrapperProps } from '../../interfaces';

const MemoizedCard = React.memo(Card);

function CardWrapper({ cards }: CardWrapperProps): JSX.Element {
  return (
    <div className="card-wrapper">
      {cards.map((cardData) => (
        <MemoizedCard key={cardData.name + Math.round(Math.random() * 100000000)} {...cardData} />
      ))}
    </div>
  );
}

export default CardWrapper;
