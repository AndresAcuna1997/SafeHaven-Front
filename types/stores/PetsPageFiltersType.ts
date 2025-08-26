type PetsPageFilters = {
  city: string;
  age: string;
  petType: string;
  setAge: (age: string) => void;
  setCity: (city: string) => void;
  setPetType: (petType: string) => void;
};

export default PetsPageFilters;
