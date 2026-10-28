import React from 'react';
import { FilterState } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Organic', 'Gluten-Free', 'Zero Waste'];

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-[440px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#e1ebdd]">
          <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#151e15]">
            Filter Surplus Rescue
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2fcee] flex items-center justify-center text-[#151e15]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Max Distance */}
        <div>
          <div className="flex justify-between items-center text-[13px] font-semibold text-[#151e15] mb-1.5">
            <span>Maximum Distance</span>
            <span className="text-[#00652c] font-bold">{filters.maxDistanceKm} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={filters.maxDistanceKm}
            onChange={(e) => onApply({ maxDistanceKm: parseFloat(e.target.value) })}
            className="w-full accent-[#00652c]"
          />
          <div className="flex justify-between text-[11px] text-[#6f7a6e] mt-1">
            <span>1 km (Walk)</span>
            <span>5 km (Bike)</span>
            <span>10 km (Drive)</span>
          </div>
        </div>

        {/* Max Price */}
        <div>
          <div className="flex justify-between items-center text-[13px] font-semibold text-[#151e15] mb-1.5">
            <span>Max Rescue Price</span>
            <span className="text-[#00652c] font-bold">
              {filters.maxPrice >= 20 ? 'Any Price' : `$${filters.maxPrice.toFixed(2)}`}
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="20"
            step="1"
            value={filters.maxPrice}
            onChange={(e) => onApply({ maxPrice: parseFloat(e.target.value) })}
            className="w-full accent-[#00652c]"
          />
        </div>

        {/* Mutual Aid Only Toggle */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#cce5ff]/50 border border-[#93ccff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005b8c] text-[20px]">
              volunteer_activism
            </span>
            <div>
              <p className="text-[13px] font-bold text-[#001d31]">Free Mutual Aid Only</p>
              <p className="text-[11px] text-[#3f493f]">Show 100% free community gifts</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={filters.freeOnly}
            onChange={(e) => onApply({ freeOnly: e.target.checked })}
            className="w-5 h-5 accent-[#005b8c] rounded cursor-pointer"
          />
        </div>

        {/* Dietary Preferences */}
        <div>
          <label className="block text-[12px] font-bold text-[#6f7a6e] uppercase tracking-wider mb-2">
            Dietary Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((tag) => {
              const active = filters.dietaryTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const newTags = active
                      ? filters.dietaryTags.filter((t) => t !== tag)
                      : [...filters.dietaryTags, tag];
                    onApply({ dietaryTags: newTags });
                  }}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                    active
                      ? 'bg-[#00652c] text-white shadow-sm'
                      : 'bg-[#e7f1e3] text-[#151e15] hover:bg-[#dbe5d8]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#e1ebdd]">
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="px-4 py-2.5 rounded-full bg-[#e1ebdd] text-[#151e15] font-semibold text-[13px] hover:bg-[#dbe5d8]"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-[#00652c] text-white font-bold text-[14px] shadow-sm hover:bg-[#00652c]/90"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};
