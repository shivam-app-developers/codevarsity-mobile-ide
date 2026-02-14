'use client';

export default function PAASection() {
    const paaItems = [
        {
            question: "Is there a real mobile IDE for Java and Python?",
            answer: "Yes. CodeVarsity provides a professional-grade mobile IDE featuring locally embedded runtimes for Java 21 and Python 3.10. Unlike other apps that use web-wrappers, we provide native execution, a professional file system, and an integrated terminal—all accessible 100% offline."
        },
        {
            question: "How can I learn Python and Web Development on Android without internet?",
            answer: "CodeVarsity comes pre-bundled with the Python 3.10 interpreter, industrial libraries like NumPy and Pandas, and a live-preview HTML/CSS/JS environment. You can follow our structured curriculum and run your code directly on your Android device without any data connection, making it perfect for learning on the go."
        },
        {
            question: "What is Guided Practice (Ghost Code™)?",
            answer: "Guided Practice is our unique character-by-character coding method. By typing along with a 'ghost' template, you build muscle memory and master complex syntax before moving to independent implementation. It eliminates the frustration of typos and ensures you learn the 'feel' of professional code."
        },
        {
            question: "What is the best app for professional coding on mobile?",
            answer: "CodeVarsity is optimized for professional practice, offering high-speed execution for Python, Java 21, and Go. Our 'Bug Squasher' rounds and algorithm visualizers help you master complex data structures and web terminal workflows, providing a technical edge on any device."
        },
        {
            question: "Can I use CodeVarsity to build professional projects?",
            answer: "Absolutely. CodeVarsity supports professional project structures, multi-file editing, and HTML/CSS live preview. Its institutional-grade methodology ensures you aren't just 'playing' with code, but building production-ready logic."
        }
    ];

    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/5 text-brand-secondary text-[10px] font-black uppercase tracking-widest mb-4 border border-brand-secondary/10">
                        Institutional Intelligence
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">Quick <span className="text-brand-secondary/80">Answers</span></h2>
                    <p className="text-gray-500 mt-2 font-medium">Clear insights into our professional mobile ecosystem.</p>
                </div>

                <div className="space-y-12">
                    {paaItems.map((item, index) => (
                        <div key={index} className="group">
                            <h3 className="text-xl font-black text-brand-primary mb-4 flex items-start gap-3 leading-tight group-hover:text-brand-secondary transition-colors">
                                <span className="w-6 h-6 rounded-lg bg-brand-secondary/10 flex items-center justify-center flex-shrink-0 text-brand-secondary text-xs mt-0.5">Q</span>
                                {item.question}
                            </h3>
                            <div className="flex items-start gap-3 pl-9">
                                <div className="w-[1px] h-full bg-slate-100 absolute left-[3.25rem]"></div>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
