import React, { useState } from 'react';
import { RescueItem } from '../types';

interface ItemDetailModalProps {
  item: RescueItem | null;
  onClose: () => void;
  onReserve: (item: RescueItem, quantity: number) => void;
  isClaimed?: boolean;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onReserve,
  isClaimed = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isReserving, setIsReserving] = useState(false);
  const [justReserved, setJustReserved] = useState(isClaimed);

  if (!item) return null;

  const handleConfirmReservation = () => {
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      setJustReserved(true);
      onReserve(item, quantity);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-[480px] bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image with Badges & Close Button */}
        <div className="relative w-full aspect-[16/11] bg-[#e7f1e3]">
          <img
            src={item.imageUrl}
            alt={item.imageAlt}
            className="w-full h-full object-cover"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-all active:scale-95 z-10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Discount / Free Floating Badge */}
          {item.isFree ? (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00652c] text-white font-['Inter'] font-bold text-[13px] shadow-md">
              <span className="material-symbols-outlined text-[16px] material-symbols-fill">
                favorite
              </span>
              <span>FREE (Donation)</span>
            </div>
          ) : (
            <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-[#00652c] text-white font-['Inter'] font-bold text-[13px] shadow-md">
              <span className="material-symbols-outlined text-[15px]">savings</span>
              <span>{item.discountPercentage}% OFF</span>
            </div>
          )}

          {/* Pickup Window Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#151e15] font-['Inter'] font-semibold text-[12px] shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-[#904d00]">
                schedule
              </span>
              <span>{item.pickupWindow}</span>
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#00652c] font-['Inter'] font-semibold text-[12px] shadow-sm">
              <span className="material-symbols-outlined text-[16px]">distance</span>
              <span>{item.vendorDistance}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* Vendor Details */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e1ebdd]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#e1ebdd] flex items-center justify-center text-[#00652c] font-bold">
                {item.vendorAvatar ? (
                  <span className="text-[14px] text-[#001d31]">{item.vendorAvatar}</span>
                ) : (
                  <span className="material-symbols-outlined text-[20px]">
                    {item.vendorType === 'grocery' ? 'local_grocery_store' : 'bakery_dining'}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#151e15]">
                  {item.vendorName}
                </h4>
                <div className="flex items-center gap-1 text-[12px] text-[#6f7a6e]">
                  <span className="material-symbols-outlined text-[14px] text-amber-500 material-symbols-fill">
                    star
                  </span>
                  <span className="font-semibold text-[#151e15]">4.9</span>
                  <span>(120+ happy rescues)</span>
                </div>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#d3ffd5] text-[#00652c] font-['Inter'] font-bold text-[11px]">
              Verified Partner
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[22px] text-[#151e15] leading-tight">
              {item.title}
            </h2>
            <p className="mt-2 font-['Inter'] text-[14px] text-[#3f493f] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* What Could Be Inside Box */}
          <div className="p-3.5 rounded-2xl bg-[#ecf7e9] border border-[#dbe5d8] flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[#00652c] font-['Plus_Jakarta_Sans'] font-bold text-[13px]">
              <span className="material-symbols-outlined text-[17px]">auto_awesome</span>
              <span>Typical Mystery Contents</span>
            </div>
            <ul className="space-y-1.5 pl-1">
              {item.whatInside.map((inside, idx) => (
                <li key={idx} className="flex items-start gap-2 font-['Inter'] text-[13px] text-[#151e15]">
                  <span className="text-[#00652c] mt-0.5">•</span>
                  <span>{inside}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#e7f1e3]/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#15803d]/15 flex items-center justify-center text-[#00652c]">
                <span className="material-symbols-outlined text-[18px]">eco</span>
              </div>
              <div>
                <p className="text-[11px] text-[#6f7a6e] font-medium">CO2e Prevented</p>
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#00652c]">
                  ~{item.co2SavedKg} kg CO2e
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#e7f1e3]/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#fe932c]/20 flex items-center justify-center text-[#904d00]">
                <span className="material-symbols-outlined text-[18px]">savings</span>
              </div>
              <div>
                <p className="text-[11px] text-[#6f7a6e] font-medium">You Save</p>
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#904d00]">
                  ${(item.originalPrice - item.rescuePrice).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Location & Instructions */}
          <div className="flex flex-col gap-1.5 text-[13px] bg-[#f2fcee] p-3 rounded-xl border border-[#e1ebdd]">
            <div className="flex items-center gap-1.5 font-semibold text-[#151e15]">
              <span className="material-symbols-outlined text-[18px] text-[#00652c]">pin_drop</span>
              <span>Pickup Location</span>
            </div>
            <p className="text-[#3f493f] pl-6 font-['Inter']">{item.pickupAddress}</p>
          </div>

          {/* Quantity Selector (if more than 1 available) */}
          {!item.isFree && item.itemsLeft > 1 && !justReserved && (
            <div className="flex items-center justify-between pt-1">
              <span className="font-['Inter'] font-medium text-[14px] text-[#151e15]">
                Select Quantity
              </span>
              <div className="flex items-center gap-3 bg-[#e7f1e3] px-3 py-1.5 rounded-full">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center text-[#151e15] font-bold text-[18px]"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] min-w-[18px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(item.itemsLeft, quantity + 1))}
                  className="w-6 h-6 flex items-center justify-center text-[#151e15] font-bold text-[18px]"
                  disabled={quantity >= item.itemsLeft}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-3 border-t border-[#e1ebdd] flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#6f7a6e] font-semibold">
                Total Price
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] font-black text-[24px] text-[#00652c]">
                  ${(item.rescuePrice * quantity).toFixed(2)}
                </span>
                {!item.isFree && (
                  <span className="text-[14px] line-through text-[#6f7a6e]">
                    ${(item.originalPrice * quantity).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleConfirmReservation}
              disabled={isReserving || justReserved}
              className={`flex-1 h-12 rounded-full font-['Inter'] font-bold text-[15px] shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                justReserved
                  ? 'bg-[#e1ebdd] text-[#00652c]'
                  : item.isFree
                  ? 'bg-[#005b8c] text-white hover:bg-[#005b8c]/90'
                  : 'bg-[#00652c] text-white hover:bg-[#00652c]/90'
              }`}
            >
              {isReserving ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">
                    sync
                  </span>
                  <span>Confirming...</span>
                </>
              ) : justReserved ? (
                <>
                  <span className="material-symbols-outlined text-[20px] material-symbols-fill">
                    check_circle
                  </span>
                  <span>Added to My Pantry!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    {item.isFree ? 'handshake' : 'shopping_bag'}
                  </span>
                  <span>{item.isFree ? 'Request Free Pickup' : 'Reserve Surprise Bag'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
