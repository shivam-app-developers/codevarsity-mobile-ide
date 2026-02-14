import { Metadata } from 'next';

export const siteConfig = {
  name: 'CodeVarsity',
  shortName: 'CodeVarsity', // Used for site name in search
  description: 'Pro mobile IDE & coding courses. Learn Python, Java, JS, SQL, Go & C offline with 30+ interactive visualizers and Rhombus Methodology™.',
  url: 'https://codevarsity.shivamappstudio.com',
  ogImage: 'https://codevarsity.shivamappstudio.com/og-image.png',
  keywords: [
    'CodeVarsity',
    'Learn to Code',
    'Mobile IDE',
    'Offline Programming',
    'Python Tutorial Android',
    'Java Compiler Mobile',
    'Coding Courses',
    'Rhombus Methodology',
    'SQL Mobile',
    'JavaScript IDE',
    'Go Programming',
    'C Programming Mobile',
    'Bug Squasher',
    'Visual Learning',
    'Software Development App'
  ],
  links: {
    twitter: 'https://twitter.com/shivamappstudio',
    github: 'https://github.com/shivam-app-developers/codevarsity-mobile-ide',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/logo-brand.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/logo-brand.png', sizes: '48x48', type: 'image/png' },
      { url: '/assets/logo-brand.png', sizes: '96x96', type: 'image/png' },
      { url: '/assets/logo-brand.png', sizes: '144x144', type: 'image/png' },
      { url: '/assets/logo-brand.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/assets/logo-brand.png',
    apple: [
      { url: '/assets/logo-brand.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

interface CreateMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  author?: string;
}

export function createMetadata({
  title,
  description,
  path = '/',
  ogImage = siteConfig.ogImage,
  keywords = siteConfig.keywords,
  type = 'website',
  publishedTime,
  author,
}: CreateMetadataProps): Metadata {
  const fullTitle = title || 'CodeVarsity: Learn To Code In Mobile IDE';
  const fullDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.join(', '),
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && type === 'article' && { publishedTime }),
      ...(author && type === 'article' && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: '@shivamappstudio',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: siteConfig.icons,
  };

  return metadata;
}

