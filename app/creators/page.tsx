import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'YouTube Hub | CodeVarsity',
    description:
        'Search and watch any programming tutorial on YouTube while writing and running real code in a split-screen IDE — no switching apps, no losing focus.',
};

const features = [
    {
        icon: '🔍',
        title: 'Search Any Tutorial',
        body: 'Search millions of YouTube programming playlists and videos directly inside the app. No need to leave CodeVarsity.',
    },
    {
        icon: '📺',
        title: 'Split-Screen Workspace',
        body: 'Video plays on the top half. A full offline IDE runs on the bottom half. Watch the expert, then type it yourself instantly.',
    },
    {
        icon: '🔗',
        title: 'Paste Any YouTube URL',
        body: 'Already have a playlist or video link? Paste it directly. The app opens it in the interactive workspace in seconds.',
    },
    {
        icon: '💾',
        title: 'Practice History',
        body: "Every playlist or video you've practiced with is saved. Resume exactly where you left off, any time.",
    },
    {
        icon: '📶',
        title: 'Works Offline*',
        body: 'Download your workspace project and continue coding without internet. (*Internet required to stream YouTube video)',
    },
    {
        icon: '🌐',
        title: 'Any YouTube Channel',
        body: 'Not limited to our content. Search tutorials from freeCodeCamp, Telusko, CodeWithHarry, NetworkChuck — anyone.',
    },
];

const steps = [
    {
        num: '01',
        icon: 'fa-magnifying-glass',
        title: 'Search or Paste',
        body: 'Open the YouTube Hub tab. Search for any topic (e.g. "Python for beginners") or paste a direct YouTube playlist/video URL.',
    },
    {
        num: '02',
        icon: 'fa-mobile-screen',
        title: 'Open the Workspace',
        body: 'Tap any result. The video opens on the top half of your screen and a fully functional code editor opens on the bottom half.',
    },
    {
        num: '03',
        icon: 'fa-code',
        title: 'Code Along in Real-Time',
        body: 'As the instructor explains concepts, type the code yourself in the editor below. Hit "Run" to see the output instantly.',
    },
    {
        num: '04',
        icon: 'fa-floppy-disk',
        title: 'Save & Resume',
        body: 'Your progress is automatically saved. Come back any time and continue from where you left off.',
    },
];

const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share';

