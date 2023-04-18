import { RestSearchData } from 'interfaces';
import { expect } from 'vitest';
import { authorsQueryObj } from './libraryApi';

describe('queryObj', () => {
  it('should have a query function that returns a string', () => {
    const result = authorsQueryObj.query('Mark Twain');
    expect(result).to.be.a('string');
    expect(result).to.equal('search/authors.json?q=Mark%20Twain&limit=12');
  });

  it('should have a query function that returns a string with default query', () => {
    const result = authorsQueryObj.query('');
    expect(result).to.be.a('string');
    expect(result).to.equal('search/authors.json?q=King&limit=12');
  });

  it('should have a transformResponse function that returns an array of RestAuthorData', () => {
    const responseData: RestSearchData = {
      numFound: 1,
      start: 0,
      numFoundExact: true,
      docs: [
        {
          key: '/authors/OL1234567A',
          text: ['John Smith is a best-selling author known for his mystery novels.'],
          type: 'author',
          name: 'John Smith',
          alternate_names: ['Smith, John'],
          birth_date: '1970-01-01',
          top_work: 'The Case of the Missing Diamond',
          work_count: 10,
          top_subjects: ['Mystery', 'Detective fiction'],
          _version_: 12345678901234,
        },
      ],
    };
    const result = authorsQueryObj.transformResponse(responseData);
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(1);
    expect(result).to.deep.equal(responseData.docs);
  });
});
