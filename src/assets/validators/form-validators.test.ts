import { dateValidator } from './form-validators';

describe('dateValidator', () => {
  it('should return error message when the date is in the future', () => {
    const result = dateValidator.validate('2050-01-01');
    expect(result).toBe('person must have already been born');
  });

  it('should return true when the date is in the past', () => {
    const result = dateValidator.validate('1990-01-01');
    expect(result).toBe(true);
  });
});
