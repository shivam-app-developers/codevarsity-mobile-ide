import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

const guidesDirectory = path.join(process.cwd(), 'content/user-guides');

function getAllGuideSlugs(dir: string): string[] {
  const slugs: string[] = [];
  if (!fs.existsSync(dir)) return slugs;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.endsWith('.md')) {
      const slug = entry.name.replace(/\.md$/, '');
      slugs.push(slug);
    }
  }
  return slugs;
}

export function generateStaticParams() {
  const slugs = getAllGuideSlugs(guidesDirectory);
  return slugs.map((slug) => ({ slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const fullPath = path.join(guidesDirectory, `${params.slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

        <Link href="/guides" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-8">
          <i className="fa-solid fa-arrow-left text-sm"></i>
          Back to Guides
        </Link>

        <article className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100">
          <header className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-4xl font-black text-gray-900 mb-4">{data.title}</h1>
            {data.description && (
              <p className="text-xl text-gray-600">{data.description}</p>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={content} />
          </div>
        </article>

      </div>
      <Footer />
    </div>
  );
}
