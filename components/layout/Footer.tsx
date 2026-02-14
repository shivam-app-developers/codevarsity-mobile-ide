import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white/50 py-24 relative overflow-hidden border-t border-white/10">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-20 text-center md:text-left">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <img src="/assets/logo-white.png" alt="CodeVarsity Logo" className="h-8 w-auto grayscale brightness-200" />
              <span className="font-black text-xl text-white tracking-tighter uppercase">CodeVarsity</span>
            </div>
            <p className="text-sm font-medium leading-relaxed mb-8">
              The premier mobile-first institutional ecosystem for professional computer science education.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://github.com/shivam-app-developers/codevarsity-mobile-ide" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <i className="fa-brands fa-google-play"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-8">Curriculum</h4>
            <ul className="text-sm space-y-4 font-bold">
              <li><a href="/#courses" className="hover:text-white transition-colors">Academic Tracks</a></li>
              <li><a href="/#visualizers" className="hover:text-white transition-colors">Visual Runtimes</a></li>
              <li><a href="/#sandbox" className="hover:text-white transition-colors">Offline Compilers</a></li>
              <li><Link href="/docs/product/why-codelab" className="hover:text-white transition-colors">Why CodeVarsity</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Research Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-8">Enrolment</h4>
            <ul className="text-sm space-y-4 font-bold">
              {/* <li><Link href="/auth" className="hover:text-white transition-colors">Student Portal</Link></li> */}
              <li><Link href="/faq" className="hover:text-white transition-colors">Technical FAQ</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Faculty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-8">Laboratory</h4>
            <p className="text-xs leading-relaxed mb-6 opacity-60 italic">
              "Building the future of mobile engineering in our pockets."
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-accent">
              Shivam App Studio <br />
              Institutional Division
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-widest">
          <p>© 2026 Shivam App Studio. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Charter</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Financial Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
