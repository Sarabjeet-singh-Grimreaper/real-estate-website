import { Building2, Phone, MessageCircle, Search, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '917696788797';

export default function HeroSection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm looking for a property. Could you help me find the right one?")}`;

  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />
      
      {/* Animated overlay blobs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-0 -right-40 w-80 h-80 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      
      {/* Main overlays */}
      <div className="absolute inset-0 bg-slate-900/65" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/40 via-transparent to-slate-900/60" />

      {/* Top nav bar */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 max-w-7xl mx-auto backdrop-blur-md">
        <div className="flex items-center gap-2.5 transform hover:scale-105 transition-transform duration-300">
          <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-blue-500/50">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight leading-none block">PrimeEstate</span>
            <span className="text-sky-300 text-xs">Premium Properties</span>
          </div>
        </div>

        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-lg hover:shadow-sky-500/50 backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Call Us</span>
        </a>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24 text-center">
        <span className="inline-block bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase animate-fade-in">
          ✨ Trusted Real Estate Partner
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight animate-fade-in-up bg-gradient-to-r from-white via-sky-100 to-white bg-clip-text text-transparent">
          Find Your Dream{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            Property
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Explore our curated collection of premium plots, apartments, villas, and commercial spaces. Every listing is verified, priced right, and ready for you.
        </p>

        {/* Quick stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-8">
          {[
            { value: '200+', label: 'Properties' },
            { value: '15+', label: 'Locations' },
            { value: '500+', label: 'Happy Clients' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-slate-400 text-xs sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#listings"
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3.5 rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5"
          >
            Browse Listings
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3.5 rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1200 50 960 60 720 45C480 30 240 10 0 30L0 60Z" fill="#f8fafc" />
        </svg>
      </div>
    </header>
  );
}
