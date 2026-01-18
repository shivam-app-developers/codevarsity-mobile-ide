import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';
import fs from 'fs';
import path from 'path';

interface SearchResult {
  type: 'blog' | 'doc';
  title: string;
  description: string;
  slug: string;
  url: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query || query.length < 2) {
    return NextResponse.json([], { status: 200 });
  }

  const results: SearchResult[] = [];

  // Search blog posts
  try {
    const posts = getAllPosts();
    posts.forEach((post) => {
      const titleMatch = post.frontmatter.title.toLowerCase().includes(query);
      const descriptionMatch = post.frontmatter.excerpt?.toLowerCase().includes(query);
      const contentMatch = post.content.toLowerCase().includes(query);

      if (titleMatch || descriptionMatch || contentMatch) {
        results.push({
          type: 'blog',
          title: post.frontmatter.title,
          description: post.frontmatter.excerpt || post.content.substring(0, 100),
          slug: post.slug,
          url: `/blog/${post.slug}`,
        });
      }
    });
  } catch (error) {
    console.error('Error searching blog posts:', error);
  }

  // Search documentation
  try {
    const docsDir = path.join(process.cwd(), 'content/docs');
    
    function searchDocs(dir: string, prefix = '') {
      if (!fs.existsSync(dir)) return;
      
      const files = fs.readdirSync(dir);
      
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          searchDocs(filePath, `${prefix}${file}/`);
        } else if (file.endsWith('.mdx')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const fileSlug = file.replace('.mdx', '');
          const fullPath = `${prefix}${fileSlug}`;
          
          // Extract frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          let title = fileSlug;
          let description = '';
          
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(/title:\s*['"]?([^'"\n]+)['"]?/);
            const descriptionMatch = frontmatter.match(/description:\s*['"]?([^'"\n]+)['"]?/);
            
            if (titleMatch) title = titleMatch[1];
            if (descriptionMatch) description = descriptionMatch[1];
          }
          
          // Check if content matches query
          if (title.toLowerCase().includes(query) || 
              description.toLowerCase().includes(query) ||
              content.toLowerCase().includes(query)) {
            results.push({
              type: 'doc',
              title,
              description: description || content.substring(0, 100),
              slug: fullPath,
              url: `/docs/${fullPath}`,
            });
          }
        }
      });
    }
    
    searchDocs(docsDir);
  } catch (error) {
    console.error('Error searching docs:', error);
  }

  // Limit results to 10
  return NextResponse.json(results.slice(0, 10), { status: 200 });
}
