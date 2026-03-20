import Link from 'next/link';

const challengeTypes = [
    {
        emoji: '🐛',
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-100',
        accentColor: 'text-red-600',
        tagColor: 'bg-red-100 text-red-700',
        title: 'Bug Squasher',
        headline: 'Hunt the Bug. Kill It.',
        body: 'You are given broken code that contains a real bug. Your job? Find it, fix it, and prove you understand why it was wrong. No hints until you ask for one.',
        perfect: 'Debugging skills, reading code, attention to detail',
        tags: ['#Debugging', '#RealWorldCode', '#BugHunting'],
    },
    {
        emoji: '✂️',
        color: 'amber',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        accentColor: 'text-amber-600',
        tagColor: 'bg-amber-100 text-amber-700',
        title: 'Code Refactor',
        headline: 'Messy Code? Clean It Up.',
        body: 'You receive working but poorly-written code. Your challenge is to rewrite it to be cleaner, more readable, and more efficient — without breaking it.',
        perfect: 'Clean code principles, best practices, code quality',
        tags: ['#CleanCode', '#Refactoring', '#BestPractices'],
    },
    {
        emoji: '🧭',
        color: 'brand',
        bgColor: 'bg-brand-primary/5',
        borderColor: 'border-brand-primary/10',
        accentColor: 'text-brand-primary',
        tagColor: 'bg-brand-primary/10 text-brand-primary',
        title: 'Guided Practice',
        headline: 'Build It from Scratch. With Guidance.',
        body: "You get a blank function and a description of what it should do. Ghost code hints appear as you type, guiding you if you get stuck. The goal: write the function completely on your own.",
        perfect: 'Problem solving, logic, building confidence',
        tags: ['#HandsOn', '#ProblemSolving', '#InteractiveCoding'],
    },
];

const features = [
    { icon: '📦', title: '1000+ Challenges Available', body: 'Covering Python, Java, JavaScript, Go, SQL, C, HTML/CSS, and more. New challenges added regularly.' },
    { icon: '🎯', title: '3 Difficulty Levels', body: 'Beginner, Intermediate, and Advanced. Start where you are, progress at your pace.' },
    { icon: '🔴', title: 'Real Compiler, Real Feedback', body: 'Every challenge runs in our offline compiler. You see real output — no simulated "correct/wrong" gimmicks.' },
    { icon: '🏆', title: 'Track Your Score', body: 'Earn XP. Build streaks. See your Bug Squasher score rise. All stats appear on your public profile.' },
    { icon: '⚡', title: 'No Setup Required', body: 'Open a snippet and start coding in under 5 seconds. No project setup, no boilerplate, no fuss.' },
    { icon: '🔁', title: 'Retry Until You Get It Right', body: 'Failed a challenge? Review the hint, try again. Progress is saved so you pick up where you stopped.' },
];

const steps = [
    { num: '01', title: 'Choose a Language & Type', body: 'Navigate to Practice Snippets. Filter by language (e.g., Python) and type (Bug Squasher, Refactor, Guided).' },
    { num: '02', title: 'Read the Challenge', body: "Each snippet shows the code and a description of what's wrong or what you need to build." },
    { num: '03', title: 'Code Your Solution', body: 'Use the built-in editor. The real offline compiler runs your code and shows actual output — not a simulation.' },
    { num: '04', title: 'Check & Learn', body: 'Submit your solution. See if it passes the test cases. Read the explanation to understand deeply.' },
];

const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share';

export default function PracticeSnippetsSection() {
    return (
        <section id="practice-snippets" className="py-24 bg-slate-50 border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-6">
                        <i className="fa-solid fa-fire"></i> 1000+ Challenges
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                        Tiny Challenges.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                            Massive Skill Gains.
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Stop reading. Start doing. CodeVarsity's Practice Snippets give you bite-sized,
                        real-world coding challenges that train your fingers to write good code —
                        not just your brain to remember it.
                    </p>
                </div>

                {/* Challenge Type Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {challengeTypes.map((c) => (
                        <div
                            key={c.title}
                            className={`${c.bgColor} rounded-[2rem] p-8 border ${c.borderColor} hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                        >
                            <div className="text-4xl mb-5">{c.emoji}</div>
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 ${c.tagColor}`}>
                                {c.title}
                            </span>
                            <h3 className={`text-xl font-black mb-3 ${c.accentColor}`}>{c.headline}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5 font-medium">{c.body}</p>
                            <p className="text-xs text-gray-400 font-semibold mb-3">
                                <span className="font-black text-gray-500">Perfect for:</span> {c.perfect}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {c.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] font-bold text-gray-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Highlights */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-primary/10 hover:shadow-lg hover:shadow-brand-primary/5 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div className="text-2xl mb-3">{f.icon}</div>
                            <h4 className="font-black text-gray-900 text-base mb-2">{f.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.body}</p>
                        </div>
                    ))}
                </div>

                {/* How It Works */}
                <div className="bg-brand-primary rounded-[2.5rem] p-10 sm:p-16 mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="text-center mb-14">
                            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                                How It Works
                            </h3>
                            <p className="text-white/50 font-medium">Start a challenge in under 5 seconds.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((s) => (
                                <div key={s.num} className="group">
                                    <div className="text-5xl font-black text-white/10 mb-3 group-hover:text-white/20 transition-colors">
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
                        '1000+ snippets across 10+ languages',
                        '3 challenge types: Bug Squasher, Refactor, Guided Practice',
                        'XP and leaderboard integration',
                        'Works 100% offline — no internet needed',
                    ].map((stat) => (
                        <div
                            key={stat}
                            className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100"
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
                        className="inline-flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-2xl font-black text-lg hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-xl shadow-brand-primary/20 mr-4"
                    >
                        <i className="fa-solid fa-fire"></i> Start Practicing Free
                    </a>
                    <Link
                        href="/tracks"
                        className="inline-flex items-center gap-2 text-gray-600 font-bold px-6 py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        Browse All Challenges <i className="fa-solid fa-arrow-right text-sm"></i>
                    </Link>
                </div>

            </div>
        </section>
    );
}
