import { ServiceItem, ProjectMedia, ClientReview } from '../types/concrete';

export const COMPANY_INFO = {
  name: "SK Concrete Floor Services",
  slogan: "Strength in Every Foundation",
  phone: "0628067247",
  phoneFormatted: "062 806 7247",
  phoneTel: "+27628067247",
  whatsappNumber: "27628067247",
  location: "Cape Town, Western Cape",
  region: "Western Cape, South Africa",
  email: "info@skconcretefloors.co.za",
  businessHours: "Monday – Saturday: 07:00 – 18:00 (Emergency Pours by Arrangement)",
  freeQuoteNotice: "Calls qualify for Free Quotes directly with our site supervisor"
};

export const SERVICES: ServiceItem[] = [
  {
    id: "floor-slabs",
    title: "Concrete Floor Slabs",
    tagline: "Industrial, Commercial & High-Load Warehouse Slabs",
    description: "Laser-leveled, high-tolerance concrete flooring designed for maximum load-bearing resistance. From industrial warehouses and manufacturing facilities to contemporary polished residential floors, we handle sub-base preparation, vapor barrier, reinforcement mesh, power floating, and expansion joint cutting.",
    features: [
      "Power-floated mirror finish or slip-resistant broom texture",
      "Heavy load-bearing capacity for forklifts and machinery",
      "Anti-crack control joints with elastomeric polyurea sealant",
      "SABS-certified ready-mix concrete formulations (25–35 MPa)"
    ],
    specs: {
      concreteGrade: "25 MPa – 35 MPa Ready Mix",
      thicknessOrSpan: "100mm – 250mm standard depth",
      cureTime: "7 days initial / 28 days full load",
      reinforcement: "High-yield Ref 193/245 mesh & steel rebar"
    },
    suitableFor: ["Industrial Warehouses", "Commercial Showrooms", "Residential Living Areas", "Retail Centers", "Workshops"],
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.33__1__23435292.jpeg"
  },
  {
    id: "stairs",
    title: "Reinforced Concrete Stairs",
    tagline: "Architectural, Cantilever & High-Traffic Structural Stairs",
    description: "Custom-formed reinforced concrete staircases engineered to architectural specifications. We craft precise shuttering formwork, tie heavy tensile rebar skeletons, and pour seamless stair flights that deliver lasting elegance and structural stability.",
    features: [
      "Bespoke cantilevered, floating, and spiral stair designs",
      "Precision step riser and tread formwork carpentry",
      "Integrated non-slip nosing grooves and railing embedments",
      "Engineered structural anchoring directly to columns and beams"
    ],
    specs: {
      concreteGrade: "30 MPa High Early Strength",
      thicknessOrSpan: "Engineered waist slab 150mm–200mm",
      cureTime: "14 days formwork strike / 28 days full service",
      reinforcement: "Y12 & Y16 high-tensile deformed rebar"
    },
    suitableFor: ["Multi-Storey Residential", "Commercial Buildings", "Industrial Access", "Exterior Landscape Steps"],
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.33_d33d1b35.jpeg"
  },
  {
    id: "foundations",
    title: "Columns & Foundations",
    tagline: "Sub-Structure Footings, Ground Beams & Load-Bearing Columns",
    description: "The backbone of any safe building. We excavate, install damp-proof membranes, bend and tie high-tensile steel cages, and pour deep footings, continuous strip foundations, ground beams, and structural columns capable of supporting massive structural loads.",
    features: [
      "Engineered column rebar cages with anchor plates & hold-down bolts",
      "Continuous strip footings and isolated pad foundations",
      "High-frequency internal needle vibration for void-free consolidation",
      "Rigorous slump testing and cube sample compliance verification"
    ],
    specs: {
      concreteGrade: "25 MPa – 40 MPa Structural",
      thicknessOrSpan: "Per engineer footing schedule (400mm–1200mm)",
      cureTime: "7 days minimum hydration protection",
      reinforcement: "Engineered Y-bar cages with R6/R8 link stirrups"
    },
    suitableFor: ["New Building Construction", "Industrial Steel Warehouses", "Property Extensions", "Retaining Structures"],
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.34_da8da963.jpeg"
  },
  {
    id: "decking",
    title: "Decking & Driveways",
    tagline: "Suspended Slabs, Heavy Access Driveways & Ramps",
    description: "Robust exterior concrete paving and suspended decking built to endure coastal Western Cape weather and continuous vehicular traffic. We specialize in heavy-load vehicle driveways, drainage grading, exposed aggregate finishes, and reinforced first-floor suspended slabs.",
    features: [
      "High-durability reinforced driveways for residential & commercial fleet access",
      "Precision drainage falls (1:50) to prevent water pooling in winter rains",
      "Exposed aggregate, patterned, brushed, or sealed concrete aesthetics",
      "Suspended decking slabs with temporary propping and lintel integration"
    ],
    specs: {
      concreteGrade: "25 MPa – 30 MPa Pavement Mix",
      thicknessOrSpan: "125mm – 200mm vehicular slab",
      cureTime: "3–5 days light vehicle / 14 days heavy truck",
      reinforcement: "Ref 245 / Ref 395 welded wire mesh"
    },
    suitableFor: ["Residential Driveways", "Truck Loading Bays", "Suspended Patios & Balconies", "Commercial Parking Lots"],
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.33__2__9d916aa4.jpeg"
  }
];

