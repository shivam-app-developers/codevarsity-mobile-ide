import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coderkit.shivamappstudio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/account`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/stats-explained`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Add all blog posts
  const blogPosts = getBlogPosts();
  const blogSitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Add all doc pages
  const docPages = getDocPages();
  const docSitemap: MetadataRoute.Sitemap = docPages.map((page) => ({
    url: `${baseUrl}/docs/${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogSitemap, ...docSitemap];
}

function getBlogPosts(): { slug: string; date: string }[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  return files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    return {
      slug: filename.replace(/\.mdx$/, ''),
      date: (data as any).date || new Date().toISOString(),
    };
  });
}

function getDocPages(dir: string = '', basePath: string = ''): string[] {
  const docsDirectory = path.join(process.cwd(), 'content/docs', dir);

  if (!fs.existsSync(docsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(docsDirectory, { withFileTypes: true });
  const pages: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(basePath, entry.name);
    if (entry.isDirectory()) {
      pages.push(...getDocPages(path.join(dir, entry.name), fullPath));
    } else if (entry.name.endsWith('.mdx')) {
      const slug = entry.name.replace(/\.mdx$/, '');
      pages.push(fullPath + '/' + slug);
    }
  }

  return pages;
}
