import { useState, useMemo } from 'react';
import { Building2, MapPin, MessageCircle } from 'lucide-react';
import { propertyListings, Property } from './data/propertyListings';
import HeroSection from './components/HeroSection';
import FilterBar, { PropertyType, PriceRange } from './components/FilterBar';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';

const PRICE_RANGES: Record<PriceRange, [number, number]> = {
  'All': [0, Infinity],
  'Under 50L': [0, 5000000],
  '50L–1Cr': [5000000, 10000000],
  '1Cr–3Cr': [10000000, 30000000],
  'Above 3Cr': [30000000, Infinity],
};

export default function App() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PropertyType>('All');
  const [priceFilter, setPriceFilter] = useState<PriceRange>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filtered = useMemo(() => {
    const [min, max] = PRICE_RANGES[priceFilter];
    const q = search.toLowerCase().trim();
    return propertyListings.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchesType = typeFilter === 'All' || p.type === typeFilter;
      const matchesPrice = p.priceValue >= min && p.priceValue < max;
      return matchesSearch && matchesType && matchesPrice;
    });
  }, [search, typeFilter, priceFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        priceFilter={priceFilter}
        onPriceChange={setPriceFilter}
        resultCount={filtered.length}
      />

      {/* Listings section */}
      <main id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filtered.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                {typeFilter !== 'All' ? `${typeFilter}s` : 'All Properties'}
              </h2>
              <span className="text-sm text-slate-500">
                Showing {filtered.length} of {propertyListings.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onView={setSelectedProperty}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-9 h-9 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No properties found</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Try adjusting your search terms or removing some filters to see more results.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">PrimeEstate</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Your trusted partner in finding premium real estate across India's top cities.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Serving Bangalore, Mumbai, Pune, Hyderabad</span>
              </div>
              <a
                href={`https://wa.me/917696788797?text=${encodeURIComponent("Hi, I'm looking for a property.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4" />
                Contact on WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} PrimeEstate. All rights reserved. | All listings are subject to availability.
          </div>
        </div>
      </footer>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
