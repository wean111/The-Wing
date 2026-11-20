export type ProductCategory = 'Apparel' | 'Gear' | 'Lab Concepts';

export interface ProductColorway {
  id: string;
  name: string;
  hex: string;
  image: string;
  secondaryImage?: string;
}

export interface ProductPerformance {
  ergonomics: number;
  durability: number;
  slimness: number;
  weatherShield: number;
}

export interface WingProduct {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  editionNote: string;
  description: string;
  materials: string[];
  weight: string;
  dimensions: string;
  fit: string;
  performance: ProductPerformance;
  colorways: ProductColorway[];
}

export interface InstagramPost {
  id: string;
  image: string;
  handle: string;
  location: string;
  date: string;
  caption: string;
  missionTag: string;
  featuredProductId: string;
  likes: string;
}

export interface BrandFilmChapter {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  narrative: string;
  image: string;
  telemetryLabel: string;
  telemetryValue: string;
}

export const WING_ASSETS = {
  logoCover: '/assets/aistudio/social_cover_bf8c0db7.png',
  whiteKnitPortrait:
    '/assets/aistudio/1795062480611_136075884671014566_1457331307374664060_722a163679cebf39a89d7bea1f6d84d3_cfbe2041.jpg',
  macroObsidianGrip:
    '/assets/aistudio/1795061383375_136075884671014566_1457331307374664060_c7e068c9d7976e9aba191520b429f5b9_d845b2d1.jpg',
  crewneckRings:
    '/assets/aistudio/1795061877513_136075884671014566_1457331307374664060_095882731abb3a8fbbefe930e3dcc3d6_72d8105c.jpg',
  olivePoloWalnut:
    '/assets/aistudio/1795061370497_136075884671014566_1457331307374664060_e62424a37a80036181647f0136749832_3863cbf0.jpg',
  maroonTableSlate:
    '/assets/aistudio/1795061383342_136075884671014566_1457331307374664060_e23818223807bbea87b957c5d5ec7cd9_e84bdbb6.jpg',
  deckCoffeeOverhead:
    '/assets/aistudio/1795061932128_136075884671014566_1457331307374664060_5625bd2471969108f336e0612d8d6abe_cdd85791.jpg',
  streetSneakersHigh:
    '/assets/aistudio/1795061932072_136075884671014566_1457331307374664060_fa46e0820840326650268004dce8948f_31469b13.jpg',
  sandstonePleated:
    '/assets/aistudio/1795061370521_136075884671014566_1457331307374664060_91028b0c45f0f4f58df00d7e1feaf5a7_f6cc88ac.jpg',
  gardenBenchPortrait:
    '/assets/aistudio/1795061932107_136075884671014566_1457331307374664060_ef880651d3507cd99aeeb1204f7b7bc7_1ac96618.jpg',
  maroonAviators:
    '/assets/aistudio/1795061383394_136075884671014566_1457331307374664060_160869ff38e8e8d43bf2f2f88ee8ff14_d6294bce.jpg',
  chestnutDeck:
    '/assets/aistudio/1795061370510_136075884671014566_1457331307374664060_18c99c29327844ff4d0cd5472516a6a1_510a895b.jpg',
  terracottaTwoHands:
    '/assets/aistudio/1795061370482_136075884671014566_1457331307374664060_4f1a4988d2a6a5f1efc37a156732b7f4_868edef3.jpg',
  pocketSlideWide:
    '/assets/aistudio/1795061877457_136075884671014566_1457331307374664060_b03d097b94c56fc044453ef9a4aef19b_bfaa6ef8.jpg',
  pocketSlideMacro:
    '/assets/aistudio/1795061877541_136075884671014566_1457331307374664060_e33daf64b16fbaa50c9e5cbf591414a9_b6abbe10.jpg',
  studioWoodPortrait:
    '/assets/aistudio/1795061877528_136075884671014566_1457331307374664060_f0bd8e9bfb05d8df48ba67c8c8f52923_228f0ba9.jpg',
  oliveCrossedArms:
    '/assets/aistudio/1795061370432_136075884671014566_1457331307374664060_0ff3d8ac8a0f134046b25e1e060754ba_e0dcb68e.jpg',
};

