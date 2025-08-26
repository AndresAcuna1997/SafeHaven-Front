import { Pet } from '@/types/pet';

export const fetchPets = async (
  age: string,
  city: string,
  petType: string,
): Promise<{ pets: Pet[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = await fetch('/data/pets.json');

  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }

  const data: { pets: Pet[] } = await response.json();
  let filteredPets = data.pets;

  if (city && city !== 'All') {
    filteredPets = filteredPets.filter((pet: Pet) => pet.location === city);
  }

  if (petType && petType !== 'All') {
    filteredPets = filteredPets.filter((pet: Pet) => pet.petType === petType);
  }

  if (age && age !== 'All') {
    filteredPets = filteredPets.filter((pet: Pet) => {
      const petAgeInYears = pet.ageType === 'Years' ? pet.age : pet.age / 12;

      switch (age) {
        case '0-1 year':
          return petAgeInYears <= 1;
        case '2-4 years':
          return petAgeInYears >= 2 && petAgeInYears <= 4;
        case '4-6 years':
          return petAgeInYears >= 4 && petAgeInYears <= 6;
        case '6-8 years':
          return petAgeInYears >= 6 && petAgeInYears <= 8;
        case '8+ years':
          return petAgeInYears >= 8;
        default:
          return true;
      }
    });
  }

  return { pets: filteredPets };
};
