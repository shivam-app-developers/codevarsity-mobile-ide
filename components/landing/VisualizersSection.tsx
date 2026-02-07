export default function VisualizersSection() {
  return (
    <section id="visualizers" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-black text-brand-primary mb-6 tracking-tight">Interactive <span className="text-brand-secondary/80">Visualizers</span></h2>
          <p className="text-gray-500 text-lg font-medium">Observe the internal mechanics of execution. Interactive visualizers for deep understanding.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover p-10">
            {/* Pattern Overlay */}
            <div className='absolute inset-0 premium-grid pointer-events-none'></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-500/20 mb-8 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-clock-rotate-left text-white text-2xl"></i>
              </div>
              <h4 className="font-black text-brand-primary text-xl mb-3 tracking-tight">Time Travel</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Step through code execution line-by-line. Rewind state and observe precise variable mutations.</p>
              <div className="mt-8 pt-6 border-t border-brand-primary/5">
                <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">Temporal Debugging</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover p-10">
            {/* Pattern Overlay */}
            <div className='absolute inset-0 premium-grid pointer-events-none'></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/20 mb-8 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-chart-bar text-white text-2xl"></i>
              </div>
              <h4 className="font-black text-brand-primary text-xl mb-3 tracking-tight">Algorithm Sandbox</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Observe sorting, graph traversals, and complex optimization logic rendered in real-time algorithmic models.</p>
              <div className="mt-8 pt-6 border-t border-brand-primary/5">
                <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">Logic Visualization</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover p-10">
            {/* Pattern Overlay */}
            <div className='absolute inset-0 premium-grid pointer-events-none'></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-xl shadow-red-500/20 mb-8 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-bug-slash text-white text-2xl"></i>
              </div>
              <h4 className="font-black text-brand-primary text-xl mb-3 tracking-tight">Bug Squasher</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Experience gamified diagnostic challenges. Identify performance bottlenecks and clear professional codebase errors.</p>
              <div className="mt-8 pt-6 border-t border-brand-primary/5">
                <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">Gamified Mastery</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover p-10">
            {/* Pattern Overlay */}
            <div className='absolute inset-0 premium-grid pointer-events-none'></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-8 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-ghost text-white text-2xl"></i>
              </div>
              <h4 className="font-black text-brand-primary text-xl mb-3 tracking-tight">Ghost Code™</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Integrated type-along practice environments. Build syntax muscle memory through high-fidelity shadowing.</p>
              <div className="mt-8 pt-6 border-t border-brand-primary/5">
                <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">High-Speed Syntax</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover p-10">
            {/* Pattern Overlay */}
            <div className='absolute inset-0 premium-grid pointer-events-none'></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-500/20 mb-8 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-memory text-white text-2xl"></i>
              </div>
              <h4 className="font-black text-brand-primary text-xl mb-3 tracking-tight">Memory Manager</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Deep-dive into Stack vs Heap architecture. Visualize pointer arithmetic and manual memory allocation.</p>
              <div className="mt-8 pt-6 border-t border-brand-primary/5">
                <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">System Architecture</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover p-10">
            {/* Pattern Overlay */}
            <div className='absolute inset-0 premium-grid pointer-events-none'></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/20 mb-8 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-database text-white text-2xl"></i>
              </div>
              <h4 className="font-black text-brand-primary text-xl mb-3 tracking-tight">SQL Visualizer</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Observe relational data transformations. Watch tables merge and queries execute through technical lenses.</p>
              <div className="mt-8 pt-6 border-t border-brand-primary/5">
                <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">Data Transformation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
