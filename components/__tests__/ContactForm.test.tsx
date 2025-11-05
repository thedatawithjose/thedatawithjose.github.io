import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock the hooks
vi.mock('../../hooks/usePerformance', () => ({
  useFormPerformance: () => ({
    trackFormStart: vi.fn(),
    trackFormSubmit: vi.fn(),
    trackFieldInteraction: vi.fn(),
  }),
}));

vi.mock('../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackFormStart: vi.fn(),
    trackFormSubmit: vi.fn(),
  }),
}));

// Mock security functions
vi.mock('../../lib/security', () => ({
  sanitizeFormData: vi.fn((data) => data),
  validateEmail: vi.fn(() => ({ isValid: true })),
  generateSecureToken: vi.fn(() => 'mock-token'),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch mock
    global.fetch = vi.fn();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/approximate budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project timeline/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Try to submit empty form
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/subject must be at least 5 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    
    // Enter invalid email
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur to validate
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates name format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    
    // Enter invalid name with numbers
    await user.type(nameInput, 'John123');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText(/name can only contain letters/i)).toBeInTheDocument();
    });
  });

  it('validates message length', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    
    // Enter short message
    await user.type(messageInput, 'Hi');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('shows character count for message field', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    
    // Type a message
    await user.type(messageInput, 'This is a test message');
    
    expect(screen.getByText(/22\/1000 characters/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    
    // Mock successful fetch response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    
    render(<ContactForm />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for the contact form');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
    
    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledWith(
      'https://formsubmit.co/datawithjose@outlook.com',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );
  });

  it('handles form submission error', async () => {
    const user = userEvent.setup();
    
    // Mock failed fetch response
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
    
    render(<ContactForm />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for the contact form');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error sending message/i)).toBeInTheDocument();
      expect(screen.getByText(/there was an error sending the message/i)).toBeInTheDocument();
    });
  });

  it('disables submit button when form is invalid', () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Button should be disabled initially (empty form)
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for the contact form');
    
    // Wait for validation
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock slow fetch response
    global.fetch = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ ok: true }), 1000))
    );
    
    render(<ContactForm />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for the contact form');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Check loading state
    expect(screen.getByText(/sending message/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('includes honeypot field for bot detection', () => {
    render(<ContactForm />);
    
    const honeypotField = screen.getByLabelText(/leave this field empty/i);
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField).not.toBeVisible(); // Should be hidden
  });

  it('shows form validation summary when there are errors', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/please correct the following errors/i)).toBeInTheDocument();
    });
  });

  it('handles budget and timeline selection', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const budgetSelect = screen.getByLabelText(/approximate budget/i);
    const timelineSelect = screen.getByLabelText(/project timeline/i);
    
    await user.selectOptions(budgetSelect, '5000-10000');
    await user.selectOptions(timelineSelect, '1-month');
    
    expect(budgetSelect).toHaveValue('5000-10000');
    expect(timelineSelect).toHaveValue('1-month');
  });
});