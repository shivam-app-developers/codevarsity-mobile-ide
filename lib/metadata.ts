import { Metadata } from 'next';

export const siteConfig = {
  name: 'CodeVarsity',
  description: 'Learn, Practice, Build. Offline coding IDE for Android with Python, Java, Go, C and 28+ visualizers.',
  url: 'https://codevarsity.shivamappstudio.com',
  ogImage: 'https://codevarsity.shivamappstudio.com/og-image.png',
  links: {
    twitter: 'https://twitter.com/shivamappstudio',
    github: 'https://github.com/shivam-app-developers/codevarsity-mobile-ide',
  },
};

interface CreateMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  author?: string;
}

export function createMetadata({
  title,
  description,
  path = '/',
  ogImage = siteConfig.ogImage,
  type = 'website',
  publishedTime,
  author,
}: CreateMetadataProps): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
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
  };

  return metadata;
}