export const WING_PRODUCTS: WingProduct[] = [
  {
    id: 'wing-01-aero-bifold',
    name: 'Wing 01 — Aero Bifold',
    subtitle: 'Ultra-Slim Precision Carry',
    category: 'Gear',
    price: 118,
    editionNote: 'Series 01 · In Stock',
    description:
      'CNC-skived full-grain hide engineered to eliminate pocket bulk. Internal tension ribs keep up to 10 cards and flat bills locked cleanly without stretching.',
    materials: [
      '1.2mm Full-Grain Italian Veg-Tan Leather',
      '0.8mm Waxed Japanese Vinymo Tensile Thread',
      'Aerospace RFID-Blocking Micro-Weave Core',
      'Hand-Burnished Matte Edge Sealant',
    ],
    weight: '42 g',
    dimensions: '98 × 76 × 6.8 mm',
    fit: 'Zero-Bulge Front or Tailored Back Pocket',
    performance: {
      ergonomics: 96,
      durability: 94,
      slimness: 98,
      weatherShield: 88,
    },
    colorways: [
      {
        id: 'obsidian',
        name: 'Obsidian Black',
        hex: '#181A19',
        image: WING_ASSETS.macroObsidianGrip,
        secondaryImage: WING_ASSETS.pocketSlideMacro,
      },
      {
        id: 'terracotta',
        name: 'Warm Terracotta',
        hex: '#9E5331',
        image: WING_ASSETS.terracottaTwoHands,
        secondaryImage: WING_ASSETS.chestnutDeck,
      },
      {
        id: 'slate',
        name: 'Slate Charcoal',
        hex: '#283734',
        image: WING_ASSETS.maroonTableSlate,
        secondaryImage: WING_ASSETS.pocketSlideWide,
      },
      {
        id: 'sandstone',
        name: 'Sandstone Taupe',
        hex: '#8D7765',
        image: WING_ASSETS.sandstonePleated,
        secondaryImage: WING_ASSETS.olivePoloWalnut,
      },
    ],
  },
  {
    id: 'wing-02-kinetic-sleeve',
    name: 'Wing 02 — Kinetic Pocket Sleeve',
    subtitle: 'Rapid-Draw Daily Chassis',
    category: 'Gear',
    price: 94,
    editionNote: 'Series 01 · In Stock',
    description:
      'Built for rapid transit and minimalists on the move. A curved thumb-eject channel gives one-handed card deployment while keeping your silhouette razor-thin.',
    materials: [
      '1.0mm Bridle Vegetable-Tanned Leather',
      'Reinforced Dyneema Corner Gusset',
      'Debossed Wing Trajectory Mark',
      'Natural Beeswax Conditioning Coat',
    ],
    weight: '31 g',
    dimensions: '94 × 68 × 5.2 mm',
    fit: 'Slim Athletic & Denim Front Pocket',
    performance: {
      ergonomics: 98,
      durability: 91,
      slimness: 99,
      weatherShield: 86,
    },
    colorways: [
      {
        id: 'walnut',
        name: 'Earth Walnut',
        hex: '#6B442E',
        image: WING_ASSETS.olivePoloWalnut,
        secondaryImage: WING_ASSETS.oliveCrossedArms,
      },
      {
        id: 'matte-black',
        name: 'Matte Obsidian',
        hex: '#111816',
        image: WING_ASSETS.pocketSlideMacro,
        secondaryImage: WING_ASSETS.crewneckRings,
      },
      {
        id: 'spruce-slate',
        name: 'Deep Spruce',
        hex: '#283734',
        image: WING_ASSETS.maroonAviators,
        secondaryImage: WING_ASSETS.maroonTableSlate,
      },
    ],
  },
  {
    id: 'wing-03-heritage-fold',
    name: 'Wing 03 — Terracotta Heritage Fold',
    subtitle: 'Living Patina Craft Edition',
    category: 'Gear',
    price: 135,
    editionNote: 'Small Batch · Hand-Stitched',
    description:
      'Celebrates our Earth Bound pillar. Cut from single-origin Tuscan shoulder leather with contrast terracotta saddle stitching that deepens in character every week you carry it.',
    materials: [
      '1.4mm Uncoated Tuscan Shoulder Hide',
      'Contrast Terracotta Waxed Linen Stitch',
      'Milled Anodized Aluminum Spine Insert',
      'Organic Tannin Water-Repellent Finish',
    ],
    weight: '48 g',
    dimensions: '102 × 78 × 7.4 mm',
    fit: 'Relaxed Pleated Trouser & Jacket Pocket',
    performance: {
      ergonomics: 93,
      durability: 98,
      slimness: 90,
      weatherShield: 92,
    },
    colorways: [
      {
        id: 'chestnut',
        name: 'Rust Chestnut',
        hex: '#9E5331',
        image: WING_ASSETS.chestnutDeck,
        secondaryImage: WING_ASSETS.terracottaTwoHands,
      },
      {
        id: 'espresso',
        name: 'Espresso Bark',
        hex: '#4E3524',
        image: WING_ASSETS.oliveCrossedArms,
        secondaryImage: WING_ASSETS.sandstonePleated,
      },
      {
        id: 'carbon',
        name: 'Carbon Black',
        hex: '#191B1A',
        image: WING_ASSETS.crewneckRings,
        secondaryImage: WING_ASSETS.pocketSlideWide,
      },
    ],
  },
  {
    id: 'lab-heavyweight-zip-shell',
    name: 'Lab 480gsm Zip Shell',
    subtitle: 'Architectural Street Layer',
    category: 'Apparel',
    price: 168,
    editionNote: 'Drop 02 · Apparel',
    description:
      'Boxy cropped silhouette tailored around everyday carry ergonomics. Features a concealed internal Wing wallet dock pocket and dual-way brushed steel zip hardware.',
    materials: [
      '480gsm Combed Organic French Terry',
      'Dual-Way YKK Excella Steel Zipper',
      'Ripstop Reinforced Internal EDC Pocket',
      'Pre-Shrunk Garment-Washed Handfeel',
    ],
    weight: '640 g',
    dimensions: 'Boxy Cropped Fit · S–XL',
    fit: 'Relaxed Drop-Shoulder Architectural Cut',
    performance: {
      ergonomics: 92,
      durability: 96,
      slimness: 84,
      weatherShield: 89,
    },
    colorways: [
      {
        id: 'heather-ash',
        name: 'Heather Ash',
        hex: '#B4B7B9',
        image: WING_ASSETS.studioWoodPortrait,
        secondaryImage: WING_ASSETS.gardenBenchPortrait,
      },
      {
        id: 'slate-olive',
        name: 'Field Olive',
        hex: '#5F6658',
        image: WING_ASSETS.oliveCrossedArms,
        secondaryImage: WING_ASSETS.olivePoloWalnut,
      },
    ],
  },
  {
    id: 'aero-knit-resort-shirt',
    name: 'Aero Open-Weave Knit',
    subtitle: 'Thermal Airflow Motion Shirt',
    category: 'Apparel',
    price: 124,
    editionNote: 'Drop 02 · Apparel',
    description:
      'Engineered open-gauge cotton knit that regulates core temperature across humid city transit while maintaining crisp collar structure from studio to rooftop.',
    materials: [
      '100% Long-Staple Textured Mercerized Cotton',
      'Micro-Perforated Vertical Airflow Gauge',
      'Mother-of-Pearl Matte Buttons',
      'Reinforced Side-Hem Mobility Vents',
    ],
    weight: '265 g',
    dimensions: 'Tailored Relaxed · S–XL',
    fit: 'Breezy Drape with Clean Shoulder Line',
    performance: {
      ergonomics: 95,
      durability: 88,
      slimness: 92,
      weatherShield: 82,
    },
    colorways: [
      {
        id: 'chalk-white',
        name: 'Chalk Knit',
        hex: '#EFECE6',
        image: WING_ASSETS.whiteKnitPortrait,
        secondaryImage: WING_ASSETS.macroObsidianGrip,
      },
      {
        id: 'oxblood-check',
        name: 'Oxblood Check',
        hex: '#5D2D32',
        image: WING_ASSETS.maroonAviators,
        secondaryImage: WING_ASSETS.maroonTableSlate,
      },
    ],
  },
  {
    id: 'x-wing-carbon-concept',
    name: 'Prototype X-Wing Carbon Core',
    subtitle: 'Lab Concept · Experimental Carry',
    category: 'Lab Concepts',
    price: 195,
    editionNote: 'Lab Prototype · Limited 50 Units',
    description:
      'Born inside The Wing R&D studio. Fuses laser-cut forged carbon laminate with a replaceable vegetable-tanned outer wrap for modular longevity and ultra-light flight.',
    materials: [
      '1.5mm Forged Carbon Structural Spine',
      'Interchangeable Full-Grain Leather Wrap',
      'Micro-Milled Grade-5 Titanium Tension Clip',
      'Hydrophobic Nano-Sealed Seam Coating',
    ],
    weight: '29 g',
    dimensions: '96 × 72 × 4.9 mm',
    fit: 'Zero-Gravity Pocket Footprint',
    performance: {
      ergonomics: 97,
      durability: 99,
      slimness: 100,
      weatherShield: 96,
    },
    colorways: [
      {
        id: 'carbon-spruce',
        name: 'Carbon Spruce',
        hex: '#283734',
        image: WING_ASSETS.streetSneakersHigh,
        secondaryImage: WING_ASSETS.pocketSlideWide,
      },
      {
        id: 'solar-accent',
        name: 'Solar Field Edition',
        hex: '#FF6B00',
        image: WING_ASSETS.deckCoffeeOverhead,
        secondaryImage: WING_ASSETS.gardenBenchPortrait,
      },
    ],
  },
];

