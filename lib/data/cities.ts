export const colombianCities = [
  'All',
  'Barranquilla',
  'Bogotá',
  'Bucaramanga',
  'Cali',
  'Cartagena',
  'Cúcuta',
  'Ibagué',
  'Manizales',
  'Medellín',
  'Pereira',
] as const;

export type ColombianCity = (typeof colombianCities)[number];
