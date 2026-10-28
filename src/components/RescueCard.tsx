import React, { useState } from 'react';
import { RescueItem } from '../types';

interface RescueCardProps {
  item: RescueItem;
  onSelect: (item: RescueItem) => void;
  onReserve: (item: RescueItem) => void;
  isClaimed?: boolean;
}

export const RescueCard: React.FC<RescueCardProps> = ({
  item,
  onSelect,
  onReserve,
  isClaimed = false,
}) => {
  const [isReserving, setIsReserving] = useState(false);
  const [justReserved, setJustReserved] = useState(isClaimed);

  const handleReserveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (justReserved || isReserving) return;

    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      setJustReserved(true);
      onReserve(item);
    }, 700);
  };

  const getVendorIcon = () => {
    switch (item.vendorType) {
      case 'bakery':
        return 'bakery_dining';
      case 'grocery':
        return 'local_grocery_store';
      case 'meal':
        return 'restaurant';
      case 'cafe':
        return 'local_cafe';
      case 'community':
      default:
        return 'volunteer_activism';
    }
  };

  return (
    <article
      onClick={() => onSelect(item)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md cursor-pointer border border-[#e1ebdd]/70 active:scale-[0.99] group"
    >
      {/* Visual Image with Overlays */}
      <div className="relative w-full aspect-[16/10] bg-[#e7f1e3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Floating Badge */}
        {item.isFree ? (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00652c] text-white font-['Inter'] font-bold text-[13px] shadow-md">
            <span className="material-symbols-outlined text-[16px] material-symbols-fill">
              favorite
            </span>
            <span>FREE (Donation)</span>
          </div>
        ) : (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00652c] text-white font-['Inter'] font-semibold text-[13px] shadow-md">
            <span className="material-symbols-outlined text-[15px]">savings</span>
            <span>{item.discountPercentage}% OFF</span>
          </div>
        )}

        {/* Urgency Pickup Window Overlay */}
        {item.statusType === 'urgent' ? (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fe932c] text-[#663500] font-['Inter'] font-semibold text-[12px] shadow-sm">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span>{item.statusBadge}</span>
          </div>
        ) : item.statusType === 'flexible' ? (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#151e15] font-['Inter'] font-medium text-[12px] shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-[#005b8c]">
              cloud_download
            </span>
            <span>{item.statusBadge}</span>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#904d00] font-['Inter'] font-semibold text-[12px] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#fe932c] animate-pulse"></span>
            <span>{item.statusBadge}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2.5">
        {/* Vendor Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.vendorAvatar ? (
              <div className="w-6 h-6 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#001d31] font-semibold text-[11px]">
                {item.vendorAvatar}
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#e1ebdd] flex items-center justify-center text-[#00652c]">
                <span className="material-symbols-outlined text-[16px]">
                  {getVendorIcon()}
                </span>
              </div>
            )}
            <span className="font-['Inter'] font-semibold text-[13px] text-[#151e15] truncate max-w-[200px]">
              {item.vendorName}
            </span>
          </div>

          <div className="flex items-center gap-0.5 text-[#3f493f] font-['Inter'] text-[12px]">
            <span className="material-symbols-outlined text-[15px]">distance</span>
            <span>{item.vendorDistance}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-[#151e15] leading-snug group-hover:text-[#00652c] transition-colors">
          {item.title}
        </h3>

        {/* Tags & Real-Time Stock Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            {item.urgencyWarning ? (
              <span className="px-2.5 py-0.5 rounded-md bg-[#ffb77d] text-[#2f1500] font-['Inter'] font-bold text-[11px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">warning</span>
                {item.urgencyWarning}
              </span>
            ) : item.isFree ? (
              <span className="px-2.5 py-0.5 rounded-md bg-[#cce5ff] text-[#001d31] font-['Inter'] font-semibold text-[11px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">volunteer_activism</span>
                Community Gift
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-md bg-[#ffdcc3] text-[#2f1500] font-['Inter'] font-semibold text-[11px]">
                {item.itemsLeft} bags left
              </span>
            )}

            {item.tags.filter(t => !t.includes('left') && !t.includes('Community Gift')).slice(0, 1).map((tag, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-0.5 rounded-md font-['Inter'] text-[11px] font-medium ${
                  tag.includes('Hero')
                    ? 'bg-[#e1ebdd] text-[#00652c] font-semibold'
                    : 'bg-[#e1ebdd] text-[#3f493f]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stock Level Progress */}
          {!item.isFree && (
            <div className="w-full h-1.5 rounded-full bg-[#e1ebdd] overflow-hidden mt-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.itemsLeft <= 1 ? 'bg-[#fe932c]' : 'bg-[#15803d]'
                }`}
                style={{ width: `${Math.max(10, item.stockPercentage)}%` }}
              />
            </div>
          )}
        </div>

        {/* Price Breakdown & Action Tray */}
        <div className="pt-2 mt-1 flex items-center justify-between border-t border-[#f2fcee]">
          {item.isFree ? (
            <div className="flex items-center gap-1 text-[#00652c]">
              <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-[20px]">
                $0.00
              </span>
              <span className="font-['Inter'] text-[11px] uppercase tracking-wide text-[#3f493f] font-semibold">
                (MUTUAL AID)
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[22px] text-[#00652c]">
                ${item.rescuePrice.toFixed(2)}
              </span>
              <span className="font-['Inter'] text-[14px] line-through text-[#6f7a6e]">
                ${item.originalPrice.toFixed(2)}
              </span>
            </div>
          )}

          {/* Action Button */}
          {item.isFree ? (
            <button
              onClick={handleReserveClick}
              disabled={isReserving || justReserved}
              type="button"
              className={`h-11 px-5 rounded-full font-['Inter'] font-semibold text-[14px] shadow-sm flex items-center gap-1.5 transition-all active:scale-95 ${
                justReserved
                  ? 'bg-[#e1ebdd] text-[#00652c]'
                  : 'bg-[#005b8c] text-white hover:bg-[#005b8c]/90'
              }`}
            >
              {isReserving ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    sync
                  </span>
                  <span>Claiming...</span>
                </>
              ) : justReserved ? (
                <>
                  <span className="material-symbols-outlined text-[18px] material-symbols-fill">
                    check_circle
                  </span>
                  <span>Requested!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    handshake
                  </span>
                  <span>Request Pickup</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleReserveClick}
              disabled={isReserving || justReserved}
              type="button"
              className={`h-11 px-6 rounded-full font-['Inter'] font-semibold text-[14px] shadow-sm flex items-center gap-1.5 transition-all active:scale-95 ${
                justReserved
                  ? 'bg-[#e1ebdd] text-[#00652c]'
                  : 'bg-[#00652c] text-white hover:bg-[#00652c]/90'
              }`}
            >
              {isReserving ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    sync
                  </span>
                  <span>Claiming...</span>
                </>
              ) : justReserved ? (
                <>
                  <span className="material-symbols-outlined text-[18px] material-symbols-fill">
                    check_circle
                  </span>
                  <span>Reserved!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    {item.vendorType === 'grocery' ? 'inventory_2' : 'shopping_bag'}
                  </span>
                  <span>{item.vendorType === 'grocery' ? 'Reserve Box' : 'Reserve Bag'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
