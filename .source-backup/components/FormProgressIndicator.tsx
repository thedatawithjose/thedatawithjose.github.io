'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FormProgressIndicatorProps {
  formData: Record<string, any>;
  requiredFields: string[];
  className?: string;
}

export default function FormProgressIndicator({ 
  formData, 
  requiredFields, 
  className = '' 
}: FormProgressIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const [completedFields, setCompletedFields] = useState<string[]>([]);

  useEffect(() => {
    const completed = requiredFields.filter(field => {
      const value = formData[field];
      return value && value.toString().trim().length > 0;
    });
    
    setCompletedFields(completed);
    setProgress((completed.length / requiredFields.length) * 100);
  }, [formData, requiredFields]);

  const getProgressColor = () => {
    if (progress < 25) return 'from-red-400 to-red-500';
    if (progress < 50) return 'from-yellow-400 to-yellow-500';
    if (progress < 75) return 'from-blue-400 to-blue-500';
    return 'from-green-400 to-green-500';
  };

  const getProgressMessage = () => {
    if (progress === 0) return 'Let\'s get started! 🚀';
    if (progress < 25) return 'Great start! Keep going 💪';
    if (progress < 50) return 'You\'re making progress! 📈';
    if (progress < 75) return 'Almost there! 🎯';
    if (progress < 100) return 'Just one more step! ⭐';
    return 'Perfect! Ready to send 🎉';
  };

  const getEstimatedTime = () => {
    const remainingFields = requiredFields.length - completedFields.length;
    const timePerField = 30; // seconds
    const totalSeconds = remainingFields * timePerField;
    
    if (totalSeconds <= 0) return 'Ready to send!';
    if (totalSeconds < 60) return `~${totalSeconds}s remaining`;
    
    const minutes = Math.ceil(totalSeconds / 60);
    return `~${minutes} min remaining`;
  };

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200 ${className}`}>
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mr-3"
            animate={{ rotate: progress === 100 ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {progress === 100 ? (
              <i className="fas fa-check text-white text-sm" />
            ) : (
              <span className="text-white text-xs font-bold">
                {Math.round(progress)}%
              </span>
            )}
          </motion.div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">
              Form Progress
            </h4>
            <p className="text-xs text-gray-600">
              {completedFields.length} of {requiredFields.length} required fields
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs font-medium text-blue-600">
            {getEstimatedTime()}
          </div>
          <div className="text-xs text-gray-500">
            {getProgressMessage()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        
        {/* Progress milestones */}
        <div className="flex justify-between mt-1">
          {[25, 50, 75, 100].map((milestone) => (
            <motion.div
              key={milestone}
              className={`w-2 h-2 rounded-full ${
                progress >= milestone ? 'bg-green-500' : 'bg-gray-300'
              }`}
              animate={{ 
                scale: progress >= milestone ? 1.2 : 1,
                backgroundColor: progress >= milestone ? '#10b981' : '#d1d5db'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Field Checklist (collapsed by default) */}
      <motion.div
        className="mt-3 pt-3 border-t border-blue-200"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: progress > 0 ? 'auto' : 0, 
          opacity: progress > 0 ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-2 gap-2 text-xs">
          {requiredFields.map((field) => {
            const isCompleted = completedFields.includes(field);
            const fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
            
            return (
              <motion.div
                key={field}
                className={`flex items-center ${
                  isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}
                animate={{ 
                  scale: isCompleted ? 1.05 : 1,
                  color: isCompleted ? '#059669' : '#6b7280'
                }}
                transition={{ duration: 0.2 }}
              >
                <i className={`${
                  isCompleted ? 'fas fa-check-circle' : 'far fa-circle'
                } mr-1 text-xs`} />
                <span>{fieldLabel}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}