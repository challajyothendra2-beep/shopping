import { Product } from '../types/clothing';

export const PRODUCTS: Product[] = [
  {
    id: 'zara-001',
    name: 'OVERSIZED DOUBLE-BREASTED BLAZER',
    reference: 'REF. 2753/041',
    category: 'woman',
    subCategory: 'blazers',
    price: 149,
    primaryImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Blazer made of spun wool blend. Peak lapel collar and long sleeves with shoulder pads. Front welt pockets and chest welt pocket. Matching interior lining with inner pocket. Back vent at hem. Double-breasted front button fastening.',
    composition: 'OUTER SHELL: 54% Wool · 42% Polyester · 4% Elastane | LINING: 100% Viscose',
    care: 'Dry clean only. Do not bleach. Iron at maximum 110°C / 230°F.',
    origin: 'Made in Portugal under certified ethical manufacturing standards.',
    colors: [
      { name: 'Charcoal Grey', hex: '#262626', inStock: true },
      { name: 'Pure Black', hex: '#000000', inStock: true },
      { name: 'Ecru Chalk', hex: '#e7e3dc', inStock: true }
    ],
    sizes: [
      { size: 'XS', stockCount: 2 },
      { size: 'S', stockCount: 5 },
      { size: 'M', stockCount: 8 },
      { size: 'L', stockCount: 3 },
      { size: 'XL', stockCount: 0 }
    ],
    isNew: true,
    isSustainable: true,
    edition: 'STUDIO SS26',
    fit: 'Relaxed, architectural shoulders with straight drape'
  },
  {
    id: 'zara-002',
    name: 'ASYMMETRIC DRAPED SATIN DRESS',
    reference: 'REF. 4087/102',
    category: 'woman',
    subCategory: 'dresses',
    price: 119,
    primaryImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Midi dress with an asymmetric neckline and one bare shoulder. Side gathering detail with fluid cascade. Side slit at hem. Invisible side zip fastening.',
    composition: 'OUTER SHELL: 100% Mulberry Silk Crepe',
    care: 'Hand wash cold or gentle dry clean. Do not tumble dry.',
    origin: 'Made in Spain.',
    colors: [
      { name: 'Deep Onyx', hex: '#0a0a0a', inStock: true },
      { name: 'Champagne Ochre', hex: '#d8c4a0', inStock: true }
    ],
    sizes: [
      { size: 'XS', stockCount: 4 },
      { size: 'S', stockCount: 7 },
      { size: 'M', stockCount: 4 },
      { size: 'L', stockCount: 1 }
    ],
    isNew: true,
    isSustainable: false,
    edition: 'EDITION / EVENING ARCHIVE',
    fit: 'Fluid bias cut with asymmetric hemline'
  },
  {
    id: 'zara-003',
    name: 'WIDE-LEG PLEATED WOOL TROUSERS',
    reference: 'REF. 8320/221',
    category: 'woman',
    subCategory: 'trousers',
    price: 99,
    primaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'High-waisted trousers with front double pleats. Side pockets and back welt pockets. Wide-leg floor-length cut with pressed crease. Zip fly, interior button and metal hook fastening.',
    composition: 'OUTER SHELL: 68% Wool · 30% Lyocell · 2% Elastane',
    care: 'Machine wash delicate at 30°C. Do not tumble dry.',
    origin: 'Made in Morocco.',
    colors: [
      { name: 'Warm Taupe', hex: '#8a7e72', inStock: true },
      { name: 'Midnight Navy', hex: '#161d2d', inStock: true },
      { name: 'Black', hex: '#000000', inStock: true }
    ],
    sizes: [
      { size: 'XS', stockCount: 1 },
      { size: 'S', stockCount: 6 },
      { size: 'M', stockCount: 9 },
      { size: 'L', stockCount: 4 },
      { size: 'XL', stockCount: 2 }
    ],
    isNew: false,
    isSustainable: true,
    fit: 'High-rise waist with fluid drape through legs'
  },
  {
    id: 'zara-004',
    name: 'FLUID LINEN-BLEND TRENCH COAT',
    reference: 'REF. 3120/118',
    category: 'studio',
    subCategory: 'blazers',
    price: 189,
    primaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Long trench coat made of 100% European Flax linen blend. Lapel collar and long sleeves with tabs at cuffs. Front welt pockets. Matching self-fabric belt with buckle. Storm flap and center back vent.',
    composition: '100% Certified European Flax Linen',
    care: 'Dry clean recommended to preserve linen handfeel.',
    origin: 'Made in Italy.',
    colors: [
      { name: 'Sand Ecru', hex: '#d5c7b3', inStock: true },
      { name: 'Olive Drab', hex: '#484b3f', inStock: true }
    ],
    sizes: [
      { size: 'S', stockCount: 3 },
      { size: 'M', stockCount: 5 },
      { size: 'L', stockCount: 2 }
    ],
    isNew: true,
    isSustainable: true,
    edition: 'LIMITED EDITION',
    fit: 'Full-length cocoon silhouette with belted waist'
  },
  {
    id: 'zara-005',
    name: 'FINE CASHMERE SEAMLESS SWEATER',
    reference: 'REF. 9043/305',
    category: 'woman',
    subCategory: 'knitwear',
    price: 129,
    primaryImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Round neck sweater spun from 100% grade-A cashmere yarn. Seamless circular knit technology. Long raglan sleeves with micro-ribbed cuffs and hem.',
    composition: '100% Mongolian Cashmere',
    care: 'Hand wash with wool detergent in cold water. Lay flat to dry.',
    origin: 'Crafted in Inner Mongolia.',
    colors: [
      { name: 'Camel Bone', hex: '#bba282', inStock: true },
      { name: 'Chalk White', hex: '#f6f6f4', inStock: true },
      { name: 'Slate Anthracite', hex: '#373a40', inStock: true }
    ],
    sizes: [
      { size: 'XS', stockCount: 3 },
      { size: 'S', stockCount: 8 },
      { size: 'M', stockCount: 4 },
      { size: 'L', stockCount: 0 }
    ],
    isNew: false,
    isSustainable: true,
    fit: 'Tailored regular silhouette with second-skin softness'
  },
  {
    id: 'zara-006',
    name: 'MINIMALIST POPLIN OVERSIZED SHIRT',
    reference: 'REF. 6112/083',
    category: 'woman',
    subCategory: 'shirts',
    price: 69,
    primaryImage: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Collared shirt made of 100% crisp organic cotton poplin. Dropped shoulders, cuffed long sleeves with mother-of-pearl buttons. Asymmetric curved hem with side gussets. Concealed button placket.',
    composition: '100% Organic GOTS-Certified Cotton',
    care: 'Machine wash warm 40°C. Steam press when slightly damp.',
    origin: 'Made in Turkey.',
    colors: [
      { name: 'Optic White', hex: '#ffffff', inStock: true },
      { name: 'Sky Azure', hex: '#c5d8ea', inStock: true },
      { name: 'Pinstripe Black', hex: '#111111', inStock: true }
    ],
    sizes: [
      { size: 'XS', stockCount: 6 },
      { size: 'S', stockCount: 12 },
      { size: 'M', stockCount: 10 },
      { size: 'L', stockCount: 5 }
    ],
    isNew: false,
    isSustainable: true,
    fit: 'Exaggerated menswear proportion with dropped shoulders'
  },
  {
    id: 'zara-007',
    name: 'LEATHER KITTEN HEEL SLINGBACKS',
    reference: 'REF. 1540/410',
    category: 'shoes-bags',
    subCategory: 'shoes',
    price: 139,
    primaryImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Pointed toe leather slingback shoes. Thin architectural heel with metallic detail. Adjustable elasticated strap at the ankle. Flexible leather insole with AIRFIT cushioning.',
    composition: 'UPPER: 100% Cow Leather | SOLE: 100% Polyurethane | HEEL: 4.5 cm / 1.7"',
    care: 'Clean with soft dry cloth and apply neutral wax conditioner.',
    origin: 'Made in Italy.',
    colors: [
      { name: 'Pitch Black', hex: '#000000', inStock: true },
      { name: 'Polished Cherry', hex: '#4a1525', inStock: true }
    ],
    sizes: [
      { size: '36', stockCount: 2 },
      { size: '37', stockCount: 4 },
      { size: '38', stockCount: 7 },
      { size: '39', stockCount: 3 },
      { size: '40', stockCount: 1 }
    ],
    isNew: true,
    isSustainable: false,
    edition: 'ARCHIVE ACCENTS',
    fit: 'True to size with sculpted pointed toe'
  },
  {
    id: 'zara-008',
    name: 'SCULPTURAL LEATHER TOTE BAG',
    reference: 'REF. 7702/001',
    category: 'shoes-bags',
    subCategory: 'accessories',
    price: 179,
    primaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Maxi leather tote bag with clean architectural geometric folds. Wide integrated shoulder strap. Magnetic clasp closure. Unlined suede interior with removable zipped leather pouch.',
    composition: '100% Full-Grain Calfskin Leather',
    care: 'Store in protective cotton dustbag provided.',
    origin: 'Made in Spain by master leather artisans.',
    colors: [
      { name: 'Raw Espresso', hex: '#2b1d14', inStock: true },
      { name: 'Matte Black', hex: '#000000', inStock: true }
    ],
    sizes: [
      { size: 'ONE SIZE', stockCount: 5 }
    ],
    isNew: true,
    isSustainable: true,
    fit: 'Dimensions: 42 x 34 x 14 cm. Fits 16" laptop.'
  },
  {
    id: 'zara-009',
    name: 'MENS OVERSIZED STRUCTURED COAT',
    reference: 'REF. 5104/890',
    category: 'man',
    subCategory: 'blazers',
    price: 199,
    primaryImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Tailored coat made of heavy double-faced Italian wool cloth. Notch lapels, welt chest pocket and front flap pockets. Center back vent. Relaxed dropped shoulder tailoring.',
    composition: '80% Recycled Wool · 20% Polyamide',
    care: 'Specialist dry clean only.',
    origin: 'Crafted in Portugal.',
    colors: [
      { name: 'Charcoal Mélange', hex: '#3a3a3a', inStock: true },
      { name: 'Camel', hex: '#9d7c57', inStock: true }
    ],
    sizes: [
      { size: 'S', stockCount: 2 },
      { size: 'M', stockCount: 6 },
      { size: 'L', stockCount: 4 },
      { size: 'XL', stockCount: 1 }
    ],
    isNew: true,
    isSustainable: true,
    edition: 'MAN STUDIO COLLECTION',
    fit: 'Loose oversized architectural boxy cut'
  },
  {
    id: 'zara-010',
    name: 'MENS RELAXED PLEATED CHINO TROUSERS',
    reference: 'REF. 4209/774',
    category: 'man',
    subCategory: 'trousers',
    price: 89,
    primaryImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Trousers made of heavy washed cotton twill. Double reverse front pleats. Side slant pockets and back buttoned jetted pockets. Wide straight leg with slight taper at hem.',
    composition: '100% Organic Heavy Cotton Twill (340 GSM)',
    care: 'Machine wash 30°C inside out.',
    origin: 'Made in Turkey.',
    colors: [
      { name: 'Ecru Chalk', hex: '#eae6df', inStock: true },
      { name: 'Washed Olive', hex: '#4f5446', inStock: true },
      { name: 'Washed Black', hex: '#222222', inStock: true }
    ],
    sizes: [
      { size: 'S', stockCount: 3 },
      { size: 'M', stockCount: 8 },
      { size: 'L', stockCount: 7 },
      { size: 'XL', stockCount: 2 }
    ],
    isNew: false,
    isSustainable: true,
    fit: 'Relaxed taper with high rise'
  },
  {
    id: 'zara-011',
    name: 'EBONY WOOD & SUEDE EAU DE PARFUM 100ML',
    reference: 'REF. 0210/550',
    category: 'beauty',
    subCategory: 'perfume',
    price: 45,
    primaryImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'An evocative olfactory narrative created with master perfumers in Grasse. Top notes of pink peppercorn and clove; heart of cedarwood and smoked iris; lingering base of raw ebony wood, leather accord, and dark amber.',
    composition: 'Alcohol Denat · Aqua · Parfum · Limonene · Linalool',
    care: 'Keep in cool, dry place away from direct sunlight.',
    origin: 'Formulated and bottled in Grasse, France.',
    colors: [
      { name: 'Smoked Glass', hex: '#3d3028', inStock: true }
    ],
    sizes: [
      { size: '100 ML', stockCount: 15 }
    ],
    isNew: true,
    isSustainable: true,
    edition: 'ZARA OLFACTIVE SELECTION',
    fit: 'Eau de Parfum concentration (18% oil)'
  },
  {
    id: 'zara-012',
    name: 'MINIMALIST WOOL TAILORED WAISTCOAT',
    reference: 'REF. 2291/614',
    category: 'studio',
    subCategory: 'shirts',
    price: 79,
    primaryImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Sleeveless waistcoat with a clean V-neckline. Front welt pockets. Matching self-fabric adjustable cinch strap at back with tonal metal slider. Front tonal covered button fastening.',
    composition: 'OUTER: 50% Wool · 47% Polyester · 3% Elastane | LINING: 100% Cupro',
    care: 'Dry clean only.',
    origin: 'Made in Spain.',
    colors: [
      { name: 'Black Velvet', hex: '#0d0d0d', inStock: true },
      { name: 'Oatmeal', hex: '#dfdad0', inStock: true }
    ],
    sizes: [
      { size: 'XS', stockCount: 2 },
      { size: 'S', stockCount: 5 },
      { size: 'M', stockCount: 4 },
      { size: 'L', stockCount: 1 }
    ],
    isNew: true,
    isSustainable: true,
    edition: 'STUDIO EDITORIAL',
    fit: 'Structured tailored silhouette worn standalone or layered'
  }
];

export const EDITORIAL_STORIES = [
  {
    id: 'campaign-01',
    tag: 'CAMPAIGN / SPRING-SUMMER 2026',
    title: 'THE MONOLITHIC SILHOUETTE',
    subtitle: 'Photographed in Lanzarote by Mario Sorrenti. Exploring architectural proportions and stark mineral geometries.',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    hotspots: [
      { productId: 'zara-001', x: 48, y: 35, title: 'Oversized Wool Blazer', price: 149 },
      { productId: 'zara-003', x: 52, y: 72, title: 'Wide-Leg Pleated Trousers', price: 99 }
    ]
  },
  {
    id: 'campaign-02',
    tag: 'LIMITED EDITION ARCHIVE',
    title: 'THE RAW LINEN EXPERIMENT',
    subtitle: 'Unrefined European Flax woven with fluid tailoring in an austere color palette of bone, pumice and black.',
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop',
    hotspots: [
      { productId: 'zara-004', x: 42, y: 45, title: 'Fluid Linen Trench Coat', price: 189 }
    ]
  }
];

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 86.5 },
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 }
} as const;