export const INSTAGRAM_FEED: InstagramPost[] = [
  {
    id: 'ig-1',
    image: WING_ASSETS.whiteKnitPortrait,
    handle: '@thewing_labs',
    location: 'Saigon Design District',
    date: '2 Days Ago',
    caption:
      'Morning light test on the Series 01 Aero Bifold in Obsidian. Engineered to disappear in hand until the exact moment you reach for it.',
    missionTag: 'Design Mission · Zero-Bulk Ergonomics',
    featuredProductId: 'wing-01-aero-bifold',
    likes: '1,420',
  },
  {
    id: 'ig-2',
    image: WING_ASSETS.terracottaTwoHands,
    handle: '@thewing_labs',
    location: 'Material R&D Bench',
    date: '5 Days Ago',
    caption:
      'Every Wing fold starts with raw vegetable-tanned Tuscan hide and 0.8mm waxed linen thread. Hand-inspected for stitch tension before leaving the lab.',
    missionTag: 'Craftsmanship · Earth Bound Patina',
    featuredProductId: 'wing-03-heritage-fold',
    likes: '1,894',
  },
  {
    id: 'ig-3',
    image: WING_ASSETS.pocketSlideWide,
    handle: '@thewing_labs',
    location: 'Transit Test 04',
    date: '1 Week Ago',
    caption:
      '6.8mm total thickness loaded with 8 cards. Built so your denim silhouette stays clean through 14-hour studio-to-street days.',
    missionTag: 'Field Proof · 6.8mm Slim Profile',
    featuredProductId: 'wing-01-aero-bifold',
    likes: '2,105',
  },
  {
    id: 'ig-4',
    image: WING_ASSETS.olivePoloWalnut,
    handle: '@thewing_labs',
    location: 'Courtyard Studio',
    date: '2 Weeks Ago',
    caption:
      'Earth Walnut paired with brushed steel. Natural oils in the hide darken along your grip lines, turning an industrial tool into an heirloom.',
    missionTag: 'Material Science · Living Hide',
    featuredProductId: 'wing-02-kinetic-sleeve',
    likes: '1,632',
  },
  {
    id: 'ig-5',
    image: WING_ASSETS.gardenBenchPortrait,
    handle: '@thewing_labs',
    location: 'Botanical Lab Terrace',
    date: '3 Weeks Ago',
    caption:
      'Move lighter. Our 480gsm Zip Shell + Kinetic Sleeve combo tested in motion by the creators building tomorrow.',
    missionTag: 'Community · Limitless Flight',
    featuredProductId: 'lab-heavyweight-zip-shell',
    likes: '2,480',
  },
  {
    id: 'ig-6',
    image: WING_ASSETS.deckCoffeeOverhead,
    handle: '@thewing_labs',
    location: 'Sunday Espresso Dispatch',
    date: '1 Month Ago',
    caption:
      'Weekend field notes from the prototype bench. Carbon-core chassis weight dropped to 29 grams without sacrificing tactile warmth.',
    missionTag: 'Lab Concepts · 29g Prototype',
    featuredProductId: 'x-wing-carbon-concept',
    likes: '1,978',
  },
];

