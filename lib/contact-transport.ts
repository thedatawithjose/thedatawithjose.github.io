export const CONTACT_EMAIL = 'datawithjose@outlook.com';
export async function submitContact(fields: Record<string, string>, request: typeof fetch = fetch) {
  const response = await request('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...fields, _subject: fields.subject || 'Website inquiry', _captcha: 'false', _honey: '' }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Contact service rejected request');
  const result = await response.json();
  if (result?.success !== true && result?.success !== 'true') throw new Error('Contact service did not confirm acceptance');
  return result;
}
