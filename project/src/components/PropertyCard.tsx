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
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-slate-100 flex flex-col hover:border-sky-200 transform hover:scale-105"
    >
      {/* Image container with enhanced effects */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-slate-100 to-slate-200" onClick={() => onView(property)}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
        />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent group-hover:from-sky-900/40 transition-all duration-500" />

        {/* Status badge with animation */}
        <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${statusColors[property.status]} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          {property.status}
        </span>

        {/* Image count with hover effect */}
        {property.images.length > 1 && (
          <span className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300">
            📸 +{property.images.length - 1}
          </span>
        )}

        {/* Animated price tag */}
        <div className="absolute bottom-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-white font-extrabold text-2xl drop-shadow-xl">{property.price}</span>
        </div>

        {/* Animated view button on hover */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2 hover:shadow-2xl transform scale-90 group-hover:scale-100 transition-all">
            View Details <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content with animations */}
      <div className="p-5 flex flex-col flex-1" onClick={() => onView(property)}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors duration-300">
            {property.title}
          </h3>
          <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg border transform group-hover:scale-110 transition-transform duration-300 ${typeColors[property.type]}`}>
            {property.type}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3 group-hover:text-sky-600 transition-colors duration-300">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate font-medium">{property.location}</span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
          {property.description}
        </p>

        {/* Specs with animations */}
        <div className="flex items-center gap-3 text-slate-600 text-xs mt-auto pt-4 border-t border-slate-100 group-hover:border-sky-100 transition-colors duration-300">
          {property.area && (
            <span className="flex items-center gap-1 group-hover:text-sky-700 transition-colors duration-300">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              {property.area}
            </span>
          )}
          {property.bedrooms && (
            <span className="flex items-center gap-1 group-hover:text-sky-700 transition-colors duration-300">
              <BedDouble className="w-4 h-4 text-slate-400" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1 group-hover:text-sky-700 transition-colors duration-300">
              <Bath className="w-4 h-4 text-slate-400" />
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
