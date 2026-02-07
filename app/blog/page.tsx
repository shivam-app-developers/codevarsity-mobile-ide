import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description: 'Insights on coding education, mobile development, visual learning, and programming best practices.',
  path: '/blog',
  type: 'website',
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background-soft flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-primary/5 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-brand-primary/5">
            CodeVarsity Research
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-brand-primary mb-6 tracking-tight">Institutional <span className="text-brand-secondary/80">Insights</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">Research, engineering logs, and pedagogical guides from our lead educators.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-[2.5rem] overflow-hidden border border-brand-primary/5 shadow-xl shadow-brand-primary/[0.03] hover:shadow-brand-primary/[0.08] transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-60 w-full relative overflow-hidden bg-brand-primary/5">
                {post.frontmatter.coverImage ? (
                  <img
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-brand-primary">
                    <i className="fa-solid fa-code text-5xl opacity-10 group-hover:scale-110 transition-transform"></i>
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-brand-primary/5">
                    {post.frontmatter.category}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <span>{post.frontmatter.date}</span>
                  <span className="text-brand-primary/20">•</span>
                  <span>By {post.frontmatter.author}</span>
                </div>
                <h2 className="text-2xl font-black text-brand-primary mb-6 group-hover:text-brand-secondary transition-colors leading-tight">{post.frontmatter.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">{post.frontmatter.excerpt}</p>
                <div className="flex items-center gap-3 text-brand-primary text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  <span>Enter Article</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}

