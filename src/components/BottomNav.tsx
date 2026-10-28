import React from 'react';

export type TabType = 'pantry' | 'rescue' | 'donate' | 'community' | 'impact';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  pantryCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  pantryCount = 0,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f2fcee]/95 backdrop-blur-xl border-t border-[#e1ebdd]/70 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
      <div className="max-w-[480px] mx-auto h-16 px-1 flex items-center justify-around">
        {/* Pantry */}
        <button
          onClick={() => onTabChange('pantry')}
          type="button"
          aria-label="Pantry"
          className={`relative flex-1 min-w-[56px] h-full flex flex-col items-center justify-center gap-0.5 transition-colors ${
            currentTab === 'pantry' ? 'text-[#00652c] font-bold' : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">kitchen</span>
          <span className="font-['Inter'] text-[11px] tracking-tight">Pantry</span>
          {pantryCount > 0 && (
            <span className="absolute top-2 right-4 w-4 h-4 bg-[#00652c] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {pantryCount}
            </span>
          )}
        </button>

        {/* Rescue Marketplace */}
        <button
          onClick={() => onTabChange('rescue')}
          type="button"
          aria-label="Rescue"
          className={`flex-1 min-w-[56px] h-full flex flex-col items-center justify-center gap-0.5 transition-colors ${
            currentTab === 'rescue' ? 'text-[#00652c] font-bold' : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">storefront</span>
          <span className="font-['Inter'] text-[11px] tracking-tight">Rescue</span>
        </button>

        {/* Center Raised Action Button: Donate / Sell */}
        <div className="flex-1 min-w-[64px] flex flex-col items-center justify-center">
          <button
            onClick={() => onTabChange('donate')}
            type="button"
            aria-label="Share Surplus"
            className="relative -top-3 w-12 h-12 rounded-full bg-[#15803d] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(21,128,61,0.35)] active:scale-95 transition-transform hover:bg-[#00652c]"
          >
            <span className="material-symbols-outlined text-[26px]">add</span>
          </button>
          <span className="font-['Inter'] text-[11px] text-[#00652c] font-semibold -mt-2">
            Donate/Sell
          </span>
        </div>

        {/* Community */}
        <button
          onClick={() => onTabChange('community')}
          type="button"
          aria-label="Community"
          className={`flex-1 min-w-[56px] h-full flex flex-col items-center justify-center gap-0.5 transition-colors ${
            currentTab === 'community' ? 'text-[#00652c] font-bold' : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">explore</span>
          <span className="font-['Inter'] text-[11px] tracking-tight">Community</span>
        </button>

        {/* Impact */}
        <button
          onClick={() => onTabChange('impact')}
          type="button"
          aria-label="Impact"
          className={`flex-1 min-w-[56px] h-full flex flex-col items-center justify-center gap-0.5 transition-colors ${
            currentTab === 'impact' ? 'text-[#00652c] font-bold' : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">eco</span>
          <span className="font-['Inter'] text-[11px] tracking-tight">Impact</span>
        </button>
      </div>
    </nav>
  );
};
