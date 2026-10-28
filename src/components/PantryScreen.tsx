import React, { useState } from 'react';
import { ClaimedRescue } from '../types';

interface PantryScreenProps {
  claimedRescues: ClaimedRescue[];
  onMarkPickedUp: (id: string) => void;
  onExploreMore: () => void;
}

export const PantryScreen: React.FC<PantryScreenProps> = ({
  claimedRescues,
  onMarkPickedUp,
  onExploreMore,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'tips' | 'history'>('active');
  const [showQRModal, setShowQRModal] = useState<ClaimedRescue | null>(null);

  const activeRescues = claimedRescues.filter((r) => r.status !== 'picked_up');
  const pastRescues = claimedRescues.filter((r) => r.status === 'picked_up');

  const foodStorageTips = [
    {
      title: 'Artisan Sourdough Care',
      icon: 'bakery_dining',
      tip: 'Never store bread in the fridge! Keep on counter cut-side down on a wooden cutting board for 3 days, or slice and freeze in an airtight bag.',
    },
    {
      title: 'Tomatoes & Basil',
      icon: 'nutrition',
      tip: 'Store tomatoes at room temperature stem-down to preserve natural sugars. Store basil sprigs like flowers in a glass of water on the windowsill.',
    },
    {
      title: 'Leafy Greens & Herbs',
      icon: 'eco',
      tip: 'Wrap unwashed greens in a slightly damp paper towel and store in a ventilated reusable container. Keeps crispy for up to 10 days.',
    },
    {
      title: 'Berries & Soft Fruits',
      icon: 'energy_savings_leaf',
      tip: 'Rinse in a 3:1 water to white vinegar bath, dry completely, and store in a container with a dry cloth bottom to prevent mold.',
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-24 max-w-[480px] mx-auto">
      {/* Header Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] text-[#151e15]">
            My Pantry &amp; Passes
          </h1>
          <p className="font-['Inter'] text-[13px] text-[#3f493f]">
            Active pickup vouchers, food locker codes &amp; storage wisdom
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#d3ffd5] text-[#00652c] flex items-center justify-center font-bold font-['Plus_Jakarta_Sans']">
          {activeRescues.length}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#e1ebdd] p-1 rounded-xl mb-4 text-[13px] font-['Inter'] font-semibold">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'active'
              ? 'bg-white text-[#00652c] shadow-sm font-bold'
              : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          Active Passes ({activeRescues.length})
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'tips'
              ? 'bg-white text-[#00652c] shadow-sm font-bold'
              : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          Storage Wisdom
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'history'
              ? 'bg-white text-[#00652c] shadow-sm font-bold'
              : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          Past Rescues ({pastRescues.length})
        </button>
      </div>

      {/* Tab: Active Passes */}
      {activeTab === 'active' && (
        <div className="flex flex-col gap-4">
          {activeRescues.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#e1ebdd] flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#f2fcee] flex items-center justify-center text-[#00652c] mb-3">
                <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] text-[#151e15]">
                No active pickups right now
              </h3>
              <p className="text-[13px] text-[#3f493f] mt-1 max-w-[280px]">
                Browse the rescue marketplace to save fresh surplus bakeries, organics, and mutual aid items near you!
              </p>
              <button
                onClick={onExploreMore}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#00652c] text-white font-['Inter'] font-semibold text-[13px] shadow-sm hover:bg-[#00652c]/90 active:scale-95 transition-all"
              >
                Find Surplus Food
              </button>
            </div>
          ) : (
            activeRescues.map((rescue) => (
              <div
                key={rescue.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#e1ebdd] flex flex-col gap-3"
              >
                {/* Status bar */}
                <div className="flex items-center justify-between pb-2 border-b border-[#f2fcee]">
                  <div className="flex items-center gap-1.5 text-[#00652c] font-bold text-[12px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803d] animate-pulse" />
                    <span>READY FOR PICKUP</span>
                  </div>
                  <span className="font-['Inter'] font-bold text-[12px] text-[#904d00] bg-[#ffdcc3] px-2 py-0.5 rounded-md">
                    Pass {rescue.code}
                  </span>
                </div>

                {/* Main Info */}
                <div className="flex gap-3 items-center">
                  <img
                    src={rescue.imageUrl}
                    alt={rescue.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#151e15] leading-snug truncate">
                      {rescue.title}
                    </h3>
                    <p className="font-['Inter'] text-[12px] text-[#6f7a6e] mt-0.5 truncate">
                      {rescue.vendorName}
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-[#904d00] font-semibold mt-1">
                      <span className="material-symbols-outlined text-[15px]">timer</span>
                      <span>{rescue.pickupWindow}</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-[#f2fcee] p-2.5 rounded-xl text-[12px] text-[#151e15] flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#00652c] text-[16px] mt-0.5 shrink-0">
                    location_on
                  </span>
                  <div>
                    <span className="font-semibold block">{rescue.pickupAddress}</span>
                    <span className="text-[#6f7a6e]">{rescue.instructions}</span>
                  </div>
                </div>

                {/* QR and Mark Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setShowQRModal(rescue)}
                    className="flex-1 h-10 rounded-full bg-[#00652c] text-white font-['Inter'] font-semibold text-[13px] flex items-center justify-center gap-1.5 active:scale-95 shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                    <span>Show Pickup QR</span>
                  </button>

                  <button
                    onClick={() => onMarkPickedUp(rescue.id)}
                    className="h-10 px-4 rounded-full bg-[#e1ebdd] text-[#151e15] hover:bg-[#dbe5d8] font-['Inter'] font-semibold text-[13px] flex items-center justify-center gap-1 active:scale-95 transition-all"
                    title="Mark Picked Up"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#00652c]">
                      done_all
                    </span>
                    <span>Collected</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Storage Wisdom */}
      {activeTab === 'tips' && (
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-[#d3ffd5] rounded-xl text-[#00652c] text-[12px] font-['Inter'] font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            <span>Proper storage keeps rescued surplus fresh 2-3x longer!</span>
          </div>

          {foodStorageTips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-[#e1ebdd] shadow-sm flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#e7f1e3] text-[#00652c] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">{tip.icon}</span>
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#151e15]">
                  {tip.title}
                </h4>
                <p className="font-['Inter'] text-[13px] text-[#3f493f] mt-1 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Past Rescues */}
      {activeTab === 'history' && (
        <div className="flex flex-col gap-3">
          {pastRescues.length === 0 ? (
            <div className="p-6 text-center bg-white rounded-2xl border border-[#e1ebdd] text-[13px] text-[#6f7a6e]">
              No past rescues yet. Claim your first surprise bag today!
            </div>
          ) : (
            pastRescues.map((rescue) => (
              <div
                key={rescue.id}
                className="bg-white p-3.5 rounded-2xl border border-[#e1ebdd] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={rescue.imageUrl}
                    alt={rescue.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#151e15]">
                      {rescue.title}
                    </h4>
                    <p className="text-[12px] text-[#6f7a6e]">{rescue.vendorName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00652c] bg-[#d3ffd5] px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[13px]">check</span>
                    Rescued
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Digital QR Pickup Voucher Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[360px] bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center animate-slide-up relative">
            <button
              onClick={() => setShowQRModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f2fcee] text-[#151e15] flex items-center justify-center hover:bg-[#e1ebdd]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <span className="px-3 py-1 rounded-full bg-[#d3ffd5] text-[#00652c] font-bold text-[12px] uppercase tracking-wider mb-2">
              Digital Pickup Voucher
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#151e15]">
              {showQRModal.title}
            </h3>
            <p className="font-['Inter'] text-[13px] text-[#6f7a6e] mt-0.5">
              {showQRModal.vendorName}
            </p>

            {/* QR Code Container */}
            <div className="my-5 p-4 bg-white border-2 border-dashed border-[#00652c] rounded-2xl shadow-inner flex flex-col items-center">
              {/* Stylized high-res SVG QR representation */}
              <svg className="w-44 h-44" viewBox="0 0 160 160">
                <rect width="160" height="160" fill="#ffffff" />
                {/* QR corner finders */}
                <rect x="10" y="10" width="40" height="40" fill="#00652c" rx="4" />
                <rect x="18" y="18" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="24" y="24" width="12" height="12" fill="#00652c" rx="1" />

                <rect x="110" y="10" width="40" height="40" fill="#00652c" rx="4" />
                <rect x="118" y="18" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="124" y="24" width="12" height="12" fill="#00652c" rx="1" />

                <rect x="10" y="110" width="40" height="40" fill="#00652c" rx="4" />
                <rect x="18" y="118" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="24" y="124" width="12" height="12" fill="#00652c" rx="1" />

                {/* Simulated data blocks */}
                <g fill="#151e15">
                  <rect x="60" y="15" width="8" height="8" />
                  <rect x="75" y="20" width="12" height="6" />
                  <rect x="92" y="12" width="6" height="14" />
                  <rect x="62" y="32" width="10" height="8" />
                  <rect x="80" y="36" width="14" height="8" />
                  <rect x="18" y="60" width="14" height="8" />
                  <rect x="40" y="65" width="8" height="12" />
                  <rect x="60" y="55" width="10" height="10" />
                  <rect x="80" y="60" width="8" height="8" />
                  <rect x="100" y="62" width="12" height="10" />
                  <rect x="120" y="58" width="10" height="8" />
                  <rect x="140" y="68" width="8" height="12" />
                  <rect x="25" y="85" width="12" height="8" />
                  <rect x="45" y="90" width="10" height="10" />
                  <rect x="70" y="82" width="14" height="12" />
                  <rect x="95" y="88" width="10" height="8" />
                  <rect x="115" y="85" width="12" height="14" />
                  <rect x="135" y="92" width="14" height="8" />
                  <rect x="60" y="110" width="8" height="14" />
                  <rect x="75" y="120" width="12" height="8" />
                  <rect x="95" y="115" width="10" height="12" />
                  <rect x="115" y="125" width="14" height="8" />
                  <rect x="138" y="120" width="10" height="10" />
                  <rect x="65" y="138" width="18" height="8" />
                  <rect x="95" y="140" width="12" height="10" />
                  <rect x="120" y="142" width="8" height="8" />
                </g>
              </svg>

              <div className="font-mono font-bold text-[16px] text-[#00652c] mt-2 tracking-widest">
                {showQRModal.code}
              </div>
            </div>

            <p className="text-[12px] text-[#3f493f] leading-snug">
              Show this screen to the staff at <span className="font-semibold text-[#151e15]">{showQRModal.vendorName}</span> during pickup window.
            </p>

            <button
              onClick={() => {
                onMarkPickedUp(showQRModal.id);
                setShowQRModal(null);
              }}
              className="w-full mt-4 h-11 rounded-full bg-[#00652c] text-white font-['Inter'] font-semibold text-[14px] shadow-sm active:scale-95 transition-all"
            >
              Confirm Bag Collected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
