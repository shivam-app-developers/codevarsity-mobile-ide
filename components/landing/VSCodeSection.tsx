export default function VSCodeSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-primary/5 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-brand-primary/5">
              Desktop Integration
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-primary mb-8 tracking-tight">
              Seamless <br />
              <span className="text-brand-secondary/80">Desktop Continuity</span>
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">Start a lecture on your commute. Finalize the implementation on VS Code. Your academic progress ecosystem syncs across all devices.</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100 group-hover:bg-green-100 transition-colors">
                  <i className="fa-solid fa-rotate text-sm"></i>
                </div>
                <span className="text-sm font-black text-brand-primary uppercase tracking-tight">Real-time Progress Synchronization</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                  <i className="fa-solid fa-ghost text-sm"></i>
                </div>
                <span className="text-sm font-black text-brand-primary uppercase tracking-tight">Ghost Code™ Support in VS Code</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 group-hover:bg-purple-100 transition-colors">
                  <i className="fa-solid fa-vial text-sm"></i>
                </div>
                <span className="text-sm font-black text-brand-primary uppercase tracking-tight">Institutional Lab Challenges</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-brand-primary/10 transition-colors"></div>
            <div className="relative bg-[#020617] rounded-[2rem] p-8 shadow-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                </div>
                <div className="h-6 px-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                  <i className="fa-solid fa-code text-[#007acc] text-[10px]"></i>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Visual Studio Code</span>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-56 bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white text-xs font-black shadow-lg shadow-brand-primary/40">
                      CV
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">CodeVarsity</p>
                      <p className="text-[8px] text-white/30 uppercase tracking-widest font-bold">Institutional</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[10px] font-black text-white/60 mb-2 uppercase tracking-widest">
                        <span>Python Path</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-brand-accent shadow-[0_0_8px_rgba(255,255,255,0.3)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/5 font-mono text-xs">
                  <div className="text-white/20 mb-3">// Continue Practice</div>
                  <div className="space-y-1">
                    <div><span className="text-pink-400">def</span> <span className="text-yellow-300">solve_complex</span>():</div>
                    <div className="ml-4 text-gray-400 opacity-40">...next step...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