export const MEDIA_GALLERY: ProjectMedia[] = [
  {
    id: "vid-warehouse-floor",
    title: "Large Commercial Warehouse Mirror Finish Floor",
    category: "videos",
    type: "video",
    src: "/assets/aistudio/WhatsApp_Video_2026-10-25_at_19.39.32_92dc47e8.mp4",
    description: "Inspection of a massive multi-bay industrial warehouse floor slab. Laser-screeded, power floated, and diamond-polished to a reflective mirror sheen with high abrasion resistance.",
    location: "Cape Town Industrial Precinct",
    highlight: "Superflat Floor Tolerance"
  },
  {
    id: "vid-floor-inspection",
    title: "Polished Concrete Floor Quality Assurance Walkthrough",
    category: "videos",
    type: "video",
    src: "/assets/aistudio/WhatsApp_Video_2026-10-25_at_19.39.33_b88eb6a5.mp4",
    description: "Detailed surface flatness and gloss inspection after application of concrete densifier and high-speed mechanical polishing.",
    location: "Western Cape Commercial Complex",
    highlight: "High-Gloss Mirror Finish"
  },
  {
    id: "vid-formwork-drainage",
    title: "Ramp Formwork & Sub-Base Reinforcement Layout",
    category: "videos",
    type: "video",
    src: "/assets/aistudio/WhatsApp_Video_2026-10-25_at_19.38.56_fb98c871.mp4",
    description: "Timber shuttering and rebar reinforcement grid placement for a culvert drainage transition and access ramp before concrete casting.",
    location: "Cape Town Civil Project",
    highlight: "Precision Shuttering & Rebar"
  },
  {
    id: "vid-steel-frame",
    title: "Structural Columns & Crane Erection Works",
    category: "videos",
    type: "video",
    src: "/assets/aistudio/WhatsApp_Video_2026-10-25_at_19.39.31_a135f023.mp4",
    description: "Site panorama displaying completed concrete pad footings and column plinths receiving structural steel frames and crane erection.",
    location: "Western Cape Industrial Park",
    highlight: "Heavy-Duty Foundations"
  },
  {
    id: "img-epoxy-gloss",
    title: "Diamond Polished Terrazzo-Fleck Floor",
    category: "slabs",
    type: "image",
    src: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.33__1__23435292.jpeg",
    description: "Pristine reflective corridor floor showcasing exposed aggregate speckled finish with premium non-porous sealer.",
    location: "Cape Town Residential Build",
    highlight: "Seamless Reflective Finish"
  },
  {
    id: "img-pump-boom",
    title: "Concrete Boom Pump High-Level Slab Pour",
    category: "decking",
    type: "image",
    src: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.32_d4c28a51.jpeg",
    description: "Mobile boom pump feeding ready-mix concrete directly to a suspended first-floor slab with skilled screeders and column cage ties.",
    location: "Cape Town Property Development",
    highlight: "Continuous Boom Pour"
  },
  {
    id: "img-column-cage",
    title: "Reinforced Column Rebar Cage with Anchor Base Plate",
    category: "foundations",
    type: "image",
    src: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.34_da8da963.jpeg",
    description: "Precision-bent steel reinforcement cage with welded anchor plates and heavy holding-down bolts ready for foundation encasement.",
    location: "Commercial Site Cape Town",
    highlight: "Engineer-Certified Rebar"
  },
  {
    id: "img-slab-pour-workers",
    title: "Suspended Slab Casting & Column Steel Integration",
    category: "stairs",
    type: "image",
    src: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.33_d33d1b35.jpeg",
    description: "Structural team finishing high-strength concrete across suspended slab deck tied with heavy column vertical bars.",
    location: "Western Cape New Build",
    highlight: "Structural Integrity"
  },
  {
    id: "img-ramp-pour",
    title: "Heavy-Duty Concrete Ramp & Driveway Pour",
    category: "decking",
    type: "image",
    src: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.33__2__9d916aa4.jpeg",
    description: "Freshly screeded driveway slab contained in sturdy timber formwork resting on compact stone gravel sub-base.",
    location: "Cape Town Residential Site",
    highlight: "Solid Sub-Base Compaction"
  },
  {
    id: "img-ground-prep",
    title: "Slab Groundwork with Membrane & Conduit Clusters",
    category: "foundations",
    type: "image",
    src: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.34__1__9950e2bd.jpeg",
    description: "Thorough ground preparation showing continuous damp-proof membrane (DPM), spacer blocks, steel mesh, and routed utility conduits.",
    location: "Cape Town Housing Estate",
    highlight: "Vapor Barrier & Conduit Routing"
  }
];

