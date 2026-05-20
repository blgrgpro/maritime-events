"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { MaritimeEvent } from "@/types";
import EventCard from "./EventCard";
import { countries, sectors } from "@/data/events";

interface EventGridProps {
  events: MaritimeEvent[];
}

const IMPORTANCE_OPTIONS = [
  { value: "high", label: "High (4–5)" },
  { value: "medium", label: "Medium (3)" },
  { value: "low", label: "Low (1–2)" },
];

function getImportanceLevel(score: number): string {
  if (score >= 4) return "high";
  if (score === 3) return "medium";
  return "low";
}

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

function FilterSelect({ value, onChange, options, placeholder }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none h-9 pl-3 pr-8 text-sm rounded-xl border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
          value
            ? "border-blue-400 bg-blue-50 text-blue-700 font-medium"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
        <svg
          className="w-3.5 h-3.5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default function EventGrid({ events }: EventGridProps) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [sector, setSector] = useState("");
  const [importance, setImportance] = useState("");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (country && e.country !== country) return false;
      if (sector && !e.sectors.includes(sector)) return false;
      if (importance && getImportanceLevel(e.importanceScore) !== importance)
        return false;
      return true;
    });
  }, [events, search, country, sector, importance]);

  const hasFilters = search || country || sector || importance;

  function clearFilters() {
    setSearch("");
    setCountry("");
    setSector("");
    setImportance("");
  }

  return (
    <div>
      {/* Search + filters */}
      <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:border-transparent placeholder-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />

              <FilterSelect
                value={country}
                onChange={setCountry}
                options={countries.map((c) => ({ value: c, label: c }))}
                placeholder="Country"
              />

              <FilterSelect
                value={sector}
                onChange={setSector}
                options={sectors.map((s) => ({ value: s, label: s }))}
                placeholder="Sector"
              />

              <FilterSelect
                value={importance}
                onChange={setImportance}
                options={IMPORTANCE_OPTIONS}
                placeholder="Importance"
              />

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 h-9 px-3 text-sm text-slate-500 hover:text-slate-900 border border-slate-200 rounded-xl hover:border-slate-300 bg-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "event" : "events"} found
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              No events found
            </h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Try adjusting your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
