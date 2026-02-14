'use client';

import { useState } from 'react';

export default function VisualizersSection() {
  const visualizers = [
    {
      title: 'Execution Trace',
      description: 'Step through code execution line-by-line. Rewind state and observe precise variable mutations in real-time.',
      icon: 'fa-solid fa-clock-rotate-left',
      gradient: 'from-purple-500 to-indigo-600',
      shadow: 'shadow-purple-500/20',
      tag: 'Time Travel Debugging',
      image: '/assets/visualizer-execution-trace.jpg',
    },
    {
      title: 'Bug Squasher',
      description: 'Experience gamified diagnostic challenges. Identify performance bottlenecks and clear professional codebase errors.',
      icon: 'fa-solid fa-bug-slash',
      gradient: 'from-red-500 to-pink-600',
      shadow: 'shadow-red-500/20',
      tag: 'Gamified Mastery',
      image: '/assets/visualizer-bug-squasher.jpg',
    },
    {
      title: 'Refractor Visualizer',
      description: 'Analyze code quality and visualize structural improvements for cleaner, more professional output.',
      icon: 'fa-solid fa-wand-magic-sparkles',
      gradient: 'from-indigo-500 to-blue-600',
      shadow: 'shadow-indigo-500/20',
      tag: 'Code Quality',
      image: '/assets/visualizer-refractor.jpg',
    },
    {
      title: 'Code Scramble',
      description: 'Master syntax through interactive puzzle-based challenges that reinforce structural understanding.',
      icon: 'fa-solid fa-puzzle-piece',
      gradient: 'from-rose-500 to-red-600',
      shadow: 'shadow-rose-500/20',
      tag: 'Syntax Practice',
      image: '/assets/visualizer-scramble.jpg',
    },
    {
      title: 'Algorithm Sandbox',
      description: 'Observe sorting, graph traversals, and complex optimization logic rendered in interactive algorithmic models.',
      icon: 'fa-solid fa-chart-bar',
      gradient: 'from-blue-500 to-cyan-600',
      shadow: 'shadow-blue-500/20',
      tag: 'Data Visualization',
      image: '/assets/visualizer-algorithm.jpg',
    },
    {
      title: 'Flowchart Visualizer',
      description: 'Automatically convert complex logic into clear, interactive flowcharts to understand control flow instantly.',
      icon: 'fa-solid fa-sitemap',
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      tag: 'Control Flow',
      image: '/assets/visualizer-flowchart.jpg',
    },
    {
      title: 'UML Class Diagram',
      description: 'Visualize object-oriented structures through automatically generated high-fidelity UML class diagrams.',
      icon: 'fa-solid fa-project-diagram',
      gradient: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
      tag: 'System Design',
      image: '/assets/visualizer-uml-class.jpg',
    },
    {
      title: 'Concept Decoder',
      description: 'Break down complex computer science concepts into simple, visual components for intuitive learning.',
      icon: 'fa-solid fa-brain',
      gradient: 'from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/20',
      tag: 'Intuitive Learning',
      image: '/assets/visualizer-concept-decoder.jpg',
    },
  ];

  return (
    <section id="visualizers" className="py-24 bg-white relative border-t border-gray-100 overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand-primary/[0.02] rounded-full blur-[120px] -mr-64 opacity-50"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-brand-secondary/[0.02] rounded-full blur-[120px] -ml-64 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-widest mb-6 border border-brand-primary/10">
            Interactive Learning
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-brand-primary mb-8 tracking-tight leading-[1.1]">
            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">Mechanics</span>.
          </h2>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Go beyond code with visual tools that render execution, architecture, and logic in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {visualizers.map((v, index) => (
            <VisualizerCard key={v.title} v={v} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualizerCard({ v, index }: { v: any, index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-[3rem] overflow-hidden border border-gray-100 premium-shadow premium-card-hover flex flex-col md:flex-row h-auto md:h-[620px]">
      {/* Information Side */}
      <div className="flex-1 p-10 lg:p-12 flex flex-col justify-between order-2 md:order-1 relative z-10 bg-white">
        <div>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center shadow-2xl ${v.shadow} mb-8 border-4 border-white/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
            <i className={`${v.icon} text-white text-2xl`}></i>
          </div>
          <div className="mb-4">
            <span className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em]">{v.tag}</span>
            <h4 className="font-black text-brand-primary text-2xl lg:text-3xl mt-2 tracking-tight">{v.title}</h4>
          </div>
          <p className="text-base text-gray-500 font-medium leading-relaxed">
            {v.description}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3 text-brand-primary/60 font-black text-xs uppercase tracking-widest">
            <span className="w-8 h-[2px] bg-brand-primary/20"></span>
            Visual Proof 0{index + 1}
          </div>
        </div>
      </div>

      {/* Portrait Phone Perspective Side */}
      <div className="flex-1 bg-[#f8fafc] relative overflow-hidden flex items-center justify-center p-0 order-1 md:order-2 perspective-1000">
        {/* Shimmering Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-100 animate-pulse p-12">
            <div className="w-full h-full bg-slate-200 rounded-[2rem] border-4 border-slate-300"></div>
          </div>
        )}

        {/* Phone Bezel */}
        <div className="relative w-full aspect-[1080/2096] max-w-[320px] bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-800 shadow-[20px_40px_60px_-15px_rgba(0,0,0,0.3)] transform rotate-y-[-10deg] rotate-x-[5deg] group-hover:rotate-y-[0deg] group-hover:rotate-x-[0deg] group-hover:scale-[1.05] transition-all duration-700 ease-out preserve-3d">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-800 rounded-b-xl z-10"></div>

          <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
            <img
              src={v.image}
              alt={`${v.title} Visualizer UI - ${v.tag}`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)}
              style={{
                imageRendering: 'crisp-edges',
                WebkitFontSmoothing: 'antialiased'
              } as any}
              className={`w-full h-full object-fill transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] pointer-events-none"></div>

            {/* Bottom Washout Prevention Overlay - significantly softened for clarity */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/[0.03] to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className={`absolute top-1/4 right-8 w-12 h-12 rounded-full border border-brand-primary/10 blur-sm group-hover:translate-x-4 transition-transform duration-1000 ${v.gradient} opacity-10`}></div>
        <div className="absolute bottom-1/4 left-8 w-8 h-8 rounded-full border border-brand-secondary/10 blur-sm group-hover:-translate-x-4 transition-transform duration-1000 bg-brand-accent opacity-10"></div>
      </div>
    </div>
  );
}
