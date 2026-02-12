import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from '@/features/projects/utils/formaters';

describe('formatCurrency', () => {
    it('should format a number as currency with 2 decimal places', () => {
        expect(formatCurrency('1234.56')).toBe('$1,234.56');
        expect(formatCurrency('100')).toBe('$100.00');
        expect(formatCurrency('0')).toBe('$0.00');
        expect(formatCurrency('1234567.8912')).toBe('$1,234,567.89');
    });

    it('should handle negative numbers', () => {
        expect(formatCurrency('-123.45')).toBe('-$123.45');
    });

    it('should return $0.00 for null or undefined input', () => {
        expect(formatCurrency(null)).toBe('$0.00');
        expect(formatCurrency(undefined)).toBe('$0.00');
    });
});

describe('formatDate', () => {
    it('should format a valid date string (UTC)', () => {
        expect(formatDate('2023-01-15T12:00:00Z')).toBe('Jan 15, 2023');
        expect(formatDate('2023-12-01T10:00:00Z')).toBe('Dec 1, 2023');
    });

    it('should return "No deadline" for null or undefined input', () => {
        expect(formatDate(null)).toBe('No deadline');
        expect(formatDate(undefined)).toBe('No deadline');
    });

    it('should return "Invalid Date" for invalid date strings', () => {
        expect(formatDate('invalid-date')).toBe('Invalid Date');
    });

    it('should handle Date objects (converted to ISO string, UTC)', () => {
        const date = new Date('2024-07-20T00:00:00Z');
        expect(formatDate(date.toISOString())).toBe('Jul 20, 2024');
    });
});
