'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Esquema de validación simplificado para el footer
const footerContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name too short')
    .max(50, 'Name too long')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Only letters and spaces'),
  email: z
    .string()
    .email('Invalid email')
    .min(5, 'Email too short'),
  message: z
    .string()
    .min(5, 'Message too short')
    .max(500, 'Message too long'),
});

type FooterContactData = z.infer<typeof footerContactSchema>;

export default function FooterContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FooterContactData>({
    resolver: zodResolver(footerContactSchema),
    mode: 'onBlur', // Validación al perder foco para no ser intrusivo
  });

  const onSubmit = async (data: FooterContactData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      formData.append('_captcha', 'false');
      formData.append('_subject', 'New Contact from Footer - ' + data.name);

      const response = await fetch('https://formsubmit.co/datawithjose@outlook.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        
        // Auto-hide success message after 4 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 4000);
      } else {
        throw new Error('Error sending');
      }
    } catch (error) {
      console.error('Error submitting footer form:', error);
      setSubmitStatus('error');
      
      // Auto-hide error message after 4 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName: keyof FooterContactData) => {
    const baseClass = 'form-control w-full p-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2';
    const hasError = errors[fieldName];
    
    if (hasError) {
      return `${baseClass} border-red-400/50 focus:border-red-400 focus:ring-red-400/20`;
    }
    
    return `${baseClass} border-white/20 focus:border-[#00BFA5] focus:ring-[#00BFA5]/20 hover:border-white/30`;
  };

  return (
    <div className="contact-form p-4">
      {/* Enhanced Status Messages */}
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 text-green-300 text-sm rounded-xl flex items-center">
          <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3">
            <i className="fas fa-check text-xs text-white"></i>
          </div>
          <span className="font-medium">Message sent successfully!</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border border-red-400/30 text-red-300 text-sm rounded-xl flex items-center">
          <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center mr-3">
            <i className="fas fa-exclamation-triangle text-xs text-white"></i>
          </div>
          <span className="font-medium">Error sending. Please try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('name')}
            type="text"
            className={getInputClass('name')}
            placeholder="Full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('email')}
            type="email"
            className={getInputClass('email')}
            placeholder="your@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register('message')}
            rows={3}
            className={getInputClass('message')}
            placeholder="Your message..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`group relative w-full px-4 py-3 rounded-xl transition-all duration-500 font-semibold text-sm overflow-hidden ${
            isSubmitting || !isValid
              ? 'bg-gray-600/50 cursor-not-allowed border border-gray-500/30'
              : 'bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFD23F] hover:from-[#FF8C42] hover:via-[#FF6B35] hover:to-[#F7931E] hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/40 border-2 border-orange-400/50 hover:border-orange-300 animate-gradient-x pulse-glow'
          } text-white flex items-center justify-center transform hover:rotate-1`}
        >
          {/* Multi-layer Background Effects */}
          {!isSubmitting && isValid && (
            <>
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Particle Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-2 right-3 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-orange-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </div>
            </>
          )}
          
          <div className="relative z-10 flex items-center">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                <span className="animate-pulse">Sending...</span>
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane mr-2 text-sm group-hover:translate-x-2 group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 drop-shadow-lg"></i>
                <span className="group-hover:tracking-wider transition-all duration-300 font-bold">Send message</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
}