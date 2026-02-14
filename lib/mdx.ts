import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string;
    author: string;
    category: string;
  };
  content: string;
}

export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    // Filter to only include .md and .mdx files
    const mdFiles = fileNames.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

    const allPostsData = mdFiles.map((fileName) => {
      try {
        // Remove both .md and .mdx extensions
        const slug = fileName.replace(/\.(md|mdx)$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Basic validation of required frontmatter
        if (!data.title || !data.author || !data.date) {
          console.warn(`Post ${fileName} is missing required frontmatter fields.`);
          return null;
        }

        return {
          slug,
          frontmatter: data as BlogPost['frontmatter'],
          content,
        };
      } catch (err) {
        console.error(`Error parsing blog post ${fileName}:`, err);
        return null;
      }
    }).filter((post): post is BlogPost => post !== null);

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  } catch (err) {
    console.error('Error reading blog directory:', err);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Try .mdx first, then .md
  let fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${slug}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as BlogPost['frontmatter'],
    content,
  };
}
