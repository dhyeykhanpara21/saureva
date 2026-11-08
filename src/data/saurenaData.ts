import { ProductDetails, Ingredient, Dish, BrandPillar } from '../types';

export const productDetails: ProductDetails = {
  title: 'SAURÉNA Kathiyawadi Masala',
  gujaratiTitle: 'કાઠિયાવાડી મસાલો',
  tagline: 'THE TASTE OF SAURASHTRA',
  netWeight: '100 g',
  description:
    'A rich and aromatic spice blend from Saurashtra, crafted to bring the authentic taste of Kathiyawadi cuisine to your kitchen. Prepared from sun-ripened regional whole spices, balanced for distinct warmth and rich earthy depth.',
  ingredients: [
    'Coriander',
    'Cumin',
    'Red Chilli',
    'Turmeric',
    'Black Pepper',
    'Clove',
    'Cinnamon',
    'Bay Leaf',
    'Nutmeg',
    'Mace',
    'and other authentic spices'
  ],
  howToUse:
    'Use 1–2 tsp (5–10 g) for 2–3 servings of sabzi, undhiyu, sev tameta or other Gujarati dishes. Stir gently into oil or ghee temper for fullest fragrance.',
  storage:
    'Store in a cool, dry and hygienic place. Keep the pack tightly sealed after use to lock in essential volatile oils.',
  fssaiStatus: 'Lic. No.: Certified Standard',
  barcode: '8 904567 890123',
  nutrition: [
    { label: 'Energy', value: '370 kcal' },
    { label: 'Protein', value: '11.5 g' },
    { label: 'Carbohydrate', value: '50.2 g' },
    { label: 'Total Fat', value: '12.3 g' },
    { label: 'Dietary Fiber', value: '18.0 g' },
    { label: 'Sodium', value: '68 mg' }
  ],
  packagingTypes: [
    {
      id: 'pouch',
      name: 'Stand-Up Foil Pouch',
      description:
        'Tri-laminate airtight stand-up pouch with hermetic resealable zip and gusseted base. Designed for everyday culinary convenience while locking in volatile spice oils.',
      badge: 'Resealable Zip'
    },
    {
      id: 'box',
      name: 'Artisan Cardboard Box',
      description:
        'Crafted from high-density rigid kraft cardboard with a signature wax-tab seal. An artisanal gift and pantry collector format celebrating traditional Gujarati packaging elegance.',
      badge: 'Artisan Box'
    },
    {
      id: 'kraft',
      name: 'Eco Kraft Stand-Up Pouch',
      description:
        'Natural unbleached artisan kraft paper pouch with internal food-grade aroma barrier and resealable airtight zip. An earthy, rustic kitchen collectible honoring Saurashtra terroir.',
      badge: 'Eco Kraft Pouch'
    }
  ]
};

