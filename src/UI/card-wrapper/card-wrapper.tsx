import React from 'react';
import Card from '../card/card';
import './card-wrapper.scss';

import { CardWrapperProps } from '../../interfaces';

const CardWrapper: React.FC<CardWrapperProps> = ({ cards }) => {
  return (
    <div className="card-wrapper">
      {cards.map((cardData) => (
        <Card key={cardData.name + Math.round(Math.random() * 100000000)} {...cardData} />
      ))}
    </div>
  );
};

export default CardWrapper;
