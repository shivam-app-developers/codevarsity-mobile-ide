import Link from 'next/link';

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
        body: 'Download your workspace project and continue coding even without internet. (*Video streaming requires connection)',
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
        title: 'Search or Paste',
        body: 'Open the YouTube Hub tab. Search for any topic (e.g. "Python for beginners") or paste a direct YouTube playlist/video URL.',
    },
    {
        num: '02',
        title: 'Open the Workspace',
        body: 'Tap any result. The video opens on the top half of your screen and a fully functional code editor opens on the bottom half.',
    },
    {
        num: '03',
        title: 'Code Along in Real-Time',
        body: 'As the instructor explains concepts, type the code yourself in the editor below. Hit "Run" to see the output instantly.',
    },
    {
        num: '04',
        title: 'Save & Resume',
        body: 'Your progress is automatically saved. Come back any time and continue from where you left off.',
    },
];

const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share';

export default function YouTubeHubSection() {
    return (
        <section id="youtube-hub" className="py-24 bg-white border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6">
                        <i className="fa-brands fa-youtube"></i> New Feature
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                        Watch. Code. Master.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                            All in One Screen.
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        CodeVarsity's YouTube Hub lets you search and watch any programming tutorial on YouTube
                        while writing and running real code in a split-screen IDE — no switching apps, no losing focus.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="bg-slate-50 rounded-2xl p-6 border border-gray-100 hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-3xl mb-4">{f.icon}</div>
                            <h3 className="font-black text-gray-900 text-lg mb-2">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.body}</p>
                        </div>
                    ))}
                </div>

                {/* How It Works */}
                <div className="bg-gray-900 rounded-[2.5rem] p-10 sm:p-16 mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="text-center mb-14">
                            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                                How It Works
                            </h3>
                            <p className="text-white/50 font-medium">Four steps from zero to coding alongside any YouTube tutorial.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((s) => (
                                <div key={s.num} className="group">
                                    <div className="text-5xl font-black text-white/10 mb-3 group-hover:text-red-500/30 transition-colors">
                                        {s.num}
                                    </div>
                                    <h4 className="font-black text-white text-base mb-2">{s.title}</h4>
                                    <p className="text-white/50 text-sm leading-relaxed font-medium">{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                    {[
                        'Works with any YouTube programming channel',
                        'Supports 10+ languages in the split-screen IDE',
                        'No internet required for the code editor (offline-first)',
                        'Practice history stores your last 20 sessions',
                    ].map((stat) => (
                        <div
                            key={stat}
                            className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-100"
                        >
                            <i className="fa-solid fa-circle-check text-green-500 mt-0.5 flex-shrink-0"></i>
                            <span className="text-sm font-semibold text-gray-700">{stat}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-red-600 hover:-translate-y-0.5 transition-all shadow-xl shadow-red-500/20 mr-4"
                    >
                        <i className="fa-brands fa-google-play"></i> Try YouTube Hub Free
                    </a>
                    <Link
                        href="/creators"
                        className="inline-flex items-center gap-2 text-gray-600 font-bold px-6 py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        Learn More <i className="fa-solid fa-arrow-right text-sm"></i>
                    </Link>
                </div>

            </div>
        </section>
    );
}
