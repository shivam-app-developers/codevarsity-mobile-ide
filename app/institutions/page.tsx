import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'For Educators & Institutions | CodeVarsity',
    description: 'Manage students, track progress, and assign offline coding practice with CodeVarsity Institute.',
};

import DashboardMockupImage from './DashboardMockupImage';

export default function InstitutionsLandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-16">

                {/* HERO SECTION */}
                <section className="bg-brand-primary text-white pt-24 pb-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-[120px] -mr-40 -mt-20"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                                    CodeVarsity Institute
                                </div>
                                <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                                    The ultimate mobile <span className="text-brand-secondary">Computer Science</span> lab.
                                </h1>
                                <p className="text-xl text-brand-primary-light font-medium leading-relaxed mb-8 max-w-lg opacity-90">
                                    Empower your students with a true offline compiler. Track progress, enforce rigorous practice with Ghost Code™, and manage massive rosters directly from your web dashboard.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/login" className="bg-white text-brand-primary px-8 py-4 rounded-xl font-black flex justify-center items-center gap-2 hover:bg-gray-100 transition-colors shadow-xl shadow-black/20">
                                        Go to Admin Dashboard
                                    </Link>
                                    <a href="#features" className="bg-brand-primary-dark/50 border border-white/20 text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-brand-primary-dark transition-colors">
                                        Explore Features
                                    </a>
                                </div>
                            </div>

                            {/* Dashboard Preview Image/Mock */}
                            <div className="hidden md:block">
                                <div className="bg-white/5 border border-white/10 p-2 rounded-2xl shadow-2xl backdrop-blur-sm -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <DashboardMockupImage />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section id="features" className="py-24 bg-gray-50 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary mb-4 tracking-tight">Built for Academic Rigor.</h2>
                            <p className="text-lg text-gray-600">Everything you need to manage a massive cohort of students learning to code on their phones.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon="fa-users"
                                title="CSV Roster Management"
                                description="Upload student rosters instantly. Students securely join their assigned class using a 6-digit PIN and verify their identity against your roster."
                            />
                            <FeatureCard
                                icon="fa-layer-group"
                                title="Class Segmentation"
                                description="Organize hundreds of students into distinct classes. Control exactly which coding languages and courses each specific class has access to."
                            />
                            <FeatureCard
                                icon="fa-bullseye"
                                title="Ghost Code™ Methodology"
                                description="The CodeVarsity app forces students to memorize syntax. Enforce rigorous daily practice exercises without the distraction of a web browser."
                            />
                            <FeatureCard
                                icon="fa-wifi"
                                title="100% Offline Capability"
                                description="Level the playing field. Students who lack laptops or consistent home internet can compile Python, Java and C code directly on their smartphones."
                            />
                            <FeatureCard
                                icon="fa-chart-pie"
                                title="Progress Analytics"
                                description="Monitor exact completion rates of assignments across your entire student body directly from the Teacher Dashboard."
                            />
                            <FeatureCard
                                icon="fa-palette"
                                title="Institute Branding"
                                description="Make the app your own. Add your school logo and brand colors to the student's mobile app interface when they join your class."
                            />
                        </div>
                    </div>
                </section>

                {/* REINFORCING CTA */}
                <section className="py-24 bg-white text-center">
                    <div className="max-w-3xl mx-auto px-4">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-2xl mx-auto text-2xl mb-6 shadow-sm">
                            <i className="fa-solid fa-graduation-cap"></i>
                        </div>
                        <h2 className="text-4xl font-black text-brand-primary mb-6 tracking-tight">Take Control of Your Curriculum</h2>
                        <p className="text-xl text-gray-500 mb-10 leading-relaxed">Join innovative bootcamps and universities upgrading their mobile learning infrastructure.</p>
                        <Link href="/login" className="bg-brand-primary text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-brand-primary-dark hover:-translate-y-1 transition-all shadow-xl shadow-brand-primary/20 inline-block">
                            Login to Admin Portal
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl text-xl mb-6">
                <i className={`fa-solid ${icon}`}></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
        </div>
    );
}