export const CAPE_TOWN_SUBURBS = [
  "City Bowl & Foreshore",
  "Atlantic Seaboard (Camps Bay, Sea Point, Clifton)",
  "Southern Suburbs (Constantia, Claremont, Rondebosch)",
  "Northern Suburbs (Bellville, Durbanville, Century City)",
  "West Coast (Bloubergstrand, Table View, Melkbosstrand)",
  "Helderberg (Somerset West, Strand, Gordon's Bay)",
  "Cape Winelands (Stellenbosch, Paarl, Franschhoek)",
  "Industrial Areas (Epping, Airport Industria, Montague Gardens, Blackheath)"
];

export const GOOGLE_LINKS = {
  searchReviews: "https://www.google.com/search?q=SK+Concrete+Floor+Services+Cape+Town+reviews",
  mapsSearch: "https://www.google.com/maps/search/?api=1&query=SK+Concrete+Floor+Services+Cape+Town+Western+Cape"
};

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: "rev-hendrik",
    quote: "SK Concrete Floor Services poured the entire 1,800 m² warehouse slab for our distribution center in Montague Gardens. The laser leveling and power floated finish was flawless, passed structural inspection on the first round.",
    author: "Hendrik Van Zyl",
    role: "Project Director",
    companyOrSuburb: "Atlantic Logistics & Warehousing, Montague Gardens",
    serviceType: "Concrete Floor Slabs",
    rating: 5,
    date: "August 2026",
    source: "Client Project"
  },
  {
    id: "rev-nadia",
    quote: "We contracted SK for custom cantilevered reinforced concrete stairs and driveway slabs on two luxury builds in Camps Bay. Their steel reinforcement discipline and timber formwork craftsmanship are second to none.",
    author: "Nadia Petersen",
    role: "Principal Architect",
    companyOrSuburb: "Cape Contemporary Architecture, Camps Bay",
    serviceType: "Reinforced Concrete Stairs",
    rating: 5,
    date: "September 2026",
    source: "Client Project"
  },
  {
    id: "rev-bongani",
    quote: "Called 0628067247 on a Monday morning for an urgent foundation footing and ground beam pour. They dispatched a supervisor that same afternoon with a free quote and completed the pour right on schedule.",
    author: "Bongani Sithole",
    role: "General Contractor",
    companyOrSuburb: "Apex Construction, Bellville",
    serviceType: "Columns & Foundations",
    rating: 5,
    date: "October 2026",
    source: "Client Project"
  }
];

export const TESTIMONIALS = INITIAL_REVIEWS;

