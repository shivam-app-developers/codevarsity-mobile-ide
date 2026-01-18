import React from 'react';

interface SocialShareProps {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  showLabel?: boolean;
}

export function SocialShareButtons({ title, description, url, imageUrl, showLabel = true }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const socialLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=shivamappstudio`,
      icon: 'fa-x-twitter',
      color: 'text-black hover:bg-black',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'fa-facebook',
      color: 'text-blue-600 hover:bg-blue-600',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: 'fa-linkedin',
      color: 'text-blue-700 hover:bg-blue-700',
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: 'fa-whatsapp',
      color: 'text-green-600 hover:bg-green-600',
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
      icon: 'fa-envelope',
      color: 'text-gray-600 hover:bg-gray-600',
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {showLabel && <span className="text-sm font-medium text-gray-600">Share:</span>}
      <div className="flex gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${link.name}`}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${link.color} hover:text-white`}
          >
            <i className={`fa-brands ${link.icon}`}></i>
          </a>
        ))}
      </div>
    </div>
  );
}
