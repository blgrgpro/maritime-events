import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  Users,
  ExternalLink,
  Wifi,
} from "lucide-react";
import { events } from "@/data/events";
import ScoreDots from "@/components/ScoreDots";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.name} — Maritime Events Europe`,
    description: event.description.slice(0, 155),
  };
}

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

const ATTENDEE_LABELS: Record<string, string> = {
  shipowners: "Shipowners",
  investors: "Investors",
  startups: "Startups",
  corporates: "Corporates",
  regulators: "Regulators",
};

const ATTENDEE_COLORS: Record<string, string> = {
  shipowners: "bg-blue-500",
  investors: "bg-emerald-500",
  startups: "bg-violet-500",
  corporates: "bg-orange-500",
  regulators: "bg-slate-400",
};

function formatAttendance(min: number, max: number): string {
  const fmt = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}K` : `${n}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

function NetworkingBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const styles = {
    High: "bg-blue-50 text-blue-700 border-blue-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-slate-100 text-slate-500 border-slate-200",
  };
  return (
    <span
      className={`text-sm font-semibold border rounded-full px-3 py-1 ${styles[level]}`}
    >
      {level}
    </span>
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const attendeeEntries = Object.entries(event.whoAttends) as [
    string,
    number
  ][];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-8 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Events
      </Link>

      {/* Page header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{FLAGS[event.countryCode] ?? "🌍"}</span>
          <span className="text-sm font-medium text-slate-500">
            {event.city}, {event.country}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          {event.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            {event.date}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            {event.venue}
          </div>
        </div>

        {/* Sector tags */}
        <div className="flex flex-wrap gap-2">
          {event.sectors.map((s) => (
            <span
              key={s}
              className={`text-sm font-medium border rounded-full px-3 py-1 ${
                SECTOR_STYLES[s] ??
                "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: description + organiser */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
              About
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              {event.description}
            </p>
          </div>

          {/* Organiser + website */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
              Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Organiser</p>
                  <p className="text-sm font-medium text-slate-800">
                    {event.organizer}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Venue</p>
                  <p className="text-sm font-medium text-slate-800">
                    {event.venue}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Website</p>
                  <a
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2"
                  >
                    {event.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Who attends */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
              Who Attends
            </h2>
            <div className="space-y-4">
              {attendeeEntries.map(([key, pct]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700">
                      {ATTENDEE_LABELS[key]}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        ATTENDEE_COLORS[key] ?? "bg-slate-400"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: metrics sidebar */}
        <div className="space-y-4">
          {/* Attendance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                Attendance
              </span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">
              {formatAttendance(event.attendance.min, event.attendance.max)}
            </p>
            <p className="text-xs text-slate-400 mt-1">estimated attendees</p>
          </div>

          {/* Scores */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-500">
                  Importance Score
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {event.importanceScore}/5
                </span>
              </div>
              <ScoreDots score={event.importanceScore} color="blue" />
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                {event.importanceExplanation}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-500">
                  Deal Relevance
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {event.dealRelevanceScore}/5
                </span>
              </div>
              <ScoreDots score={event.dealRelevanceScore} color="emerald" />
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                {event.dealRelevanceExplanation}
              </p>
            </div>
          </div>

          {/* Networking level */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                Networking
              </span>
            </div>
            <NetworkingBadge level={event.networkingLevel} />
          </div>
        </div>
      </div>
    </div>
  );
}
