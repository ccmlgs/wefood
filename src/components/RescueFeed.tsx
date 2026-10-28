import React, { useState } from 'react';
import { RescueItem, FilterState } from '../types';
import { RescueCard } from './RescueCard';
import { MapView } from './MapView';

interface RescueFeedProps {
  items: RescueItem[];
  onSelectItem: (item: RescueItem) => void;
  onReserveItem: (item: RescueItem) => void;
  onOpenFilters: () => void;
  filters: FilterState;
  onUpdateFilters: (filters: Partial<FilterState>) => void;
  claimedItemIds: Set<string>;
}

export const RescueFeed: React.FC<RescueFeedProps> = ({
  items,
  onSelectItem,
  onReserveItem,
  onOpenFilters,
  filters,
  onUpdateFilters,
  claimedItemIds,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [locationName, setLocationName] = useState('Downtown, within 3 km');
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const locations = [
    'Downtown, within 3 km',
    'Midtown & Arts District (within 5 km)',
    'Westside Organic Valley (within 4 km)',
    'University & College Campus (within 2 km)',
  ];

  // Category counts
  const categoryCounts = {
    all: items.length,
    bakeries: items.filter((i) => i.category === 'bakeries').length,
    groceries: items.filter((i) => i.category === 'groceries').length,
    meals: items.filter((i) => i.category === 'meals').length,
    free: items.filter((i) => i.isFree).length,
  };

  // Filtered items
  const filteredItems = items.filter((item) => {
    // category filter
    if (filters.category !== 'all') {
      if (filters.category === 'free' && !item.isFree) return false;
      if (filters.category !== 'free' && item.category !== filters.category) return false;
    }
    // search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.vendorName.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    // max price
    if (filters.maxPrice < 20 && item.rescuePrice > filters.maxPrice) {
      return false;
    }
    // free only
    if (filters.freeOnly && !item.isFree) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Search & Location Header */}
      <div className="px-4 pt-2 pb-2 flex flex-col gap-2.5">
        {/* Active Geolocation Bar */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#e1ebdd] text-[#151e15] hover:bg-[#dbe5d8] transition-colors active:scale-95 text-left"
              type="button"
            >
              <span className="material-symbols-outlined text-[#00652c] text-[18px]">
                near_me
              </span>
              <span className="font-['Inter'] font-semibold text-[12px] truncate max-w-[170px]">
                {locationName}
              </span>
              <span className="material-symbols-outlined text-[#6f7a6e] text-[16px]">
                expand_more
              </span>
            </button>

            {/* Location selector dropdown */}
            {showLocationPicker && (
              <div className="absolute top-9 left-0 w-64 bg-white rounded-2xl shadow-xl border border-[#dbe5d8] py-2 z-50 animate-slide-up">
                <div className="px-3 py-1 text-[11px] font-bold text-[#6f7a6e] uppercase tracking-wider">
                  Select Neighborhood
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocationName(loc);
                      setShowLocationPicker(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-[13px] hover:bg-[#f2fcee] flex items-center justify-between ${
                      loc === locationName ? 'font-bold text-[#00652c] bg-[#e7f1e3]/40' : 'text-[#151e15]'
                    }`}
                  >
                    <span>{loc}</span>
                    {loc === locationName && (
                      <span className="material-symbols-outlined text-[16px] text-[#00652c]">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Impact counter badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ecf7e9] text-[#00652c]">
            <span className="material-symbols-outlined text-[16px] material-symbols-fill">
              bolt
            </span>
            <span className="font-['Inter'] font-bold text-[11px]">
              {items.length * 4} rescues live
            </span>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full flex items-center">
          <span className="absolute left-3.5 material-symbols-outlined text-[#6f7a6e] pointer-events-none text-[20px]">
            search
          </span>
          <input
            id="rescue-search"
            value={filters.searchQuery}
            onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
            placeholder="Search local surplus food, bakeries, markets..."
            type="search"
            className="w-full h-12 pl-10 pr-10 rounded-xl bg-white text-[#151e15] placeholder:text-[#6f7a6e] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00652c] shadow-sm border border-[#e1ebdd]/80 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onUpdateFilters({ searchQuery: '' })}
              className="absolute right-10 text-[#6f7a6e] hover:text-[#151e15] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button
            onClick={onOpenFilters}
            aria-label="Filters"
            className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-lg bg-[#e1ebdd] text-[#3f493f] hover:text-[#151e15] active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Category Filter Pills */}
      <div className="w-full overflow-x-auto py-2 px-4 flex items-center gap-2 no-scrollbar">
        <button
          onClick={() => onUpdateFilters({ category: 'all' })}
          className={`shrink-0 px-4 py-2 rounded-full font-['Inter'] font-semibold text-[13px] shadow-sm transition-transform active:scale-95 ${
            filters.category === 'all'
              ? 'bg-[#00652c] text-white'
              : 'bg-white text-[#151e15] hover:bg-[#e1ebdd]'
          }`}
        >
          All ({categoryCounts.all})
        </button>
        <button
          onClick={() => onUpdateFilters({ category: 'bakeries' })}
          className={`shrink-0 px-4 py-2 rounded-full font-['Inter'] font-semibold text-[13px] shadow-sm transition-colors active:scale-95 ${
            filters.category === 'bakeries'
              ? 'bg-[#00652c] text-white'
              : 'bg-white text-[#151e15] hover:bg-[#e1ebdd]'
          }`}
        >
          Bakeries ({categoryCounts.bakeries})
        </button>
        <button
          onClick={() => onUpdateFilters({ category: 'groceries' })}
          className={`shrink-0 px-4 py-2 rounded-full font-['Inter'] font-semibold text-[13px] shadow-sm transition-colors active:scale-95 ${
            filters.category === 'groceries'
              ? 'bg-[#00652c] text-white'
              : 'bg-white text-[#151e15] hover:bg-[#e1ebdd]'
          }`}
        >
          Groceries ({categoryCounts.groceries})
        </button>
        <button
          onClick={() => onUpdateFilters({ category: 'meals' })}
          className={`shrink-0 px-4 py-2 rounded-full font-['Inter'] font-semibold text-[13px] shadow-sm transition-colors active:scale-95 ${
            filters.category === 'meals'
              ? 'bg-[#00652c] text-white'
              : 'bg-white text-[#151e15] hover:bg-[#e1ebdd]'
          }`}
        >
          Cooked Meals ({categoryCounts.meals})
        </button>
        <button
          onClick={() => onUpdateFilters({ category: 'free' })}
          className={`shrink-0 px-4 py-2 rounded-full font-['Inter'] text-[13px] font-bold shadow-sm transition-colors active:scale-95 flex items-center gap-1 ${
            filters.category === 'free'
              ? 'bg-[#005b8c] text-white'
              : 'bg-[#cce5ff] text-[#001d31] hover:bg-[#93ccff]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
          Free Donation ({categoryCounts.free})
        </button>
      </div>

      {/* Hero Surprise Rescue Banner */}
      <div className="px-4 mb-4 mt-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00652c] to-[#15803d] text-white p-4 shadow-md">
          {/* Ambient organic decor circles */}
          <div className="absolute -right-6 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute right-12 top-0 w-20 h-20 rounded-full bg-white/5 blur-lg pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md w-max">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span className="font-['Inter'] font-bold text-[11px] uppercase tracking-wider">
                Daily Neighborhood Rescue
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[22px] tracking-tight leading-tight">
              Rescue Mystery Surplus Bags
            </h2>
            <p className="font-['Inter'] text-[13px] text-[#d3ffd5] max-w-[290px] leading-snug">
              Up to 70% off retail price from top-rated organic shops and neighborhood pantries.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: List View or Map View */}
      {viewMode === 'list' ? (
        <div className="px-4 flex flex-col gap-4 pb-12">
          {filteredItems.length === 0 ? (
            <div className="py-12 px-4 text-center bg-white rounded-2xl border border-[#e1ebdd] flex flex-col items-center">
              <span className="material-symbols-outlined text-[48px] text-[#6f7a6e]">
                search_off
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#151e15] mt-2">
                No surplus bags match your search
              </h3>
              <p className="text-[13px] text-[#3f493f] mt-1 max-w-[260px]">
                Try adjusting your filters, location radius, or check back during evening pickup hours!
              </p>
              <button
                onClick={() => onUpdateFilters({ searchQuery: '', category: 'all', freeOnly: false })}
                className="mt-4 px-4 py-2 rounded-full bg-[#00652c] text-white text-[13px] font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <RescueCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
                onReserve={onReserveItem}
                isClaimed={claimedItemIds.has(item.id)}
              />
            ))
          )}
        </div>
      ) : (
        <div className="px-4 pb-8">
          <MapView
            items={filteredItems}
            onSelect={onSelectItem}
            onReserve={onReserveItem}
          />
        </div>
      )}

      {/* Floating Map / List Toggle Control Pill */}
      <aside aria-label="View toggle" className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center bg-[#2a332a]/95 backdrop-blur-xl text-[#eaf4e6] p-1 rounded-full shadow-xl border border-white/10">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-['Inter'] text-[13px] transition-all ${
              viewMode === 'list'
                ? 'font-bold bg-[#00652c] text-white shadow-md'
                : 'font-medium text-[#eaf4e6]/80 hover:text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-['Inter'] text-[13px] transition-all ${
              viewMode === 'map'
                ? 'font-bold bg-[#00652c] text-white shadow-md'
                : 'font-medium text-[#eaf4e6]/80 hover:text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>Map View</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