export default function YouTubeHubPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-red-100">
            <Navbar />
            <main className="pt-16">

                {/* HERO */}
                <section className="relative overflow-hidden bg-white pt-24 pb-32">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50/60 rounded-full blur-[120px] -mr-40 -mt-20 -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50/80 rounded-full blur-[100px] -ml-20 -mb-20 -z-10" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 items-center">

                            {/* Text */}
                            <div className="z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-black uppercase tracking-widest mb-6">
                                    <i className="fa-brands fa-youtube"></i> YouTube Hub
                                </div>
                                <h1 className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
                                    Watch. Code.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                                        Master.
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 max-w-lg">
                                    Search and watch any programming tutorial on YouTube while writing and running
                                    real code in a split-screen IDE — no switching apps, no losing focus.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <a
                                        href={PLAY_STORE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-red-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-red-200"
                                    >
                                        <i className="fa-brands fa-google-play"></i> Try YouTube Hub Free
                                    </a>
                                    <a
                                        href="#how-it-works"
                                        className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
                                    >
                                        See How it Works
                                    </a>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                                    <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> No sign-in required</span>
                                    <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Any YouTube channel</span>
                                    <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Offline IDE</span>
                                </div>
                            </div>

                            {/* Visual */}
                            <div className="relative z-10 hidden md:block">
                                <div className="bg-gray-900 rounded-[2rem] p-4 shadow-2xl shadow-gray-900/20 rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-black rounded-3xl overflow-hidden border border-gray-800">
                                        {/* Window Bar */}
                                        <div className="h-6 bg-gray-900 flex items-center px-4 gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                            <span className="ml-2 text-[9px] text-white/30 font-mono">YouTube Hub</span>
                                        </div>
                                        {/* Search Bar Mock */}
                                        <div className="bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-700">
                                            <i className="fa-brands fa-youtube text-red-500 text-sm"></i>
                                            <div className="flex-1 bg-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 font-mono">Python for beginners...</div>
                                            <i className="fa-solid fa-magnifying-glass text-gray-500 text-xs"></i>
                                        </div>
                                        {/* Video Area */}
                                        <div className="aspect-video bg-gray-800 relative flex items-center justify-center border-b border-gray-700">
                                            <div className="text-center">
                                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                                                    <i className="fa-solid fa-play text-2xl text-white/60 ml-1"></i>
                                                </div>
                                                <span className="text-[10px] text-white/30 font-mono">Python Crash Course — freeCodeCamp</span>
                                            </div>
                                            <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/10 rounded-full">
                                                <div className="w-1/3 h-full bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        {/* IDE Area */}
                                        <div className="h-48 bg-[#1e1e1e] p-4 font-mono text-xs">
                                            <div className="text-gray-500 mb-2"># Coding along with the tutorial</div>
                                            <div className="text-blue-400">def <span className="text-yellow-300">greet</span>(<span className="text-orange-300">name</span>):</div>
                                            <div className="pl-4 text-gray-300">print(f<span className="text-green-400">&quot;Hello, {`{name}`}!&quot;</span>)</div>
                                            <div className="mt-2 text-blue-400">greet(<span className="text-green-400">&quot;CodeVarsity&quot;</span>)</div>
                                            <div className="mt-4 pt-3 border-t border-gray-700">
                                                <div className="text-gray-500 text-[10px] mb-1">TERMINAL</div>
                                                <div className="text-white">Hello, CodeVarsity!</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -left-8 top-16 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3 animate-pulse">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                        <i className="fa-brands fa-youtube text-red-500 text-sm"></i>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-800">Any Channel</div>
                                        <div className="text-[9px] text-gray-400">freeCodeCamp · Telusko · NetworkChuck</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section className="py-24 bg-slate-50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                                Everything You Need to Code Along
                            </h2>
                            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                                One app. All the tools. Zero tab-switching.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((f) => (
                                <div
                                    key={f.title}
                                    className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="text-3xl mb-4">{f.icon}</div>
                                    <h3 className="font-black text-gray-900 text-xl mb-3">{f.title}</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium">{f.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section id="how-it-works" className="py-24 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                                How YouTube Hub Works
                            </h2>
                            <p className="text-lg text-gray-500 font-medium">
                                Four steps from search to shipping real code.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((s) => (
                                <div
                                    key={s.num}
                                    className="bg-slate-50 p-8 rounded-2xl border border-gray-100 group hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 text-8xl font-black text-gray-100 -mt-6 -mr-4 group-hover:text-red-50 transition-colors select-none">
                                        {s.num}
                                    </div>
                                    <div className="w-12 h-12 bg-red-100 text-red-500 flex items-center justify-center rounded-xl text-xl mb-6 relative z-10">
                                        <i className={`fa-solid ${s.icon}`}></i>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-3 relative z-10">{s.title}</h3>
                                    <p className="text-gray-600 leading-relaxed relative z-10 font-medium">{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="py-16 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: 'fa-earth-americas', stat: 'Any YouTube Channel', sub: 'freeCodeCamp to local creators' },
                            { icon: 'fa-code', stat: '10+ Languages', sub: 'In the split-screen IDE' },
                            { icon: 'fa-wifi-slash', stat: 'Offline IDE', sub: 'Code without internet' },
                            { icon: 'fa-clock-rotate-left', stat: 'Last 20 Sessions', sub: 'Practice history stored' },
                        ].map((item) => (
                            <div key={item.stat} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                                <i className={`fa-solid ${item.icon} text-red-400 text-2xl mb-3`}></i>
                                <div className="font-black text-gray-900 text-lg leading-tight mb-1">{item.stat}</div>
                                <div className="text-gray-400 text-xs font-medium">{item.sub}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-gray-900 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-4 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-red-400 text-xs font-black uppercase tracking-widest mb-8">
                            <i className="fa-brands fa-youtube"></i> YouTube Hub
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
                            Any Tutorial.<br />Any Channel.<br />Real Code.
                        </h2>
                        <p className="text-xl text-white/50 mb-12 font-medium">
                            Search millions of YouTube programming tutorials and start coding in seconds.
                        </p>
                        <a
                            href={PLAY_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-500 text-white px-10 py-5 rounded-2xl font-black text-lg inline-flex items-center gap-3 hover:bg-red-600 hover:-translate-y-0.5 transition-all shadow-2xl shadow-red-900/30"
                        >
                            <i className="fa-brands fa-google-play text-xl"></i> Download Free on Android
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
