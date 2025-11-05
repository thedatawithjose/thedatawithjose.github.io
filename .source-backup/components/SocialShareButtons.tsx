'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SocialShareButtons({ 
  url, 
  title, 
  description = '', 
  className = '' 
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Construir URLs completas
  const fullUrl = url.startsWith('http') ? url : `https://thedatawithjose.github.io${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialButtons = [
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      color: 'bg-[#0077B5] hover:bg-[#005885]',
      url: shareLinks.linkedin
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      color: 'bg-[#1DA1F2] hover:bg-[#0d8bd9]',
      url: shareLinks.twitter
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      color: 'bg-[#1877F2] hover:bg-[#0d65d9]',
      url: shareLinks.facebook
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      color: 'bg-[#25D366] hover:bg-[#1da851]',
      url: shareLinks.whatsapp
    },
    {
      name: 'Telegram',
      icon: 'fab fa-telegram',
      color: 'bg-[#0088CC] hover:bg-[#006699]',
      url: shareLinks.telegram
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      color: 'bg-gray-600 hover:bg-gray-700',
      url: shareLinks.email
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="text-center mb-4">
        <span className="text-sm font-medium text-gray-600">Share:</span>
      </div>
      
      {/* Social Media Buttons - Grid Layout */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {socialButtons.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center min-h-[48px]`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Share on ${social.name}`}
          >
            <i className={`${social.icon} text-lg`}></i>
          </motion.a>
        ))}
      </div>

      {/* Copy Link Button - Full Width */}
      <motion.button
        onClick={copyToClipboard}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 min-h-[48px] ${
          copied 
            ? 'border-green-500 bg-green-50 text-green-700' 
            : 'border-gray-300 bg-white text-gray-700 hover:border-[#00BFA5] hover:bg-[#00BFA5]/5'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        title="Copy link"
      >
        <i className={`${copied ? 'fas fa-check' : 'fas fa-link'} text-base`}></i>
        <span className="text-base font-medium">
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </motion.button>
    </div>
  );
}