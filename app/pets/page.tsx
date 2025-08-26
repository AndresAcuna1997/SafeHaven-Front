import GridPets from '@/components/GridPets/GridPets';

function Page() {
  return (
    <main>
      <h1 className="font-poppins text-5xl font-extrabold text-blue-600 mt-25 md:mt-30 lg:mt-30">
        Find a friend
      </h1>
      <p className="font-inter">
        Here you can search for a friend according to your preferences
      </p>
      <GridPets />
    </main>
  );
}

export default Page;
