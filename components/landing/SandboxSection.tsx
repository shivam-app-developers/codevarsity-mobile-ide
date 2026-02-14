export default function SandboxSection() {
  return (
    <section id="sandbox" className="py-24 bg-brand-primary text-white relative overflow-hidden">
      {/* Decorative Brand Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
              Technical Excellence
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-8 tracking-tight">Industrial <span className="text-brand-accent">Offline Compilers</span></h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed font-medium">No cloud latency. No internet required. Real-world runtimes optimized for mobile architecture.</p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors"><i className="fa-brands fa-python text-yellow-400 text-xl"></i></div>
                <div>
                  <span className="block text-sm font-black">Python 3.10</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Full Library Support</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors"><i className="fa-brands fa-java text-red-400 text-xl"></i></div>
                <div>
                  <span className="block text-sm font-black">Java 21</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">LTS Runtime</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors"><i className="fa-brands fa-golang text-cyan-400 text-xl"></i></div>
                <div>
                  <span className="block text-sm font-black">Go Lang</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Concurrent Execution</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors"><i className="fa-solid fa-database text-emerald-400 text-xl"></i></div>
                <div>
                  <span className="block text-sm font-black">SQL Engine</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">SQLite Explorer</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                <i className="fa-solid fa-keyboard text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-black">Institutional Keyboard</p>
                <p className="text-xs text-white/50">Optimized for rapid symbol entry & cursor precision.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end gap-4 sm:gap-8 relative">
            <div className="relative w-[45%] aspect-[1080/2100] bg-gray-900 rounded-[1.5rem] sm:rounded-[2.5rem] border-[4px] sm:border-[8px] border-white/5 shadow-[0_48px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transform md:-rotate-1 md:hover:rotate-0 transition-transform duration-500">
              <img
                src="/assets/workspace.jpg"
                alt="CodeVarsity Professional Workspace - Editor and Terminal"
                className="w-full h-full object-fill"
                loading="lazy"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none"></div>
            </div>

            <div className="relative w-[45%] aspect-[1080/2100] mt-12 sm:mt-20 bg-gray-900 rounded-[1.5rem] sm:rounded-[2.5rem] border-[4px] sm:border-[8px] border-white/5 shadow-[0_48px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transform md:rotate-1 md:hover:rotate-0 transition-transform duration-500 z-10">
              <img
                src="/assets/keyboard.jpg"
                alt="CodeVarsity Institutional Keyboard - Optimized for Coding"
                className="w-full h-full object-fill"
                loading="lazy"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
