import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer tests', () => {
  it('renders the footer', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
  });
});
