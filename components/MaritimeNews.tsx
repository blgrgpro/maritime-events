import { ExternalLink } from "lucide-react";
import { maritimeNews } from "@/data/maritime-news";

export default function MaritimeNews() {
  return (
    <section className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Maritime Industry News</h2>
          <p className="text-sm text-slate-500 mt-1">Headlines shaping the global maritime sector</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {maritimeNews.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 flex-shrink-0 ${item.categoryColor}`}>
                  {item.category}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>

              <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 leading-snug transition-colors">
                {item.title}
              </p>

              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                {item.summary}
              </p>

              <div className="flex items-center gap-1.5 mt-auto">
                <span className="text-xs font-medium text-slate-500">{item.source}</span>
                <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-400 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
