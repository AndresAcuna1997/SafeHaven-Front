import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navbar tests', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders de navbar', () => {
    render(<Navbar />);

    const navbar = screen.getByRole('navigation');

    expect(navbar).toBeInTheDocument();
  });

  it('should render 3 links inside the nav', () => {
    const numberOfLinks = 3;

    render(<Navbar />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(numberOfLinks);
  });

  it('should have the rigth href values', () => {
    const hrefArray = ['/', '/pets', '/post'];

    render(<Navbar />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', hrefArray[0]);
    expect(links[1]).toHaveAttribute('href', hrefArray[1]);
    expect(links[2]).toHaveAttribute('href', hrefArray[2]);
  });

  it('should apply font-bold class to active link when pathname matches', () => {
    mockUsePathname.mockReturnValue('/pets');

    render(<Navbar />);

    const links = screen.getAllByRole('link');
    const petsLink = links.find(
      (link) => link.getAttribute('href') === '/pets',
    );

    expect(petsLink).toHaveClass('font-bold');
  });

  it('should not apply font-bold class when pathname does not match', () => {
    mockUsePathname.mockReturnValue('/');

    render(<Navbar />);

    const links = screen.getAllByRole('link');
    const petsLink = links.find(
      (link) => link.getAttribute('href') === '/pets',
    );
    const postLink = links.find(
      (link) => link.getAttribute('href') === '/post',
    );

    expect(petsLink).not.toHaveClass('font-bold');
    expect(postLink).not.toHaveClass('font-bold');
  });
});
