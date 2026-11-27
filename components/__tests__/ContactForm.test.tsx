import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../ContactForm';

vi.mock('../../hooks/usePerformance', () => ({ useFormPerformance: () => ({trackFormStart:vi.fn(),trackFormSubmit:vi.fn(),trackFieldInteraction:vi.fn()}) }));
vi.mock('../../hooks/useAnalyticsTracking', () => ({ useFormTracking: () => ({trackFormStart:vi.fn(),trackFormSubmit:vi.fn(),trackFieldInteraction:vi.fn()}) }));
vi.mock('../ToastNotification', () => ({useSuccessToast:()=>vi.fn(),useErrorToast:()=>vi.fn()}));
vi.mock('../FormSuccessAnimation', () => ({default:()=>null}));
describe('Contact form', () => {
  beforeEach(() => { localStorage.clear(); vi.clearAllMocks(); });
  function fillValid() {
    fireEvent.change(document.querySelector('#name')!,{target:{value:'Test User'}});
    fireEvent.change(document.querySelector('#email')!,{target:{value:'test@example.com'}});
    fireEvent.change(document.querySelector('#subject')!,{target:{value:'Project inquiry'}});
    fireEvent.change(document.querySelector('#message')!,{target:{value:'A sample message for a technical test.'}});
  }
  it('renders required fields and prevents empty submissions', () => {
    render(<ContactForm />);
    for (const id of ['name','email','subject','message']) expect(document.getElementById(id)).toBeInTheDocument();
    expect(document.querySelector('button[type="submit"]')).toBeDisabled();
  });
  it('rejects invalid email', async () => {
    render(<ContactForm />); fillValid();
    fireEvent.change(document.querySelector('#email')!,{target:{value:'invalid-email'}});
    await waitFor(()=>expect(document.querySelector('button[type="submit"]')).toBeDisabled());
  });
  it('submits validated fields and shows confirmed success', async () => {
    vi.mocked(fetch).mockResolvedValue({ok:true,json:async()=>({success:true})} as Response);
    render(<ContactForm />); fillValid();
    const button=document.querySelector('button[type="submit"]')!;
    await waitFor(()=>expect(button).toBeEnabled());
    fireEvent.click(button);
    await waitFor(()=>expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/ajax/'),expect.objectContaining({method:'POST'})));
    await waitFor(()=>expect(screen.getByText('Message sent successfully!')).toBeInTheDocument());
  });
  it('does not claim success on provider failure', async () => {
    vi.mocked(fetch).mockResolvedValue({ok:true,json:async()=>({success:false})} as Response);
    render(<ContactForm />); fillValid();
    const button=document.querySelector('button[type="submit"]')!;
    await waitFor(()=>expect(button).toBeEnabled());
    fireEvent.click(button);
    await waitFor(()=>expect(screen.getByText(/The message could not be confirmed/)).toBeInTheDocument());
    expect(screen.queryByText('Message sent successfully!')).not.toBeInTheDocument();
  });
});
