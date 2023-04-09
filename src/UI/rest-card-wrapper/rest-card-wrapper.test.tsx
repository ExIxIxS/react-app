import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestCardWrapper from './rest-card-wrapper';
import { RestAuthorData } from 'interfaces';

const testData: RestAuthorData[] = [
  {
    key: '1',
    text: ['Lorem ipsum', 'dolor sit amet'],
    type: 'author',
    name: 'John Smith',
    alternate_names: ['J. Smith', 'Smith J.'],
    birth_date: '1970-01-01',
    top_work: 'The Great Work',
    work_count: 10,
    top_subjects: ['History', 'Philosophy'],
    _version_: 1,
  },
  {
    key: '2',
    text: ['Consectetur adipiscing', 'elit'],
    type: 'author',
    name: 'Jane Doe',
    alternate_names: ['J. Doe', 'Doe J.'],
    birth_date: '1980-01-01',
    top_work: 'The Greatest Work',
    work_count: 20,
    top_subjects: ['Science', 'Math'],
    _version_: 2,
  },
  {
    key: '3',
    text: ['Sed do eiusmod', 'tempor incididunt'],
    type: 'author',
    name: 'Bob Johnson',
    alternate_names: ['B. Johnson', 'Johnson B.'],
    birth_date: '1990-01-01',
    top_work: 'The Best Work',
    work_count: 5,
    top_subjects: ['Literature', 'Art'],
    _version_: 3,
  },
];

describe('RestCardWrapper', () => {
  it('renders correct number of cards', () => {
    render(<RestCardWrapper restAuthorsData={testData} />);
    const renderedCards = screen.getAllByTestId('rest-card');
    expect(renderedCards.length).toBe(testData.length);
  });
});
