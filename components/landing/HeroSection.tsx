import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand-primary/[0.02] rounded-full blur-[100px] -mr-64 -mt-32"></div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            Institutional Access Available
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-brand-primary leading-[1.1] mb-8 tracking-tight">
            Professional Coding.<br />
            <span className="text-brand-secondary/80">Academic Precision.</span><br />
            Mobile Freedom.
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
            Master computer science with <strong>interactive visualizers</strong>,
            <strong>ghost-code practice</strong>, and true <strong>offline compilers</strong>.
            The elite IDE for mobile learning.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link href="#" className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-brand-secondary hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-brand-primary/20">
              <i className="fa-brands fa-google-play text-xl"></i>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-tighter opacity-70 leading-none">Get it on</div>
                <div className="text-base leading-none mt-1">Google Play</div>
              </div>
            </Link>
            <Link href="#courses" className="bg-white border-2 border-brand-primary/10 text-brand-primary px-8 py-4 rounded-2xl font-bold hover:border-brand-primary hover:-translate-y-1 transition-all duration-300 flex items-center">
              Explore Curriculum
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          {/* Floating language badges with refined styling */}
          <div className="absolute -top-6 left-12 bg-white px-4 py-2 rounded-2xl text-sm font-black text-brand-primary shadow-[0_8px_30px_rgb(5,43,35,0.1)] border border-brand-primary/5 animate-float flex items-center gap-2">
            <span className="p-1 px-2 bg-yellow-100 rounded-lg">🐍</span> Python
          </div>
          <div className="absolute top-24 -right-4 bg-white px-4 py-2 rounded-2xl text-sm font-black text-brand-primary shadow-[0_8px_30px_rgb(5,43,35,0.1)] border border-brand-primary/5 animate-float-delayed flex items-center gap-2" style={{ animationDelay: '1s' }}>
            <span className="p-1 px-2 bg-cyan-100 rounded-lg">🔷</span> Go
          </div>
          <div className="absolute bottom-20 -left-10 bg-white px-4 py-2 rounded-2xl text-sm font-black text-brand-primary shadow-[0_8px_30px_rgb(5,43,35,0.1)] border border-brand-primary/5 animate-float flex items-center gap-2" style={{ animationDelay: '2s' }}>
            <span className="p-1 px-2 bg-red-100 rounded-lg">☕</span> Java
          </div>

          <div className="w-72 h-[480px] bg-[#020617] rounded-[3rem] border-[8px] border-[#1e293b] p-4 shadow-[0_48px_100px_-20px_rgba(5,43,35,0.3)]">
            <div className="bg-[#0f172a] rounded-[2rem] h-full p-5 flex flex-col items-center border border-white/5">
              <div className="w-full bg-[#1e293b] rounded-xl p-4 font-mono text-[10px] text-green-400 mb-6 border border-white/5">
                <div className="text-blue-400 opacity-60 mb-2">// Mastering Algorithms</div>
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-yellow-300">bubbleSort</span>(arr):</div>
                <div className="ml-4 mt-1">n = <span className="text-orange-300">len</span>(arr)</div>
                <div className="ml-4">for i <span className="text-pink-400">in</span> <span className="text-orange-300">range</span>(n):</div>
                <div className="ml-8 text-gray-400 opacity-40">...active practice...</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-black text-lg mb-4 shadow-lg shadow-brand-primary/40">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <p className="text-white font-black tracking-tight text-lg mb-1">CodeVarsity</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black">Learn Mode</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
