import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { RescueFeed } from './components/RescueFeed';
import { ItemDetailModal } from './components/ItemDetailModal';
import { PantryScreen } from './components/PantryScreen';
import { DonateScreen } from './components/DonateScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { ImpactScreen } from './components/ImpactScreen';
import { FilterModal } from './components/FilterModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfileModal } from './components/ProfileModal';
import {
  INITIAL_RESCUE_ITEMS,
  INITIAL_COMMUNITY_FRIDGES,
  INITIAL_COMMUNITY_POSTS,
} from './data/mockData';
import { RescueItem, ClaimedRescue, FilterState, CommunityPost } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('rescue');
  const [items, setItems] = useState<RescueItem[]>(INITIAL_RESCUE_ITEMS);
  const [claimedRescues, setClaimedRescues] = useState<ClaimedRescue[]>([
    {
      id: 'claimed-initial',
      itemId: 'rescue-1',
      title: 'Artisan Pastry & Sourdough Surprise Bag',
      vendorName: 'Green Leaf Bakery',
      pickupWindow: 'Today 18:30 - 20:00',
      pickupAddress: '142 Market Street, Bakery Row',
      code: 'WF-8942',
      claimedAt: '15m ago',
      status: 'ready',
      rescuePrice: 4.50,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZvCUDEJZxn9UpFe8cqEeB4frlE1Q0zlBo9U5YYLeWIfcFnA93ksSQErD1MA-jWLounzweycfOeCcql5HLdRnWCOs6pWyP7AcQz8V4FImSddy3N_O3ROeW3-4Pd005-LEo0CmkZkoy4bVebIiOBc64lD5DrU0aONcyJCItUCnS-scz0vHH5yydwVx1paPn07ymVqXJYwG4AUbLG2nOsDSrvWKA6Csz83eUSyq4snFZBB_AndFpuJ6Pfw',
      instructions: 'Show voucher at counter or mention order #WF-8942.',
    },
  ]);
  const [communityFridges] = useState(INITIAL_COMMUNITY_FRIDGES);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  // Modals & Panels
  const [selectedItem, setSelectedItem] = useState<RescueItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    maxDistanceKm: 3,
    maxPrice: 20,
    freeOnly: false,
    dietaryTags: [],
    sortBy: 'distance',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleReserve = (item: RescueItem, quantity: number = 1) => {
    // Generate new claimed pass
    const newClaim: ClaimedRescue = {
      id: `claim-${Date.now()}`,
      itemId: item.id,
      title: item.title,
      vendorName: item.vendorName,
      pickupWindow: item.pickupWindow,
      pickupAddress: item.pickupAddress,
      code: `WF-${Math.floor(1000 + Math.random() * 9000)}`,
      claimedAt: 'Just now',
      status: 'ready',
      rescuePrice: item.rescuePrice * quantity,
      imageUrl: item.imageUrl,
      instructions: item.isFree
        ? 'Porch pickup: Look for labelled basket. Contactless collection.'
        : 'Show voucher to staff at register.',
    };

    setClaimedRescues((prev) => [newClaim, ...prev]);

    // Update item stock
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === item.id) {
          const newLeft = Math.max(0, i.itemsLeft - quantity);
          return {
            ...i,
            itemsLeft: newLeft,
            stockPercentage: Math.round((newLeft / i.totalAvailable) * 100),
            isReserved: newLeft === 0,
          };
        }
        return i;
      })
    );

    showToast(`🎉 Reserved "${item.title}"! Voucher added to Pantry.`);
  };

  const handleMarkPickedUp = (id: string) => {
    setClaimedRescues((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'picked_up' } : r))
    );
    showToast('✨ Marked as collected! Added to your Food Rescued stats.');
  };

  const handlePublishSurplus = (newItem: RescueItem) => {
    setItems((prev) => [newItem, ...prev]);
    setCurrentTab('rescue');
    showToast(`🌟 Your surplus listing "${newItem.title}" is now live!`);
  };

  const claimedIds = new Set(claimedRescues.map((r) => r.itemId));

  return (
    <div className="min-h-screen bg-[#f2fcee] text-[#151e15] font-['Inter'] selection:bg-[#95f8a7] selection:text-[#00210a]">
      <div className="app-viewport flex flex-col bg-[#f2fcee]">
        {/* Sticky Header */}
        <Header
          onOpenNotifications={() => {
            setIsNotificationsOpen(true);
            setUnreadNotifications(0);
          }}
          onOpenProfile={() => setIsProfileOpen(true)}
          unreadCount={unreadNotifications}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16">
          {currentTab === 'rescue' && (
            <RescueFeed
              items={items}
              onSelectItem={(item) => setSelectedItem(item)}
              onReserveItem={(item) => handleReserve(item, 1)}
              onOpenFilters={() => setIsFilterOpen(true)}
              filters={filters}
              onUpdateFilters={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
              claimedItemIds={claimedIds}
            />
          )}

          {currentTab === 'pantry' && (
            <PantryScreen
              claimedRescues={claimedRescues}
              onMarkPickedUp={handleMarkPickedUp}
              onExploreMore={() => setCurrentTab('rescue')}
            />
          )}

          {currentTab === 'donate' && (
            <DonateScreen
              onPublish={handlePublishSurplus}
              onCancel={() => setCurrentTab('rescue')}
            />
          )}

          {currentTab === 'community' && (
            <CommunityScreen
              fridges={communityFridges}
              posts={communityPosts}
              onAddPost={(post) => setCommunityPosts((prev) => [post, ...prev])}
            />
          )}

          {currentTab === 'impact' && (
            <ImpactScreen totalClaimedCount={claimedRescues.length} />
          )}
        </main>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-[90%] bg-[#151e15] text-[#f2fcee] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-[13px] font-medium border border-white/10 animate-fade-in">
            <span className="material-symbols-outlined text-[#79db8d] text-[18px]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
          pantryCount={claimedRescues.filter((r) => r.status === 'ready').length}
        />

        {/* Modals */}
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onReserve={(item, qty) => {
            handleReserve(item, qty);
            setSelectedItem(null);
          }}
          isClaimed={selectedItem ? claimedIds.has(selectedItem.id) : false}
        />

        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onApply={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
          onReset={() =>
            setFilters({
              searchQuery: '',
              category: 'all',
              maxDistanceKm: 3,
              maxPrice: 20,
              freeOnly: false,
              dietaryTags: [],
              sortBy: 'distance',
            })
          }
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onClear={() => setUnreadNotifications(0)}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          claimedCount={claimedRescues.length}
        />
      </div>
    </div>
  );
}
