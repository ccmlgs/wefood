export interface RescueItem {
  id: string;
  title: string;
  vendorName: string;
  vendorType: 'bakery' | 'grocery' | 'meal' | 'community' | 'cafe';
  vendorAvatar?: string;
  vendorDistance: string; // e.g. "0.6 km away"
  distanceKm: number;
  imageUrl: string;
  imageAlt: string;
  discountPercentage?: number;
  originalPrice: number;
  rescuePrice: number;
  isFree?: boolean;
  isMutualAid?: boolean;
  statusBadge: string; // e.g. "Starts in 2h (Today 18:30 - 20:00)"
  statusType: 'upcoming' | 'urgent' | 'flexible' | 'now';
  pickupWindow: string; // "18:30 - 20:00"
  pickupAddress: string;
  coordinates: { x: number; y: number }; // percentage on map (0-100)
  itemsLeft: number;
  totalAvailable: number;
  stockPercentage: number;
  tags: string[];
  urgencyWarning?: string; // e.g. "Only 1 box left!"
  category: 'bakeries' | 'groceries' | 'meals' | 'free' | 'cafes';
  description: string;
  whatInside: string[];
  dietary: string[];
  co2SavedKg: number;
  isReserved?: boolean;
  donorName?: string;
}

export interface ClaimedRescue {
  id: string;
  itemId: string;
  title: string;
  vendorName: string;
  pickupWindow: string;
  pickupAddress: string;
  code: string;
  qrCodeUrl?: string;
  claimedAt: string;
  status: 'ready' | 'picked_up' | 'upcoming';
  rescuePrice: number;
  imageUrl: string;
  instructions: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  authorRole: string;
  distance: string;
  timeAgo: string;
  title: string;
  content: string;
  type: 'gift' | 'fridge_update' | 'recipe' | 'request';
  likes: number;
  commentsCount: number;
  hasLiked?: boolean;
  badge?: string;
  image?: string;
}

export interface CommunityFridge {
  id: string;
  name: string;
  address: string;
  distance: string;
  fullnessPercent: number;
  statusText: string;
  lastStocked: string;
  neededItems: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  maxDistanceKm: number;
  maxPrice: number;
  freeOnly: boolean;
  dietaryTags: string[];
  sortBy: 'distance' | 'price_low' | 'discount' | 'urgent';
}
