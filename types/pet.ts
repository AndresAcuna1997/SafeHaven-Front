export interface Pet {
  id: number;
  name: string;
  age: number;
  ageType: 'Years' | 'Months';
  description: string;
  location: string;
  photo: string;
  petType: string;
}
