'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CompactSocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function CompactSocialShare({ 
  url, 
  title, 
  description = '', 
  className = '' 
}: CompactSocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Construir URLs completas
  const fullUrl = url.startsWith('http') ? url : `https://thedatawithjose.github.io${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setIsOpen(false);
  };

  const socialButtons = [
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      color: 'text-[#0077B5] hover:bg-[#0077B5] hover:text-white',
      url: shareLinks.linkedin
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      color: 'text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white',
      url: shareLinks.twitter
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      color: 'text-[#25D366] hover:bg-[#25D366] hover:text-white',
      url: shareLinks.whatsapp
    }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-500 hover:text-[#00BFA5] transition-colors text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="fas fa-share-alt text-xs"></i>
        <span className="hidden sm:inline">Share</span>
      </motion.button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-20 min-w-[160px]"
          >
            <div className="flex flex-col gap-1">
              {socialButtons.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${social.color}`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className={`${social.icon} text-sm w-4`}></i>
                  <span className="text-sm font-medium">{social.name}</span>
                </a>
              ))}
              
              <hr className="my-1 border-gray-200" />
              
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                  copied 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${copied ? 'fas fa-check' : 'fas fa-link'} text-sm w-4`}></i>
                <span className="text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy link'}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}