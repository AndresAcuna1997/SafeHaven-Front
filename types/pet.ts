import { ageType } from './enum/ageType';

export interface Pet {
  id: number;
  name: string;
  age: number;
  ageType: ageType;
  description: string;
  location: string;
  photo: string;
  petType: string;
}
