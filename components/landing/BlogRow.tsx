'use client';

import Link from 'next/link';

interface BlogPost {
    slug: string;
    frontmatter: {
        title: string;
        excerpt: string;
        category: string;
        date: string;
        coverImage?: string;
    };
}

interface BlogRowProps {
    posts: BlogPost[];
}

export default function BlogRow({ posts }: BlogRowProps) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-primary tracking-tight">Latest <span className="text-brand-secondary/80">Insights</span></h2>
                        <p className="text-gray-500 mt-2 font-medium">Technical guides, engineering logs, and updates from our team.</p>
                    </div>
                    <Link href="/blog" className="hidden sm:inline-flex text-brand-primary font-black uppercase tracking-widest text-[10px] hover:underline items-center gap-2 mb-2">
                        Browse All <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                </div>

                {/* Horizontal scrollable row */}
                <div className="flex gap-8 overflow-x-auto pb-12 -mx-4 px-4 scrollbar-hide">
                    {posts.slice(0, 5).map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="flex-shrink-0 w-80 group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover"
                        >
                            {/* Pattern Overlay */}
                            <div className='absolute inset-0 premium-grid pointer-events-none'></div>

                            <div className="h-44 bg-brand-primary/5 flex items-center justify-center relative overflow-hidden">
                                {post.frontmatter.coverImage ? (
                                    <img
                                        src={post.frontmatter.coverImage}
                                        alt={post.frontmatter.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent flex items-center justify-center">
                                        <i className="fa-regular fa-newspaper text-5xl text-brand-primary/10 group-hover:scale-110 transition-transform duration-500"></i>
                                    </div>
                                )}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] border border-brand-primary/10 shadow-sm">
                                        {post.frontmatter.category}
                                    </span>
                                </div>
                                {/* Gradient Wash */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="p-8 relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary"></span>
                                    <span className="text-[10px] text-brand-primary/60 font-black tracking-widest uppercase">{post.frontmatter.date}</span>
                                </div>
                                <h3 className="font-black text-brand-primary text-xl mb-4 group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2 leading-tight tracking-tight">
                                    {post.frontmatter.title}
                                </h3>
                                <p className="text-gray-500 text-[13px] line-clamp-2 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    {post.frontmatter.excerpt}
                                </p>

                                <div className="mt-8 pt-6 border-t border-brand-primary/5 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-secondary transition-all">Read Article</span>
                                    <i className="fa-solid fa-arrow-right-long text-xs text-brand-primary/20 group-hover:text-brand-secondary group-hover:translate-x-2 transition-all"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
