export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-black text-brand-primary mb-6 tracking-tight">
            How CodeVarsity <br className="sm:hidden" />
            <span className="text-brand-secondary/80">Empowers Your Journey</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">A systematic approach to mastering computer science through research-backed methodologies.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <div className="group bg-brand-primary/[0.02] p-10 rounded-[32px] border border-brand-primary/5 hover:border-brand-primary/10 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/5">
            <div className="w-16 h-16 mb-8 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">1</div>
            <h3 className="text-2xl font-bold text-brand-primary mb-4 tracking-tight">Theory & Vision</h3>
            <p className="text-gray-600 leading-relaxed font-medium">Learn with <strong>30+ interactive visualizers</strong>. See exactly how memory, algorithms, and data structures operate in real-time.</p>
          </div>

          <div className="group bg-brand-primary/[0.02] p-10 rounded-[32px] border border-brand-primary/5 hover:border-brand-primary/10 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/5">
            <div className="w-16 h-16 mb-8 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">2</div>
            <h3 className="text-2xl font-bold text-brand-primary mb-4 tracking-tight">Guided Practice</h3>
            <p className="text-gray-600 leading-relaxed font-medium">Write and compile code with <strong>real offline runtimes</strong>. <strong>Guided Practice</strong> builds muscle memory through directed typing sessions.</p>
          </div>

          <div className="group bg-brand-primary/[0.02] p-10 rounded-[32px] border border-brand-primary/5 hover:border-brand-primary/10 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/5">
            <div className="w-16 h-16 mb-8 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">3</div>
            <h3 className="text-2xl font-bold text-brand-primary mb-4 tracking-tight">Mastery Checks</h3>
            <p className="text-gray-600 leading-relaxed font-medium">Solve <strong>Bug Squasher</strong> and <strong>Code Scramble</strong> challenges. Prove your skills by finding errors and refactoring architecture.</p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-brand-primary/5 border border-brand-primary/10 px-8 py-4 rounded-2xl text-brand-primary font-black uppercase tracking-widest text-xs">
            <i className="fa-solid fa-rocket animate-bounce"></i>
            <span>Ready to Build your Capstone Project?</span>
          </div>
        </div>
      </div>
    </section>
  );
}

