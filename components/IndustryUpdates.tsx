import { ExternalLink } from "lucide-react";
import { industryUpdates } from "@/data/updates";

export default function IndustryUpdates() {
  return (
    <section className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Company Updates</h2>
            <p className="text-sm text-slate-500 mt-1">Latest news from major maritime players</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industryUpdates.map((company) => (
            <div
              key={company.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              {/* Company header */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${company.color}`}>
                  <span className="text-white text-xs font-bold leading-none">
                    {company.initial.slice(0, 4)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{company.company}</p>
                </div>
              </div>

              {/* News items */}
              <div className="space-y-0 divide-y divide-slate-100 flex-1">
                {company.newsItems.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 py-3 group first:pt-0 last:pb-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 leading-snug transition-colors line-clamp-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-xs text-slate-400">{item.source}</span>
                        <span className="text-slate-200 text-xs">·</span>
                        <span className="text-xs text-slate-400">{item.date}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
