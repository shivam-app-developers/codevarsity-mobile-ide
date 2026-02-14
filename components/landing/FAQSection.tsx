'use client';

import Link from 'next/link';

export default function FAQSection() {
  const faqs = [
    {
      question: "How does professional offline execution work?",
      answer: "CodeVarsity embeds professional runtimes for Python 3.10, Java 21, Go, and HTML/CSS directly in the app. No internet required for compiling or running code."
    },
    {
      question: "Can I use NumPy, Pandas, and professional frameworks?",
      answer: "Yes! Python comes pre-bundled with industrial libraries including NumPy, Pandas, Scikit-learn, Flask, and Django. All work 100% offline."
    },
    {
      question: "What is the Rhombus Methodology™?",
      answer: "A unique 7-layer learning framework designed for mastery. You can try the first 2 layers of every course for free! Full access is via one-time lifetime purchases."
    },
    {
      question: "Is there a free trial for the IDE?",
      answer: "Yes! Professional features like the Java 21 and Python industrial libraries come with a 7-day free trial through our Workspace Subscriptions ($1.99/mo)."
    },
    {
      question: "How do I prove my technical competence?",
      answer: "Your profile tracks verified XP, lines typed, and Bug Squasher stats. Share your unique profile URL with recruiters as proof of skills."
    },
    {
      question: "What is Ghost Code™?",
      answer: "Guided Practice sessions where you type according to a 'ghost' template. It builds muscle memory and ensures you master syntax before moving to Layer 4 (Implementation)."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-primary tracking-tight">Technical <span className="text-brand-secondary/80">Support</span></h2>
            <p className="text-gray-500 mt-2 font-medium">Common inquiries about our professional ecosystem.</p>
          </div>
          <Link href="/faq" className="hidden sm:inline-flex text-brand-primary font-black uppercase tracking-widest text-[10px] hover:underline items-center gap-2 mb-2">
            View All <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white p-6 rounded-[2rem] border border-brand-primary/5 hover:border-brand-primary/10 transition-all shadow-xl shadow-brand-primary/5 overflow-hidden">
              <summary className="font-black text-brand-primary cursor-pointer list-none flex justify-between items-center group-open:mb-4">
                <span>{faq.question}</span>
                <i className="fa-solid fa-plus group-open:rotate-45 transition-transform text-xs opacity-40"></i>
              </summary>
              <p className="text-gray-500 text-sm leading-relaxed font-medium animate-fade-in">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

