'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchPets } from '@/lib/api/pets';
import { ageRanges } from '@/lib/data/ageRanges';
import { colombianCities } from '@/lib/data/cities';
import { petTypes } from '@/lib/data/petTypes';
import usePetsFilters from '@/stores/PetsPageFilterStore';
import { useQuery } from '@tanstack/react-query';
import { Petcard } from '../Petcard/Petcard';

const GridFilters = () => {
  const { age, city, petType, setAge, setCity, setPetType } = usePetsFilters();

  return (
    <div className="flex gap-3">
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a city" />
        </SelectTrigger>
        <SelectContent className="bg-blue-100">
          <SelectGroup>
            <SelectLabel>Cities</SelectLabel>
            {colombianCities.map((city) => (
              <SelectItem key={city} value={city} className="hover:bg-blue-400">
                {city}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={age} onValueChange={setAge}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an age" />
        </SelectTrigger>
        <SelectContent className="bg-blue-100">
          <SelectGroup>
            <SelectLabel>Age range</SelectLabel>
            {ageRanges.map((age) => (
              <SelectItem key={age} value={age} className="hover:bg-blue-400">
                {age}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={petType} onValueChange={setPetType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pet type" />
        </SelectTrigger>
        <SelectContent className="bg-blue-100">
          <SelectGroup>
            <SelectLabel>Type</SelectLabel>
            {petTypes.map((petType) => (
              <SelectItem
                key={petType}
                value={petType}
                className="hover:bg-blue-400"
              >
                {petType}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const GridPets = () => {
  const { age, city, petType } = usePetsFilters();

  const { isPending, error, data } = useQuery({
    queryKey: ['pets', age, city, petType],
    queryFn: () => fetchPets(age, city, petType),
  });

  return (
    <div className="my-10">
      <GridFilters />
      {isPending && <p>Loading pets...</p>}
      {error && <p>Error loading pets: {error.message}</p>}
      {data && (
        <div>
          <p>Found {data.pets.length} pets</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {data.pets.map((pet) => (
              <Petcard
                age={pet.age}
                ageType={pet.ageType}
                description={pet.description}
                location={pet.location}
                name={pet.name}
                photo={pet.photo}
                key={pet.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default GridPets;
