export const ageRanges = [
  'All',
  '0-1 year',
  '2-4 years',
  '4-6 years',
  '6-8 years',
  '8+ years',
] as const;

export type AgeRange = (typeof ageRanges)[number];
