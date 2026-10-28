import React from 'react';
import { INITIAL_USER_PROFILE } from '../data/mockData';

interface ImpactScreenProps {
  totalClaimedCount: number;
}

export const ImpactScreen: React.FC<ImpactScreenProps> = ({ totalClaimedCount }) => {
  const profile = INITIAL_USER_PROFILE;
  const currentMeals = profile.stats.mealsRescued + totalClaimedCount;
  const currentCO2 = (profile.stats.co2SavedKg + totalClaimedCount * 2.5).toFixed(1);
  const currentMoney = (profile.stats.moneySaved + totalClaimedCount * 10.5).toFixed(2);
  const currentWater = (profile.stats.waterSavedLiters + totalClaimedCount * 600).toLocaleString();

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-24 max-w-[480px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] text-[#151e15]">
            My Climate Impact
          </h1>
          <p className="font-['Inter'] text-[13px] text-[#3f493f]">
            Tracking your food rescue journey and UN SDG 12 milestones
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#d3ffd5] text-[#00652c] flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">eco</span>
        </div>
      </div>

      {/* Main Highlights Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Meals Rescued */}
        <div className="bg-white p-4 rounded-2xl border border-[#e1ebdd] shadow-sm flex flex-col justify-between">
          <div className="w-9 h-9 rounded-full bg-[#d3ffd5] text-[#00652c] flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans'] font-extrabold text-[26px] text-[#00652c] leading-none">
              {currentMeals}
            </div>
            <p className="text-[12px] font-semibold text-[#151e15] mt-1">Meals Rescued</p>
            <p className="text-[11px] text-[#6f7a6e]">from landfill disposal</p>
          </div>
        </div>

        {/* CO2e Avoided */}
        <div className="bg-white p-4 rounded-2xl border border-[#e1ebdd] shadow-sm flex flex-col justify-between">
          <div className="w-9 h-9 rounded-full bg-[#e7f1e3] text-[#00652c] flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-[20px]">cloud_off</span>
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans'] font-extrabold text-[26px] text-[#00652c] leading-none">
              {currentCO2} <span className="text-[14px]">kg</span>
            </div>
            <p className="text-[12px] font-semibold text-[#151e15] mt-1">CO₂e Avoided</p>
            <p className="text-[11px] text-[#6f7a6e]">~240 km car driving</p>
          </div>
        </div>

        {/* Money Saved */}
        <div className="bg-white p-4 rounded-2xl border border-[#e1ebdd] shadow-sm flex flex-col justify-between">
          <div className="w-9 h-9 rounded-full bg-[#ffdcc3] text-[#904d00] flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-[20px]">savings</span>
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] text-[#904d00] leading-none">
              ${currentMoney}
            </div>
            <p className="text-[12px] font-semibold text-[#151e15] mt-1">Money Saved</p>
            <p className="text-[11px] text-[#6f7a6e]">avg 68% off retail</p>
          </div>
        </div>

        {/* Water Conserved */}
        <div className="bg-white p-4 rounded-2xl border border-[#e1ebdd] shadow-sm flex flex-col justify-between">
          <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#005b8c] flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-[20px]">water_drop</span>
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] text-[#005b8c] leading-none">
              {currentWater} <span className="text-[14px]">L</span>
            </div>
            <p className="text-[12px] font-semibold text-[#151e15] mt-1">Water Saved</p>
            <p className="text-[11px] text-[#6f7a6e]">agricultural lifecycle</p>
          </div>
        </div>
      </div>

      {/* UN SDG 12 Hero Card */}
      <div className="bg-gradient-to-br from-[#00652c] to-[#15803d] text-white p-4 rounded-3xl shadow-md mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Global Goal 12
            </span>
            <span className="text-[12px] text-[#d3ffd5] font-medium">Responsible Consumption</span>
          </div>
          <span className="font-bold text-[14px]">Level 5</span>
        </div>

        <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[17px] leading-snug">
          You are in the top 5% of neighborhood climate champions!
        </h3>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[11px] text-[#d3ffd5] mb-1 font-semibold">
            <span>Progress to SDG Ambassador</span>
            <span>28 / 35 rescues</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/20 overflow-hidden">
            <div className="h-full rounded-full bg-[#95f8a7]" style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white p-4 rounded-3xl border border-[#e1ebdd] shadow-sm flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#151e15]">
            Eco Badges &amp; Trophies
          </h3>
          <span className="text-[12px] text-[#00652c] font-semibold">4 / 5 Unlocked</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {profile.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all ${
                badge.earned
                  ? 'bg-[#f2fcee] border-[#dbe5d8]'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  badge.earned
                    ? 'bg-[#00652c] text-white shadow-sm'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{badge.icon}</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] text-[#151e15] truncate">
                  {badge.name}
                </h4>
                <p className="text-[10px] text-[#6f7a6e] line-clamp-1">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Summary */}
      <div className="bg-white p-4 rounded-3xl border border-[#e1ebdd] shadow-sm flex flex-col gap-2.5">
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#151e15]">
          Weekly Rescue Consistency
        </h3>
        <p className="text-[12px] text-[#6f7a6e]">
          You have maintained an active rescue streak for 4 consecutive weeks.
        </p>
        <div className="grid grid-cols-7 gap-1.5 pt-1 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
            const isCompleted = [0, 2, 3, 5].includes(idx);
            const isToday = idx === 3;
            return (
              <div key={day} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#6f7a6e] font-semibold">{day}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    isCompleted
                      ? 'bg-[#00652c] text-white shadow-sm'
                      : isToday
                      ? 'border-2 border-[#00652c] text-[#00652c]'
                      : 'bg-[#e7f1e3] text-[#6f7a6e]'
                  }`}
                >
                  {isCompleted ? '✓' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
