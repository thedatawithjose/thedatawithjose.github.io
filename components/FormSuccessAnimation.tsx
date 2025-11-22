'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FormSuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
  formData?: {
    name?: string;
    email?: string;
    subject?: string;
  };
}

export default function FormSuccessAnimation({ 
  isVisible, 
  onComplete,
  formData 
}: FormSuccessAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const steps = [
    {
      icon: 'fas fa-paper-plane',
      title: 'Message Sent!',
      description: 'Your message is on its way to Jose',
      color: 'text-blue-500'
    },
    {
      icon: 'fas fa-envelope-open',
      title: 'Message Received!',
      description: 'Jose has received your message',
      color: 'text-green-500'
    },
    {
      icon: 'fas fa-reply',
      title: 'Response Coming Soon!',
      description: 'Expect a reply within 24 hours',
      color: 'text-purple-500'
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setShowConfetti(false);
      return;
    }

    // Trigger confetti
    setShowConfetti(true);
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            onComplete?.();
          }, 2000);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(stepInterval);
  }, [isVisible, onComplete]);

  // Confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][i % 5],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    x: Math.random() * 100,
    rotation: Math.random() * 360
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {confettiParticles.map((particle) => (
                <m.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded"
                  style={{
                    backgroundColor: particle.color,
                    left: `${particle.x}%`,
                    top: '-10px'
                  }}
                  initial={{ 
                    y: -20, 
                    rotate: 0,
                    scale: 0
                  }}
                  animate={{ 
                    y: window.innerHeight + 20,
                    rotate: particle.rotation,
                    scale: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Main Success Card */}
          <m.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-50" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Personalized greeting */}
              {formData?.name && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Thank you, {formData.name.split(' ')[0]}! 👋
                  </h3>
                  {formData.subject && (
                    <p className="text-sm text-gray-600 mt-1">
                      Re: {formData.subject}
                    </p>
                  )}
                </m.div>
              )}

              {/* Step Animation */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0.3, scale: 0.9 }}
                    animate={{ 
                      opacity: index <= currentStep ? 1 : 0.3,
                      scale: index === currentStep ? 1.1 : index < currentStep ? 1 : 0.9
                    }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg ${
                      index <= currentStep ? 'bg-white shadow-md' : 'bg-gray-50'
                    }`}
                  >
                    {/* Icon */}
                    <m.div
                      animate={{ 
                        rotate: index === currentStep ? [0, 10, -10, 0] : 0,
                        scale: index === currentStep ? [1, 1.2, 1] : 1
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: index === currentStep ? 2 : 0
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index <= currentStep 
                          ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <i className={`${step.icon} text-lg`} />
                    </m.div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <h4 className={`font-semibold ${
                        index <= currentStep ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h4>
                      <p className={`text-sm ${
                        index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Check mark */}
                    <AnimatePresence>
                      {index < currentStep && (
                        <m.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <i className="fas fa-check text-white text-xs" />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                ))}
              </div>

              {/* Next Steps */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 }}
                className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
              >
                <h4 className="font-semibold text-gray-800 mb-2">
                  What happens next?
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <i className="fas fa-clock text-blue-500 mr-2" />
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-calendar text-green-500 mr-2" />
                    <span>Schedule a call if needed</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-rocket text-purple-500 mr-2" />
                    <span>Start your project journey</span>
                  </div>
                </div>
              </m.div>

              {/* Contact info reminder */}
              {formData?.email && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 5 }}
                  className="mt-4 text-xs text-gray-500"
                >
                  I'll reach out to you at: <strong>{formData.email}</strong>
                </m.div>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}