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
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import JsonLd from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'CodeVarsity: Learn to Code+IDE',
  description: 'Professional programming courses with offline IDE & compiler. Master Python, Java, JS, SQL, C++, Go with 30+ interactive visualizers.',
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
        <HowItWorks />
        <CoursesSection />
        <VisualizersSection />
        <SandboxSection />

        {/* INSTITUTIONAL PHILOSOPHY - OFFLINE */}
        <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
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
        <section className="py-24 bg-background-soft">
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
        <BlogRow posts={getAllPosts()} />
        <FAQSection />

        {/* CTA - ENROLL NOW */}
        <section className="py-28 bg-brand-primary text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-[140px] -mr-64 -mt-64"></div>
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Enroll in Mastery</h2>
            <p className="text-xl opacity-70 mb-12 font-medium">Join the elite ecosystem of mobile developers today.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="bg-white text-brand-primary px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl shadow-black/20 group">
                <i className="fa-brands fa-google-play text-2xl group-hover:rotate-12 transition-transform"></i>
                <div>
                  <div className="text-[10px] uppercase tracking-tighter opacity-70 leading-none text-left">Get it on</div>
                  <div className="text-lg leading-none mt-1">Google Play</div>
                </div>
              </Link>
              <Link href="#" className="border-2 border-white/20 px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 hover:bg-white/5 transition-all hover:border-white/40">
                <i className="fa-brands fa-apple text-2xl"></i>
                <span>iOS Coming Soon</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>

  );
}

