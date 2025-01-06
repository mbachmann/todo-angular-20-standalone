import { parseIsoDateStrToDate } from './utils';

describe('parseIsoDateStrToDate', () => {
  it('should return a Date object when given a valid ISO date string with milliseconds', () => {
    const isoDateString = '2023-12-01T10:15:30.123Z';
    const result = parseIsoDateStrToDate(isoDateString);
    expect(result instanceof Date).toBeTrue();
    expect(result.toISOString()).toBe(isoDateString);
  });

  it('should return a Date object when given a valid ISO date string without milliseconds', () => {
    const isoDateString = '2023-12-01T10:15:30Z';
    const result = parseIsoDateStrToDate(isoDateString);
    expect(result instanceof Date).toBeTrue();
    expect(result.toISOString()).toBe('2023-12-01T10:15:30.000Z');
  });

  it('should return a Date object when given a valid ISO date string with timezone offset', () => {
    const isoDateString = '2023-12-01T10:15:30+02:00';
    const result = parseIsoDateStrToDate(isoDateString);
    expect(result instanceof Date).toBeTrue();
    expect(result.toISOString()).toBe('2023-12-01T08:15:30.000Z');
  });

  it('should return the original value when given a non-string input', () => {
    const nonStringInput = 12345;
    const result = parseIsoDateStrToDate(nonStringInput);
    expect(result).toBe(nonStringInput);
  });

  it('should return the original value when given an invalid ISO date string', () => {
    const invalidIsoDateString = 'invalid-date';
    const result = parseIsoDateStrToDate(invalidIsoDateString);
    expect(result).toBe(invalidIsoDateString);
  });

  it('should return the original value when given an empty string', () => {
    const emptyString = '';
    const result = parseIsoDateStrToDate(emptyString);
    expect(result).toBe(emptyString);
  });

  it('should handle edge cases for valid ISO formats', () => {
    const isoDateString = '2023-12-31T23:59:59Z';
    const result = parseIsoDateStrToDate(isoDateString);
    expect(result instanceof Date).toBeTrue();
    expect(result.toISOString()).toBe('2023-12-31T23:59:59.000Z');
  });
});
