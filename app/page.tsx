import { Petcard } from '@/components/Petcard/Petcard';
import { Button } from '@/components/ui/button';

import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="home-background flex justify-center items-center text-center relative px-64">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="z-10">
          <h1 className="font-poppins text-5xl font-extrabold mb-4 text-white">
            Ayuda a un animal a encontrar un nuevo hogar
          </h1>
          <p className="font-inter text-white">
            Aqui puedes encontrar un peludo en cual te amara
          </p>
          <Button className="bg-blue-600 rounded-full cursor-pointer animate-bounce size-12 absolute bottom-3">
            <Link href="#pets-cards">
              <ArrowDown className="text-white text-2xl size-7" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="pets-cards" className="px-64 mt-10 bg-gray-100">
        <h2 className="text-center text-3xl md:text-4xl font-poppins font-semibold text-blue-600">
          Conoce a tu futuro amigo
        </h2>
        <div className="flex justify-around mt-5">
          <Petcard
            name="Cafe"
            age={3}
            location="Bogota"
            photo="/images/pets-fallback/dog.jpg"
            description="Soy un perro muy bonito y cari;oso"
          />

          <Petcard
            name="Coco"
            age={6}
            location="Cali"
            photo="/images/pets-fallback/cat.jpg"
            description="Gato calmado y cari;oso"
          />

          <Petcard
            name="Luna"
            age={10}
            location="Medellin"
            photo="/images/pets-fallback/cacatua.jpg"
            description="Gato calmado y cari;oso"
          />

          <Petcard
            name="Frijol"
            age={1}
            location="Cartagena"
            photo="/images/pets-fallback/guinea.jpg"
            description="Gato calmado y cari;oso"
          />
        </div>
      </section>
    </>
  );
}
