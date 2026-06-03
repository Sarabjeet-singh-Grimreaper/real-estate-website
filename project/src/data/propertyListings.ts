export interface Property {
  id: number;
  title: string;
  price: string;
  priceValue: number;
  location: string;
  type: 'Plot' | 'Apartment' | 'Villa' | 'Commercial';
  status: 'For Sale' | 'New Launch' | 'Sold Out' | 'Limited Units';
  description: string;
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  images: string[];
}

// ─── PROPERTY DATABASE ───────────────────────────────────────────────
// To add a new property, copy one object below and fill in the details.
// Replace the image URLs with direct links from Postimages.org or Imgur.
// ─────────────────────────────────────────────────────────────────────

export const propertyListings: Property[] = [
  {
    id: 1,
    title: 'Emerald Crest Villas',
    price: '₹2.4 Cr',
    priceValue: 24000000,
    location: 'Whitefield, Bangalore',
    type: 'Villa',
    status: 'New Launch',
    description:
      'Nestled in the heart of Whitefield, Emerald Crest offers an unparalleled lifestyle with lush greenery, modern architecture, and world-class amenities. These thoughtfully designed villas blend contemporary style with serene natural surroundings.',
    area: '3,200 sq ft',
    bedrooms: 4,
    bathrooms: 4,
    features: [
      '4 BHK Premium Villa',
      'Private Garden & Pool',
      'Modular Kitchen',
      'Home Automation Ready',
      '3-Car Garage',
      'Club House Access',
      '24/7 Security',
      'Rainwater Harvesting',
    ],
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 2,
    title: 'Azure Heights Apartments',
    price: '₹85 L',
    priceValue: 8500000,
    location: 'Bandra West, Mumbai',
    type: 'Apartment',
    status: 'For Sale',
    description:
      'Azure Heights redefines urban luxury living in the iconic Bandra West neighbourhood. These intelligently planned apartments offer breathtaking sea views, premium finishes, and a vibrant community lifestyle just minutes from the city\'s finest dining and entertainment.',
    area: '1,150 sq ft',
    bedrooms: 3,
    bathrooms: 2,
    features: [
      '3 BHK Sea View Apartment',
      'Floor-to-Ceiling Windows',
      'Italian Marble Flooring',
      'Fully Equipped Gym',
      'Swimming Pool',
      'Children\'s Play Area',
      'Covered Parking',
      'Power Backup',
    ],
    images: [
      'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 3,
    title: 'Serene Valley Plots',
    price: '₹42 L',
    priceValue: 4200000,
    location: 'Sarjapur Road, Bangalore',
    type: 'Plot',
    status: 'Limited Units',
    description:
      'Serene Valley is a premium plotted development spread across 25 acres of tree-lined avenues on the rapidly growing Sarjapur Road corridor. A rare opportunity to own land in one of Bangalore\'s most sought-after investment zones with ready-to-build approvals.',
    area: '1,200 sq ft',
    features: [
      'BMRDA Approved Layout',
      'Corner & Avenue Plots Available',
      'Wide Internal Roads',
      'Underground Drainage',
      'Street Lighting',
      'Landscape Parks',
      'Clear Title Deeds',
      'Easy Loan Availability',
    ],
    images: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 4,
    title: 'The Grand Commercial Hub',
    price: '₹1.8 Cr',
    priceValue: 18000000,
    location: 'Gachibowli, Hyderabad',
    type: 'Commercial',
    status: 'For Sale',
    description:
      'Prime Grade-A commercial office space in the booming IT corridor of Gachibowli. Strategically located with excellent connectivity to the Financial District and major IT campuses, this development is ideal for businesses seeking a prestigious address with modern infrastructure.',
    area: '2,800 sq ft',
    features: [
      'Grade-A Office Space',
      'LEED Certified Building',
      'High-Speed Elevators',
      'Dedicated Power Supply',
      'Server Room Ready',
      'Ample Visitor Parking',
      'Food Court on Premises',
      '24/7 Security & Surveillance',
    ],
    images: [
      'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 5,
    title: 'Pearl Residency',
    price: '₹55 L',
    priceValue: 5500000,
    location: 'Wakad, Pune',
    type: 'Apartment',
    status: 'New Launch',
    description:
      'Pearl Residency is a meticulously crafted residential community in the thriving hub of Wakad. Designed for the modern family, the project combines functional layouts with premium amenities and excellent connectivity to the Hinjewadi IT Park.',
    area: '920 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    features: [
      '2 BHK Smart Apartments',
      'IoT-Enabled Homes',
      'Infinity Edge Pool',
      'Jogging Track',
      'Multi-Purpose Hall',
      'EV Charging Points',
      'Solar-Powered Common Areas',
      'Vastu Compliant',
    ],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 6,
    title: 'Horizon Farmhouse Plots',
    price: '₹28 L',
    priceValue: 2800000,
    location: 'Devanahalli, Bangalore',
    type: 'Plot',
    status: 'For Sale',
    description:
      'Horizon Farmhouse Plots offer a rare chance to own agricultural land near the Kempegowda International Airport zone. With NA conversion in progress and clear title deeds, this is an excellent long-term investment in one of Karnataka\'s fastest-appreciating corridors.',
    area: '2,400 sq ft',
    features: [
      'Airport Zone Investment',
      'NA Conversion in Progress',
      'Bore Well Available',
      'Farm Road Access',
      'Electricity Connection',
      'Compound Wall Option',
      'Clear Khata',
      'Flexible Payment Plans',
    ],
    images: [
      'https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-60013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/974964/pexels-photo-974964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2132179/pexels-photo-2132179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 7,
    title: 'Skyline Penthouse',
    price: '₹5.2 Cr',
    priceValue: 52000000,
    location: 'Koregaon Park, Pune',
    type: 'Apartment',
    status: 'Limited Units',
    description:
      'An extraordinary penthouse residence crowning the iconic Skyline Tower in the most fashionable address in Pune. Offering 360-degree panoramic views, a private rooftop terrace, and bespoke interior finishes, this is the pinnacle of luxury urban living.',
    area: '5,500 sq ft',
    bedrooms: 5,
    bathrooms: 5,
    features: [
      '5 BHK Penthouse',
      'Private Rooftop Terrace',
      '360° Panoramic Views',
      'Private Elevator Lobby',
      'Smart Home System',
      'Wine Cellar',
      'Home Theatre',
      'Concierge Service',
    ],
    images: [
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 8,
    title: 'Prestige Business Park',
    price: '₹95 L',
    priceValue: 9500000,
    location: 'Electronic City, Bangalore',
    type: 'Commercial',
    status: 'For Sale',
    description:
      'Prestige Business Park delivers modern plug-and-play office solutions at the heart of Electronic City Phase 1. Excellent metro connectivity, dedicated fiber infrastructure, and flexible floor plates make this ideal for IT/ITeS companies of all sizes.',
    area: '1,800 sq ft',
    features: [
      'Plug & Play Office Units',
      'Fiber-Ready Infrastructure',
      'Metro Connectivity',
      'Cafeteria & Food Court',
      'Conference Facilities',
      'Generator Backup',
      'Ample Parking Bays',
      'CCTV Surveillance',
    ],
    images: [
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: 9,
    title: 'Riverside Heritage Villas',
    price: '₹3.6 Cr',
    priceValue: 36000000,
    location: 'Jubilee Hills, Hyderabad',
    type: 'Villa',
    status: 'For Sale',
    description:
      'Riverside Heritage redefines luxury living in Hyderabad\'s most prestigious locality. These stately independent villas are crafted with the finest materials and inspired by Rajputana architecture, offering expansive living spaces and curated landscaped gardens.',
    area: '4,500 sq ft',
    bedrooms: 5,
    bathrooms: 5,
    features: [
      '5 BHK Independent Villa',
      'Heritage Architecture',
      'Private Swimming Pool',
      'Landscape Garden',
      'Servant Quarters',
      'Home Theatre Room',
      'Double Height Living Room',
      'Smart Security System',
    ],
    images: [
      'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
];
