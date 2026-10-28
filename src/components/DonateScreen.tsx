import React, { useState } from 'react';
import { RescueItem } from '../types';

interface DonateScreenProps {
  onPublish: (item: RescueItem) => void;
  onCancel: () => void;
}

const PHOTO_PRESETS = [
  {
    name: 'Artisan Bread & Croissants',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    type: 'bakery' as const,
  },
  {
    name: 'Organic Farm Veggies',
    url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    type: 'grocery' as const,
  },
  {
    name: 'Backyard Orchard Fruit',
    url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    type: 'community' as const,
  },
  {
    name: 'Prepared Healthy Bento Box',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    type: 'meal' as const,
  },
  {
    name: 'Specialty Pastry & Coffee',
    url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    type: 'cafe' as const,
  },
];

export const DonateScreen: React.FC<DonateScreenProps> = ({ onPublish, onCancel }) => {
  const [listingType, setListingType] = useState<'business' | 'neighbor'>('business');
  const [title, setTitle] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState<'bakeries' | 'groceries' | 'meals' | 'free' | 'cafes'>('bakeries');
  const [originalPrice, setOriginalPrice] = useState('15.00');
  const [rescuePrice, setRescuePrice] = useState('4.50');
  const [isFree, setIsFree] = useState(false);
  const [quantity, setQuantity] = useState('3');
  const [pickupWindow, setPickupWindow] = useState('Today 18:00 - 20:00');
  const [pickupAddress, setPickupAddress] = useState('Downtown Storefront, 120 Main St');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(PHOTO_PRESETS[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeChange = (type: 'business' | 'neighbor') => {
    setListingType(type);
    if (type === 'neighbor') {
      setIsFree(true);
      setRescuePrice('0.00');
      setOriginalPrice('0.00');
      setCategory('free');
      setSelectedImage(PHOTO_PRESETS[2].url);
      setVendorName('Neighbor Sarah M.');
      setPickupAddress('Porch Drop Box @ 214 Elm Street');
      setTitle('Garden Fresh Summer Veggies & Herbs');
      setDescription('Surplus from our backyard garden raised beds. Washed and packed in reusable paper bags.');
    } else {
      setIsFree(false);
      setRescuePrice('4.50');
      setOriginalPrice('15.00');
      setCategory('bakeries');
      setSelectedImage(PHOTO_PRESETS[0].url);
      setVendorName('The Daily Loaf Bakery');
      setPickupAddress('120 Main St (Counter)');
      setTitle('Evening Artisan Pastry & Loaf Bag');
      setDescription('Hand-picked surprise bag of our delicious daily baked sourdough and pastries.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !vendorName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orig = parseFloat(originalPrice) || 0;
      const resPrice = isFree ? 0 : parseFloat(rescuePrice) || 0;
      const discount = orig > 0 ? Math.round(((orig - resPrice) / orig) * 100) : 0;
      const count = parseInt(quantity, 10) || 2;

      const newItem: RescueItem = {
        id: `rescue-${Date.now()}`,
        title: title.trim(),
        vendorName: vendorName.trim(),
        vendorType: listingType === 'neighbor' ? 'community' : (category === 'groceries' ? 'grocery' : category === 'meals' ? 'meal' : category === 'cafes' ? 'cafe' : 'bakery'),
        vendorDistance: '0.5 km away',
        distanceKm: 0.5,
        imageUrl: selectedImage,
        imageAlt: title,
        originalPrice: orig,
        rescuePrice: resPrice,
        discountPercentage: discount > 0 ? discount : undefined,
        isFree: isFree || resPrice === 0,
        isMutualAid: isFree,
        statusBadge: pickupWindow,
        statusType: 'upcoming',
        pickupWindow,
        pickupAddress,
        coordinates: { x: 50 + (Math.random() * 20 - 10), y: 50 + (Math.random() * 20 - 10) },
        itemsLeft: count,
        totalAvailable: count,
        stockPercentage: 100,
        tags: [
          isFree ? 'Community Gift' : `${count} bags left`,
          listingType === 'neighbor' ? 'Contactless Porch Pickup' : 'Vegetarian',
        ],
        category: isFree ? 'free' : category,
        description: description || 'Freshly saved surplus food ready for neighborhood pickup.',
        whatInside: ['Surplus quality items packed with care', 'Eco-friendly compostable packaging'],
        dietary: isFree ? ['Backyard Grown', 'Zero Waste'] : ['Handcrafted', 'Food Rescue Hero'],
        co2SavedKg: 2.5,
      };

      onPublish(newItem);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-24 max-w-[480px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] text-[#151e15]">
            Share Surplus Food
          </h1>
          <p className="font-['Inter'] text-[13px] text-[#3f493f]">
            Prevent waste — sell surplus bags or share free mutual aid
          </p>
        </div>
        <button
          onClick={onCancel}
          className="w-9 h-9 rounded-full bg-[#e1ebdd] flex items-center justify-center text-[#151e15] hover:bg-[#dbe5d8]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Mode Switch: Business vs Neighbor */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[#e1ebdd] rounded-2xl mb-4">
        <button
          type="button"
          onClick={() => handleTypeChange('business')}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-['Inter'] font-semibold text-[13px] transition-all ${
            listingType === 'business'
              ? 'bg-white text-[#00652c] shadow-sm font-bold'
              : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          <span>Bakery / Market</span>
        </button>

        <button
          type="button"
          onClick={() => handleTypeChange('neighbor')}
          className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-['Inter'] font-semibold text-[13px] transition-all ${
            listingType === 'neighbor'
              ? 'bg-white text-[#005b8c] shadow-sm font-bold'
              : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
          <span>Neighbor Gift</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 bg-white p-4 rounded-3xl border border-[#e1ebdd] shadow-sm">
        {/* Title */}
        <div>
          <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
            Surplus Bag / Produce Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sourdough & Croissant Mystery Bag"
            className="w-full h-11 px-3.5 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#151e15] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00652c]"
          />
        </div>

        {/* Vendor / Giver Name */}
        <div>
          <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
            {listingType === 'business' ? 'Business / Shop Name *' : 'Your Name or Porch Handle *'}
          </label>
          <input
            type="text"
            required
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            placeholder={listingType === 'business' ? 'e.g. Blue Spruce Bakery' : 'e.g. Neighbor Marcus (4th St)'}
            className="w-full h-11 px-3.5 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#151e15] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00652c]"
          />
        </div>

        {/* Category & Quantity */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full h-11 px-3 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#151e15] text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#00652c]"
            >
              <option value="bakeries">🥖 Bakery</option>
              <option value="groceries">🥬 Groceries</option>
              <option value="meals">🍱 Cooked Meals</option>
              <option value="cafes">☕ Cafe / Sweets</option>
              <option value="free">❤️ Free Mutual Aid</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
              Quantity Bags
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#151e15] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#00652c]"
            />
          </div>
        </div>

        {/* Pricing */}
        {listingType === 'business' ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
                Original Price ($)
              </label>
              <input
                type="number"
                step="0.5"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#151e15] text-[14px] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
                Rescue Price ($)
              </label>
              <input
                type="number"
                step="0.5"
                value={rescuePrice}
                onChange={(e) => setRescuePrice(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#00652c] font-bold text-[14px] focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#cce5ff] rounded-xl flex items-center gap-2 text-[#001d31]">
            <span className="material-symbols-outlined text-[20px] text-[#005b8c]">volunteer_activism</span>
            <span className="text-[12px] font-semibold">
              This listing will be marked 100% Free Mutual Aid ($0.00). Thank you for sharing with neighbors!
            </span>
          </div>
        )}

        {/* Pickup Window */}
        <div>
          <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
            Pickup Window *
          </label>
          <input
            type="text"
            required
            value={pickupWindow}
            onChange={(e) => setPickupWindow(e.target.value)}
            placeholder="e.g. Today 18:30 - 20:00"
            className="w-full h-11 px-3.5 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#151e15] text-[14px] focus:outline-none"
          />
        </div>

        {/* Pickup Address */}
        <div>
          <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1">
            Pickup Address / Instructions *
          </label>
          <input
            type="text"
            required
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            placeholder="e.g. 142 Market St (Front Counter) or 235 Elm Lane (Porch Basket)"
            className="w-full h-11 px-3.5 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[#151e15] text-[14px] focus:outline-none"
          />
        </div>

        {/* Photo Selection */}
        <div>
          <label className="block text-[12px] font-bold text-[#151e15] uppercase tracking-wider mb-1.5">
            Select Cover Image
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {PHOTO_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(preset.url)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === preset.url
                    ? 'border-[#00652c] ring-2 ring-[#00652c]/30 scale-105'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full h-12 rounded-full bg-[#00652c] text-white font-['Inter'] font-bold text-[15px] shadow-md flex items-center justify-center gap-2 hover:bg-[#00652c]/90 active:scale-95 transition-all"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Publishing Rescue Bag...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>List on Marketplace Now</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