export const verifiedIngredients: Ingredient[] = [
  {
    id: 'red-chilli',
    name: 'Red Chilli',
    gujarati: 'લાલ મરચું',
    hindi: 'Lal Mirch',
    description: 'Sun-dried vibrant chillies delivering deep crimson warmth and authentic Kathiyawadi punch.',
    aroma: 'Pungent, smoky, fiery warmth',
    role: 'Provides the iconic deep sunset color and hearty heat essential to Saurashtra curries.',
    region: 'Gondal & Saurashtra Plains',
    image: '/assets/images/red_chilli.jpg'
  },
  {
    id: 'coriander',
    name: 'Coriander Seeds',
    gujarati: 'ધાણા',
    hindi: 'Dhaniya',
    description: 'Slow-roasted coriander seeds bringing citrusy herbal undertones and rounded body.',
    aroma: 'Citrus, floral, gently woody',
    role: 'Forms the cooling, aromatic backbone that softens sharpness and thickens gravies.',
    region: 'Gujarat Regional Mandis',
    image: '/assets/images/coriander_cumin.jpg'
  },
  {
    id: 'cumin',
    name: 'Cumin Seeds',
    gujarati: 'જીરું',
    hindi: 'Jeera',
    description: 'Unjha-sourced whole cumin providing earthy depth and characteristic aroma on tempering.',
    aroma: 'Earthy, nutty, warming',
    role: 'Essential to the "vaghar" (tadka), releasing intense nutty fragrance upon heating.',
    region: 'Unjha Spice Belt',
    image: '/assets/images/coriander_cumin.jpg'
  },
  {
    id: 'turmeric',
    name: 'Golden Turmeric',
    gujarati: 'હળદર',
    hindi: 'Haldi',
    description: 'Pure high-curcumin turmeric rhizomes dried to perfection for vibrant yellow radiance.',
    aroma: 'Earthy, peppery, warm ginger note',
    role: 'Lends the golden luster and time-honored digestive wellness revered in Gujarati homes.',
    region: 'Western Deccan & Gujarat',
    image: '/assets/images/turmeric_golden.jpg'
  },
  {
    id: 'black-pepper',
    name: 'Black Pepper',
    gujarati: 'કાળા મરી',
    hindi: 'Kali Mirch',
    description: 'Bold black peppercorns crushed gently to retain their pungent piperine bite.',
    aroma: 'Sharp, piney, sharp peppery bite',
    role: 'Delivers a lingering, dry heat that activates other spices across the palate.',
    region: 'Malabar & Western Ghats',
    image: '/assets/images/cloves_cinnamon.jpg'
  },
  {
    id: 'clove',
    name: 'Aromatic Clove',
    gujarati: 'લવિંગ',
    hindi: 'Laung',
    description: 'Handpicked unopened flower buds packed with concentrated eugenol oil.',
    aroma: 'Intensely sweet, medicinal, spicy',
    role: 'Adds unmistakable sweet depth and high-note aroma to robust Kathiyawadi curries.',
    region: 'Coastal spice plantations',
    image: '/assets/images/cloves_cinnamon.jpg'
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon Bark',
    gujarati: 'તજ',
    hindi: 'Dalchini',
    description: 'Delicate inner bark rolls lending natural sweetness without artificial sugars.',
    aroma: 'Warm, sweet, woody and rich',
    role: 'Harmonizes pungent chillies with sweet, soothing undertones.',
    region: 'Western hills',
    image: '/assets/images/cloves_cinnamon.jpg'
  },
  {
    id: 'bay-leaf',
    name: 'Bay Leaf',
    gujarati: 'તમાલપત્ર',
    hindi: 'Tejpatta',
    description: 'Sun-cured aromatic leaves releasing complex herbal notes into simmering dishes.',
    aroma: 'Herbal, tea-like, subtle camphor',
    role: 'Infuses slow-cooked preparations with layered aromatic complexity.',
    region: 'Sub-Himalayan foothills',
    image: '/assets/images/spice_bowl_mortar.jpg'
  },
  {
    id: 'nutmeg-mace',
    name: 'Nutmeg & Mace',
    gujarati: 'જાયફળ અને જાવંત્રી',
    hindi: 'Jaiphal & Javitri',
    description: 'The golden aril and seed offering regal sophistication to the finishing notes.',
    aroma: 'Lacy, sweet, exotic royal bouquet',
    role: 'The signature touch that transforms rustic village spices into a royal Kathiyawadi feast.',
    region: 'Southern Spice Estates',
    image: '/assets/images/spice_bowl_mortar.jpg'
  }
];

