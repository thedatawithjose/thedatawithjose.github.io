import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Contact from './page';
vi.mock('../../components/Header', () => ({default: () => null}));
vi.mock('../../components/Footer', () => ({default: () => null}));
vi.mock('../../components/ContactForm', () => ({default: () => <div data-testid="contact-form-component" />}));
describe('Contact page', () => {
  it('renders the contact form and booking destination', () => {
    render(<Contact />);
    expect(screen.getByTestId('contact-form-component')).toBeInTheDocument();
    expect(document.querySelector('a[href="https://calendly.com/ajtradingsystems/30min"]')).toBeInTheDocument();
    expect(document.getElementById('contact-form')).toBeInTheDocument();
  });
});
