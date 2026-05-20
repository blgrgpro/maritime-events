import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Calendar, Building2, Users,
  ExternalLink, Wifi, Mail, Phone, Linkedin, Rocket,
} from "lucide-react";
import { events } from "@/data/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.name} — Maritime Events Europe`,
    description: event.description.slice(0, 155),
  };
}

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

const ATTENDEE_COLORS: Record<string, string> = {
  shipowners: "bg-blue-500",
  investors:  "bg-emerald-500",
  startups:   "bg-violet-500",
  corporates: "bg-orange-500",
  regulators: "bg-slate-400",
};

const ATTENDEE_LABELS: Record<string, string> = {
  shipowners: "Shipowners", investors: "Investors",
  startups: "Startups", corporates: "Corporates", regulators: "Regulators",
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  conference: "Conference", expo: "Exhibition", summit: "Summit",
  workshop: "Workshop", forum: "Forum", awards: "Awards",
};

const NETWORKING_STYLES: Record<string, string> = {
  High:   "bg-blue-50 text-blue-700 border-blue-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low:    "bg-slate-100 text-slate-500 border-slate-200",
};

const ACCESS_STYLES: Record<string, string> = {
  "open":            "bg-emerald-50 text-emerald-700 border-emerald-200",
  "paid":            "bg-slate-100 text-slate-600 border-slate-200",
  "invitation-only": "bg-purple-50 text-purple-700 border-purple-200",
};

function formatAttendance(min: number, max: number): string {
  const fmt = (n: number) => n >= 1000 ? `${Math.round(n / 1000)}K` : `${n}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const attendeeEntries = Object.entries(event.whoAttends) as [string, number][];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-8 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Events
      </Link>

      {/* Header card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded-full px-3 py-1">
            {EVENT_TYPE_LABELS[event.eventType]}
          </span>
          <span className={`text-sm font-medium border rounded-full px-3 py-1 ${ACCESS_STYLES[event.accessType]}`}>
            {event.accessType === "invitation-only" ? "Invitation Only"
              : event.accessType === "paid" ? "Paid Entry" : "Free / Open"}
          </span>
          <span className={`text-sm font-medium border rounded-full px-3 py-1 ${NETWORKING_STYLES[event.networkingLevel]}`}>
            <Wifi className="inline w-3.5 h-3.5 mr-1" />
            {event.networkingLevel} Networking
          </span>
        </div>

        {/* Country + name */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{FLAGS[event.countryCode] ?? "🌍"}</span>
          <span className="text-sm text-slate-500 font-medium">{event.city}, {event.country}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          {event.name}
        </h1>

        {/* Location + date */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            {event.date}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            {event.venue}
          </div>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-2">
          {event.categories.map((c) => (
            <span
              key={c}
              className={`text-sm font-medium border rounded-full px-3 py-1 ${
                CATEGORY_STYLES[c] ?? "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* About */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">About</h2>
            <p className="text-slate-700 text-sm leading-relaxed">{event.description}</p>
          </div>

          {/* Why it matters for us */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Rocket className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-blue-900">
                Why This Matters for Us
              </h2>
            </div>
            <p className="text-blue-800 text-sm leading-relaxed">{event.importanceForUs}</p>
          </div>

          {/* Why it matters for the ecosystem */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Rocket className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-emerald-900">
                Why This Matters for the Ecosystem
              </h2>
            </div>
            <p className="text-emerald-800 text-sm leading-relaxed">{event.importanceForEcosystem}</p>
          </div>

          {/* Editions timeline */}
          {event.editions && event.editions.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Editions</h2>
              <div className="space-y-3">
                {event.editions.map((ed) => (
                  <div key={ed.year} className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        ed.status === "upcoming"
                          ? "border-blue-500 bg-white"
                          : "border-slate-300 bg-slate-200"
                      }`} />
                      <div className="w-px h-4 bg-slate-100 last:hidden" />
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{ed.year}</span>
                        <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                          ed.status === "upcoming"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {ed.status === "upcoming" ? "Upcoming" : "Past"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{ed.date}</p>
                      {ed.venue && (
                        <p className="text-xs text-slate-400 mt-0.5">{ed.venue}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organiser details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Organiser</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-slate-800">{event.organizer}</p>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2"
                >
                  {event.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          </div>

          {/* Who attends */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Who Attends</h2>
            <div className="space-y-4">
              {attendeeEntries.map(([key, pct]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{ATTENDEE_LABELS[key]}</span>
                    <span className="text-sm font-semibold text-slate-900">{pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ATTENDEE_COLORS[key] ?? "bg-slate-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Quick facts */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Quick Facts</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Attendance</p>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-xl font-bold text-slate-900">
                    {formatAttendance(event.attendance.min, event.attendance.max)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Primary Focus</p>
                <span className="text-sm font-medium text-slate-700 capitalize">
                  {event.attendeeFocus === "mixed" ? "Mixed industry" : event.attendeeFocus}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Networking Level</p>
                <span className={`text-sm font-semibold border rounded-full px-3 py-1 ${NETWORKING_STYLES[event.networkingLevel]}`}>
                  {event.networkingLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          {event.contact && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Contact</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{event.contact.name}</p>
                  {event.contact.role && (
                    <p className="text-xs text-slate-500">{event.contact.role}</p>
                  )}
                </div>
                {event.contact.email && (
                  <a
                    href={`mailto:${event.contact.email}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 group"
                  >
                    <Mail className="w-4 h-4 text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                    <span className="truncate">{event.contact.email}</span>
                  </a>
                )}
                {event.contact.phone && (
                  <a
                    href={`tel:${event.contact.phone}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                  >
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {event.contact.phone}
                  </a>
                )}
                {event.contact.linkedin && (
                  <a
                    href={event.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
                  >
                    <Linkedin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Back link shortcut */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full h-10 text-sm text-slate-500 border border-slate-200 rounded-xl hover:border-slate-300 hover:text-slate-900 bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
