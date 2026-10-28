import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'New Surprise Bag nearby!',
    body: 'Green Leaf Bakery added 3 Artisan Sourdough bags for $4.50 (70% off).',
    time: '10m ago',
    icon: 'bakery_dining',
    type: 'drop',
    read: false,
  },
  {
    id: 'n2',
    title: 'Mutual Aid Tomato Harvest',
    body: 'Neighbor Sarah M. posted 1.5kg free homegrown Roma tomatoes 0.4km away.',
    time: '25m ago',
    icon: 'volunteer_activism',
    type: 'community',
    read: false,
  },
  {
    id: 'n3',
    title: 'Solidarity Fridge Restock',
    body: '7th St Community Fridge was restocked with 12 organic soup kits.',
    time: '1h ago',
    icon: 'kitchen',
    type: 'fridge',
    read: true,
  },
  {
    id: 'n4',
    title: 'Pickup Window Reminder',
    body: 'Your reserved bag at Harvest Organic Market is ready today from 17:00 - 19:30.',
    time: '2h ago',
    icon: 'schedule',
    type: 'reminder',
    read: true,
  },
];

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-[420px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-3 animate-slide-up max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#e1ebdd]">
          <div className="flex items-center gap-2">
            <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#151e15]">
              Notifications
            </h3>
            <span className="w-2 h-2 rounded-full bg-[#00652c]" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="text-[12px] text-[#00652c] font-semibold hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f2fcee] flex items-center justify-center text-[#151e15]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border flex items-start gap-3 transition-colors ${
                !n.read ? 'bg-[#f2fcee] border-[#dbe5d8]' : 'bg-white border-gray-100 opacity-80'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-[#e1ebdd] text-[#00652c] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#151e15] truncate">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-[#6f7a6e]">{n.time}</span>
                </div>
                <p className="font-['Inter'] text-[12px] text-[#3f493f] mt-0.5 leading-snug">
                  {n.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
