import { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  CheckCircle2,
  MessageCircle,
  Tag,
} from 'lucide-react';
import { Property } from '../data/propertyListings';

const WHATSAPP_NUMBER = '917696788797';

const statusColors: Record<Property['status'], string> = {
  'For Sale': 'bg-sky-100 text-sky-700',
  'New Launch': 'bg-emerald-100 text-emerald-700',
  'Sold Out': 'bg-rose-100 text-rose-700',
  'Limited Units': 'bg-amber-100 text-amber-700',
};

interface Props {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in the property: ${property.title} located in ${property.location}. Could you please share more details?`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const prevImage = useCallback(() => {
    setActiveImage((i) => (i === 0 ? property.images.length - 1 : i - 1));
  }, [property.images.length]);

  const nextImage = useCallback(() => {
    setActiveImage((i) => (i === property.images.length - 1 ? 0 : i + 1));
  }, [property.images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prevImage, nextImage]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white w-full sm:max-w-3xl max-h-[96vh] sm:max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-slide-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        {/* Image Gallery */}
        <div className="relative bg-slate-900 overflow-hidden" style={{ height: '280px', flexShrink: 0 }}>
          <img
            key={activeImage}
            src={property.images[activeImage]}
            alt={`${property.title} - photo ${activeImage + 1}`}
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

          {/* Nav arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-2 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-2 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-full transition-all ${i === activeImage ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Status & Price overlay */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${statusColors[property.status]}`}>
              {property.status}
            </span>
            <span className="text-white font-bold text-3xl drop-shadow-lg">{property.price}</span>
          </div>

          {/* Thumbnail strip */}
          {property.images.length > 1 && (
            <div className="absolute right-4 bottom-3 flex gap-1.5">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-white scale-110' : 'border-white/40 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">{property.title}</h2>
            <span className="shrink-0 flex items-center gap-1 text-sm font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Tag className="w-3.5 h-3.5" />
              {property.type}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
            <MapPin className="w-4 h-4 shrink-0 text-sky-500" />
            <span>{property.location}</span>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center gap-1">
              <Maximize2 className="w-5 h-5 text-sky-500" />
              <span className="text-xs text-slate-500">Area</span>
              <span className="text-sm font-semibold text-slate-700 text-center">{property.area}</span>
            </div>
            {property.bedrooms ? (
              <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center gap-1">
                <BedDouble className="w-5 h-5 text-sky-500" />
                <span className="text-xs text-slate-500">Bedrooms</span>
                <span className="text-sm font-semibold text-slate-700">{property.bedrooms}</span>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center gap-1">
                <Tag className="w-5 h-5 text-sky-500" />
                <span className="text-xs text-slate-500">Type</span>
                <span className="text-sm font-semibold text-slate-700">{property.type}</span>
              </div>
            )}
            {property.bathrooms ? (
              <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center gap-1">
                <Bath className="w-5 h-5 text-sky-500" />
                <span className="text-xs text-slate-500">Bathrooms</span>
                <span className="text-sm font-semibold text-slate-700">{property.bathrooms}</span>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center gap-1">
                <MapPin className="w-5 h-5 text-sky-500" />
                <span className="text-xs text-slate-500">Location</span>
                <span className="text-sm font-semibold text-slate-700 text-center line-clamp-1">{property.location.split(',')[0]}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-2">About This Property</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {property.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer CTA */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold text-base py-4 rounded-2xl transition-colors duration-200 shadow-lg hover:shadow-emerald-200 hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
