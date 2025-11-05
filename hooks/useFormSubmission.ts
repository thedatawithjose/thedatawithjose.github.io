import { useState } from 'react';

interface UseFormSubmissionOptions {
  endpoint: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  successMessage?: string;
  errorMessage?: string;
}

interface FormSubmissionState {
  isSubmitting: boolean;
  status: 'idle' | 'success' | 'error';
  message: string;
}

export function useFormSubmission({
  endpoint,
  onSuccess,
  onError,
  successMessage = 'Message sent successfully!',
  errorMessage = 'There was an error sending the message. Please try again.'
}: UseFormSubmissionOptions) {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    status: 'idle',
    message: ''
  });

  const submitForm = async (data: Record<string, any>) => {
    setState({
      isSubmitting: true,
      status: 'idle',
      message: ''
    });

    try {
      // Preparar FormData
      const formData = new FormData();
      
      // Agregar todos los campos del formulario
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value));
        }
      });

      // Agregar campos ocultos para FormSubmit
      formData.append('_captcha', 'false');
      formData.append('_subject', `New Contact Message from ${data.name || 'Website'}`);
      formData.append('_template', 'table'); // Formato de tabla para mejor presentación

      // Realizar la petición
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Verificar el contenido de la respuesta
      const responseText = await response.text();
      
      // FormSubmit puede retornar diferentes tipos de respuestas
      if (response.status === 200 || response.status === 302) {
        setState({
          isSubmitting: false,
          status: 'success',
          message: successMessage
        });
        
        onSuccess?.();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setState(prev => ({ ...prev, status: 'idle', message: '' }));
        }, 5000);
      } else {
        throw new Error('Unexpected response');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      
      const message = error instanceof Error ? error.message : errorMessage;
      
      setState({
        isSubmitting: false,
        status: 'error',
        message: errorMessage
      });
      
      onError?.(message);
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, status: 'idle', message: '' }));
      }, 5000);
    }
  };

  const resetState = () => {
    setState({
      isSubmitting: false,
      status: 'idle',
      message: ''
    });
  };

  return {
    ...state,
    submitForm,
    resetState
  };
}

// Hook para validación en tiempo real
export function useFormValidation<T>(
  data: T,
  validationSchema: any // Zod schema
) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const validateField = (fieldName: string, value: any) => {
    try {
      // Validar campo individual usando Zod
      validationSchema.shape[fieldName].parse(value);
      
      // Si la validación pasa, remover el error
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error: any) {
      // Si hay error de validación, agregarlo
      if (error.errors && error.errors[0]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: error.errors[0].message
        }));
      }
    }
  };

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const isFieldValid = (fieldName: string) => {
    return touchedFields[fieldName] && !errors[fieldName];
  };

  const hasFieldError = (fieldName: string) => {
    return touchedFields[fieldName] && !!errors[fieldName];
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && Object.keys(touchedFields).length > 0;
  };

  return {
    errors,
    touchedFields,
    validateField,
    markFieldAsTouched,
    isFieldValid,
    hasFieldError,
    isFormValid,
    setErrors,
    setTouchedFields
  };
}