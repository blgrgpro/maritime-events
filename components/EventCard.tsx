import Link from "next/link";
import { MapPin, Users, Calendar } from "lucide-react";
import { MaritimeEvent } from "@/types";
import ScoreDots from "./ScoreDots";

const FLAGS: Record<string, string> = {
  NO: "🇳🇴",
  GR: "🇬🇷",
  DE: "🇩🇪",
  GB: "🇬🇧",
  NL: "🇳🇱",
  DK: "🇩🇰",
  SE: "🇸🇪",
};

const SECTOR_STYLES: Record<string, string> = {
  Shipping: "bg-blue-50 text-blue-700 border-blue-200",
  "Offshore Wind": "bg-teal-50 text-teal-700 border-teal-200",
  Ports: "bg-orange-50 text-orange-700 border-orange-200",
  "Maritime Tech": "bg-violet-50 text-violet-700 border-violet-200",
  Finance: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function formatAttendance(min: number, max: number): string {
  const fmt = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}K` : `${n}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

function ImportanceBadge({ score }: { score: number }) {
  if (score >= 4)
    return (
      <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">
        High
      </span>
    );
  if (score === 3)
    return (
      <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
        Medium
      </span>
    );
  return (
    <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5">
      Low
    </span>
  );
}

export default function EventCard({ event }: { event: MaritimeEvent }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{FLAGS[event.countryCode] ?? "🌍"}</span>
            <span className="text-sm text-slate-500 font-medium">
              {event.country}
            </span>
          </div>
          <ImportanceBadge score={event.importanceScore} />
        </div>

        {/* Event name */}
        <h3 className="text-base font-semibold text-slate-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
          {event.name}
        </h3>

        {/* Location + date */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{event.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
        </div>

        {/* Sector tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {event.sectors.map((s) => (
            <span
              key={s}
              className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${
                SECTOR_STYLES[s] ?? "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Attendance */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
          <Users className="w-3 h-3 flex-shrink-0" />
          <span>
            <span className="font-semibold text-slate-700">
              {formatAttendance(event.attendance.min, event.attendance.max)}
            </span>{" "}
            attendees
          </span>
        </div>

        {/* Scores */}
        <div className="mt-auto pt-4 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Importance
            </span>
            <ScoreDots score={event.importanceScore} color="blue" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Deal Flow
            </span>
            <ScoreDots score={event.dealRelevanceScore} color="emerald" />
          </div>
        </div>
      </div>
    </Link>
  );
}
