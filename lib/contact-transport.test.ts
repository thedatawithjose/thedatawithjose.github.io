import { describe, it, expect, vi } from 'vitest';
import { submitContact } from './contact-transport';
const fields = {name: 'Test User', email: 'test@example.com', subject: 'Test subject', message: 'Test message'};
const response = (ok: boolean, body: unknown) => ({ok, json: async () => body}) as Response;
describe('Contact transport', () => {
  it('uses AJAX endpoint and accepts explicit success', async () => {
    const request = vi.fn().mockResolvedValue(response(true, {success: 'true'}));
    await submitContact(fields, request);
    expect(request).toHaveBeenCalledWith(expect.stringContaining('/ajax/'), expect.objectContaining({method: 'POST'}));
    expect(JSON.parse(request.mock.calls[0][1].body)).toMatchObject(fields);
  });
  it('rejects HTTP errors', async () => {
    await expect(submitContact(fields, vi.fn().mockResolvedValue(response(false, {})))).rejects.toThrow();
  });
  it('rejects ambiguous responses', async () => {
    await expect(submitContact(fields, vi.fn().mockResolvedValue(response(true, {})))).rejects.toThrow();
  });
  it('rejects explicit failure', async () => {
    await expect(submitContact(fields, vi.fn().mockResolvedValue(response(true, {success: 'false'})))).rejects.toThrow();
  });
});
