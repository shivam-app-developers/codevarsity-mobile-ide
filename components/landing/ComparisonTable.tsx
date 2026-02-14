export default function ComparisonTable() {
  return (
    <section className="py-24 bg-slate-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-black text-brand-primary text-center mb-16 tracking-tight">The Institutional <span className="text-brand-secondary/80">Edge</span></h2>
        <div className="bg-white rounded-[32px] overflow-hidden border border-brand-primary/10 shadow-[0_32px_64px_-16px_rgba(5,43,35,0.08)]">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm min-w-[600px] sm:min-w-0">
              <thead>
                <tr className="bg-brand-primary text-white">
                  <th className="py-5 px-6 text-left font-black uppercase tracking-widest text-[10px]">Comparative Features</th>
                  <th className="py-5 px-6 text-center bg-brand-secondary/50 font-black uppercase tracking-widest text-[10px]">CodeVarsity</th>
                  <th className="py-5 px-6 text-center font-black uppercase tracking-widest text-[10px]">Common IDEs</th>
                  <th className="py-5 px-6 text-center font-black uppercase tracking-widest text-[10px]">Static Video</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-primary/5">
                <tr className="group hover:bg-brand-primary/[0.01] transition-colors">
                  <td className="py-5 px-6 font-bold text-brand-primary">Full Offline Runtimes</td>
                  <td className="py-5 px-6 text-center text-brand-secondary"><i className="fa-solid fa-circle-check text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                </tr>
                <tr className="group hover:bg-brand-primary/[0.01] transition-colors">
                  <td className="py-5 px-6 font-bold text-brand-primary">Interactive Visualizers</td>
                  <td className="py-5 px-6 text-center text-brand-secondary"><i className="fa-solid fa-circle-check text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                </tr>
                <tr className="group hover:bg-brand-primary/[0.01] transition-colors">
                  <td className="py-5 px-6 font-bold text-brand-primary">Ghost Code™ Mastery</td>
                  <td className="py-5 px-6 text-center text-brand-secondary"><i className="fa-solid fa-circle-check text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                </tr>
                <tr className="group hover:bg-brand-primary/[0.01] transition-colors">
                  <td className="py-5 px-6 font-bold text-brand-primary">Layered Methodology</td>
                  <td className="py-5 px-6 text-center text-brand-secondary"><i className="fa-solid fa-circle-check text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                </tr>
                <tr className="group hover:bg-brand-primary/[0.01] transition-colors">
                  <td className="py-5 px-6 font-bold text-brand-primary">Desktop Sync (VS Code)</td>
                  <td className="py-5 px-6 text-center text-brand-secondary"><i className="fa-solid fa-circle-check text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                  <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-circle-xmark text-lg"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

