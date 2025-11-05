'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type: 'card' | 'text' | 'avatar' | 'project' | 'form';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({ type, count = 1, className = '' }: SkeletonLoaderProps) {
  const baseClasses = "bg-gray-200 animate-pulse rounded";

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
            <div className={`${baseClasses} h-48`} />
            <div className="p-6 space-y-4">
              <div className={`${baseClasses} h-6 w-3/4`} />
              <div className={`${baseClasses} h-4 w-full`} />
              <div className={`${baseClasses} h-4 w-2/3`} />
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className={`${baseClasses} h-8`} />
                <div className={`${baseClasses} h-8`} />
              </div>
              <div className={`${baseClasses} h-10 w-full mt-4`} />
            </div>
          </div>
        );

      case 'project':
        return (
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
            <div className={`${baseClasses} h-48`} />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`${baseClasses} h-7 w-2/3`} />
                <div className={`${baseClasses} h-6 w-20 rounded-full`} />
              </div>
              <div className={`${baseClasses} h-4 w-full`} />
              <div className={`${baseClasses} h-4 w-4/5`} />
              
              {/* Metrics skeleton */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className={`${baseClasses} h-5 w-12 mx-auto mb-2`} />
                    <div className={`${baseClasses} h-3 w-16 mx-auto`} />
                  </div>
                ))}
              </div>

              {/* Technologies skeleton */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className={`${baseClasses} h-6 w-16 rounded-full`}
                  />
                ))}
              </div>

              <div className={`${baseClasses} h-12 w-full mt-6 rounded-lg`} />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-3 ${className}`}>
            <div className={`${baseClasses} h-4 w-full`} />
            <div className={`${baseClasses} h-4 w-5/6`} />
            <div className={`${baseClasses} h-4 w-4/6`} />
          </div>
        );

      case 'avatar':
        return (
          <div className={`flex items-center space-x-4 ${className}`}>
            <div className={`${baseClasses} w-12 h-12 rounded-full`} />
            <div className="space-y-2 flex-1">
              <div className={`${baseClasses} h-4 w-32`} />
              <div className={`${baseClasses} h-3 w-24`} />
            </div>
          </div>
        );

      case 'form':
        return (
          <div className={`space-y-6 ${className}`}>
            {/* Form fields skeleton */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className={`${baseClasses} h-4 w-20`} />
                <div className={`${baseClasses} h-12 w-full rounded-lg`} />
              </div>
              <div className="space-y-2">
                <div className={`${baseClasses} h-4 w-24`} />
                <div className={`${baseClasses} h-12 w-full rounded-lg`} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`${baseClasses} h-4 w-16`} />
              <div className={`${baseClasses} h-12 w-full rounded-lg`} />
            </div>

            <div className="space-y-2">
              <div className={`${baseClasses} h-4 w-20`} />
              <div className={`${baseClasses} h-32 w-full rounded-lg`} />
            </div>

            <div className={`${baseClasses} h-12 w-full rounded-lg`} />
          </div>
        );

      default:
        return (
          <div className={`${baseClasses} h-4 w-full ${className}`} />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  );
}

// Skeleton variants for different use cases
export const ProjectSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <SkeletonLoader type="project" count={count} />
  </div>
);

export const FormSkeleton = () => (
  <div className="max-w-2xl mx-auto">
    <SkeletonLoader type="form" />
  </div>
);

export const CardSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid md:grid-cols-3 gap-8">
    <SkeletonLoader type="card" count={count} />
  </div>
);