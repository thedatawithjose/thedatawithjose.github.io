'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SmartFieldHelperProps {
  fieldName: string;
  value: string;
  error?: string;
  isFocused: boolean;
  fieldType: 'name' | 'email' | 'subject' | 'message';
}

export default function SmartFieldHelper({
  fieldName,
  value,
  error,
  isFocused,
  fieldType
}: SmartFieldHelperProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showHelper, setShowHelper] = useState(false);

  // Smart suggestions based on field type
  const getSmartSuggestions = (type: string, currentValue: string): string[] => {
    const val = currentValue.toLowerCase().trim();
    
    switch (type) {
      case 'name':
        if (val.length > 0 && val.length < 3) {
          return ['Try using your full name (first and last name)'];
        }
        if (val.includes('mr') || val.includes('ms') || val.includes('dr')) {
          return ['You can skip titles like Mr., Ms., Dr. - just your name works great!'];
        }
        return [];

      case 'email':
        if (val.length > 0 && !val.includes('@')) {
          return ['Don\'t forget the @ symbol in your email'];
        }
        if (val.includes('@') && !val.includes('.')) {
          return ['Almost there! Add your domain (like .com, .org)'];
        }
        if (val.endsWith('@gmail') || val.endsWith('@yahoo') || val.endsWith('@outlook')) {
          return ['Add .com to complete your email address'];
        }
        return [];

      case 'subject':
        if (val.length > 0 && val.length < 5) {
          return ['A bit more detail helps me understand your needs better'];
        }
        if (val.includes('help') || val.includes('need')) {
          return ['Great! Tell me what specific help you need'];
        }
        if (val.includes('project') || val.includes('work')) {
          return ['Perfect! I love working on new projects'];
        }
        return [];

      case 'message':
        if (val.length > 0 && val.length < 20) {
          return ['Tell me more! The more details, the better I can help you'];
        }
        if (val.length > 20 && val.length < 50) {
          return ['Good start! Consider adding your timeline, budget, or specific goals'];
        }
        if (val.includes('urgent') || val.includes('asap')) {
          return ['I understand it\'s urgent. Please share your timeline and I\'ll prioritize accordingly'];
        }
        if (val.includes('budget') || val.includes('cost')) {
          return ['Great that you\'re thinking about budget! I offer flexible pricing options'];
        }
        return [];

      default:
        return [];
    }
  };

  // Character count and recommendations
  const getCharacterFeedback = (type: string, length: number) => {
    switch (type) {
      case 'name':
        if (length < 2) return { status: 'error', message: 'Too short' };
        if (length > 50) return { status: 'warning', message: 'Quite long' };
        return { status: 'good', message: 'Perfect length' };

      case 'email':
        if (length < 5) return { status: 'error', message: 'Too short' };
        if (length > 100) return { status: 'warning', message: 'Very long email' };
        return { status: 'good', message: 'Good length' };

      case 'subject':
        if (length < 5) return { status: 'error', message: 'Too brief' };
        if (length < 10) return { status: 'warning', message: 'A bit more detail?' };
        if (length > 100) return { status: 'warning', message: 'Keep it concise' };
        return { status: 'good', message: 'Great length' };

      case 'message':
        if (length < 10) return { status: 'error', message: 'Too short' };
        if (length < 50) return { status: 'warning', message: 'More details help' };
        if (length > 1000) return { status: 'warning', message: 'Getting quite long' };
        return { status: 'good', message: 'Perfect detail level' };

      default:
        return { status: 'good', message: '' };
    }
  };

  useEffect(() => {
    const newSuggestions = getSmartSuggestions(fieldType, value);
    setSuggestions(newSuggestions);
    setShowHelper(isFocused && (newSuggestions.length > 0 || !!error));
  }, [fieldType, value, isFocused, error]);

  const characterFeedback = getCharacterFeedback(fieldType, value.length);

  if (!showHelper && !error) return null;

  return (
    <AnimatePresence>
      {(showHelper || error) && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 overflow-hidden"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg mb-2"
            >
              <i className="fas fa-exclamation-triangle text-red-500 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </motion.div>
          )}

          {/* Smart Suggestions */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-2"
            >
              <div className="flex items-start">
                <i className="fas fa-lightbulb text-blue-500 mr-2 mt-0.5" />
                <div>
                  <div className="text-xs font-medium text-blue-700 mb-1">
                    💡 Helpful tip:
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="text-sm text-blue-600">
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Character Count & Feedback */}
          {isFocused && value.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                characterFeedback.status === 'error' 
                  ? 'bg-red-50 text-red-600' 
                  : characterFeedback.status === 'warning'
                  ? 'bg-yellow-50 text-yellow-600'
                  : 'bg-green-50 text-green-600'
              }`}
            >
              <div className="flex items-center">
                <i className={`${
                  characterFeedback.status === 'error' 
                    ? 'fas fa-times-circle' 
                    : characterFeedback.status === 'warning'
                    ? 'fas fa-exclamation-circle'
                    : 'fas fa-check-circle'
                } mr-1`} />
                <span>{characterFeedback.message}</span>
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">{value.length} characters</span>
                {fieldType === 'message' && (
                  <div className="w-16 bg-gray-200 rounded-full h-1">
                    <motion.div
                      className={`h-1 rounded-full ${
                        value.length < 50 ? 'bg-red-400' :
                        value.length < 200 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((value.length / 500) * 100, 100)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Field-specific tips */}
          {isFocused && !error && suggestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-2 bg-gray-50 rounded-lg"
            >
              <div className="text-xs text-gray-600 flex items-center">
                <i className="fas fa-info-circle mr-1" />
                {fieldType === 'name' && 'Your full name helps me personalize our conversation'}
                {fieldType === 'email' && 'I\'ll use this to send you project updates and responses'}
                {fieldType === 'subject' && 'A clear subject helps me understand your needs quickly'}
                {fieldType === 'message' && 'Share your project goals, timeline, and any specific requirements'}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}