export type MainCategory = 'woman' | 'man' | 'studio' | 'shoes-bags' | 'beauty';

export type SubCategory =
  | 'all'
  | 'blazers'
  | 'dresses'
  | 'trousers'
  | 'knitwear'
  | 'shirts'
  | 'shoes'
  | 'accessories'
  | 'perfume';

export type GridViewMode = 'single' | 'duo' | 'quad';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductSize {
  size: string;
  stockCount: number; // 0 = out of stock, 1-3 = low stock, >3 = in stock
}

export interface Product {
  id: string;
  name: string;
  reference: string;
  category: MainCategory;
  subCategory: SubCategory;
  price: number; // Base USD
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  description: string;
  composition: string;
  care: string;
  origin: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  isNew: boolean;
  isSustainable: boolean;
  edition?: string;
  fit: string;
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${selectedSize}-${selectedColor}`
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface FilterState {
  category: MainCategory;
  subCategory: SubCategory;
  color: string;
  size: string;
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'newest';
  sustainableOnly: boolean;
  searchQuery: string;
  priceRange: [number, number];
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1.0)
}
