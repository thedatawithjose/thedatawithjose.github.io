'use client';

import { useConsent } from './ConsentManager';

export default function CookieSettings() {
  const { showConsentBanner } = useConsent();

  const openCookieSettings = () => {
    showConsentBanner();
  };

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-gray-300 hover:text-white text-sm transition-colors duration-300 flex items-center"
    >
      <i className="fas fa-cookie-bite mr-2"></i>
      Cookie Settings
    </button>
  );
}