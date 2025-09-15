import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchPets } from '../../lib/api/pets';
import usePetsFilters from '../../stores/PetsPageFilterStore';
import { ageType } from '../../types/enum/ageType';
import GridPets from './GridPets';

jest.mock('../../lib/api/pets', () => ({
  fetchPets: jest.fn(),
}));

jest.mock('../Petcard/Petcard', () => ({
  Petcard: ({ name, id }: { name: string; id: number }) => (
    <div data-testid={`petcard-${id}`}>
      <h3>{name}</h3>
    </div>
  ),
}));

jest.mock('../../stores/PetsPageFilterStore');

const mockedUsePetsFilters = usePetsFilters as jest.MockedFunction<
  typeof usePetsFilters
>;
const mockedFetchPets = fetchPets as jest.MockedFunction<typeof fetchPets>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

const mockPetsData = {
  pets: [
    {
      id: 1,
      name: 'Buddy',
      age: 2,
      ageType: ageType.Years,
      description: 'Friendly dog',
      location: 'Bogotá',
      photo: 'buddy.jpg',
      petType: 'Dogs',
    },
    {
      id: 2,
      name: 'Whiskers',
      age: 1,
      ageType: ageType.Years,
      description: 'Cute cat',
      location: 'Medellín',
      photo: 'whiskers.jpg',
      petType: 'Cats',
    },
  ],
};

describe('GridPets tests', () => {
  const mockSetAge = jest.fn();
  const mockSetCity = jest.fn();
  const mockSetPetType = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUsePetsFilters.mockReturnValue({
      age: 'All',
      city: 'All',
      petType: 'All',
      setAge: mockSetAge,
      setCity: mockSetCity,
      setPetType: mockSetPetType,
    });
  });

  it('should render loading state initially', () => {
    mockedFetchPets.mockReturnValue(new Promise(() => {}));

    renderWithQueryClient(<GridPets />);

    expect(screen.getByText('Loading pets...')).toBeInTheDocument();
  });

  it('should render error state when fetch fails', async () => {
    const errorMessage = 'Failed to fetch pets';
    mockedFetchPets.mockRejectedValue(new Error(errorMessage));

    renderWithQueryClient(<GridPets />);

    await waitFor(() => {
      expect(
        screen.getByText(`Error loading pets: ${errorMessage}`),
      ).toBeInTheDocument();
    });
  });

  it('should render pets when data is loaded successfully', async () => {
    mockedFetchPets.mockResolvedValue(mockPetsData);

    renderWithQueryClient(<GridPets />);

    await waitFor(() => {
      expect(screen.getByText('Found 2 pets')).toBeInTheDocument();
      expect(screen.getByTestId('petcard-1')).toBeInTheDocument();
      expect(screen.getByTestId('petcard-2')).toBeInTheDocument();
      expect(screen.getByText('Buddy')).toBeInTheDocument();
      expect(screen.getByText('Whiskers')).toBeInTheDocument();
    });
  });

  it('should render empty results when no pets found', async () => {
    mockedFetchPets.mockResolvedValue({ pets: [] });

    renderWithQueryClient(<GridPets />);

    await waitFor(() => {
      expect(screen.getByText('Found 0 pets')).toBeInTheDocument();
    });
  });

  it('should call fetchPets with correct filter parameters', async () => {
    mockedUsePetsFilters.mockReturnValue({
      age: '2-4 years',
      city: 'Bogotá',
      petType: 'Dogs',
      setAge: mockSetAge,
      setCity: mockSetCity,
      setPetType: mockSetPetType,
    });

    mockedFetchPets.mockResolvedValue(mockPetsData);

    renderWithQueryClient(<GridPets />);

    await waitFor(() => {
      expect(mockedFetchPets).toHaveBeenCalledWith(
        '2-4 years',
        'Bogotá',
        'Dogs',
      );
    });
  });

  it('should render pets grid with correct structure', async () => {
    mockedFetchPets.mockResolvedValue(mockPetsData);

    renderWithQueryClient(<GridPets />);

    await waitFor(() => {
      const grid = screen.getByTestId('petcard-1').parentElement;
      expect(grid).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-4',
        'mt-4',
      );
    });
  });

  it('should update query when filters change', async () => {
    const { rerender } = renderWithQueryClient(<GridPets />);

    expect(mockedFetchPets).toHaveBeenCalledWith('All', 'All', 'All');

    mockedUsePetsFilters.mockReturnValue({
      age: '0-1 year',
      city: 'Medellín',
      petType: 'Cats',
      setAge: mockSetAge,
      setCity: mockSetCity,
      setPetType: mockSetPetType,
    });

    rerender(
      <QueryClientProvider client={createTestQueryClient()}>
        <GridPets />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mockedFetchPets).toHaveBeenCalledWith(
        '0-1 year',
        'Medellín',
        'Cats',
      );
    });
  });
});
