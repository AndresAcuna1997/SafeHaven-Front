import { Pet } from '@/types/pet';

export const fetchPetDetails = async (id: number): Promise<Pet> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = await fetch('/data/pets.json');

  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }

  const data: { pets: Pet[] } = await response.json();

  const pet = data.pets.find((pet) => pet.id === id);

  if (!pet) {
    throw new Error('Pet not found');
  }

  return pet;
};
