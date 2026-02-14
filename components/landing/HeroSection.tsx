'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden perspective-1000">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand-primary/[0.03] rounded-full blur-[100px] -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-brand-secondary/[0.03] rounded-full blur-[100px] -ml-20 -mb-20"></div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-widest mb-6 border border-brand-primary/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            Institutional Access Available
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-brand-primary leading-[1.1] mb-6 tracking-tight">
            The Mobile <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">Computer Science</span><br />
            Institution.
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
            Turn your phone into a professional workstation. Master <strong>12+ Academic Tracks</strong> with our integrated <strong>Offline IDE</strong> and research-backed methodology.
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="group bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-brand-secondary hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-brand-primary/20">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <i className="fa-brands fa-google-play text-lg"></i>
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-tighter opacity-70 leading-none mb-0.5">Download on</div>
                <div className="text-sm font-black leading-none tracking-wide">Google Play</div>
              </div>
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  <i className="fa-solid fa-user"></i>
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-yellow-500 text-xs mb-0.5">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <span>Trusted by 5,000+ Students</span>
            </div>
          </div>
        </div>

        {/* 3D Composition */}
        <div className="relative z-10 hidden lg:block perspective-origin-center transform-style-3d">
          {/* Main Device Frame */}
          <div className="relative w-[380px] mx-auto bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-[0_50px_100px_-20px_rgba(5,43,35,0.3)] transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-700 ease-out overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>

            {/* Screen Content - Video with Fallback */}
            <div className={`w-full h-[680px] bg-[#0f172a] relative overflow-hidden transition-all duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-90'}`}>
              {!isVideoLoaded && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0f172a]">
                  <div className="w-12 h-12 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent animate-pulse"></div>
                </div>
              )}

              <video
                autoPlay
                muted
                loop
                playsInline
                onCanPlayThrough={() => setIsVideoLoaded(true)}
                poster="/assets/visualizer-execution-trace.jpg"
                src="/assets/hero_demo.mp4"
                title="CodeVarsity Professional Mobile IDE Visualizers"
                style={{ imageRendering: 'high-quality' } as any}
                className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Status Bar Cover - hides screen recording date/network icons */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#0f172a] z-10 pointer-events-none"></div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/80 pointer-events-none"></div>
            </div>
          </div>

          {/* Chip 1: Interactive Theory */}
          <div className="absolute top-16 -right-12 w-52 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-xl border border-white/20 animate-float-delayed z-30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100/50 flex items-center justify-center text-blue-600">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Step 1</div>
              <div className="text-xs font-black text-gray-800">Interactive Theory</div>
            </div>
          </div>

          {/* Chip 2: Visualizers */}
          <div className="absolute bottom-48 -left-16 w-56 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-xl border border-white/20 animate-float z-30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100/50 flex items-center justify-center text-purple-600">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Step 2</div>
              <div className="text-xs font-black text-gray-800">Real-time Visualizers</div>
            </div>
          </div>

          {/* Chip 3: Guided Practice */}
          <div className="absolute bottom-20 -right-8 w-48 bg-brand-primary/95 backdrop-blur-xl p-3 rounded-xl shadow-2xl border border-white/10 animate-float-delayed z-30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-accent">
              <i className="fa-solid fa-keyboard"></i>
            </div>
            <div>
              <div className="text-[9px] font-black text-brand-secondary uppercase tracking-widest">Step 3</div>
              <div className="text-xs font-black text-white">Guided Practice</div>
            </div>
          </div>

          {/* Decorative Orb */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
