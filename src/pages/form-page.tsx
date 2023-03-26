import React from 'react';
import CardWrapper from '../UI/card-wrapper/card-wrapper';
import CardForm from '../UI/card-form/card-form';
import { CardData } from '../interfaces';

interface FormPageProps {
  initialCards?: CardData[];
}

interface FormPageState {
  cards: CardData[];
}

class FormPage extends React.Component<FormPageProps, FormPageState> {
  constructor(props: FormPageProps) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  addNewCard = (cardObj?: CardData | undefined) => {
    const newCard = {
      name: cardObj?.name ?? 'User name',
      surname: cardObj?.surname ?? 'User surname',
      dateOfBirth: cardObj?.dateOfBirth ?? '-',
      country: cardObj?.country ?? '-',
      status: cardObj?.status ?? ['-'],
      gender: cardObj?.gender ?? 'male',
      notifications: cardObj?.notifications ?? true,
      picture: cardObj?.picture ?? '../src/assets/img/react.png',
    };

    this.setState({ cards: [...this.state.cards, newCard] });
  };

  render() {
    return (
      <div>
        <CardForm onSubmit={this.addNewCard} initialCards={[]} />
        <CardWrapper cards={this.state.cards || []} />
      </div>
    );
  }
}

export default FormPage;
