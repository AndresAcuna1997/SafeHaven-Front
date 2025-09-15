import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ageType } from '../../types/enum/ageType';

jest.mock('../../lib/api/petDetails', () => ({
  fetchPetDetails: jest.fn(() => Promise.resolve({ id: 1, name: 'Test Pet' })),
}));

import { fetchPetDetails } from '../../lib/api/petDetails';
import { Petcard } from './Petcard';

const mockPrefetchQuery = jest.fn();

const mockUseQueryClient = jest.fn(() => ({
  prefetchQuery: mockPrefetchQuery,
}));

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useQueryClient: () => mockUseQueryClient(),
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('PetCard tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should display the card with the props passed to them', () => {
    const petMock = {
      id: 1,
      name: 'Cafe',
      age: 3,
      ageType: ageType.Years,
      description:
        'A very beautiful and loving dog who enjoys playing fetch and long walks in the park',
      location: 'Bogotá',
      photo: '/images/pets-fallback/dog.jpg',
    };

    render(
      <TestWrapper>
        <Petcard {...petMock} />
      </TestWrapper>,
    );

    const petTitle = screen.getByText(
      `${petMock.name} - ${petMock.age} ${petMock.ageType}`,
    );
    const petDescription = screen.getByText(petMock.description);
    const petLocation = screen.getByText(petMock.location);
    const petImage = screen.getByRole('img');

    expect(petDescription).toBeInTheDocument();
    expect(petLocation).toBeInTheDocument();
    expect(petImage).toBeInTheDocument();
    expect(petTitle).toBeInTheDocument();
  });

  it('Should call prefetchQuery when hovering over the Adopt me link', () => {
    const petMock = {
      id: 1,
      name: 'Cafe',
      age: 3,
      ageType: ageType.Years,
      description: 'A very beautiful and loving dog',
      location: 'Bogotá',
      photo: '/images/pets-fallback/dog.jpg',
    };

    render(
      <TestWrapper>
        <Petcard {...petMock} />
      </TestWrapper>,
    );

    const adoptLink = screen.getByRole('link', { name: /adopt me/i });

    fireEvent.mouseEnter(adoptLink);

    expect(mockPrefetchQuery).toHaveBeenCalledWith({
      queryKey: ['pet-details', petMock.id],
      queryFn: expect.any(Function),
    });
  });

  it('Should call fetchPetDetails with correct id when queryFn is executed', async () => {
    const petMock = {
      id: 42,
      name: 'Test Pet',
      age: 2,
      ageType: ageType.Years,
      description: 'Test description',
      location: 'Test location',
      photo: '/test.jpg',
    };

    render(
      <TestWrapper>
        <Petcard {...petMock} />
      </TestWrapper>,
    );

    const adoptLink = screen.getByRole('link', { name: /adopt me/i });
    fireEvent.mouseEnter(adoptLink);

    const prefetchCall = mockPrefetchQuery.mock.calls[0][0];
    const queryFn = prefetchCall.queryFn;

    await queryFn();

    expect(fetchPetDetails).toHaveBeenCalledWith(petMock.id);
  });
});
