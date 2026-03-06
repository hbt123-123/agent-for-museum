import { describe, it, expect } from '@jest/globals';

describe('Sample Tests', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should pass string test', () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
  });

  it('should pass array test', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });
});
