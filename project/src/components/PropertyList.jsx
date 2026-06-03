import React, { useState, useMemo } from 'react';
import { Building2 } from 'lucide-react';
import { propertyListings } from '../data/propertyListings';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';

export default function PropertyList() {
  const [search, setSearch] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return propertyListings.filter((p) => {
      return (
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by title, location, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-700 font-medium">
          Found <span className="text-blue-600 font-bold">{filtered.length}</span> properties
        </p>
      </div>

      {/* Properties Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={setSelectedProperty}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
          <p className="text-gray-500">Try adjusting your search terms.</p>
        </div>
      )}

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  );
}
