import { Petcard } from '@/components/Petcard/Petcard';
import { Button } from '@/components/ui/button';

import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gray-100">
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
          <Petcard
            name="Cafe"
            age={3}
            ageType="Months"
            location="Bogota"
            photo="/images/pets-fallback/dog.jpg"
            description="I'm a very beautiful and loving dog"
          />

          <Petcard
            name="Coco"
            age={6}
            ageType="Years"
            location="Cali"
            photo="/images/pets-fallback/cat.jpg"
            description="Calm and loving cat"
          />

          <Petcard
            name="Luna"
            age={10}
            ageType="Years"
            location="Medellin"
            photo="/images/pets-fallback/cacatua.jpg"
            description="Calm and loving cockatoo with a gentle personality"
          />

          <Petcard
            name="Frijol"
            age={1}
            ageType="Years"
            location="Cartagena"
            photo="/images/pets-fallback/guinea.jpg"
            description="Calm and loving guinea pig"
          />
        </div>
      </section>
    </main>
  );
}
