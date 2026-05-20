import { Anchor, TrendingUp, Users, Globe } from "lucide-react";
import { events } from "@/data/events";
import EventGrid from "@/components/EventGrid";

const STATS = [
  { icon: Globe, value: "8", label: "Countries" },
  { icon: Anchor, value: "8", label: "Key Events" },
  { icon: Users, value: "170K+", label: "Total Attendees" },
  { icon: TrendingUp, value: "5", label: "Industry Sectors" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
                2025 – 2026 Season
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              Maritime Events
              <br />
              <span className="text-blue-600">in Europe</span>
            </h1>

            <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
              Discover high-value maritime events across Europe — with
              intelligence on attendance, investors, and deal flow.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4"
              >
                <Icon className="w-4 h-4 text-slate-400 mb-2" />
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event grid with filters */}
      <EventGrid events={events} />
    </>
  );
}
