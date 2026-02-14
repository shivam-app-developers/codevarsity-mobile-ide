import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import CoursesSection from '@/components/landing/CoursesSection';
import VisualizersSection from '@/components/landing/VisualizersSection';
import SandboxSection from '@/components/landing/SandboxSection';
import VSCodeSection from '@/components/landing/VSCodeSection';
import ComparisonTable from '@/components/landing/ComparisonTable';
import FAQSection from '@/components/landing/FAQSection';
import BlogRow from '@/components/landing/BlogRow';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PAASection from '@/components/landing/PAASection';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import JsonLd from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  path: '/',
  type: 'website',
});

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is CodeVarsity free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The app is free to download with basic lessons. Full courses and certificates require a premium subscription."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CodeVarsity includes a true offline compiler for Python, C, C++, and Java. You can code without an internet connection."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={faqSchema} />
      <Navbar />
      <main>
        <HeroSection />
        <PAASection />

        {/* AEO: DEFINITION BLOCK */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black text-brand-primary mb-4 text-center">Master Computer Science: Anywhere.</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">
              CodeVarsity is the <strong>complete coding education platform</strong> that combines a professional <strong>offline mobile IDE</strong> with <strong>50+ structured courses</strong>.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              Master <strong>Python, Java, C++, Go, SQL</strong>, and more using our unique <strong>Rhombus Methodology™</strong>, which integrates 30+ interactive visualizers directly into your learning journey—all without needing an internet connection.
            </p>
          </div>
        </section>

        {/* AEO: USE CASES */}
        <section className="py-12 bg-slate-50 text-slate-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-black text-brand-primary mb-8 text-center">Who is CodeVarsity for?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">For Students</h3>
                  <p className="text-gray-600 text-sm mb-4">CodeVarsity is useful for students learning programming who need a reliable mobile compiler for practice anytime, anywhere.</p>
                </div>
                <Link href="/docs/user-guides/getting-started" className="text-brand-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                  Learn More <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">For Beginners</h3>
                  <p className="text-gray-600 text-sm mb-4">CodeVarsity is designed for beginners without laptops, offering a complete curriculum from "Hello World" to complex algorithms directly on a phone.</p>
                </div>
                <Link href="/docs/user-guides/learn-mode-guide" className="text-brand-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                  Start Learning <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">For Professionals</h3>
                  <p className="text-gray-600 text-sm mb-4">CodeVarsity is useful for practicing coding while traveling or commuting, allowing developers to prototype ideas offline in Python or Go.</p>
                </div>
                <Link href="/docs/product/product-overview" className="text-brand-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                  Capabilities <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <CoursesSection />
        <VisualizersSection />
        <SandboxSection />

        {/* INSTITUTIONAL PHILOSOPHY - OFFLINE */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden border-t border-white/10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(10,77,64,0.3)_0%,transparent_100%)]"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              True Technical Autonomy
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-10 tracking-tight leading-tight">Master Your Craft.<br />Anywhere. Anytime.</h2>
            <div className="flex flex-wrap justify-center gap-12 text-sm font-black uppercase tracking-widest opacity-60">
              <span className="flex items-center gap-2"><i className="fa-solid fa-plane"></i> Aviation Mode</span>
              <span className="flex items-center gap-2"><i className="fa-solid fa-train"></i> Transit Mode</span>
              <span className="flex items-center gap-2"><i className="fa-solid fa-mountain"></i> Frontier Mode</span>
            </div>
          </div>
        </section>

        <VSCodeSection />

        {/* OBJECTIONS / ACADEMIC RIGOR */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-primary text-center mb-16 tracking-tight">The CodeVarsity <span className="text-brand-secondary/80">Standard</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-[32px] border border-brand-primary/5 shadow-xl shadow-brand-primary/5 hover:-translate-y-2 transition-transform">
                <p className="font-black text-brand-primary mb-4 text-lg">Rigorous Practice</p>
                <p className="text-gray-500 font-medium leading-relaxed">Watching tutorials is passive. CodeVarsity enforces active execution through Ghost Code™ and institutional labs.</p>
              </div>
              <div className="bg-white p-10 rounded-[32px] border border-brand-primary/5 shadow-xl shadow-brand-primary/5 hover:-translate-y-2 transition-transform">
                <p className="font-black text-brand-primary mb-4 text-lg">Offline Fidelity</p>
                <p className="text-gray-500 font-medium leading-relaxed">We don't cheat with wrappers. Experience desktop-grade compilers for Java, C, and Go directly on your device.</p>
              </div>
              <div className="bg-white p-10 rounded-[32px] border border-brand-primary/5 shadow-xl shadow-brand-primary/5 hover:-translate-y-2 transition-transform">
                <p className="font-black text-brand-primary mb-4 text-lg">Academic Support</p>
                <p className="text-gray-500 font-medium leading-relaxed">Visualizers for sorting, recursion, and memory aren't features—they are essentials for mastering computer science.</p>
              </div>
            </div>
          </div>
        </section>

        <ComparisonTable />
        <TestimonialsSection />
        <BlogRow posts={getAllPosts()} />
        <FAQSection />

        {/* CTA - ENROLL NOW */}
        <section className="py-28 bg-brand-primary text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-[140px] -mr-64 -mt-64"></div>
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Enroll in Mastery</h2>
            <p className="text-xl opacity-70 mb-12 font-medium">Join the elite ecosystem of mobile developers today.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-primary px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl shadow-black/20 group">
                <i className="fa-brands fa-google-play text-2xl group-hover:rotate-12 transition-transform"></i>
                <div>
                  <div className="text-[10px] uppercase tracking-tighter opacity-70 leading-none text-left">Get it on</div>
                  <div className="text-lg leading-none mt-1">Google Play</div>
                </div>
              </a>
              <div className="border-2 border-white/20 px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 bg-white/5 opacity-60 cursor-not-allowed">
                <i className="fa-brands fa-apple text-2xl"></i>
                <span>iOS Coming Soon</span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>

  );
}

