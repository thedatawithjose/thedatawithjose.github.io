import { render, screen } from '@testing-library/react';
import Contact from './page';

describe('Contact Page', () => {
  it('renders the contact heading', () => {
    render(<Contact />);
    const heading = screen.getByText('Contact Me');
    expect(heading).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Contact />);
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    render(<Contact />);
    const form = screen.getByRole('textbox', { name: /full name/i });
    expect(form).toBeInTheDocument();
  });
});