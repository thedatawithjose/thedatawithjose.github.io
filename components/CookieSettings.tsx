'use client';

import { useState } from 'react';
import CookieConsent from './CookieConsent';

export default function CookieSettings() {
  const [showConsent, setShowConsent] = useState(false);

  const openCookieSettings = () => {
    // Remove existing consent to show the modal again
    localStorage.removeItem('cookie-consent');
    setShowConsent(true);
  };

  return (
    <>
      <button
        onClick={openCookieSettings}
        className="text-gray-300 hover:text-white text-sm transition-colors duration-300 flex items-center"
      >
        <i className="fas fa-cookie-bite mr-2"></i>
        Cookie Settings
      </button>
      
      {showConsent && <CookieConsent />}
    </>
  );
}