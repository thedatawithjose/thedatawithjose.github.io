'use client';

import { useEffect, useRef, useState } from 'react';
import { UseFormWatch, UseFormSetValue, FieldValues } from 'react-hook-form';

interface UseFormAutoSaveProps<T extends FieldValues> {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  formId: string;
  delay?: number;
  enabled?: boolean;
}

interface SavedFormData {
  data: any;
  timestamp: number;
  version: string;
}

export function useFormAutoSave<T extends FieldValues>({
  watch,
  setValue,
  formId,
  delay = 2000,
  enabled = true
}: UseFormAutoSaveProps<T>) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const formData = watch();

  const STORAGE_KEY = `form_draft_${formId}`;
  const FORM_VERSION = '1.0.0';

  // Save to localStorage
  const saveDraft = (data: T) => {
    if (!enabled) return;
    
    try {
      setIsSaving(true);
      const savedData: SavedFormData = {
        data,
        timestamp: Date.now(),
        version: FORM_VERSION
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
      setLastSaved(new Date());
      setHasDraft(true);
      
      // Haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    } catch (error) {
      console.warn('Failed to save form draft:', error);
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  // Load from localStorage
  const loadDraft = (): T | null => {
    if (!enabled) return null;
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;

      const parsedData: SavedFormData = JSON.parse(saved);
      
      // Check if draft is not too old (7 days)
      const isExpired = Date.now() - parsedData.timestamp > 7 * 24 * 60 * 60 * 1000;
      if (isExpired) {
        clearDraft();
        return null;
      }

      // Check version compatibility
      if (parsedData.version !== FORM_VERSION) {
        clearDraft();
        return null;
      }

      setHasDraft(true);
      setLastSaved(new Date(parsedData.timestamp));
      return parsedData.data;
    } catch (error) {
      console.warn('Failed to load form draft:', error);
      return null;
    }
  };

  // Clear draft
  const clearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasDraft(false);
      setLastSaved(null);
    } catch (error) {
      console.warn('Failed to clear form draft:', error);
    }
  };

  // Restore draft to form
  const restoreDraft = () => {
    const draft = loadDraft();
    if (!draft) return false;

    try {
      Object.entries(draft).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          setValue(key as any, value);
        }
      });
      return true;
    } catch (error) {
      console.warn('Failed to restore form draft:', error);
      return false;
    }
  };

  // Check if form has meaningful data
  const hasFormData = (data: T): boolean => {
    return Object.values(data).some(value => 
      value && typeof value === 'string' && value.trim().length > 2
    );
  };

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !hasFormData(formData)) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      saveDraft(formData);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formData, delay, enabled]);

  // Load draft on mount
  useEffect(() => {
    if (enabled) {
      const draft = loadDraft();
      if (draft) {
        setHasDraft(true);
      }
    }
  }, [enabled]);

  // Format last saved time
  const getLastSavedText = (): string => {
    if (!lastSaved) return '';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    
    if (diffSeconds < 60) {
      return `Saved ${diffSeconds}s ago`;
    } else if (diffMinutes < 60) {
      return `Saved ${diffMinutes}m ago`;
    } else {
      return `Saved at ${lastSaved.toLocaleTimeString()}`;
    }
  };

  return {
    // State
    isSaving,
    hasDraft,
    lastSaved,
    lastSavedText: getLastSavedText(),
    
    // Actions
    saveDraft: () => saveDraft(formData),
    loadDraft,
    clearDraft,
    restoreDraft,
    
    // Utils
    hasUnsavedChanges: hasFormData(formData) && !lastSaved
  };
}