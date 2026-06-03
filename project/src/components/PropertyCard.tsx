import { MapPin, Maximize2, BedDouble, Bath, MessageCircle } from 'lucide-react';
import { Property } from '../data/propertyListings';

// Replace with your WhatsApp business number (include country code, no + or spaces)
const WHATSAPP_NUMBER = '917696788797';

const statusColors: Record<Property['status'], string> = {
  'For Sale': 'bg-sky-100 text-sky-700',
  'New Launch': 'bg-emerald-100 text-emerald-700',
  'Sold Out': 'bg-rose-100 text-rose-700',
  'Limited Units': 'bg-amber-100 text-amber-700',
};

const typeColors: Record<Property['type'], string> = {
  Plot: 'bg-orange-50 text-orange-600 border-orange-200',
  Apartment: 'bg-blue-50 text-blue-600 border-blue-200',
  Villa: 'bg-teal-50 text-teal-600 border-teal-200',
  Commercial: 'bg-slate-50 text-slate-600 border-slate-200',
};

interface Props {
  property: Property;
  onView: (property: Property) => void;
}

export default function PropertyCard({ property, onView }: Props) {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in the property: ${property.title} located in ${property.location}. Could you please share more details?`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-slate-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52" onClick={() => onView(property)}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

        {/* Status badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[property.status]}`}>
          {property.status}
        </span>

        {/* Image count */}
        {property.images.length > 1 && (
          <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            +{property.images.length - 1} photos
          </span>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-xl drop-shadow-lg">{property.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1" onClick={() => onView(property)}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors">
            {property.title}
          </h3>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-md border ${typeColors[property.type]}`}>
            {property.type}
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 mb-3 leading-relaxed">
          {property.description}
        </p>

        <div className="flex items-center gap-3 text-slate-600 text-sm mt-auto pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            {property.area}
          </span>
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-slate-400" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              {property.bathrooms} Baths
            </span>
          )}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="px-4 pb-4">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          Inquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
