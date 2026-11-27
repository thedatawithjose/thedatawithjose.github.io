import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackPageView, trackEvent, portfolioAnalytics } from '../analytics';
const gtag = vi.fn();
describe('Analytics contract', () => {
  beforeEach(() => { localStorage.clear(); gtag.mockClear(); window.gtag = gtag; });
  it('does not emit events before consent', () => {
    trackEvent('booking_click'); trackPageView('/portfolio/'); expect(gtag).not.toHaveBeenCalled();
  });
  it('tracks page views and clicks with consent', () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({analytics:true}));
    trackPageView('/portfolio/', 'Portfolio');
    trackEvent('booking_click', {page_path:'/portfolio/'});
    expect(gtag).toHaveBeenCalledWith('event','page_view',expect.objectContaining({page_location: expect.stringContaining('/portfolio/'),page_title:'Portfolio'}));
    expect(gtag).toHaveBeenCalledWith('event','booking_click',expect.objectContaining({page_path:'/portfolio/'}));
  });
  it('does not assign invented revenue to leads', () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({analytics:true}));
    portfolioAnalytics.trackLeadGeneration('contact_form','high');
    expect(gtag).toHaveBeenCalledWith('event','generate_lead',expect.objectContaining({lead_quality:'high'}));
    expect(gtag.mock.calls[0][2].value).toBeUndefined();
  });
  it('stops sending events when consent is revoked', () => {
    localStorage.setItem('cookie-preferences', JSON.stringify({analytics:true}));
    trackEvent('booking_click'); localStorage.setItem('cookie-preferences', JSON.stringify({analytics:false}));
    trackEvent('booking_click'); expect(gtag).toHaveBeenCalledTimes(1);
  });
});
