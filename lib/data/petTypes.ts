export const petTypes = [
  'All',
  'Dogs',
  'Cats',
  'Birds',
  'Rodents',
  'Others',
] as const;

export type PetType = (typeof petTypes)[number];
