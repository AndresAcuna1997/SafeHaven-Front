import StoreType from '@/types/stores/PetsPageFiltersType';
import { create } from 'zustand';

const usePetsFilters = create<StoreType>()((set) => ({
  age: 'All',
  city: 'All',
  petType: 'All',
  setAge: (age: string) => set({ age }),
  setCity: (city: string) => set({ city }),
  setPetType: (petType: string) => set({ petType }),
}));

export default usePetsFilters;
