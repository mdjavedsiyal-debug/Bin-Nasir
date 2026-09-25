export interface Project {
  id: string;
  title: string;
  category: 'Commercial' | 'Residential' | 'Healthcare' | 'Industrial' | 'Institutional' | 'Infrastructure';
  location: string;
  floors: string;
  duration: string;
  workAmount: string;
  description: string;
  imageUrl: string;
  gallery?: string[];
  status: 'Completed' | 'Under Construction' | 'Ongoing' | 'Upcoming';
  featured: boolean;
  highlights: string[];
}

export interface Service {
  id: string;
  title: string;
  category: 'Core Construction' | 'Specialized Engineering' | 'Finishes & Interior' | 'Building Materials & Supply';
  description: string;
  icon: string;
  features: string[];
  imageUrl: string;
  equipmentOrBrands?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  ratingText?: string;
  projectRef: string;
  date: string;
  avatarUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export interface CompanyContactSettings {
  id: string;
  headOfficeAddress: string;
  branchOfficeAddress: string;
  phone1: string;
  phone2: string;
  phone3: string;
  whatsapp: string;
  email1: string;
  email2: string;
  hours: string;
  ceoName: string;
  ceoRole: string;
  ceoMessage: string;
  founderName: string;
  founderRole: string;
}

export const COMPANY_INFO = {
  name: "BIN NASIR REAL ESTATE & BUILDER",
  tagline: "Let Your Dreams Be Our Project",
  establishedYear: 2005,
  experienceYears: "18+",
  isoCertified: "ISO 9001:2015 Accredited",
  addresses: [
    {
      title: "Head Office",
      address: "559 Ghosia Society Thokar Niazbaig, Lahore, Pakistan",
      phone: "+92 300 4687544",
      fax: "+92 345 6005178"
    },
    {
      title: "Corporate Branch Office",
      address: "374-3-B2 Township Lahore, Pakistan - 54770",
      phone: "+92 322 4138328 / +92 333 4138328"
    }
  ],
  emails: ["info@binnasirbuilders.com", "cvileng5@gmail.com"],
  phones: ["0300-4687544", "0322-4138328", "0333-4138328"],
  whatsapp: "+923004687544",
  hours: "Monday - Saturday: 9:00 AM - 7:00 PM (Site Operations 24/7)",
  ceoMessage: "We realize best value for our customers through our advanced technologies, countless challenges and belief in open and honest management.",
  ceoName: "Muhammad Usman Nasir",
  founderName: "Nasir Iqbal",
  values: [
    {
      title: "Honest",
      desc: "Open, trusted, truthful with complete financial and structural transparency."
    },
    {
      title: "Respectful",
      desc: "Considerate, courteous and supportive to clients, workforce and communities."
    },
    {
      title: "Collaborative",
      desc: "Co-operative, helpful and friendly teamwork ensuring unified project execution."
    },
    {
      title: "Responsible",
      desc: "Accountable, safety-committed and reliable delivering uncompromised quality."
    }
  ],
  cornerstones: [
    {
      title: "On Time",
      desc: "Rigorous milestone scheduling and delivery to agreed timescales without delays."
    },
    {
      title: "Snag Free",
      desc: "Handing over turnkey projects totally free of defects and quality snags."
    },
    {
      title: "Delighted Client",
      desc: "From project kick-off to handover, striving to surpass expectations."
    },
    {
      title: "Recommended",
      desc: "Proud to be overwhelmingly endorsed to friends, associates and industry peers."
    }
  ],
  stats: [
    { label: "Megaprojects Executed", value: "16+", suffix: "Landmarks" },
    { label: "Portfolio Project Value", value: "2.5+", suffix: "Billion PKR" },
    { label: "Years of Engineering", value: "18+", suffix: "Since 2005" },
    { label: "Client Satisfaction", value: "100%", suffix: "ISO Accredited" }
  ]
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "high-q-tower",
    title: "High - Q Tower (UICP)",
    category: "Commercial",
    location: "Main Boulevard Gulberg, Lahore",
    floors: "4 Basement + 23 Floor",
    duration: "2022 to 2024",
    workAmount: "PKR 697.40 Million",
    description: "Iconic ultra-modern 27-level skyscraper engineering featuring 4 subterranean levels, heavy diaphragm raft foundation, seismic moment frame construction, curtain wall glass facade, and high-speed MEP infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Completed",
    featured: true,
    highlights: ["4 Deep Basements Excavation & Shoring", "23 Upper Commercial & Corporate Levels", "Turnkey Civil & Structural Engineering", "Seismic Resistant RCC Construction"]
  },
  {
    id: "gold-crest-mall",
    title: "Gold Crest Shopping Mall & Residency",
    category: "Commercial",
    location: "DD Sector Phase - 4 DHA Lahore",
    floors: "4 Basement + 14 Floor",
    duration: "2013 to 2019",
    workAmount: "PKR 472.62 Million",
    description: "Prestigious multi-purpose mega shopping mall and luxury residential landmark in DHA Lahore with 18 total structural slabs, marble and granite grand atrium finishes, high-volume retail podiums, and basement parking.",
    imageUrl: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Completed",
    featured: true,
    highlights: ["4 Underground Multi-Level Parking Tiers", "14 Luxury Residential & Retail Floors", "High-Volume Central Mall Atrium", "Premium Granite & Glass Finishes"]
  },
  {
    id: "ibrahim-fiber-mills",
    title: "Ibrahim Fiber Mills (34.7 Acre)",
    category: "Industrial",
    location: "Faisalabad Road Bhikhi",
    floors: "34.7 Acre Industrial Master Complex",
    duration: "2016 to 2018",
    workAmount: "PKR 357.38 Million",
    description: "Sprawling industrial civil engineering complex spanning 34.7 acres, including heavy industrial sheds, pre-engineered structural steel warehouses, heavy-duty floor slabs, sub-stations, and water drainage systems.",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Completed",
    featured: true,
    highlights: ["34.7 Acre Site Development", "Industrial Steel Warehousing & PEB", "Heavy Load Pavement & Access Roads", "Industrial Drainage & Utilities"]
  },
  {
    id: "ganga-ram-hospital",
    title: "Ganga Ram Hospital Building (M&C)",
    category: "Healthcare",
    location: "Lahore",
    floors: "2 Basement + 9 Floors Building",
    duration: "2020 to 2022",
    workAmount: "PKR 46.40 Million",
    description: "Advanced healthcare facility and medical surgical block featuring specialized hospital MEP engineering, cleanrooms, medical gas pipeline provisions, heavy structural concrete, and durable hygienic flooring.",
    imageUrl: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80"
    ],
    status: "Completed",
    featured: true,
    highlights: ["2 Basement Emergency & Utility Levels", "9 Multi-Specialty Hospital Floors", "Medical-Grade MEP Integration", "Emergency Ramps & Heavy Duty Lifts"]
  },
  {
    id: "high-court-admin-block",
    title: "High Court Admin Block",
    category: "Institutional",
    location: "Mall Road, Lahore",
    floors: "2 Basement + 9 Floors Building",
    duration: "2020 to 2021",
    workAmount: "PKR 24.12 Million",
    description: "Prestigious administrative judiciary headquarters combining classical architectural brickwork and colonial motifs with contemporary 11-level structural safety, acoustic chambers, and secure executive suites.",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: true,
    highlights: ["Heritage Red Brick Architectural Elevation", "2 Underground Vaults & Record Levels", "9 Administrative & Judicial Floors", "Acoustic Wood Panelling & False Ceilings"]
  },
  {
    id: "galleria-mall-lahore",
    title: "Galleria Mall Lahore",
    category: "Commercial",
    location: "Main Boulevard Gulberg, Lahore",
    floors: "6 Basement + 29 Floors Building",
    duration: "2024 to 2026",
    workAmount: "PKR 24.70 Million Phase",
    description: "Next-generation 35-level mega skyscraper featuring 6 basement levels for automated parking, high-load foundation, retail concourses, luxury sky residences, and premium panoramic curtain wall glazing.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    status: "Ongoing",
    featured: true,
    highlights: ["Deep 6-Level Subterranean Excavation", "29 Levels Ultra-Luxury Mixed-Use Tower", "Automated Smart Parking Infrastructure", "State-of-the-Art Curtain Wall Facade"]
  },
  {
    id: "jwd-tower-lahore",
    title: "JWD Tower Lahore",
    category: "Commercial",
    location: "Main Boulevard Gulberg, Lahore",
    floors: "5 Basement + 14 Floors Building",
    duration: "2025 to 2026",
    workAmount: "PKR 24.70 Million",
    description: "Modern high-rise commercial and corporate tower on prime Gulberg boulevard, designed with 5 basements, Grade-A office suites, fiber optic backbone, and centralized HVAC chiller integration.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    status: "Under Construction",
    featured: false,
    highlights: ["5 Basements Deep Foundation", "14 Grade-A Corporate Floors", "High-Speed Elevators & Smart Access", "Energy Efficient Building Envelope"]
  },
  {
    id: "7-q-corporate-tower",
    title: "7 - Q Corporate Tower",
    category: "Commercial",
    location: "College Road - 2 Gulberg Lahore",
    floors: "2 Basement + 14 Floor",
    duration: "2023 to Continue",
    workAmount: "PKR 23.45 Million",
    description: "Executive commercial tower featuring 16 total floors, floor-to-ceiling double-glazed windows, column-free open plan office spaces, and multi-tier fire protection systems.",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1000&q=80",
    status: "Ongoing",
    featured: false,
    highlights: ["14 Premium Office Levels", "Column-Free Modern Open Floorplates", "2 Secure Underground Basements", "NFPA Fire Safety & Suppression Systems"]
  },
  {
    id: "allied-bank-accl",
    title: "Allied Bank (ACCL)",
    category: "Commercial",
    location: "Phase 8 DHA Lahore",
    floors: "1 Basement + 6 Floor",
    duration: "2021 to 2021",
    workAmount: "PKR 19.74 Million",
    description: "Corporate banking facility constructed to high security financial standards, reinforced strongrooms, biometric surveillance integration, and bespoke corporate interior fit-out.",
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: false,
    highlights: ["High-Security Banking Branch & Vault", "1 Underground Secure Store + 6 Office Floors", "Turnkey Interior Fitout & Glass Work", "On-Time Completion Within Schedule"]
  },
  {
    id: "beaconhouse-school-tns2",
    title: "Beaconhouse School (TNS-2)",
    category: "Institutional",
    location: "Gaddafi Stadium, Lahore",
    floors: "3 Basement + 4 Floors Building",
    duration: "2020 to 2021",
    workAmount: "PKR 18.23 Million",
    description: "Avant-garde educational architecture featuring curvilinear indoor skylit atriums, acoustic auditorium, dynamic daylight learning classrooms, cantilevered walkways, and sports facilities.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: false,
    highlights: ["Curved Architectural Concrete Atrium", "3 Basements Dedicated to Labs & Parking", "Acoustically Treated Auditoriums", "Eco-friendly Thermal Insulation"]
  },
  {
    id: "lda-parking-plaza",
    title: "LDA Parking Plaza",
    category: "Infrastructure",
    location: "Moon Market Iqbal Town, Lahore",
    floors: "1 Basement + 10 Floors Building",
    duration: "2012 to 2013",
    workAmount: "PKR 17.32 Million",
    description: "High-capacity municipal multi-story vehicular parking infrastructure designed with heavy reinforced concrete ramps, vehicular traffic deck coating, intelligent barrier gates, and natural cross ventilation.",
    imageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: false,
    highlights: ["11 Heavy Vehicular Parking Tiers", "Continuous Circular Heavy-Duty Ramps", "High Load RCC Columns & Beams", "Public Congestion Alleviation Milestone"]
  },
  {
    id: "10-c-building-mm-alam",
    title: "10 - C Building MM Alam Road",
    category: "Commercial",
    location: "MM Alam Road – Gulberg 3, Lahore",
    floors: "3 Floors Building",
    duration: "2024 to 2024",
    workAmount: "PKR 16.53 Million",
    description: "High-end luxury commercial retail building located on Lahore's most celebrated commercial boulevard. Frameless structural glass elevation, high ceiling showrooms, luxury lighting, and bespoke interior finishes.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: false,
    highlights: ["Full Height Frameless Glass Elevation", "Prime MM Alam Road Retail Landmark", "Ultra-High Ceiling Luxury Showroom", "Completed Rapidly in Record Time"]
  },
  {
    id: "qurshi-university-lahore",
    title: "Qurshi University Lahore",
    category: "Institutional",
    location: "Choongh Lahore",
    floors: "1 Basement + 6 Floor",
    duration: "2020 to 2021",
    workAmount: "PKR 14.62 Million",
    description: "Expansive academic complex featuring master brick architectural facade, arched colonnades, wide lecture halls, central library, and manicured green quadrangle integration.",
    imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: false,
    highlights: ["Fair-Face Architectural Brickwork", "Arched Heritage Colonnade Design", "Academic Lecture Theatres & Laboratories", "Green Campus Integration"]
  },
  {
    id: "manawa-food-office",
    title: "Manawa Food Office Lahore",
    category: "Commercial",
    location: "Cantt, Lahore",
    floors: "1 Basement + 2 Floors Building",
    duration: "2017 to 2018",
    workAmount: "PKR 14.50 Million",
    description: "Corporate headquarters and executive administration building featuring modern facade detailing, soundproof conference rooms, automated climate control, and subterranean archives.",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: false,
    highlights: ["Corporate Executive Suite Fitout", "Soundproof Meeting Facilities", "Cantt Prime Location", "High Performance Structural Slab"]
  },
  {
    id: "kk-house-cantt",
    title: "KK House Cantt",
    category: "Residential",
    location: "Cantt, Lahore",
    floors: "1 Basement + 2 Floors Building",
    duration: "2023 to 2024",
    workAmount: "PKR 9.50 Million",
    description: "Ultra-luxury bespoke residential villa featuring custom cantilevers, Italian marble flooring, imported thermal break aluminum windows, designer false ceilings, and smart home automation.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    status: "Completed",
    featured: false,
    highlights: ["Bespoke Turnkey Residential Masterpiece", "Imported Marble & Granite Finishes", "Basement Entertainment Lounge & Spa", "Architectural Landscaping & Water Features"]
  },
  {
    id: "bank-al-habib-izhar",
    title: "Bank AL Habib (Izhar Group)",
    category: "Commercial",
    location: "Main Boulevard Gulberg Lahore",
    floors: "3 Basement + 11 Floor",
    duration: "2025 to 2025",
    workAmount: "PKR 8.76 Million",
    description: "Corporate commercial center with 14 continuous levels on Gulberg Main Boulevard. Features 3 basement levels, heavy structural RCC cores, and high-efficiency MEP installations.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    status: "Ongoing",
    featured: false,
    highlights: ["3 Basements Deep Shoring", "11 Commercial Upper Tiers", "Gulberg Boulevard Prime Visibility", "Full Fire Safety System"]
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: "home-construction",
    title: "Luxury Home Construction",
    category: "Core Construction",
    description: "Complete turnkey residential construction from excavation, solid grey structure casting, to ultra-luxury architectural finishing. Crafted with family ethos, quality materials, and lifetime structural integrity.",
    icon: "Home",
    features: [
      "Custom Architectural 1 & 2 Kanal, 10 & 5 Marla Luxury Villas",
      "Grade-60 High Yield Steel Reinforcement & 3000-4000 PSI Concrete",
      "Full Interior Turnkey Execution (Marble, Wardrobes, Designer Kitchens)",
      "Strict Snag-Free Handover Guaranteed On-Time"
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Grade-A Bricks", "DG Cement", "Deformed Steel", "Imported Marbles"]
  },
  {
    id: "commercial-construction",
    title: "Commercial & High-Rise Construction",
    category: "Core Construction",
    description: "Premier capability to engineer landmark skyscrapers, shopping malls, and corporate towers up to 30+ floors and 6 underground basements. Specialized deep shoring, raft foundations, and steel moment frames.",
    icon: "Building2",
    features: [
      "Multi-story Corporate Towers, Plazas & Shopping Malls",
      "Deep Basements Excavation, Shoring & Dewatering Systems",
      "Raft Foundation Casting with Heavy Transit Concrete Pumps",
      "Compliant with International Building Codes & Seismic Standards"
    ],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["High-Q Tower", "Gold Crest Mall", "Galleria Mall", "JWD Tower"]
  },
  {
    id: "road-construction",
    title: "Road Construction & Civil Infrastructure",
    category: "Core Construction",
    description: "Heavy road works, urban avenues, and industrial pavements. Complete execution including sub-base grading, Sargodha water bond compaction, Dina stone packing, and high-density asphalt paving.",
    icon: "Route",
    features: [
      "Sub-Base & Base Course Preparation & Compaction",
      "Sargodha Water Bond & Stone Dust Stabilized Foundations",
      "Heavy Road Roller Compaction & Asphalt Laying",
      "Stormwater Drainage, Kerbstones, & Road Marking"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Heavy Road Rollers", "Graders", "Dina Stone", "Sargodha Base"]
  },
  {
    id: "crane-and-lifter",
    title: "Crane & Heavy Lifter Fleet Operations",
    category: "Specialized Engineering",
    description: "Comprehensive heavy machinery deployment for high-rise steel lifting, concrete bucket hoisting, and industrial machinery placement. Managed by certified riggers and safety engineers.",
    icon: "Truck",
    features: [
      "Tadano Mobile Cranes (Telescopic Boom 25T - 100T)",
      "Heli Industrial Forklifts & Site Lifters",
      "High-Altitude Concrete Hoisting & Prefab Erection",
      "Certified Riggers & Rigorous OSHA Safety Compliance"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Tadano (Japan)", "Heli", "Mobile Cranes", "Boom Lifters"]
  },
  {
    id: "water-bore",
    title: "Water Bore & Deep Well Drilling",
    category: "Specialized Engineering",
    description: "Deep subterranean aquifer rotary drilling for residential, commercial towers, and industrial plants. Installation of heavy PVC/mild steel casing, filtration gravel, and submersible pumping units.",
    icon: "Drill",
    features: [
      "Rotary Rig Deep Aquifer Drilling (200ft to 1,000ft+)",
      "Food-Grade & Industrial Bore Well Casing Installation",
      "Pumping Tests & Water Quality Filtration Analysis",
      "Integration with High-Efficiency Submersible Turbine Pumps"
    ],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Heavy Rotary Rigs", "PVC Strainers", "Deep Well Casings"]
  },
  {
    id: "mep-engineering",
    title: "MEP (Mechanical, Electrical & Plumbing)",
    category: "Specialized Engineering",
    description: "Comprehensive integrated building services design and installation. Seamless coordination between HVAC ducts, electrical distribution, fire suppression, and pressurized water systems.",
    icon: "Cpu",
    features: [
      "BIM Coordinated Clash-Free MEP Layouts & Execution",
      "Central HVAC Ducting, Chilled Water Piping & Air Handling",
      "Complete Fire Fighting Standpipes, Sprinklers & Alarms",
      "Acoustic Insulation & Vibration Damping for Mechanical Rooms"
    ],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["NFPA Standards", "UL/FM Equipment", "BIM 3D", "PPRC/UPVC"]
  },
  {
    id: "electrical-engineering",
    title: "Electrical & Substation Engineering",
    category: "Specialized Engineering",
    description: "Turnkey electrical infrastructure for commercial towers and residential complexes. Transformers, Main Distribution Boards (MDB), smart busway risers, and intelligent lighting systems.",
    icon: "Zap",
    features: [
      "LT/HT Panel Fabrication & Transformer Installation",
      "Power Factor Improvement (PFI) Plants & Generator Sync",
      "Smart Lighting Automation & Pop-Up Cable Boxes",
      "Earth Grounding & Surge Lightning Protection Systems"
    ],
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Chalmit (UK)", "Ansell (UK)", "NVC", "Sun Light", "Pop Up Box"]
  },
  {
    id: "plumbing-sanitary",
    title: "Plumbing & Sanitary Solutions",
    category: "Specialized Engineering",
    description: "High-performance water supply and drainage networks. Pressure booster pump stations, sewage lift pumps, rainwater harvesting, and premium sanitary bathroom fixtures.",
    icon: "Wrench",
    features: [
      "Pressurized Potable Water Distribution & Booster Sets",
      "Acoustic Soil, Waste & Vent (SWV) Piping",
      "Industrial Sewage Pumps & Sump Drainage Systems",
      "Commercial Water Heaters & Solar Thermal Integration"
    ],
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Pedrollo (Italy)", "Grundfos (Denmark)", "Espa (Spain)", "Ariston Heaters"]
  },
  {
    id: "aluminum-glass",
    title: "Aluminum & Architectural Glass Facades",
    category: "Finishes & Interior",
    description: "Modern architectural envelopes. Structural double-glazed curtain walls, thermal-break sliding profiles, frameless spider glass systems, and panoramic balcony balustrades.",
    icon: "Maximize",
    features: [
      "Thermally Insulated Curtain Wall Facades for High Rises",
      "Double Glazed Low-E Acoustic Glass Units",
      "Frameless Commercial Glass Showrooms & Entrances",
      "Heavy Duty Architectural Sliding Doors & Skylights"
    ],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Imported Architectural Aluminum", "Tempered Safety Glass", "Spider Fittings"]
  },
  {
    id: "interior-design",
    title: "Interior Design & Turnkey Fit-Out",
    category: "Finishes & Interior",
    description: "Luxury interior transformations for executive corporate offices, boutique retail, and royal residences. Space planning, 3D visualization, mood lighting, and bespoke furniture.",
    icon: "Palette",
    features: [
      "Photorealistic 3D Concept Design & Space Planning",
      "Executive Boardrooms, Luxury Lounges & Master Bedrooms",
      "Architectural Lighting Design with Ambient Illumination",
      "Turnkey Execution with Handcrafted Furnishings"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Italian Marble", "Custom CNC Panels", "Designer Chandeliers"]
  },
  {
    id: "false-ceiling",
    title: "False Ceiling & Acoustic Solutions",
    category: "Finishes & Interior",
    description: "Aesthetic and acoustic suspended ceilings. Designer moisture-resistant gypsum boards, wooden baffle ceilings, hidden cove LED lighting, and commercial acoustic grid tiles.",
    icon: "Layers",
    features: [
      "Designer Gypsum Board Ceilings with Perimeter Cove Lighting",
      "Armstrong Acoustic Mineral Fiber Grid Ceilings for Offices",
      "Custom CNC Wooden Lattice & Metallic Baffle Features",
      "Concealed AC Diffusers & Flush Magnetic Track Lights"
    ],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Gypsum Plasterboard", "Acoustic Tiles", "Galvanized Metal Studs"]
  },
  {
    id: "steel-fabrication",
    title: "Structural Steel & Metal Fabrication",
    category: "Finishes & Interior",
    description: "Precision metal works and heavy structural fabrication. Industrial steel trusses, spiral and cantilevered staircases, security gates, ornamental wrought iron, and railings.",
    icon: "ShieldAlert",
    features: [
      "Heavy Industrial Pre-Engineered Steel Frames & Girders",
      "Architectural Metal Staircases & Spiral Feature Steps",
      "Laser Cut Decorative Mild Steel & Stainless Steel Screens",
      "Automated Entry Gates & Boundary Wall Railings"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Certified Welders", "Plasma CNC Cutting", "Anti-Rust Epoxy Primer"]
  },
  {
    id: "fiber-shed",
    title: "Fiber Shed & Tensile Canopy Structures",
    category: "Finishes & Interior",
    description: "Modern architectural fiber and tensile fabric shades. Weatherproof car parking sheds, terrace canopies, swimming pool covers, and industrial entrance walkways.",
    icon: "Umbrella",
    features: [
      "Heavy Duty UV-Resistant Polycarbonate & Fiber Sheets",
      "High-Tension Architectural Tensile Fabric Membranes",
      "Cantilever Car Porch Sheds with Galvanized Frames",
      "All-Weather Durability Against Sun, Hail and Rain"
    ],
    imageUrl: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Polycarbonate", "Tensile PVDF Fabric", "Galvanized Tubing"]
  },
  {
    id: "carpentry-woodwork",
    title: "Carpentry & Architectural Woodwork",
    category: "Finishes & Interior",
    description: "Master artisanal woodwork. Solid ash/teak wood entrance doors, custom kitchen cabinetry, walk-in closets, wall paneling, and bespoke executive furniture.",
    icon: "Hammer",
    features: [
      "Solid Wood Main Doors with Multi-Point Security Locks",
      "Soft-Close Acrylic & UV High Gloss Kitchen Cabinetry",
      "Custom Veneered Wall Cladding & Acoustic Slats",
      "Walk-in Wardrobes with Integrated LED Sensor Lighting"
    ],
    imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Teak & Ash Wood", "Blum Hardware", "Marine Plywood"]
  },
  {
    id: "professional-paint",
    title: "Professional Paint & Surface Textures",
    category: "Finishes & Interior",
    description: "High-grade decorative finishes and protective coatings. Weatherproof exterior rockwall, stucco, interior luxury matte emulsions, epoxy floorings, and wood polishing.",
    icon: "Paintbrush",
    features: [
      "Weather-Shield Anti-Fungal Exterior Wall Coatings",
      "Luxury Velvet & Silk Interior Emulsions",
      "Industrial Heavy-Traffic Seamless Epoxy Floor Coatings",
      "Polyurethane (PU) & Lacquer High-End Wood Polish"
    ],
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["Berger", "Jotun", "ICI Dulux", "Rockwall Finishes"]
  },
  {
    id: "building-materials-supply",
    title: "Direct Building Materials & Product Supply",
    category: "Building Materials & Supply",
    description: "Wholesale direct distribution and supply of premium tested construction materials: Bricks (A Grade, B Grade, Fly Ash), Sand (Lawrencepur, Chenab, Dina), Margalla & Sargodha Crush, Top Cement Brands, Deformed Steel Rebars, Pumps & Fire Fighting Equipment.",
    icon: "PackageCheck",
    features: [
      "Bricks: A-Grade, B-Grade, Jama & High-Density Fly Ash Bricks",
      "Aggregates & Sand: Margalla Crush, Sargodha Crush, Lawrencepur & Chenab Sand",
      "Cement Brands: DG, Maple Leaf, Bestway, Lucky, Falcon, Fauji, Power, Pioneer",
      "Steel: Grade 60 High Yield Deformed Rebars with Mill Test Certificates",
      "Pumps: Pedrollo (Italy), Grundfos (Denmark), Espa (Spain), Lowara, LEO",
      "Fire Systems: NAFFCO (UAE) & FESCO (UAE) UL/FM Listed Fire Pumps",
      "Industrial Lights: Chalmit (UK), Ansell (UK), NVC, Sun Light LEDs"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    equipmentOrBrands: ["DG Cement", "Maple Leaf", "Lucky", "NAFFCO", "Grundfos", "Pedrollo"]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Engr. Tariq Mahmood",
    role: "Project Director",
    company: "High - Q Tower (UICP) Gulberg",
    feedback: "Bin Nasir Real Estate & Builder demonstrated masterclass civil engineering executing 4 deep subterranean basements and 23 upper commercial floors right on Main Boulevard Gulberg. Their structural integrity, zero-accident record, and punctual handover made this multi-million landmark a soaring success.",
    rating: 5,
    projectRef: "High - Q Tower (UICP)",
    date: "2024"
  },
  {
    id: "test-2",
    name: "Ch. Rizwan Akram",
    role: "Managing Partner",
    company: "Gold Crest Residency & Mall DHA",
    feedback: "Executing 18 floors in DHA Phase 4 requires extraordinary coordination with authorities, stringent safety protocols, and flawless concrete finishes. Bin Nasir Builder delivered beyond our expectations with zero snags. They are truly one of Pakistan's finest builders.",
    rating: 5,
    projectRef: "Gold Crest Shopping Mall & Residency",
    date: "2023"
  },
  {
    id: "test-3",
    name: "M. Haris Sheikh",
    role: "General Manager Infrastructure",
    company: "Ibrahim Fiber Mills",
    feedback: "Spanning over 34.7 acres, our industrial plant demanded rapid execution of heavy warehouses, floor compaction, and utility routing. Bin Nasir's heavy machinery, cranes, and engineering team executed everything ahead of schedule within budget.",
    rating: 5,
    projectRef: "Ibrahim Fiber Mills (34.7 Acre)",
    date: "2022"
  },
  {
    id: "test-4",
    name: "Dr. Asif Javaid",
    role: "Medical Works Committee",
    company: "Ganga Ram Hospital Complex",
    feedback: "Constructing a 9-story medical complex with 2 underground levels in a dense urban zone was a tremendous challenge. Bin Nasir handled specialized MEP and medical gas infrastructure flawlessly with clinical precision.",
    rating: 5,
    projectRef: "Ganga Ram Hospital Building (M&C)",
    date: "2022"
  },
  {
    id: "test-5",
    name: "Malik Kamran Khan",
    role: "Resident & Owner",
    company: "KK House Lahore Cantt",
    feedback: "For our family residence in Lahore Cantt, Bin Nasir Builder transformed architectural concepts into a breathtaking reality. The imported marble work, false ceilings, and custom carpentry were executed with royal perfection. Highly recommended!",
    rating: 5,
    projectRef: "KK House Cantt",
    date: "2024"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Muhammad Usman Nasir",
    role: "Chief Executive Officer (CEO)",
    bio: "Visionary leader driving technological modernization, engineering excellence, and ethical management across commercial skyscrapers, civil mega-works, and real estate development.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "team-2",
    name: "Nasir Iqbal",
    role: "Founder",
    bio: "Pioneered the organization in 2005 with a commitment to unyielding craftsmanship, customer trust, and long-term sustainable growth in the construction landscape.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "team-3",
    name: "Ch. Usman Khalid",
    role: "Manager Finance",
    bio: "Ensures flawless fiscal oversight, procurement optimization, transparent client estimations, and structured financial delivery for multi-million projects.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "team-4",
    name: "Adnan Ali Khan",
    role: "Manager Marketing & Client Relations",
    bio: "Focuses on strategic client partnerships, real estate investor relations, and transparent consultation for corporate and residential patrons.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "team-5",
    name: "Farhan Irshad",
    role: "Site Incharge & Chief Operations",
    bio: "Oversees round-the-clock site engineering, quality assurance protocols, OSHA safety compliance, and rigorous timeline enforcement across all active job sites.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  }
];

export const DEFAULT_COMPANY_SETTINGS: CompanyContactSettings = {
  id: "company",
  headOfficeAddress: "559 Ghosia Society Thokar Niazbaig, Lahore, Pakistan",
  branchOfficeAddress: "374-3-B2 Township Lahore, Pakistan – 54770",
  phone1: "0300-4687544",
  phone2: "0322-4138328",
  phone3: "0333-4138328",
  whatsapp: "03004687544",
  email1: "info@binnasirbuilders.com",
  email2: "cvileng5@gmail.com",
  hours: "Monday - Saturday: 9:00 AM - 7:00 PM (Site Operations 24/7)",
  ceoName: "Muhammad Usman Nasir",
  ceoRole: "Chief Executive Officer (CEO)",
  ceoMessage: "We realize best value for our customers through our advanced technologies, countless challenges and belief in open and honest management.",
  founderName: "Nasir Iqbal",
  founderRole: "Founder"
};
