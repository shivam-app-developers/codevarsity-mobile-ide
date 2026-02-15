import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
    title: 'Education Philosophy | CodeVarsity',
    description: 'The philosophy and story behind CodeVarsity. Meet Marikanti Puli Bala Krishna, a solver dedicated to democratizing practical education through the Rhombus Methodology™.',
    path: '/about',
    type: 'website',
});

export default function AboutPage() {
    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "description": "CodeVarsity is a mobile-first coding ecosystem founded by Marikanti Puli Bala Krishna, dedicated to practical and solo-learning mastery.",
        "publisher": {
            "@type": "Organization",
            "name": "Shivam App Studio",
            "url": "https://codevarsity.app"
        },
        "mainEntity": {
            "@type": "Person",
            "name": "Marikanti Puli Bala Krishna",
            "jobTitle": "Founder & Lead Architect",
            "description": "An engineer and solver dedicated to revolutionizing practical education through immersive methodology."
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-brand-secondary/20">
            <JsonLd data={aboutSchema} />
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                {/* HERO SECTION - THE MANIFESTO */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-24">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-brand-primary">
                            The Solver's Manifesto
                        </div>
                        <h1 className="text-4xl sm:text-7xl font-black text-brand-primary leading-[1.1] tracking-tight mb-10 text-pretty">
                            "The issue decides <br />
                            <span className="text-brand-secondary">who I am.</span>"
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
                            CodeVarsity is the result of a decades-long pursuit to solve the most critical bottleneck in technical education: the transition from passive reading to active engineering.
                        </p>
                    </div>
                </section>

                {/* THE PHILOSOPHY - ISSUE AS A TEACHER */}
                <section className="py-24 bg-slate-50 border-y border-gray-100 mb-24">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-5xl font-black text-brand-primary mb-8 tracking-tight">The Education <span className="text-brand-secondary/80">Crisis</span></h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                                    I am <span className="text-brand-primary font-bold">Marikanti Puli Bala Krishna</span>. My background is in solving complex systems, whether software, mechanical, or hardware. When I looked at the current education system, I saw a broken machine.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                    Books and video tutorials often create a "mirage of knowledge." You think you understand because you are watching someone else solve a problem. But true professional mastery only happens when you are solo, standing face-to-face with the issue.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="aspect-[4/5] bg-white rounded-3xl border border-gray-200 shadow-2xl relative overflow-hidden group">
                                    <img
                                        src="/assets/founder.png"
                                        alt="Marikanti Puli Bala Krishna - Founder of CodeVarsity"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <p className="text-white font-black text-lg">M.P. Bala Krishna</p>
                                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Founder & Lead Architect</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE METHODOLOGY - RHOMBUS */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-brand-secondary mb-4">Engineering Mastery</h2>
                        <h3 className="text-3xl sm:text-5xl font-black text-brand-primary tracking-tight italic select-none">Rhombus Methodology™</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-brand-primary/5">
                            <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-6">
                                <i className="fa-solid fa-layer-group text-xl"></i>
                            </div>
                            <h4 className="font-black text-xl mb-4">Layers 1-3: Instruction</h4>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                We begin with a high-level conceptual overview, moving through theoretical logic and real-world examples to build a rock-solid mental map.
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] bg-brand-primary text-white shadow-2xl shadow-brand-primary/20">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-secondary mb-6 text-xl font-black">
                                4
                            </div>
                            <h4 className="font-black text-xl mb-4">Layer 4: Mastery Deep Dive</h4>
                            <p className="text-white/70 font-medium leading-relaxed">
                                This is the pivot point. We focus on technical precision and algorithmic rigor to ensure you aren't just "writing code," but architecting logic.
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-brand-primary/5">
                            <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-secondary mb-6">
                                <i className="fa-regular fa-paper-plane text-xl"></i>
                            </div>
                            <h4 className="font-black text-xl mb-4">Layers 5-7: Application</h4>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                The final spiral. Synthesis and independent problem solving. We remove the safety nets to prepare you for the professional world.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CORE VALUES */}
                <section className="py-24 bg-brand-primary text-white mb-32 overflow-hidden relative">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
                    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-brand-secondary mb-4">The Solver's Code</h2>
                            <h3 className="text-3xl sm:text-5xl font-black tracking-tight">Professional Values</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-16">
                            <div className="text-center md:text-left">
                                <div className="text-brand-secondary text-4xl font-black mb-6 italic">01.</div>
                                <h4 className="text-2xl font-bold mb-4 italic">Absolute Rigor</h4>
                                <p className="text-white/60 font-medium leading-relaxed">
                                    We don't accept abstractions. We build the physical and digital realities (compilers, visualizers) necessary for mastery.
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-brand-secondary text-4xl font-black mb-6 italic">02.</div>
                                <h4 className="text-2xl font-bold mb-4 italic">Autonomy First</h4>
                                <p className="text-white/60 font-medium leading-relaxed">
                                    The goal isn't to help you pass a test. The goal is to make you capable of solving any issue without a guide.
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-brand-secondary text-4xl font-black mb-6 italic">03.</div>
                                <h4 className="text-2xl font-bold mb-4 italic">Radical Transparency</h4>
                                <p className="text-white/60 font-medium leading-relaxed">
                                    We show you the internal state of code. We believe that when you see the "issue" clearly, the solution becomes inevitable.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE GOAL - SOLO LEARNERS */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-32">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-[2px] bg-brand-secondary/30"></div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-brand-secondary">The Ultimate Goal</h2>
                    </div>
                    <div className="space-y-12">
                        <h3 className="text-3xl sm:text-5xl font-black text-brand-primary tracking-tight">Fostering The <br />Solo Learner</h3>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            CodeVarsity is designed to make me redundant in your journey. We believe that everyone—regardless of their current skill level—can become a high-level professional if they are given the right environment to struggle, iterate, and solve.
                        </p>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            The current education system doesn't allow for this struggle. CodeVarsity enforces it through Ghost Code™, Bug Squashers, and native offline compilers that give you immediate, un-clouded feedback.
                        </p>
                    </div>
                </section>

                {/* CONTACT CTA */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="bg-brand-primary rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
                        <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 relative z-10 tracking-tight text-pretty">Empower your <br />technical autonomy.</h2>
                        <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto font-medium relative z-10">
                            Join thousands of solo-learners building their future directly on their phones.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                            <a href="https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab" target="_blank" className="bg-white text-brand-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl shadow-white/10">
                                Get Started Free
                            </a>
                            <a href="mailto:support@shivamappstudio.com" className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
                                Support & Collaboration
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
