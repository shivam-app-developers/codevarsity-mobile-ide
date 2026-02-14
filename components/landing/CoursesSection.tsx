import Link from 'next/link';

export default function CoursesSection() {
  return (
    <section id="courses" className="py-24 bg-slate-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-black text-brand-primary mb-6 tracking-tight">Complete <span className="text-brand-secondary/80">Curriculum</span></h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">From binary logic to software architecture. Powered by the Rhombus Methodology.</p>
        </div>

        <h3 className="text-xl font-black text-brand-primary mb-6 flex items-center gap-3">
          <i className="fa-solid fa-graduation-cap"></i> Learning Tracks <span className="text-xs font-black text-brand-primary/40 uppercase tracking-widest">(Cross-Platform Sync)</span>
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* PYTHON */}
          <Link href="/tracks/python" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                    <i className="fa-brands fa-python text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">Python</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-700 text-[10px] font-black rounded-lg border border-yellow-500/10 uppercase tracking-widest">6 Courses</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Foundations & Logic</span>
                    <span className="text-[10px] text-gray-500 font-medium">Syntax, Loops & Data Types</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Data & Analytics</span>
                    <span className="text-[10px] text-gray-500 font-medium">NumPy, Pandas & Visualization</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-brand-secondary border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Web Backend</span>
                    <span className="text-[10px] text-gray-500 font-medium">Flask & Django</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Record Management System</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">v3.10 Runtime</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>

          {/* JAVA */}
          <Link href="/tracks/java" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-red-500 via-rose-600 to-red-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-xl shadow-red-500/20 group-hover:scale-110 transition-transform">
                    <i className="fa-brands fa-java text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">Java</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-red-500/10 text-red-700 text-[10px] font-black rounded-lg border border-red-500/10 uppercase tracking-widest">3 Courses</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Foundations</span>
                    <span className="text-[10px] text-gray-500 font-medium">OOP Principles & Syntax</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Collections & Maps</span>
                    <span className="text-[10px] text-gray-500 font-medium">Advanced Data Structures</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-brand-secondary border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Network Systems</span>
                    <span className="text-[10px] text-gray-500 font-medium">Multi-Threading & Servers</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Integrated School Management System</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">Java 21 Compiler</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>

          {/* WEB */}
          <Link href="/tracks/web" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    <i className="fa-brands fa-html5 text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">Web Stack</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-orange-500/10 text-orange-700 text-[10px] font-black rounded-lg border border-orange-500/10 uppercase tracking-widest">4 Courses</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Static (HTML/CSS)</span>
                    <span className="text-[10px] text-gray-500 font-medium">Semantic Web & Responsive Layouts</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Interactive JS</span>
                    <span className="text-[10px] text-gray-500 font-medium">ES6+, Promises & DOM Engineering</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-brand-secondary border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Modern Frameworks</span>
                    <span className="text-[10px] text-gray-500 font-medium">Industrial React & Vue Architecture</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Full-Stack Digital Portfolio</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">Live Cloud Preview</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>

          {/* GO */}
          <Link href="/tracks/go" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <i className="fa-brands fa-golang text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">Go Lang</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-700 text-[10px] font-black rounded-lg border border-cyan-500/10 uppercase tracking-widest">3 Courses</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Standard Library</span>
                    <span className="text-[10px] text-gray-500 font-medium">Structs, Interfaces & Pointers</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">System Logic</span>
                    <span className="text-[10px] text-gray-500 font-medium">Memory Management & Performance</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-brand-secondary border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Concurrency</span>
                    <span className="text-[10px] text-gray-500 font-medium">Native GoRoutines & Channels</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Concurrent Health Surveillance System</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">v1.19 Runtime</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>
        </div>

        {/* Universal Tracks Row 2 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* SQL */}
          <Link href="/tracks/sql" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-database text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">SQL</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-700 text-[10px] font-black rounded-lg border border-blue-500/10 uppercase tracking-widest">1 Course</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Database Intro</span>
                    <span className="text-[10px] text-gray-500 font-medium">CRUD Foundations & Relational Logic</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Advanced Joins</span>
                    <span className="text-[10px] text-gray-500 font-medium">Complex Queries & Analytics</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Inventory Database Architecture</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">SQLite3 Runtime</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>

          {/* C Language */}
          <Link href="/tracks/c" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <span className="text-white font-black text-xl">C</span>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">C Language</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-blue-600/10 text-blue-700 text-[10px] font-black rounded-lg border border-blue-600/10 uppercase tracking-widest">2 Courses</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">C Foundations</span>
                    <span className="text-[10px] text-gray-500 font-medium">Manual Memory & Pointer Arithmetic</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Data Structures</span>
                    <span className="text-[10px] text-gray-500 font-medium">Dynamic Memory Allocation</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Custom Dynamic Data Structure Library</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">Clang/LLVM Optimized</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>

          {/* Groovy */}
          <Link href="/tracks/groovy" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    <span className="text-white font-black text-xl">G</span>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">Groovy</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-teal-500/10 text-teal-700 text-[10px] font-black rounded-lg border border-teal-500/10 uppercase tracking-widest">2 Courses</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Groovy Basics</span>
                    <span className="text-[10px] text-gray-500 font-medium">GStrings & Dynamic Typing</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Advanced & DSLs</span>
                    <span className="text-[10px] text-gray-500 font-medium">Industrial Scripting Automation</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Automated File Architect</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">Apache Groovy 4.0</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>

          {/* Clojure */}
          <Link href="/tracks/clojure" className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-infinity text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-brand-primary text-xl leading-none mb-1">Clojure</h4>
                    <span className="block text-[10px] text-brand-secondary font-black tracking-[0.2em] uppercase opacity-60">Universal Path</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-700 text-[10px] font-black rounded-lg border border-indigo-500/10 uppercase tracking-widest">2 Courses</span>
                </div>
              </div>

              <div className="relative pl-6 border-l border-brand-primary/10 space-y-6 mb-8 mt-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Functional Foundations</span>
                    <span className="text-[10px] text-gray-500 font-medium">Immutability & Pure Functions</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-primary leading-none mb-1">Recursion & Logic</span>
                    <span className="text-[10px] text-gray-500 font-medium">Functional Programming Paradigms</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/5 mb-6 group-hover:bg-brand-primary/10 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-black text-brand-secondary mb-2 uppercase tracking-widest">
                  <i className="fa-solid fa-medal text-xs"></i> MILESTONE PROJECT
                </div>
                <p className="text-[11px] text-brand-primary font-black leading-relaxed">Recursive Maze Intelligence</p>
              </div>

              <div className="pt-5 border-t border-brand-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest">Clojure 1.11 REPL</span>
                <i className="fa-solid fa-chevron-right text-[8px] text-brand-primary/20 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Tracks */}
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-laptop-code text-brand-secondary"></i> Desktop Tracks (VS Code Extension)
        </h3>
        <p className="text-gray-500 text-sm mb-8 font-semibold">Exclusively available for desktop power users. Integrated with our custom VS Code extension.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* C++ */}
          <Link href="/tracks/cpp" className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2 bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-700 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                  <span className="text-white font-black text-sm">C++</span>
                </div>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-700 text-[9px] font-black rounded-lg border border-blue-500/10 uppercase tracking-widest">DESKTOP</span>
              </div>

              <div className="mb-6">
                <h4 className="font-black text-brand-primary text-base leading-none mb-1">C++ Systems</h4>
                <p className="text-[10px] text-brand-secondary font-black tracking-widest uppercase opacity-60">3 Adv. Courses</p>
              </div>

              <div className="relative pl-5 border-l border-brand-primary/10 space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">STL & Templates</span>
                    <span className="text-[9px] text-gray-500 font-medium">Generic Programming</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">Engine Logic</span>
                    <span className="text-[9px] text-gray-500 font-medium">Memory Management</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-xl p-3 border border-brand-primary/5 mb-4 group-hover:bg-brand-primary/10 transition-colors">
                <span className="text-[8px] font-black text-brand-secondary block mb-1 uppercase tracking-widest">FINAL MILESTONE</span>
                <p className="text-[10px] text-brand-primary font-black leading-tight">Custom 2D Physics Engine</p>
              </div>

              <div className="pt-4 border-t border-brand-primary/5">
                <span className="text-[9px] font-black text-brand-secondary/60 uppercase tracking-widest">VS Code Exclusive</span>
              </div>
            </div>
          </Link>

          {/* C# */}
          <Link href="/tracks/specializations" className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2 bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform">
                  <i className="fa-brands fa-microsoft text-white text-sm"></i>
                </div>
                <span className="px-2 py-0.5 bg-purple-500/10 text-purple-700 text-[9px] font-black rounded-lg border border-purple-500/10 uppercase tracking-widest">DESKTOP</span>
              </div>

              <div className="mb-6">
                <h4 className="font-black text-brand-primary text-base leading-none mb-1">C# .NET</h4>
                <p className="text-[10px] text-brand-secondary font-black tracking-widest uppercase opacity-60">1 Pro Course</p>
              </div>

              <div className="relative pl-5 border-l border-brand-primary/10 space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">ASP.NET Core</span>
                    <span className="text-[9px] text-gray-500 font-medium">Enterprise API Architecture</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-700 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">LINQ & Entity</span>
                    <span className="text-[9px] text-gray-500 font-medium">Advanced Data Contexts</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-xl p-3 border border-brand-primary/5 mb-4 group-hover:bg-brand-primary/10 transition-colors">
                <span className="text-[8px] font-black text-brand-secondary block mb-1 uppercase tracking-widest">FINAL MILESTONE</span>
                <p className="text-[10px] text-brand-primary font-black leading-tight">Corporate HR Management Ecosystem</p>
              </div>

              <div className="pt-4 border-t border-brand-primary/5">
                <span className="text-[9px] font-black text-brand-secondary/60 uppercase tracking-widest">Enterprise Track</span>
              </div>
            </div>
          </Link>

          {/* SPRING BOOT */}
          <Link href="/tracks/specializations" className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-900/20 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-leaf text-white text-sm"></i>
                </div>
                <span className="px-2 py-0.5 bg-green-500/10 text-green-700 text-[9px] font-black rounded-lg border border-green-500/10 uppercase tracking-widest">DESKTOP</span>
              </div>

              <div className="mb-6">
                <h4 className="font-black text-brand-primary text-base leading-none mb-1">Spring Boot</h4>
                <p className="text-[10px] text-brand-secondary font-black tracking-widest uppercase opacity-60">1 Arch. Course</p>
              </div>

              <div className="relative pl-5 border-l border-brand-primary/10 space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">Microservices</span>
                    <span className="text-[9px] text-gray-500 font-medium">Eureka & Gateway Patterns</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">JWT Security</span>
                    <span className="text-[9px] text-gray-500 font-medium">Advanced Auth Protection</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-xl p-3 border border-brand-primary/5 mb-4 group-hover:bg-brand-primary/10 transition-colors">
                <span className="text-[8px] font-black text-brand-secondary block mb-1 uppercase tracking-widest">FINAL MILESTONE</span>
                <p className="text-[10px] text-brand-primary font-black leading-tight">Distributed Banking Infrastructure</p>
              </div>

              <div className="pt-4 border-t border-brand-primary/5">
                <span className="text-[9px] font-black text-brand-secondary/60 uppercase tracking-widest">Backend Master</span>
              </div>
            </div>
          </Link>

          {/* MERN */}
          <Link href="/tracks/specializations" className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                  <i className="fa-brands fa-node-js text-white text-sm"></i>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 text-[9px] font-black rounded-lg border border-emerald-500/10 uppercase tracking-widest">DESKTOP</span>
              </div>

              <div className="mb-6">
                <h4 className="font-black text-brand-primary text-base leading-none mb-1">MERN Stack</h4>
                <p className="text-[10px] text-brand-secondary font-black tracking-widest uppercase opacity-60">1 Full-Stack Course</p>
              </div>

              <div className="relative pl-5 border-l border-brand-primary/10 space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">Express APIs</span>
                    <span className="text-[9px] text-gray-500 font-medium">Middleware & Auth Engineering</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-green-600 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">MongoDB NoSQL</span>
                    <span className="text-[9px] text-gray-500 font-medium">Advanced Aggregation Pipelines</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-xl p-3 border border-brand-primary/5 mb-4 group-hover:bg-brand-primary/10 transition-colors">
                <span className="text-[8px] font-black text-brand-secondary block mb-1 uppercase tracking-widest">FINAL MILESTONE</span>
                <p className="text-[10px] text-brand-primary font-black leading-tight">Social Network System</p>
              </div>

              <div className="pt-4 border-t border-brand-primary/5">
                <span className="text-[9px] font-black text-brand-secondary/60 uppercase tracking-widest">Modern Web</span>
              </div>
            </div>
          </Link>

          {/* KOTLIN */}
          <Link href="/tracks/kotlin" className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-brand-primary/5 premium-shadow premium-card-hover block">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 premium-grid pointer-events-none"></div>

            <div className="h-2 bg-gradient-to-r from-orange-400 via-purple-500 to-orange-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></div>

            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center shadow-lg shadow-orange-900/20 group-hover:scale-110 transition-transform">
                  <span className="text-white font-black text-sm">K</span>
                </div>
                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-700 text-[9px] font-black rounded-lg border border-orange-500/10 uppercase tracking-widest">DESKTOP</span>
              </div>

              <div className="mb-6">
                <h4 className="font-black text-brand-primary text-base leading-none mb-1">Kotlin Pro</h4>
                <p className="text-[10px] text-brand-secondary font-black tracking-widest uppercase opacity-60">3 Native Courses</p>
              </div>

              <div className="relative pl-5 border-l border-brand-primary/10 space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">Android Concepts</span>
                    <span className="text-[9px] text-gray-500 font-medium">Null Safety & Flow Engineering</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-purple-600 border-2 border-white shadow-sm"></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-brand-primary leading-none mb-1">Ktor Services</span>
                    <span className="text-[9px] text-gray-500 font-medium">Elite Kotlin Microservices</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-xl p-3 border border-brand-primary/5 mb-4 group-hover:bg-brand-primary/10 transition-colors">
                <span className="text-[8px] font-black text-brand-secondary block mb-1 uppercase tracking-widest">FINAL MILESTONE</span>
                <p className="text-[10px] text-brand-primary font-black leading-tight">High-Performance Chat Server</p>
              </div>

              <div className="pt-4 border-t border-brand-primary/5">
                <span className="text-[9px] font-black text-brand-secondary/60 uppercase tracking-widest">App Development</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
