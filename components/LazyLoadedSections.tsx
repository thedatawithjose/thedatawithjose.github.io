'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Lazy load heavy sections with intersection observer
const SkillsSection = dynamic(() => import('./SkillsSection'), {
  loading: () => (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  ),
});

const InteractivePortfolio = dynamic(() => import('./InteractivePortfolio'), {
  loading: () => (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  ),
});

const TechnicalBlog = dynamic(() => import('./TechnicalBlog'), {
  loading: () => (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  ),
});

const TestimonialsSection = dynamic(() => import('./TestimonialsSection'), {
  loading: () => (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  ),
});

interface LazyLoadedSectionsProps {
  className?: string;
}

export default function LazyLoadedSections({ className = '' }: LazyLoadedSectionsProps) {
  const [visibleSections, setVisibleSections] = useState({
    skills: false,
    portfolio: false,
    blog: false,
    testimonials: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              setVisibleSections(prev => ({
                ...prev,
                [sectionName]: true,
              }));
            }
          }
        });
      },
      {
        rootMargin: '100px', // Load 100px before the section comes into view
        threshold: 0.1,
      }
    );

    // Observe placeholder elements
    const placeholders = document.querySelectorAll('[data-section]');
    placeholders.forEach(placeholder => observer.observe(placeholder));

    return () => {
      placeholders.forEach(placeholder => observer.unobserve(placeholder));
    };
  }, []);

  return (
    <div className={className}>
      {/* Skills Section */}
      <div data-section="skills">
        {visibleSections.skills ? (
          <SkillsSection />
        ) : (
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Portfolio */}
      <div data-section="portfolio">
        {visibleSections.portfolio ? (
          <InteractivePortfolio />
        ) : (
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Technical Blog */}
      <div data-section="blog">
        {visibleSections.blog ? (
          <TechnicalBlog />
        ) : (
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Testimonials */}
      <div data-section="testimonials">
        {visibleSections.testimonials ? (
          <TestimonialsSection />
        ) : (
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}