export const kathiyawadiDishes: Dish[] = [
  {
    id: 'bajra-rotla',
    name: 'Bajra no Rotlo',
    gujarati: 'બાજરીનો રોટલો',
    tagline: 'Hand-patted pearl millet flatbread with fresh white butter',
    description:
      'The crown jewel of Saurashtra rustic dining. Hand-patted pearl millet flatbread roasted gently on a clay tawa over open wood fire, served warm with freshly churned makkhan (white butter) and organic jaggery.',
    pairingNote:
      'SAURÉNA Kathiyawadi Masala is folded into the accompanying garlic chutney (Lasan ni Chutney) or vagharelo rotlo for deep fiery satisfaction.',
    spiceLevel: 'Bold & Warming',
    image: '/assets/images/dish_rotlo.jpg'
  },
  {
    id: 'ringan-oro',
    name: 'Ringan no Oro',
    gujarati: 'રીંગણનો ઓળો',
    tagline: 'Woodfire-charred eggplant mash with spring garlic',
    description:
      'Smoky fire-roasted jumbo eggplants mashed and simmered in golden groundnut oil with generous heaps of spring garlic, green chillies, and fresh tomatoes.',
    pairingNote:
      'A tablespoon of SAURÉNA Kathiyawadi Masala infused in groundnut oil brings out the true rustic campfire aroma that defines Saurashtra evenings.',
    spiceLevel: 'Smoky & Pungent',
    image: '/assets/images/dish_eggplant.jpg'
  },
  {
    id: 'sev-tameta',
    name: 'Sev Tameta nu Shaak',
    gujarati: 'સેવ ટમેટાનું શાક',
    tagline: 'Tangy spiced tomato broth crowned with crunchy ratlami sev',
    description:
      'Juicy ripe tomatoes tempered with mustard seeds and curry leaves in a tangy, aromatic gravy, finished right before serving with a generous handful of spicy crunchy sev.',
    pairingNote:
      'Our blend strikes the exact harmony between sweet tomato acidity and warming spice, turning everyday tomatoes into highway dhaba perfection.',
    spiceLevel: 'Tangy & Spicy',
    image: '/assets/images/dish_curry.jpg'
  },
  {
    id: 'kathiyawadi-thali',
    name: 'The Kathiyawadi Thali',
    gujarati: 'સૌરાષ્ટ્રની કાઠિયાવાડી થાળી',
    tagline: 'A royal feast of hospitality, tradition & abundance',
    description:
      'The quintessential banquet of Saurashtra: steaming Bajra Rotla, Ringan Oro, Lasaniya Bataka, Sev Tameta, fresh chaas (buttermilk), and pure ghee jaggery. A celebration of regional warmth and generous hospitality.',
    pairingNote:
      'SAURÉNA is the single secret spice bond uniting every vegetable preparation across the traditional Gujarati thali.',
    spiceLevel: 'Balanced Symphony',
    image: '/assets/images/dish_thali.jpg'
  }
];

export const brandPillars: BrandPillar[] = [
  {
    id: 'regional-inspiration',
    number: '01',
    title: 'Regional Inspiration',
    description: 'Ancestral Saurashtra Recipes',
    detail:
      'Rooted deeply in the agrarian and pastoral heartlands of Saurashtra, from Junagadh to Gondal. Our formulation follows recipes passed down through generations of Kathiyawadi home kitchens.'
  },
  {
    id: 'careful-selection',
    number: '02',
    title: 'Careful Selection',
    description: 'Single-Origin Sun-Ripened Spices',
    detail:
      'We source only the prime pick from renowned regional spice hubs — Unjha cumin, Gondal chillies, and sun-cured spices — ensuring authentic terroir and high essential oil content.'
  },
  {
    id: 'quality-assurance',
    number: '03',
    title: 'Quality Assurance',
    description: 'Zero Preservatives, Pure Processing',
    detail:
      '100% natural spices processed in hygienic, climate-controlled facilities. Absolutely zero artificial colors, synthetic fragrances, chemical binders, or added MSG.'
  },
  {
    id: 'thoughtful-packaging',
    number: '04',
    title: 'Thoughtful Packaging',
    description: 'Multi-Barrier Aroma Protection',
    detail:
      'Engineered with high-barrier laminates and artisan cardboard to guard against oxygen, UV light, and moisture. Every pinch smells as fresh as the day it was ground.'
  }
];

