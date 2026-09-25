import React, { useState } from 'react';
import { SubCategory, GridViewMode, FilterState } from '../types/clothing';
import { SlidersHorizontal, ChevronDown, Check, X, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filterState: FilterState;
  onChangeFilter: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalProducts: number;
  gridView: GridViewMode;
  onChangeGridView: (mode: GridViewMode) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterState,
  onChangeFilter,
  onResetFilters,
  totalProducts,
  gridView,
  onChangeGridView
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const subCategories: { id: SubCategory; label: string }[] = [
    { id: 'all', label: 'ALL' },
    { id: 'blazers', label: 'BLAZERS & COATS' },
    { id: 'dresses', label: 'DRESSES' },
    { id: 'trousers', label: 'TROUSERS' },
    { id: 'knitwear', label: 'KNITWEAR' },
    { id: 'shirts', label: 'SHIRTS & TOPS' },
    { id: 'shoes', label: 'SHOES' },
    { id: 'accessories', label: 'BAGS & ACC.' }
  ];

  const colors = [
    { name: 'All Colors', value: '' },
    { name: 'Black', value: 'Black' },
    { name: 'Ecru / White', value: 'Ecru' },
    { name: 'Charcoal / Grey', value: 'Charcoal' },
    { name: 'Taupe / Camel', value: 'Camel' },
    { name: 'Olive / Green', value: 'Olive' }
  ];

  const sizes = ['ALL', 'XS', 'S', 'M', 'L', 'XL', 'ONE SIZE'];

  const hasActiveFilters =
    filterState.color !== '' ||
    filterState.size !== '' ||
    filterState.sustainableOnly ||
    filterState.sortBy !== 'recommended' ||
    filterState.subCategory !== 'all';

  return (
    <div className="sticky top-[86px] z-30 bg-white border-b border-black/10">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8">
        {/* Main Row: Subcategories + Controls */}
        <div className="py-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          {/* Subcategory Navigation (Single line, text with underlines) */}
          <div className="flex items-center gap-6 text-[11px] tracking-[0.16em] uppercase font-medium shrink-0">
            {subCategories.map((sub) => {
              const isActive = filterState.subCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onChangeFilter({ subCategory: sub.id })}
                  className={`py-1 transition-colors whitespace-nowrap ${
                    isActive ? 'text-black font-bold border-b border-black' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Filters Button + Item Count + Grid View Switchers */}
          <div className="flex items-center gap-5 shrink-0 ml-auto">
            {/* Item Count Display */}
            <span className="hidden sm:inline text-[11px] font-mono tracking-widest text-neutral-500">
              [{totalProducts} {totalProducts === 1 ? 'ITEM' : 'ITEMS'}]
            </span>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-medium py-1 px-2.5 transition-colors border ${
                filterDrawerOpen || hasActiveFilters
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 hover:border-black text-black'
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>FILTERS</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full ml-0.5" />
              )}
            </button>

            {/* Interactive Grid View Switchers (Single / Duo / Quad) */}
            <div className="hidden lg:flex items-center border border-black/20 p-0.5 bg-neutral-50">
              {/* 1-Col Magazine View */}
              <button
                onClick={() => onChangeGridView('single')}
                className={`p-1.5 transition-colors ${
                  gridView === 'single' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                }`}
                title="Magazine 1-Column Editorial View"
                aria-label="Single column view"
              >
                <div className="w-3.5 h-3.5 border border-current" />
              </button>

              {/* 2-Col Editorial Duo View */}
              <button
                onClick={() => onChangeGridView('duo')}
                className={`p-1.5 transition-colors ${
                  gridView === 'duo' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                }`}
                title="Editorial 2-Column Duo View"
                aria-label="Two column view"
              >
                <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
                  <div className="border border-current" />
                  <div className="border border-current" />
                </div>
              </button>

              {/* 4-Col High Density Catalog View */}
              <button
                onClick={() => onChangeGridView('quad')}
                className={`p-1.5 transition-colors ${
                  gridView === 'quad' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                }`}
                title="Catalog 4-Column High-Density View"
                aria-label="Four column view"
              >
                <div className="w-3.5 h-3.5 grid grid-cols-2 grid-rows-2 gap-0.5">
                  <div className="border border-current" />
                  <div className="border border-current" />
                  <div className="border border-current" />
                  <div className="border border-current" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Tray Panel */}
        {filterDrawerOpen && (
          <div className="py-6 border-t border-black/10 bg-neutral-50/60 -mx-4 md:-mx-8 px-4 md:px-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sort By */}
              <div>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-2">
                  ORDER BY
                </span>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'recommended', label: 'RECOMMENDED' },
                    { id: 'newest', label: 'NEW ARRIVALS' },
                    { id: 'price-low', label: 'PRICE: LOW TO HIGH' },
                    { id: 'price-high', label: 'PRICE: HIGH TO LOW' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onChangeFilter({ sortBy: s.id as any })}
                      className={`w-full text-left py-1 tracking-wider uppercase transition-colors flex items-center justify-between ${
                        filterState.sortBy === s.id ? 'font-bold text-black' : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      <span>{s.label}</span>
                      {filterState.sortBy === s.id && <Check size={13} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-2">
                  COLORWAY
                </span>
                <div className="space-y-1.5 text-xs">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => onChangeFilter({ color: c.value })}
                      className={`w-full text-left py-1 tracking-wider uppercase transition-colors flex items-center justify-between ${
                        filterState.color === c.value ? 'font-bold text-black' : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      <span>{c.name}</span>
                      {filterState.color === c.value && <Check size={13} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-2">
                  SIZE
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {sizes.map((s) => {
                    const isSelected = (s === 'ALL' && filterState.size === '') || filterState.size === s;
                    return (
                      <button
                        key={s}
                        onClick={() => onChangeFilter({ size: s === 'ALL' ? '' : s })}
                        className={`px-3 py-1.5 text-[11px] font-mono border transition-colors ${
                          isSelected
                            ? 'bg-black text-white border-black font-semibold'
                            : 'border-neutral-300 text-neutral-700 hover:border-black'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sustainability & Actions */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-2">
                    PROGRAMME
                  </span>
                  <label className="flex items-center gap-3 cursor-pointer py-1 text-xs tracking-wider uppercase select-none">
                    <input
                      type="checkbox"
                      checked={filterState.sustainableOnly}
                      onChange={(e) => onChangeFilter({ sustainableOnly: e.target.checked })}
                      className="w-4 h-4 accent-black rounded-none border border-neutral-400"
                    />
                    <span className="font-medium">JOIN LIFE (CERTIFIED RAW FIBERS)</span>
                  </label>
                  <p className="text-[10px] text-neutral-400 mt-1 font-light">
                    Garments produced with sustainable raw materials and lower environmental footprint.
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      onClick={onResetFilters}
                      className="px-4 py-2 border border-black/30 text-[10px] tracking-widest uppercase font-semibold text-neutral-700 hover:text-black flex items-center gap-1.5"
                    >
                      <RotateCcw size={12} />
                      RESET ALL
                    </button>
                  )}
                  <button
                    onClick={() => setFilterDrawerOpen(false)}
                    className="ml-auto px-6 py-2 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-neutral-800"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
