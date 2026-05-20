import Link from "next/link";
import { Anchor } from "lucide-react";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Anchor className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-slate-900 text-sm tracking-tight">
              Maritime Events
            </span>
            <span className="text-xs font-medium text-slate-400 border border-slate-200 rounded-full px-2 py-0.5 ml-1 hidden sm:inline">
              Europe
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:block">
              34 events · 10 countries
            </span>
            <Link
              href="https://maritime-venture.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Maritime Venture →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
