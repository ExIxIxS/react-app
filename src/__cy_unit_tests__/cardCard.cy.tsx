import React from 'react';
import Card from '../UI/card/card';

describe('<Card />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Card />);
  });
});
