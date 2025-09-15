import { Petcard } from '@/components/Petcard/Petcard';
import { Button } from '@/components/ui/button';
import { Pet } from '@/types/pet';

import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const res = await fetch('http://localhost:3000/data/pets.json');
  const { pets } = await res.json();

  const initialPets = pets.slice(0, 4);

  return (
    <main>
      <section className="home-background flex justify-center items-center text-center relative px-64">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="z-10">
          <h1 className="font-poppins text-5xl font-extrabold mb-4 text-white">
            Help an animal find a new home
          </h1>
          <p className="font-inter text-white">
            Here you can find a furry friend who will love you
          </p>
          <Button className="bg-blue-600 rounded-full cursor-pointer animate-bounce size-12 absolute bottom-3">
            <Link href="#pets-cards">
              <ArrowDown className="text-white text-2xl size-7" />
            </Link>
          </Button>
        </div>
      </section>
      <section id="pets-cards" className="mt-10 bg-gray-100">
        <h2 className="text-center text-3xl md:text-4xl font-poppins font-semibold text-blue-600">
          Meet your future friend
        </h2>
        <div className="flex justify-around mt-5">
          {initialPets.map((pet: Pet) => (
            <Petcard
              key={pet.id}
              id={pet.id}
              name={pet.name}
              age={pet.age}
              ageType={pet.ageType}
              location={pet.location}
              photo={pet.photo}
              description={pet.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
