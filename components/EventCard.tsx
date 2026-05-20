import Link from "next/link";
import { MapPin, Users, Calendar } from "lucide-react";
import { MaritimeEvent } from "@/types";

const FLAGS: Record<string, string> = {
  NO: "🇳🇴", GR: "🇬🇷", DE: "🇩🇪", GB: "🇬🇧",
  NL: "🇳🇱", DK: "🇩🇰", SE: "🇸🇪", FR: "🇫🇷",
  ES: "🇪🇸", BE: "🇧🇪",
};

const CATEGORY_STYLES: Record<string, string> = {
  "Shipping & Ocean Transport":          "bg-blue-50 text-blue-700 border-blue-200",
  "Ports & Terminals":                   "bg-orange-50 text-orange-700 border-orange-200",
  "Offshore Energy":                     "bg-teal-50 text-teal-700 border-teal-200",
  "Maritime Technology":                 "bg-violet-50 text-violet-700 border-violet-200",
  "Shipbuilding & Repair":               "bg-slate-100 text-slate-700 border-slate-300",
  "Cruise & Ferry Industry":             "bg-pink-50 text-pink-700 border-pink-200",
  "Maritime Safety & Regulation":        "bg-red-50 text-red-700 border-red-200",
  "Defense & Naval Maritime":            "bg-gray-100 text-gray-700 border-gray-300",
  "Maritime Logistics & Supply Chain":   "bg-amber-50 text-amber-700 border-amber-200",
  "Maritime Sustainability & Decarbonisation": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function formatAttendance(min: number, max: number): string {
  const fmt = (n: number) => n >= 1000 ? `${Math.round(n / 1000)}K` : `${n}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

function truncate(text: string, max = 100): string {
  return text.length <= max ? text : text.slice(0, max).trimEnd() + "…";
}

export default function EventCard({ event }: { event: MaritimeEvent }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block h-full">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 h-full hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 flex flex-col gap-3">

        {/* Top row: country flag */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span>{FLAGS[event.countryCode] ?? "🌍"}</span>
            <span className="text-xs">{event.country}</span>
          </div>
        </div>

        {/* Event name + location + date */}
        <div>
          <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
            {event.name}
          </h3>
          <div className="flex flex-col gap-1 mt-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{event.city}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>{event.date}</span>
            </div>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-500 leading-relaxed">
          {truncate(event.description, 110)}
        </p>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {event.categories.slice(0, 2).map((c) => (
            <span
              key={c}
              className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${
                CATEGORY_STYLES[c] ?? "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {c}
            </span>
          ))}
          {event.categories.length > 2 && (
            <span className="text-xs text-slate-400 self-center">
              +{event.categories.length - 2}
            </span>
          )}
        </div>

        {/* Footer: attendance */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Users className="w-3 h-3" />
            <span className="font-medium text-slate-700">
              {formatAttendance(event.attendance.min, event.attendance.max)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
