//import fetch from 'cross-fetch';
import { describe, it, expect } from 'vitest';

import { TestUserResponse } from 'interfaces';

describe('Test Server', () => {
  it('correct response', async () => {
    let result;
    try {
      const response = await fetch('https://openlibrary.org/search/authors.json');
      result = await response.json();
    } catch {
      throw new Error('error message');
    }

    expect((result as TestUserResponse).numFound).toBe(1);
  });
});
