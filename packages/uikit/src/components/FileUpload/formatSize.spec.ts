import { describe, it, expect } from 'vitest';
import { formatSize } from './formatSize';

describe('formatSize', () => {
  // Positive cases - normal usage
  it('formats bytes correctly', () => {
    expect(formatSize(0)).toBe('0 bytes');
    expect(formatSize(1)).toBe('1 bytes');
    expect(formatSize(512)).toBe('512 bytes');
    expect(formatSize(1023)).toBe('1023 bytes');
  });

  it('formats kilobytes correctly', () => {
    expect(formatSize(1024)).toBe('1.0 KB');
    expect(formatSize(1536)).toBe('1.5 KB');
    expect(formatSize(10240)).toBe('10.0 KB');
    expect(formatSize(1048575)).toBe('1024.0 KB');
  });

  it('formats megabytes correctly', () => {
    expect(formatSize(1048576)).toBe('1.0 MB');
    expect(formatSize(1572864)).toBe('1.5 MB');
    expect(formatSize(10485760)).toBe('10.0 MB');
    expect(formatSize(1073741823)).toBe('1024.0 MB');
  });

  it('formats gigabytes correctly', () => {
    expect(formatSize(1073741824)).toBe('1.0 GB');
    expect(formatSize(1610612736)).toBe('1.5 GB');
    expect(formatSize(10737418240)).toBe('10.0 GB');
    expect(formatSize(1099511627776)).toBe('1.0 TB');
  });

  // Edge cases
  it('handles zero correctly', () => {
    expect(formatSize(0)).toBe('0 bytes');
  });

  it('handles very large numbers correctly', () => {
    expect(formatSize(Number.MAX_SAFE_INTEGER)).toBe('8.0 PB');
    expect(formatSize(Number.MAX_SAFE_INTEGER / 10)).toBe('819.2 TB');
  });

  // Negative cases?
  it('handles negative numbers by treating them as positive', () => {
    expect(formatSize(-1024)).toBe(formatSize(1024));
  });

  it('handles non-integer values correctly', () => {
    expect(formatSize(1024.5)).toBe('1.0 KB');
    expect(formatSize(1048576.5)).toBe('1.0 MB');
  });

  it('handles invalid inputs gracefully', () => {
    // @ts-expect-error Delibaretely setting invalid value
    expect(() => formatSize('1024')).toThrow();
    // @ts-expect-error Delibaretely setting invalid value
    expect(() => formatSize(null)).toThrow();
    // @ts-expect-error Delibaretely setting invalid value
    expect(() => formatSize(undefined)).toThrow();
    // @ts-expect-error Delibaretely setting invalid value
    expect(() => formatSize({})).toThrow();
  });
});