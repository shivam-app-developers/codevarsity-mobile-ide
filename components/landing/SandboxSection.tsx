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
                  <span className="block text-sm font-black">Java 17</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">JVM Runtime</span>
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

          <div className="bg-[#020617] rounded-[2.5rem] p-8 border border-white/10 shadow-[0_48px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <div className="ml-auto text-[10px] font-black text-white/20 uppercase tracking-widest">Compiler Output</div>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="flex gap-3">
                <span className="text-brand-accent font-bold">$</span>
                <span className="text-white/40">python3 scripts/analyze.py</span>
              </div>
              <div className="text-blue-400 ml-6">import pandas as pd</div>
              <div className="text-blue-400 ml-6">data = pd.read_csv('results.csv')</div>
              <div className="text-white/60 ml-6">print(data.describe())</div>
              <div className="bg-white/5 p-4 rounded-xl mt-4 border border-white/5">
                <div className="text-emerald-400 font-bold mb-1">✓ Execution Successful</div>
                <div className="text-white/40 text-[10px]">Memory: 14.2MB | Time: 0.02s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
