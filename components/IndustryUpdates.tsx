import { industryUpdates } from "@/data/updates";

const CATEGORY_STYLES: Record<string, string> = {
  order:          "bg-blue-50 text-blue-700 border-blue-200",
  sustainability: "bg-emerald-50 text-emerald-700 border-emerald-200",
  technology:     "bg-violet-50 text-violet-700 border-violet-200",
  partnership:    "bg-amber-50 text-amber-700 border-amber-200",
  regulation:     "bg-red-50 text-red-700 border-red-200",
};

const CATEGORY_LABELS: Record<string, string> = {
  order:          "Fleet Order",
  sustainability: "Sustainability",
  technology:     "Technology",
  partnership:    "Partnership",
  regulation:     "Regulation",
};

export default function IndustryUpdates() {
  return (
    <section className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Industry Updates
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Latest moves from major maritime ecosystem players
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {industryUpdates.map((update) => (
            <div
              key={update.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              {/* Company badge + date */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${update.color}`}
                  >
                    <span className="text-white text-xs font-bold leading-none">
                      {update.initial.slice(0, 3)}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 leading-tight">
                    {update.company}
                  </span>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{update.date}</span>
              </div>

              {/* Headline */}
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {update.headline}
              </p>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                {update.description}
              </p>

              {/* Category badge */}
              <div>
                <span
                  className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${
                    CATEGORY_STYLES[update.category] ?? "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {CATEGORY_LABELS[update.category] ?? update.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
