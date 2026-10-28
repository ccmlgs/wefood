import React from 'react';
import { INITIAL_USER_PROFILE } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimedCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  claimedCount,
}) => {
  if (!isOpen) return null;

  const profile = INITIAL_USER_PROFILE;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-[420px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#e1ebdd]">
          <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#151e15]">
            My Rescuer Profile
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2fcee] flex items-center justify-center text-[#151e15]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3.5 bg-[#f2fcee] p-4 rounded-2xl border border-[#dbe5d8]">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00652c]"
          />
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#151e15]">
              {profile.name}
            </h4>
            <p className="text-[12px] text-[#00652c] font-semibold">{profile.level}</p>
            <p className="text-[11px] text-[#6f7a6e]">Member since {profile.memberSince}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-[#e7f1e3]">
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#00652c]">
              {profile.stats.mealsRescued + claimedCount}
            </div>
            <p className="text-[10px] text-[#6f7a6e] font-semibold">Rescues</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#ffdcc3]">
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#904d00]">
              ${(profile.stats.moneySaved + claimedCount * 10.5).toFixed(0)}
            </div>
            <p className="text-[10px] text-[#6f7a6e] font-semibold">Saved</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#cce5ff]">
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#005b8c]">
              {(profile.stats.co2SavedKg + claimedCount * 2.5).toFixed(0)} kg
            </div>
            <p className="text-[10px] text-[#6f7a6e] font-semibold">CO₂ Avoided</p>
          </div>
        </div>

        {/* Preferences & Settings */}
        <div className="flex flex-col gap-2 text-[13px]">
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-medium text-[#151e15]">Push Notifications for Fresh Drops</span>
            <span className="w-10 h-6 bg-[#00652c] rounded-full inline-flex items-center px-1">
              <span className="w-4 h-4 bg-white rounded-full ml-auto" />
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-medium text-[#151e15]">Preferred Rescue Radius</span>
            <span className="font-bold text-[#00652c]">3 km (Downtown)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-medium text-[#151e15]">Payment &amp; Digital Passes</span>
            <span className="material-symbols-outlined text-[18px] text-[#6f7a6e]">chevron_right</span>
          </div>
        </div>

        {/* Environmental Pledge */}
        <div className="p-3 bg-[#e7f1e3] rounded-2xl flex items-center gap-2 text-[11px] text-[#00652c]">
          <span className="material-symbols-outlined text-[20px]">verified</span>
          <span>Verified Zero-Waste Citizen • Committed to reducing municipal landfill waste.</span>
        </div>
      </div>
    </div>
  );
};
