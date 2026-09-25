/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  MainCategory,
  SubCategory,
  GridViewMode,
  Product,
  CartItem,
  FilterState,
  CurrencyCode
} from './types/clothing';
import { PRODUCTS, CURRENCIES } from './data/products';
import { Navbar } from './components/Navbar';
import { EditorialHero } from './components/EditorialHero';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CheckoutModal } from './components/CheckoutModal';
import { EditorialStorySection } from './components/EditorialStorySection';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Category State
  const [currentCategory, setCurrentCategory] = useState<MainCategory>('woman');

  // Interactive Grid View Mode ('single' | 'duo' | 'quad')
  const [gridView, setGridView] = useState<GridViewMode>('quad');

  // Currency State (Defaults to INR as requested by ZARA India reference, but easily switchable)
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('INR');
  const currency = CURRENCIES[currencyCode];

  // Filtering State
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'woman',
    subCategory: 'all',
    color: '',
    size: '',
    sortBy: 'recommended',
    sustainableOnly: false,
    searchQuery: '',
    priceRange: [0, 500]
  });

  // Cart State (Initialized with 1 sample item for immediate interactive discovery)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'zara-001-M-Charcoal Grey',
      product: PRODUCTS[0],
      selectedSize: 'M',
      selectedColor: 'Charcoal Grey',
      quantity: 1
    }
  ]);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(['zara-002']);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Switch category
  const handleSelectCategory = (cat: MainCategory) => {
    setCurrentCategory(cat);
    setFilterState((prev) => ({
      ...prev,
      category: cat,
      subCategory: 'all'
    }));
  };

  // Update filters
  const handleUpdateFilter = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      category: currentCategory,
      subCategory: 'all',
      color: '',
      size: '',
      sortBy: 'recommended',
      sustainableOnly: false,
      searchQuery: '',
      priceRange: [0, 500]
    });
  };

  // Cart Operations
  const handleAddToCart = (product: Product, size: string, color: string) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: 1
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Main Category match (or if 'studio' show items with edition or category studio)
      if (currentCategory === 'studio') {
        if (product.category !== 'studio' && !product.edition?.includes('STUDIO')) {
          return false;
        }
      } else if (product.category !== currentCategory) {
        return false;
      }

      // Subcategory
      if (filterState.subCategory !== 'all' && product.subCategory !== filterState.subCategory) {
        return false;
      }

      // Color
      if (filterState.color) {
        const hasColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(filterState.color.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // Size
      if (filterState.size) {
        const hasSize = product.sizes.some(
          (s) => s.size === filterState.size && s.stockCount > 0
        );
        if (!hasSize) return false;
      }

      // Sustainable only
      if (filterState.sustainableOnly && !product.isSustainable) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (filterState.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (filterState.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0; // 'recommended' uses natural catalogue order
    });
  }, [currentCategory, filterState]);

  // Wishlisted Products objects
  const wishlistedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const totalCartUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCollection = () => {
    const el = document.getElementById('collection-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={totalCartUnits}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currency={currency}
        onSelectCurrency={(code) => setCurrencyCode(code)}
      />

      {/* Editorial Full-Bleed Campaign Hero with Hotspots */}
      <EditorialHero
        onSelectProduct={(productId) => {
          const prod = PRODUCTS.find((p) => p.id === productId);
          if (prod) setQuickViewProduct(prod);
        }}
        onExploreCollection={scrollToCollection}
        currency={currency}
      />

      {/* Filterable Product Collection Header & Switchers */}
      <div id="collection-grid">
        <FilterBar
          filterState={filterState}
          onChangeFilter={handleUpdateFilter}
          onResetFilters={handleResetFilters}
          totalProducts={filteredProducts.length}
          gridView={gridView}
          onChangeGridView={(mode) => setGridView(mode)}
        />

        {/* Dynamic Product Grid with View Switchers */}
        <ProductGrid
          products={filteredProducts}
          currency={currency}
          gridView={gridView}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Architectural Craftsmanship & Join Life Story Section */}
      <EditorialStorySection
        onExploreArchive={() => {
          handleSelectCategory('studio');
          scrollToCollection();
        }}
      />

      {/* Minimalist High-Fashion Footer */}
      <Footer />

      {/* Slide-out Shopping Bag Drawer */}
      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Full-Screen Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        currency={currency}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onAddToCart={handleAddToCart}
      />

      {/* Garment Sizing Matrix Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Full Checkout & Order Receipt Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
