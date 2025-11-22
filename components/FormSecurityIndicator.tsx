'use client';

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

interface SecurityCheck {
  id: string;
  label: string;
  status: 'pending' | 'valid' | 'invalid';
  message?: string;
}

interface FormSecurityIndicatorProps {
  formData: any;
  interactionCount: number;
  formStartTime: number;
  className?: string;
}

export default function FormSecurityIndicator({
  formData,
  interactionCount,
  formStartTime,
  className = ''
}: FormSecurityIndicatorProps) {
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([
    { id: 'honeypot', label: 'Bot Detection', status: 'pending' },
    { id: 'timing', label: 'Human Timing', status: 'pending' },
    { id: 'interactions', label: 'User Interactions', status: 'pending' },
    { id: 'validation', label: 'Input Validation', status: 'pending' },
  ]);

  const [overallSecurity, setOverallSecurity] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    const updatedChecks = securityChecks.map(check => {
      switch (check.id) {
        case 'honeypot':
          const honeypotValid = !formData.honeypot && !formData.website && !formData.phone_number;
          return {
            ...check,
            status: honeypotValid ? 'valid' as const : 'invalid' as const,
            message: honeypotValid ? 'No bot activity detected' : 'Suspicious bot activity'
          };

        case 'timing':
          const formTime = Date.now() - formStartTime;
          const timingValid = formTime > 3000; // At least 3 seconds
          return {
            ...check,
            status: formTime < 1000 ? 'pending' as const : (timingValid ? 'valid' as const : 'invalid' as const),
            message: timingValid ? 'Natural form completion time' : 'Form filled too quickly'
          };

        case 'interactions':
          const interactionsValid = interactionCount >= 5;
          return {
            ...check,
            status: interactionCount < 2 ? 'pending' as const : (interactionsValid ? 'valid' as const : 'invalid' as const),
            message: interactionsValid ? 'Sufficient user interactions' : `Need more interactions (${interactionCount}/5)`
          };

        case 'validation':
          const hasRequiredFields = formData.name && formData.email && formData.message;
          const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || '');
          const validationPassed = hasRequiredFields && validEmail;
          return {
            ...check,
            status: !hasRequiredFields ? 'pending' as const : (validationPassed ? 'valid' as const : 'invalid' as const),
            message: validationPassed ? 'All inputs valid' : 'Some inputs need correction'
          };

        default:
          return check;
      }
    });

    setSecurityChecks(updatedChecks);

    // Calculate overall security level
    const validCount = updatedChecks.filter(c => c.status === 'valid').length;
    const invalidCount = updatedChecks.filter(c => c.status === 'invalid').length;

    if (invalidCount > 0) {
      setOverallSecurity('low');
    } else if (validCount >= 3) {
      setOverallSecurity('high');
    } else if (validCount >= 2) {
      setOverallSecurity('medium');
    } else {
      setOverallSecurity('low');
    }
  }, [formData, interactionCount, formStartTime]);

  const getSecurityColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getStatusIcon = (status: 'pending' | 'valid' | 'invalid') => {
    switch (status) {
      case 'valid': return '✅';
      case 'invalid': return '❌';
      case 'pending': return '⏳';
    }
  };

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <m.div
      className={`mt-4 p-4 border rounded-lg ${getSecurityColor(overallSecurity)} ${className}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm">Security Status</h4>
        <span className={`px-2 py-1 rounded text-xs font-medium ${overallSecurity === 'high' ? 'bg-green-100 text-green-800' :
            overallSecurity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
          }`}>
          {overallSecurity.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {securityChecks.map((check) => (
            <m.div
              key={check.id}
              className="flex items-center justify-between text-xs"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-2">
                <span>{getStatusIcon(check.status)}</span>
                <span className="font-medium">{check.label}</span>
              </div>
              {check.message && (
                <span className="text-gray-600 text-xs">{check.message}</span>
              )}
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Form Time: {Math.floor((Date.now() - formStartTime) / 1000)}s</span>
          <span>Interactions: {interactionCount}</span>
        </div>
      </div>
    </m.div>
  );
}