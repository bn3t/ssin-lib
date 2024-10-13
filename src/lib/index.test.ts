import { describe, it, expect } from 'vitest';
import { greet } from './index';

describe('greet function', () => {
  it('should return a greeting message', () => {
    const result = greet('John');
    expect(result).toBe('Hello, John!');
  });
});
