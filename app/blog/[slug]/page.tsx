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
      "name": post.frontmatter.author || "CodeVarsity Team"
    },
    "image": post.frontmatter.coverImage || `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
    "publisher": {
      "@type": "Organization",
      "name": "CodeVarsity",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/assets/logo-brand.png`
      }
    },
    "articleBody": post.content.substring(0, 200) + "..."
  };

  return (
    <div className="min-h-screen bg-background-soft flex flex-col">
      <JsonLd data={blogSchema} />
      <Navbar />
      <article className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Column */}
          <div className="flex-grow lg:max-w-3xl">
            <header className="mb-16">
              <Link href="/blog" className="inline-flex items-center gap-3 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10 group">
                <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
                <span>Institutional Archive</span>
              </Link>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest border border-brand-primary">
                    {post.frontmatter.category}
                  </span>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-primary leading-[1.05] tracking-tighter">
                  {post.frontmatter.title}
                </h1>

                <div className="flex items-center gap-5 pt-4 lg:hidden">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-black text-xl shadow-xl shadow-brand-primary/20">
                    {post.frontmatter.author ? post.frontmatter.author.charAt(0) : 'C'}
                  </div>
                  <div>
                    <p className="text-sm font-black text-brand-primary uppercase tracking-tight">{post.frontmatter.author || 'CodeVarsity Team'}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Faculty Member</p>
                  </div>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-brand-primary/[0.04] border border-brand-primary/5 overflow-hidden">
              {post.frontmatter.coverImage && (
                <div className="h-64 sm:h-80 lg:h-[450px] w-full relative">
                  <img
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              <div className="p-10 md:p-16 prose prose-university max-w-none">
                <MDXRemote source={post.content} />
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-10">
              {/* Author Card */}
              <div className="bg-white rounded-[2rem] border border-brand-primary/5 p-8 shadow-xl shadow-brand-primary/[0.04]">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Lead Educator</h4>
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-brand-primary/20 transition-transform hover:rotate-3">
                    {post.frontmatter.author ? post.frontmatter.author.charAt(0) : 'C'}
                  </div>
                  <div>
                    <p className="text-base font-black text-brand-primary tracking-tight leading-none mb-1">{post.frontmatter.author || 'CodeVarsity Team'}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Curriculum Dean</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8">
                  Specializing in low-latency mobile runtimes and institutional pedagogy for computer science.
                </p>
                <div className="pt-8 border-t border-gray-50 flex items-center gap-4 text-gray-300">
                  <a href="#" className="hover:text-brand-primary transition-all hover:scale-110"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="#" className="hover:text-brand-primary transition-all hover:scale-110"><i className="fa-brands fa-linkedin"></i></a>
                  <a href="#" className="hover:text-brand-primary transition-all hover:scale-110"><i className="fa-brands fa-github"></i></a>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-[2rem] border border-brand-primary/5 p-8 shadow-xl shadow-brand-primary/[0.04]">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Distribute</h4>
                <SocialShareButtons
                  title={post.frontmatter.title}
                  description={post.frontmatter.excerpt}
                  url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`}
                  showLabel={false}
                />
              </div>

              {/* Stats Card */}
              <div className="bg-brand-primary rounded-[2rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-3 text-white/40 mb-3 relative z-10">
                  <i className="fa-solid fa-book-open text-xs"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">Study Time</span>
                </div>
                <p className="text-3xl font-black text-white relative z-10">
                  {Math.ceil(post.content.split(' ').length / 200)} <span className="text-base font-medium opacity-40">MIN</span>
                </p>
                <p className="text-[10px] text-white/30 mt-2 font-bold uppercase tracking-[0.1em] relative z-10">Institutional Reading Rate</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <div className="mt-32 pt-20 border-t border-brand-primary/5">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black text-brand-primary tracking-tight">Academic <span className="text-brand-secondary/80">Follow-up</span></h3>
            <Link href="/blog" className="text-brand-primary font-black uppercase tracking-widest text-[10px] hover:underline">View All Research</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {getAllPosts()
              .filter(p => p.slug !== params.slug)
              .slice(0, 2)
              .map(relatedPost => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block h-full">
                  <div className="bg-white rounded-[2.5rem] border border-brand-primary/5 p-10 h-full shadow-xl shadow-brand-primary/[0.03] hover:shadow-brand-primary/[0.08] hover:border-brand-primary/10 transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-brand-primary/5">{relatedPost.frontmatter.category}</span>
                      <span className="text-gray-300 font-bold">•</span>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{relatedPost.frontmatter.date}</span>
                    </div>
                    <h4 className="text-2xl font-black text-brand-primary mb-5 group-hover:text-brand-secondary transition-colors leading-tight">{relatedPost.frontmatter.title}</h4>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-8 flex-grow font-medium leading-relaxed">{relatedPost.frontmatter.excerpt}</p>
                    <div className="flex items-center gap-3 text-brand-primary text-[10px] font-black uppercase tracking-widest mt-auto">
                      <span>Enter Article</span>
                      <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
                    </div>
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
