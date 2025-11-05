'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useFormPerformance } from '../hooks/usePerformance';
import { SecurityValidator } from '../lib/security-utils';

// import { useAnalytics } from '../hooks/useAnalytics';
import { useSuccessToast, useErrorToast } from './ToastNotification';
import { TouchOptimizedInput } from './MobileEnhancements';
import { PrimaryButton } from './SimpleEnhancedButton';
import FormProgressIndicator from './FormProgressIndicator';
import SmartFieldHelper from './SmartFieldHelper';
import FormSuccessAnimation from './FormSuccessAnimation';
import { useFormAutoSave } from '../hooks/useFormAutoSave';
import { useFormTracking, useBusinessTracking } from '../hooks/useAnalyticsTracking';
import { useGoogleAnalytics } from './GoogleAnalytics';

// Enhanced security schema with Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']{2,50}$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .refine((val) => !/<|>|script|javascript/i.test(val), 'Name contains invalid characters'),
  email: z
    .string()
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email cannot exceed 100 characters')
    .refine((val) => SecurityValidator.isValidEmail(val), 'Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject cannot exceed 100 characters')
    .refine((val) => !/<|>|script|javascript/i.test(val), 'Subject contains invalid characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters')
    .refine((val) => !/<script|javascript:|vbscript:/i.test(val), 'Message contains invalid content'),
  budget: z
    .string()
    .optional(),
  timeline: z
    .string()
    .optional(),
  // Honeypot field for bot detection (multiple fields for better protection)
  honeypot: z
    .string()
    .max(0, 'Bot detected')
    .optional(),
  website: z
    .string()
    .max(0, 'Bot detected')
    .optional(),
  phone_number: z
    .string()
    .max(0, 'Bot detected')
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formStartTime] = useState(Date.now());
  const [interactionCount, setInteractionCount] = useState(0);
  const [csrfToken] = useState(() => SecurityValidator.generateCSRFToken());
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);
  
  // Performance tracking
  const { trackFormStart, trackFormSubmit, trackFieldInteraction } = useFormPerformance('ContactForm');
  
  // Analytics tracking
  // const { trackFormStart: trackAnalyticsFormStart, trackFormSubmit: trackAnalyticsFormSubmit } = useAnalytics();
  
  // Toast notifications
  const showSuccessToast = useSuccessToast();
  const showErrorToast = useErrorToast();
  
  // Analytics tracking
  const formTracking = useFormTracking('ContactForm');
  const businessTracking = useBusinessTracking();
  const { trackEvent } = useGoogleAnalytics();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, touchedFields },
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange', // Validación en tiempo real
  });

  // Auto-save functionality
  const autoSave = useFormAutoSave({
    watch,
    setValue,
    formId: 'contact-form',
    delay: 3000,
    enabled: true
  });

  // Watch form values for security indicator
  const watchedValues = watch();
  const messageLength = watch('message')?.length || 0;
  
  // Required fields for progress tracking
  const requiredFields = ['name', 'email', 'subject', 'message'];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Sanitize form data for security
      const sanitizedData = {
        name: SecurityValidator.sanitizeInput(data.name),
        email: SecurityValidator.sanitizeInput(data.email),
        subject: SecurityValidator.sanitizeInput(data.subject),
        message: SecurityValidator.sanitizeInput(data.message),
        budget: data.budget ? SecurityValidator.sanitizeInput(data.budget) : '',
        timeline: data.timeline ? SecurityValidator.sanitizeInput(data.timeline) : '',
      };
      
      // Advanced bot detection
      const formFillTime = Date.now() - formStartTime;
      
      // Check honeypot fields
      if (!SecurityValidator.validateHoneypot(data.honeypot || '') ||
          !SecurityValidator.validateHoneypot(data.website || '') ||
          !SecurityValidator.validateHoneypot(data.phone_number || '')) {
        throw new Error('Bot detected: Honeypot field filled');
      }
      
      // Check form fill time (too fast = bot)
      if (formFillTime < 3000) { // Less than 3 seconds
        throw new Error('Bot detected: Form filled too quickly');
      }
      
      // Check interaction count (too few interactions = bot)
      if (interactionCount < 5) {
        throw new Error('Bot detected: Insufficient user interactions');
      }
      
      // Validate CSRF token
      if (!csrfToken || csrfToken.length < 10) {
        throw new Error('Security validation failed');
      }
      
      // Generate security token
      const securityToken = SecurityValidator.generateCSRFToken();
      
      const formData = new FormData();
      formData.append('name', sanitizedData.name);
      formData.append('email', sanitizedData.email);
      formData.append('subject', sanitizedData.subject);
      formData.append('message', sanitizedData.message);
      if (sanitizedData.budget) formData.append('budget', sanitizedData.budget);
      if (sanitizedData.timeline) formData.append('timeline', sanitizedData.timeline);
      formData.append('_captcha', 'false');
      formData.append('_token', securityToken);
      formData.append('_csrf', csrfToken);
      formData.append('_form_time', formFillTime.toString());
      formData.append('_interactions', interactionCount.toString());

      const response = await fetch('https://formsubmit.co/datawithjose@outlook.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        
        // Enhanced analytics tracking
        formTracking.trackFormSubmit(true);
        trackFormSubmit(true); // Track successful submission
        
        // Google Analytics tracking
        trackEvent('form_submit', {
          form_name: 'contact_form',
          success: true,
          has_budget: !!sanitizedData.budget,
          has_timeline: !!sanitizedData.timeline,
          message_length: sanitizedData.message.length,
          form_fill_time: formFillTime
        });
        
        // Track lead quality
        businessTracking.trackLeadQuality('contact_form', {
          hasEmail: !!sanitizedData.email,
          hasPhone: false, // No phone field in current form
          hasBudget: !!sanitizedData.budget,
          hasTimeline: !!sanitizedData.timeline,
          messageLength: sanitizedData.message.length
        });
        
        // Show success animation instead of toast
        setShowSuccessAnimation(true);
        
        // Clear auto-saved draft
        autoSave.clearDraft();
        
        reset(); // Limpiar formulario
        
        // Auto-hide success message after animation
        setTimeout(() => {
          setSubmitStatus('idle');
          setShowSuccessAnimation(false);
        }, 8000);
      } else {
        throw new Error('Error sending form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      const errorMsg = 'There was an error sending the message. Please try again.';
      setErrorMessage(errorMsg);
      
      // Show error toast
      showErrorToast(
        'Error sending message',
        errorMsg
      );
      
      // Enhanced analytics tracking
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      formTracking.trackFormSubmit(false, errorMessage);
      trackFormSubmit(false, errorMessage); // Track failed submission
      
      // Google Analytics error tracking
      trackEvent('form_submit', {
        form_name: 'contact_form',
        success: false,
        error_message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler para tracking de interacciones
  const handleInteraction = () => {
    setInteractionCount(prev => prev + 1);
  };

  // Check for draft on mount
  useEffect(() => {
    if (autoSave.hasDraft) {
      setShowDraftPrompt(true);
    }
  }, [autoSave.hasDraft]);

  // Handle draft restoration
  const handleRestoreDraft = () => {
    const restored = autoSave.restoreDraft();
    if (restored) {
      showSuccessToast('Draft restored!', 'Your previous form data has been restored.');
    }
    setShowDraftPrompt(false);
  };

  // Función para obtener clase de input basada en estado
  const getInputClass = (fieldName: keyof ContactFormData) => {
    const baseClass = 'w-full p-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    
    if (hasError) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50`;
    }
    
    if (isTouched && !hasError) {
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-200 bg-green-50`;
    }
    
    return `${baseClass} border-gray-300 focus:border-blue-500 focus:ring-blue-200`;
  };

  return (
    <motion.div 
      className={`max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Draft Restoration Prompt */}
      {showDraftPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-save text-blue-500 mr-2"></i>
              <div>
                <h4 className="font-medium text-blue-800">Draft Found!</h4>
                <p className="text-sm text-blue-600">
                  {autoSave.lastSavedText} - Would you like to continue where you left off?
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRestoreDraft}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Restore
              </button>
              <button
                onClick={() => {
                  autoSave.clearDraft();
                  setShowDraftPrompt(false);
                }}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
              >
                Start Fresh
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <FormProgressIndicator
        formData={watchedValues}
        requiredFields={requiredFields}
        className="mb-6"
      />

      {/* Auto-save Status */}
      {autoSave.lastSaved && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex items-center justify-between text-xs text-gray-500"
        >
          <div className="flex items-center">
            {autoSave.isSaving ? (
              <>
                <motion.i 
                  className="fas fa-spinner mr-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Saving draft...</span>
              </>
            ) : (
              <>
                <i className="fas fa-check text-green-500 mr-1"></i>
                <span>{autoSave.lastSavedText}</span>
              </>
            )}
          </div>
          <button
            onClick={autoSave.clearDraft}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Clear saved draft"
          >
            <i className="fas fa-trash text-xs"></i>
          </button>
        </motion.div>
      )}
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          role="alert"
          aria-live="polite"
          aria-labelledby="success-title"
        >
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2" aria-hidden="true"></i>
            <span id="success-title" className="font-medium">Message sent successfully!</span>
          </div>
          <p className="mt-1 text-sm">I'll get back to you as soon as possible.</p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          role="alert"
          aria-live="assertive"
          aria-labelledby="error-title"
        >
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2" aria-hidden="true"></i>
            <span id="error-title" className="font-medium">Error sending message</span>
          </div>
          <p className="mt-1 text-sm">{errorMessage}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Primera fila: Nombre y Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
              <span className="text-xs text-gray-500 font-normal ml-1">(Required)</span>
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className={getInputClass('name')}
              placeholder="Your full name"
              aria-describedby={errors.name ? 'name-error' : 'name-help'}
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              onFocus={() => {
                setFocusedField('name');
                handleInteraction();
                formTracking.trackFormStart();
                trackFormStart();
                // trackAnalyticsFormStart('ContactForm');
                formTracking.trackFieldInteraction('name', 'focus');
                trackFieldInteraction('name', 'focus');
              }}
              onBlur={() => {
                setFocusedField(null);
                handleInteraction();
                formTracking.trackFieldInteraction('name', 'blur');
                trackFieldInteraction('name', 'blur');
              }}
              onChange={(e) => {
                handleInteraction();
                formTracking.trackFieldInteraction('name', 'change');
                trackFieldInteraction('name', 'change');
              }}
            />
            <SmartFieldHelper
              fieldName="name"
              value={watch('name') || ''}
              error={errors.name?.message}
              isFocused={focusedField === 'name'}
              fieldType="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
              <span className="text-xs text-gray-500 font-normal ml-1">(Required)</span>
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={getInputClass('email')}
              placeholder="your@email.com"
              aria-describedby={errors.email ? 'email-error' : 'email-help'}
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              autoComplete="email"
              onFocus={() => {
                setFocusedField('email');
                handleInteraction();
                trackFieldInteraction('email', 'focus');
              }}
              onBlur={() => {
                setFocusedField(null);
                handleInteraction();
                trackFieldInteraction('email', 'blur');
              }}
              onChange={() => {
                handleInteraction();
                trackFieldInteraction('email', 'change');
              }}
            />
            <SmartFieldHelper
              fieldName="email"
              value={watch('email') || ''}
              error={errors.email?.message}
              isFocused={focusedField === 'email'}
              fieldType="email"
            />
          </div>
        </div>

        {/* Segunda fila: Asunto */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
            <span className="text-xs text-gray-500 font-normal ml-1">(Required)</span>
          </label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            className={getInputClass('subject')}
            placeholder="How can I help you?"
            aria-describedby={errors.subject ? 'subject-error' : 'subject-help'}
            aria-required="true"
            aria-invalid={errors.subject ? 'true' : 'false'}
            onFocus={() => {
              setFocusedField('subject');
              handleInteraction();
            }}
            onBlur={() => setFocusedField(null)}
            onChange={() => handleInteraction()}
          />
          <SmartFieldHelper
            fieldName="subject"
            value={watch('subject') || ''}
            error={errors.subject?.message}
            isFocused={focusedField === 'subject'}
            fieldType="subject"
          />
        </div>

        {/* Tercera fila: Presupuesto y Timeline (opcionales) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Approximate Budget
              <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
            </label>
            <select
              {...register('budget')}
              id="budget"
              className={getInputClass('budget')}
              aria-describedby="budget-help"
              onFocus={() => handleInteraction()}
              onChange={() => handleInteraction()}
            >
              <option value="">Select a range</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000-25000">$10,000 - $25,000</option>
              <option value="25000+">$25,000+</option>
              <option value="discuss">Prefer to discuss</option>
            </select>
            <p id="budget-help" className="mt-1 text-xs text-gray-500">
              Helps me provide more accurate project estimates
            </p>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
              Project Timeline
              <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
            </label>
            <select
              {...register('timeline')}
              id="timeline"
              className={getInputClass('timeline')}
              aria-describedby="timeline-help"
              onFocus={() => handleInteraction()}
              onChange={() => handleInteraction()}
            >
              <option value="">Select a timeline</option>
              <option value="urgent">Urgent (1-2 weeks)</option>
              <option value="1-month">1 month</option>
              <option value="2-3-months">2-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-months+">6+ months</option>
              <option value="flexible">Flexible</option>
            </select>
            <p id="timeline-help" className="mt-1 text-xs text-gray-500">
              When would you like to start or complete the project?
            </p>
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
            <span className="text-xs text-gray-500 font-normal ml-1">(Required)</span>
            <span className="text-xs text-gray-500 ml-2">
              ({messageLength}/1000 characters)
            </span>
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            className={getInputClass('message')}
            placeholder="Tell me about your project, current data challenges, objectives, and any specific details you consider important..."
            aria-describedby={errors.message ? 'message-error' : 'message-help'}
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            onFocus={() => {
              setFocusedField('message');
              handleInteraction();
            }}
            onBlur={() => setFocusedField(null)}
            onChange={() => handleInteraction()}
          />
          <SmartFieldHelper
            fieldName="message"
            value={watch('message') || ''}
            error={errors.message?.message}
            isFocused={focusedField === 'message'}
            fieldType="message"
          />
        </div>

        {/* Honeypot fields - hidden from users, visible to bots */}
        <div style={{ display: 'none' }}>
          <label htmlFor="honeypot">Leave this field empty</label>
          <input
            {...register('honeypot')}
            type="text"
            id="honeypot"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
          />
          
          <label htmlFor="website">Website URL</label>
          <input
            {...register('website')}
            type="url"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
          
          <label htmlFor="phone_number">Phone Number</label>
          <input
            {...register('phone_number')}
            type="tel"
            id="phone_number"
            name="phone_number"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Submit Button */}
        <PrimaryButton
          type="submit"
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
          icon="fas fa-paper-plane"
          size="lg"
          className="w-full"
        >
          {isSubmitting ? 'Sending message...' : 'Send message'}
        </PrimaryButton>

        {/* Form validation summary */}
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-700 font-medium">
              Please correct the following errors:
            </p>
            <ul className="mt-1 text-xs text-red-600 list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error?.message}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Submit Help Text */}
        <p id="submit-help" className="text-xs text-gray-500 text-center mt-2">
          By submitting this form, you agree to be contacted about your project inquiry.
          Your information is kept confidential and never shared with third parties.
        </p>


      </form>

      {/* Success Animation */}
      <FormSuccessAnimation
        isVisible={showSuccessAnimation}
        onComplete={() => setShowSuccessAnimation(false)}
        formData={{
          name: watch('name'),
          email: watch('email'),
          subject: watch('subject')
        }}
      />
    </motion.div>
  );
}