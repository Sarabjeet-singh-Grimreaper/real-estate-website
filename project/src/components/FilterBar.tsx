import { Search, SlidersHorizontal, X } from 'lucide-react';

export type PropertyType = 'All' | 'Plot' | 'Apartment' | 'Villa' | 'Commercial';
export type PriceRange = 'All' | 'Under 50L' | '50L–1Cr' | '1Cr–3Cr' | 'Above 3Cr';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  typeFilter: PropertyType;
  onTypeChange: (v: PropertyType) => void;
  priceFilter: PriceRange;
  onPriceChange: (v: PriceRange) => void;
  resultCount: number;
}

const TYPES: PropertyType[] = ['All', 'Plot', 'Apartment', 'Villa', 'Commercial'];
const PRICES: PriceRange[] = ['All', 'Under 50L', '50L–1Cr', '1Cr–3Cr', 'Above 3Cr'];

export default function FilterBar({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  priceFilter,
  onPriceChange,
  resultCount,
}: Props) {
  const hasActiveFilters = search || typeFilter !== 'All' || priceFilter !== 'All';

  const clearAll = () => {
    onSearchChange('');
    onTypeChange('All');
    onPriceChange('All');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
        {/* Search row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by location or property name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="shrink-0 flex items-center gap-1 text-xs font-medium text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2.5 rounded-xl transition-colors border border-rose-200"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {/* Type filter */}
            <div className="flex items-center gap-1 shrink-0">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => onTypeChange(t)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 ${
                    typeFilter === t
                      ? 'bg-sky-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

            {/* Price filter */}
            <div className="flex items-center gap-1 shrink-0">
              {PRICES.map((p) => (
                <button
                  key={p}
                  onClick={() => onPriceChange(p)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 ${
                    priceFilter === p
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs text-slate-500 shrink-0 font-medium">
            {resultCount} {resultCount === 1 ? 'property' : 'properties'} found
          </span>
        </div>
      </div>
    </div>
  );
}
