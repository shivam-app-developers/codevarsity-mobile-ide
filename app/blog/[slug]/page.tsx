import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return createMetadata({ title: 'Not Found' });
  }

  return createMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.content.substring(0, 150),
    path: `/blog/${params.slug}`,
    type: 'article',
    publishedTime: post.frontmatter.date,
    author: post.frontmatter.author,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.frontmatter.title,
    "datePublished": post.frontmatter.date,
    "author": {
      "@type": "Person",
      "name": post.frontmatter.author
    },
    "articleBody": post.content.substring(0, 150) + "..."
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <JsonLd data={blogSchema} />
      <Navbar />
      <article className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">

        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-indigo-50 text-brand-primary text-xs font-bold rounded-full uppercase tracking-wider">{post.frontmatter.category}</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-500 text-sm">{post.frontmatter.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">{post.frontmatter.title}</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-sm">
              {post.frontmatter.author ? post.frontmatter.author.charAt(0) : 'C'}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">{post.frontmatter.author || 'CodeVarsity Team'}</p>
              <p className="text-xs text-gray-500">{post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
            <SocialShareButtons
              title={post.frontmatter.title}
              description={post.frontmatter.excerpt}
              url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`}
              showLabel={true}
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-lg prose-indigo max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">More Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {getAllPosts()
              .filter(p => p.slug !== params.slug)
              .slice(0, 2)
              .map(relatedPost => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                  <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-brand-primary hover:shadow-md transition">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">{relatedPost.frontmatter.category}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition">{relatedPost.frontmatter.title}</h4>
                    <p className="text-sm text-gray-600">{relatedPost.frontmatter.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </article>
      <Footer />
    </div>
  );
}
