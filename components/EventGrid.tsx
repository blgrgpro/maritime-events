"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { MaritimeEvent } from "@/types";
import EventCard from "./EventCard";
import { countries, categories } from "@/data/events";

interface Props { events: MaritimeEvent[] }

function getMidAttendance(e: MaritimeEvent) {
  return (e.attendance.min + e.attendance.max) / 2;
}

function matchesSize(e: MaritimeEvent, size: string): boolean {
  const mid = getMidAttendance(e);
  if (size === "100-500")     return mid < 500;
  if (size === "500-2000")    return mid >= 500 && mid < 2000;
  if (size === "2000-10000")  return mid >= 2000 && mid < 10000;
  if (size === "10000+")      return mid >= 10000;
  return true;
}

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

function FilterSelect({ value, onChange, options, placeholder }: SelectProps) {
  const isActive = Boolean(value);
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none h-9 pl-3 pr-8 text-sm rounded-xl border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 w-full ${
          isActive
            ? "border-blue-400 bg-blue-50 text-blue-700 font-medium"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
    </div>
  );
}

export default function EventGrid({ events }: Props) {
  const [search,       setSearch]       = useState("");
  const [country,      setCountry]      = useState("");
  const [category,     setCategory]     = useState("");
  const [eventSize,    setEventSize]    = useState("");
  const [focus,        setFocus]        = useState("");
  const [eventType,    setEventType]    = useState("");
  const [accessType,   setAccessType]   = useState("");
  const [networking,   setNetworking]   = useState("");
  const [filtersOpen,  setFiltersOpen]  = useState(false);

  const activeCount = [country, category, eventSize, focus, eventType, accessType, networking]
    .filter(Boolean).length;

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const q = search.toLowerCase();
      if (q && !e.name.toLowerCase().includes(q) &&
               !e.city.toLowerCase().includes(q) &&
               !e.country.toLowerCase().includes(q)) return false;
      if (country   && e.country !== country) return false;
      if (category  && !e.categories.includes(category)) return false;
      if (eventSize && !matchesSize(e, eventSize)) return false;
      if (focus     && e.attendeeFocus !== focus) return false;
      if (eventType && e.eventType !== eventType) return false;
      if (accessType && e.accessType !== accessType) return false;
      if (networking && e.networkingLevel !== networking) return false;
      return true;
    });
  }, [events, search, country, category, eventSize, focus, eventType, accessType, networking]);

  function clearAll() {
    setSearch(""); setCountry(""); setCategory(""); setEventSize("");
    setFocus(""); setEventType(""); setAccessType(""); setNetworking("");
  }

  return (
    <div>
      {/* Sticky bar */}
      <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, city or country…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className={`flex items-center gap-2 h-9 px-3.5 text-sm rounded-xl border transition-colors ${
                filtersOpen || activeCount > 0
                  ? "border-blue-400 bg-blue-50 text-blue-700 font-medium"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {activeCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full">
                  {activeCount}
                </span>
              )}
            </button>

            {/* Clear */}
            {(search || activeCount > 0) && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 h-9 px-3 text-sm text-slate-500 hover:text-slate-900 border border-slate-200 rounded-xl hover:border-slate-300 bg-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>

          {/* Expanded filters */}
          {filtersOpen && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              <FilterSelect
                value={country} onChange={setCountry}
                options={countries.map((c) => ({ value: c, label: c }))}
                placeholder="Country"
              />
              <FilterSelect
                value={category} onChange={setCategory}
                options={categories.map((c) => ({ value: c, label: c }))}
                placeholder="Category"
              />
              <FilterSelect
                value={eventSize} onChange={setEventSize}
                options={[
                  { value: "100-500",   label: "Small (100–500)" },
                  { value: "500-2000",  label: "Medium (500–2K)" },
                  { value: "2000-10000",label: "Large (2K–10K)" },
                  { value: "10000+",    label: "Mega (10K+)" },
                ]}
                placeholder="Event Size"
              />
              <FilterSelect
                value={focus} onChange={setFocus}
                options={[
                  { value: "shipowners", label: "Shipowners" },
                  { value: "investors",  label: "Investors" },
                  { value: "startups",   label: "Startups" },
                  { value: "government", label: "Government" },
                  { value: "mixed",      label: "Mixed" },
                ]}
                placeholder="Attendee Focus"
              />
              <FilterSelect
                value={eventType} onChange={setEventType}
                options={[
                  { value: "conference", label: "Conference" },
                  { value: "expo",       label: "Exhibition" },
                  { value: "summit",     label: "Summit" },
                  { value: "forum",      label: "Forum" },
                  { value: "awards",     label: "Awards" },
                  { value: "workshop",   label: "Workshop" },
                ]}
                placeholder="Event Type"
              />
              <FilterSelect
                value={accessType} onChange={setAccessType}
                options={[
                  { value: "open",             label: "Free / Open" },
                  { value: "paid",             label: "Paid Entry" },
                  { value: "invitation-only",  label: "Invite Only" },
                ]}
                placeholder="Access"
              />
              <FilterSelect
                value={networking} onChange={setNetworking}
                options={[
                  { value: "High",   label: "High Networking" },
                  { value: "Medium", label: "Medium Networking" },
                  { value: "Low",    label: "Low Networking" },
                ]}
                placeholder="Networking"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-slate-500 mb-6">
          <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "event" : "events"} found
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">No events found</h3>
            <p className="text-sm text-slate-500 max-w-xs">Try adjusting your filters or search term.</p>
            <button onClick={clearAll} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