export const BRAND_FILM_CHAPTERS: BrandFilmChapter[] = [
  {
    id: 'ch-01',
    index: '01',
    title: 'Zero-Gravity Geometry',
    subtitle: 'Why we started The Wing Labs',
    narrative:
      'Traditional leather goods fold heavy and stiff. We stripped away redundant linings and dead bulk, skiving full-grain hides down to aerospace tolerances.',
    image: WING_ASSETS.macroObsidianGrip,
    telemetryLabel: 'Core Profile',
    telemetryValue: '6.8 mm Loaded',
  },
  {
    id: 'ch-02',
    index: '02',
    title: 'Craft That Ages With Motion',
    subtitle: 'Earth Bound Vegetable Tannage',
    narrative:
      'Every hide is drum-dyed using organic bark tannins rather than synthetic chrome. Sunlight, palm heat, and daily transit forge a patina unique to your trajectory.',
    image: WING_ASSETS.terracottaTwoHands,
    telemetryLabel: 'Stitch Tensile',
    telemetryValue: '0.8 mm Vinymo',
  },
  {
    id: 'ch-03',
    index: '03',
    title: 'Tested On The Street',
    subtitle: 'From studio floor to late-night transit',
    narrative:
      'Designed alongside industrial architects, photographers, and runners in Saigon and Tokyo. Every curve is sculpted for instant one-handed pocket deployment.',
    image: WING_ASSETS.studioWoodPortrait,
    telemetryLabel: 'Chassis Weight',
    telemetryValue: '42 Grams',
  },
  {
    id: 'ch-04',
    index: '04',
    title: 'Limitless Flight',
    subtitle: 'Built for the @thewing_labs collective',
    narrative:
      'Less weight in your pocket means sharper focus in your day. Join the creators carrying precision craft engineered for forward motion.',
    image: WING_ASSETS.streetSneakersHigh,
    telemetryLabel: 'Collective',
    telemetryValue: '@thewing_labs',
  },
];
