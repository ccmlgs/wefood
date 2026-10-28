import React, { useState } from 'react';
import { RescueItem } from '../types';

interface MapViewProps {
  items: RescueItem[];
  onSelect: (item: RescueItem) => void;
  onReserve: (item: RescueItem) => void;
}

export const MapView: React.FC<MapViewProps> = ({ items, onSelect, onReserve }) => {
  const [selectedItem, setSelectedItem] = useState<RescueItem | null>(items[0] || null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'bakeries') return item.category === 'bakeries';
    if (activeFilter === 'groceries') return item.category === 'groceries';
    if (activeFilter === 'free') return item.isFree;
    return true;
  });

  return (
    <div className="relative w-full h-[calc(100vh-130px)] min-h-[580px] bg-[#dbe5d8] overflow-hidden rounded-2xl border border-[#becabc]">
      {/* Map Graphic Canvas / Vector Stylized Neighborhood */}
      <svg
        className="w-full h-full object-cover select-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="radiusGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00652c" stopOpacity="0.08" />
            <stop offset="90%" stopColor="#00652c" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#00652c" stopOpacity="0.2" />
          </radialGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Base Landmass */}
        <rect width="1000" height="1000" fill="#eaf4e6" />

        {/* Forest / Green Parks */}
        <path
          d="M 50,150 Q 200,80 340,160 T 550,220 Q 520,380 320,410 T 60,320 Z"
          fill="#d4ebd2"
        />
        <path
          d="M 680,600 Q 820,520 950,580 T 960,860 Q 820,920 680,840 Z"
          fill="#d4ebd2"
        />

        {/* River / Canal */}
        <path
          d="M 0,480 Q 250,420 500,530 T 1000,460"
          fill="none"
          stroke="#b8e2f2"
          strokeWidth="38"
          strokeLinecap="round"
        />
        <path
          d="M 0,480 Q 250,420 500,530 T 1000,460"
          fill="none"
          stroke="#93ccff"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Major Avenue & Street Grid */}
        <g stroke="#ffffff" strokeWidth="18" strokeLinecap="round">
          <line x1="100" y1="0" x2="100" y2="1000" />
          <line x1="320" y1="0" x2="320" y2="1000" />
          <line x1="520" y1="0" x2="520" y2="1000" />
          <line x1="740" y1="0" x2="740" y2="1000" />
          <line x1="0" y1="200" x2="1000" y2="200" />
          <line x1="0" y1="360" x2="1000" y2="360" />
          <line x1="0" y1="680" x2="1000" y2="680" />
          <line x1="0" y1="840" x2="1000" y2="840" />
        </g>

        {/* Minor Neighborhood Streets */}
        <g stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeDasharray="1 1">
          <line x1="200" y1="0" x2="200" y2="1000" />
          <line x1="420" y1="0" x2="420" y2="1000" />
          <line x1="630" y1="0" x2="630" y2="1000" />
          <line x1="860" y1="0" x2="860" y2="1000" />
          <line x1="0" y1="280" x2="1000" y2="280" />
          <line x1="0" y1="600" x2="1000" y2="600" />
          <line x1="0" y1="760" x2="1000" y2="760" />
        </g>

        {/* 3km Radius Boundary Ring */}
        <circle
          cx="480"
          cy="480"
          r="420"
          fill="url(#radiusGradient)"
          stroke="#00652c"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* User Location Radar Pulse */}
        <circle cx="480" cy="480" r="28" fill="#00652c" opacity="0.15" />
        <circle cx="480" cy="480" r="14" fill="#00652c" opacity="0.3" />
        <circle cx="480" cy="480" r="8" fill="#00652c" stroke="#ffffff" strokeWidth="2.5" />
      </svg>

      {/* Floating Filter Pills on Map */}
      <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar z-10">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full font-['Inter'] text-[12px] font-semibold shadow-sm transition-all ${
            activeFilter === 'all'
              ? 'bg-[#00652c] text-white'
              : 'bg-white/95 text-[#151e15] hover:bg-white'
          }`}
        >
          All Stores ({items.length})
        </button>
        <button
          onClick={() => setActiveFilter('bakeries')}
          className={`px-3 py-1.5 rounded-full font-['Inter'] text-[12px] font-semibold shadow-sm transition-all whitespace-nowrap ${
            activeFilter === 'bakeries'
              ? 'bg-[#00652c] text-white'
              : 'bg-white/95 text-[#151e15] hover:bg-white'
          }`}
        >
          🥖 Bakeries
        </button>
        <button
          onClick={() => setActiveFilter('groceries')}
          className={`px-3 py-1.5 rounded-full font-['Inter'] text-[12px] font-semibold shadow-sm transition-all whitespace-nowrap ${
            activeFilter === 'groceries'
              ? 'bg-[#00652c] text-white'
              : 'bg-white/95 text-[#151e15] hover:bg-white'
          }`}
        >
          🥬 Groceries
        </button>
        <button
          onClick={() => setActiveFilter('free')}
          className={`px-3 py-1.5 rounded-full font-['Inter'] text-[12px] font-semibold shadow-sm transition-all whitespace-nowrap ${
            activeFilter === 'free'
              ? 'bg-[#005b8c] text-white'
              : 'bg-white/95 text-[#005b8c] hover:bg-white'
          }`}
        >
          ❤️ Free Mutual Aid
        </button>
      </div>

      {/* Map Control Buttons (Zoom, Re-center) */}
      <div className="absolute top-14 right-3 flex flex-col gap-2 z-10">
        <button
          aria-label="Current location"
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#00652c] active:scale-95"
          onClick={() => setSelectedItem(items[0])}
        >
          <span className="material-symbols-outlined text-[20px]">my_location</span>
        </button>
        <div className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden text-[#151e15]">
          <button className="w-9 h-8 flex items-center justify-center hover:bg-[#e7f1e3] active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <div className="h-[1px] bg-[#e1ebdd]" />
          <button className="w-9 h-8 flex items-center justify-center hover:bg-[#e7f1e3] active:scale-95">
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Pins */}
      {filteredItems.map((item) => {
        const isSelected = selectedItem?.id === item.id;
        return (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 z-20 hover:scale-110 active:scale-95"
            style={{ left: `${item.coordinates.x}%`, top: `${item.coordinates.y}%` }}
          >
            {/* Price Badge Pin */}
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full shadow-lg border-2 transition-all ${
                isSelected
                  ? 'ring-4 ring-[#00652c]/30 scale-110 border-white'
                  : 'border-white/80'
              } ${
                item.isFree
                  ? 'bg-[#005b8c] text-white'
                  : item.vendorType === 'grocery'
                  ? 'bg-[#fe932c] text-[#663500]'
                  : 'bg-[#00652c] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {item.isFree ? 'favorite' : item.vendorType === 'grocery' ? 'eco' : 'bakery_dining'}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-[12px]">
                {item.isFree ? 'FREE' : `$${item.rescuePrice.toFixed(2)}`}
              </span>
            </div>

            {/* Pin Pointer Arrow */}
            <div
              className={`w-2.5 h-2.5 rotate-45 mx-auto -mt-1.5 shadow-sm ${
                item.isFree
                  ? 'bg-[#005b8c]'
                  : item.vendorType === 'grocery'
                  ? 'bg-[#fe932c]'
                  : 'bg-[#00652c]'
              }`}
            />
          </div>
        );
      })}

      {/* Selected Item Floating Bottom Card */}
      {selectedItem && (
        <div className="absolute bottom-16 left-3 right-3 z-30 animate-slide-up">
          <div
            onClick={() => onSelect(selectedItem)}
            className="bg-white rounded-2xl p-3 shadow-xl border border-[#dbe5d8] flex items-center gap-3 cursor-pointer hover:shadow-2xl transition-all"
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="w-18 h-18 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] text-[#6f7a6e]">
                <span className="font-semibold text-[#151e15] truncate">
                  {selectedItem.vendorName}
                </span>
                <span>•</span>
                <span>{selectedItem.vendorDistance}</span>
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#151e15] truncate">
                {selectedItem.title}
              </h4>
              <div className="flex items-center gap-1 text-[11px] text-[#904d00] font-medium mt-0.5">
                <span className="material-symbols-outlined text-[13px]">schedule</span>
                <span className="truncate">{selectedItem.pickupWindow}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#00652c]">
                  {selectedItem.isFree ? 'FREE' : `$${selectedItem.rescuePrice.toFixed(2)}`}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReserve(selectedItem);
                  }}
                  className="px-3.5 py-1 rounded-full bg-[#00652c] text-white font-['Inter'] font-semibold text-[12px] shadow-sm hover:bg-[#00652c]/90 active:scale-95 transition-all"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
