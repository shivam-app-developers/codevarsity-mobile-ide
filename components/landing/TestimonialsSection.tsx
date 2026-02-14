'use client';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "Arjun Mehta",
            role: "Engineering Student",
            quote: "CodeVarsity's offline compiler was a lifesaver during my commute. I mastered Java 17 and built my first project entirely on my phone. The visualizers made recursion finally click for me.",
            avatar: "AM",
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            name: "Sarah Chen",
            role: "Self-Taught Developer",
            quote: "The Rhombus Methodology is legit. I've tried many apps, but the 'Ghost Code' practice built real muscle memory. I just shared my profile link with a recruiter, and they were blown away by the verified stats.",
            avatar: "SC",
            gradient: "from-purple-500 to-pink-600"
        },
        {
            name: "David Kumar",
            role: "Tech Lead @ Fintech",
            quote: "We look for 'technical competence proof' in junior hires. CodeVarsity profiles give us a much deeper look into a candidate's actual coding activity than just a certificate.",
            avatar: "DK",
            gradient: "from-emerald-500 to-teal-600"
        }
    ];

    return (
        <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-widest mb-6 border border-brand-primary/10">
                        Success Stories
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-brand-primary mb-6 tracking-tight">Verified <span className="text-brand-secondary/80">Transformation</span>.</h2>
                    <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        Join thousands of developers who have accelerated their career through our institutional ecosystem.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-slate-50 p-10 rounded-[3rem] border border-brand-primary/5 hover:border-brand-primary/10 transition-all duration-300 shadow-xl shadow-brand-primary/5 group">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 className="font-black text-brand-primary text-lg leading-tight">{t.name}</h4>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{t.role}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <i className="fa-solid fa-quote-left absolute -top-4 -left-4 text-4xl text-brand-primary/10"></i>
                                <p className="text-gray-600 font-medium leading-relaxed relative z-10 italic">
                                    "{t.quote}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
