import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'For Content Creators | CodeVarsity',
    description: 'Monetize your coding tutorials with interactive IDE starter templates.',
};

export default function CreatorsLandingPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-purple-200">
            <Navbar />
            <main className="pt-16">

                {/* HERO SECTION */}
                <section className="relative overflow-hidden bg-white pt-24 pb-32">
                    {/* Subtle background decoration */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-[100px] -mr-40 -mt-20 -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px] -ml-20 -mb-20 -z-10"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 items-center">

                            {/* Text Content */}
                            <div className="z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-6">
                                    <i className="fa-brands fa-youtube text-red-500"></i> YouTube Integration
                                </div>
                                <h1 className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
                                    Turn your videos into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">interactive apps.</span>
                                </h1>
                                <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 max-w-lg">
                                    Stop telling viewers to "check the GitHub link in the description." Attach a live, offline CodeVarsity IDE template directly to your YouTube videos.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/admin/login" className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-purple-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-purple-200">
                                        Get your @VanityCode
                                    </Link>
                                    <a href="#how-it-works" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
                                        See How it Works
                                    </a>
                                </div>

                                <div className="mt-10 flex items-center gap-6 text-sm text-gray-500 font-medium">
                                    <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Zero Setup</span>
                                    <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> 100% Free for Creators</span>
                                </div>
                            </div>

                            {/* Visual/Image Hero */}
                            <div className="relative z-10 hidden md:block">
                                <div className="bg-gray-900 rounded-[2rem] p-4 shadow-2xl shadow-purple-900/20 rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-black rounded-3xl overflow-hidden border border-gray-800">
                                        {/* Mock Phone UI */}
                                        <div className="h-6 bg-gray-900 flex items-center px-4 gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                        {/* Mock Video Area */}
                                        <div className="aspect-video bg-gray-800 relative flex items-center justify-center border-b border-gray-800">
                                            <i className="fa-solid fa-play text-4xl text-white/50"></i>
                                            <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/20 rounded-full">
                                                <div className="w-1/3 h-full bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        {/* Mock IDE Area */}
                                        <div className="h-64 bg-[#1e1e1e] p-4 font-mono text-sm">
                                            <div className="text-gray-400 mb-2">// Starter file provided by Creator</div>
                                            <div className="text-purple-400">function <span className="text-blue-400">main</span>() {'{'}</div>
                                            <div className="pl-4 text-gray-300">console.log(<span className="text-green-400">"Interactive code here!"</span>);</div>
                                            <div className="text-purple-400">{'}'}</div>

                                            {/* Terminal Mock */}
                                            <div className="mt-8 pt-4 border-t border-gray-800">
                                                <div className="text-gray-500 text-xs mb-1">TERMINAL</div>
                                                <div className="text-gray-300">$ node main.js</div>
                                                <div className="text-white">Interactive code here!</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating elements */}
                                <div className="absolute -left-8 top-12 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3 animate-pulse">
                                    <img src="https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg" alt="test" className="w-10 h-7 rounded object-cover" />
                                    <span className="text-xs font-bold text-gray-800">Video Synced</span>
                                    <i className="fa-solid fa-link text-purple-500"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section id="how-it-works" className="py-24 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">The Easiest Workflow in EdTech.</h2>
                            <p className="text-lg text-gray-600">No complicated APIs, no publishing delays. If you have a YouTube video, you can create a CodeVarsity lesson in 30 seconds.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 text-9xl font-black text-gray-50 -mt-8 -mr-8 group-hover:text-purple-50 transition-colors">1</div>
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-xl text-xl mb-6 relative z-10">
                                    <i className="fa-solid fa-link"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Paste a YouTube URL</h3>
                                <p className="text-gray-600 relative z-10">Log in to the Creator Dashboard and paste the public link to your YouTube video. We extract the ID and thumbnail automatically.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 text-9xl font-black text-gray-50 -mt-8 -mr-8 group-hover:text-purple-50 transition-colors">2</div>
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-xl text-xl mb-6 relative z-10">
                                    <i className="fa-solid fa-code"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Attach Starter Code</h3>
                                <p className="text-gray-600 relative z-10">Select a pre-written code snippet for Python, Go, Java, or C. When a user opens your video, this code preloads into their IDE immediately.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 text-9xl font-black text-gray-50 -mt-8 -mr-8 group-hover:text-purple-50 transition-colors">3</div>
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-xl text-xl mb-6 relative z-10">
                                    <i className="fa-solid fa-share-nodes"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Share Your Vanity Code</h3>
                                <p className="text-gray-600 relative z-10">Tell your viewers "Search for @MyChannel in the CodeVarsity app". They get a curated, distraction-free playlist of your interactive lessons.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-purple-900 text-white text-center">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-4xl font-black mb-6 tracking-tight">Ready to upgrade your tutorials?</h2>
                        <p className="text-xl text-purple-200 mb-10">Join the Creator Hub today and give your audience the interactive experience they deserve.</p>
                        <Link href="/admin/login" className="bg-white text-purple-900 px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-100 transition-colors inline-block">
                            Create Free Creator Account
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
