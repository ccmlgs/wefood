import React from 'react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f2fcee]/90 backdrop-blur-xl border-b border-[#e1ebdd]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-[480px] mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <img
            alt="WeFood Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGHK7aCmznkeBdnYtyUKt_6TnWoMuu-Zo1YQaWc-nWioaDhjKx5iF3oY1xxc20_508vOwTdx5AhcpSkkfbvQqqLiafb5Gkt6_EEqoMiIhGsC-DvdDHQzCk9WvTbQyTDAzsut_t3K_BqeA7W6QlGBuEPU-JV7bFivZVus1eP23eKCYwzrFEZvQkzdM-s6W2sk71HyA8XTrvAovMmayqac4EEPSLH6gJyotoNwTr-OfFdDo5oKf2JYlN-Q"
          />
          <div className="flex items-center gap-1">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] text-[#151e15] tracking-tight">
              WeFood
            </span>
            <span className="material-symbols-outlined text-[#00652c] text-[20px] material-symbols-fill">
              eco
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#3f493f] hover:bg-[#e7f1e3] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[23px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#00652c] rounded-full ring-2 ring-[#f2fcee]" />
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="View Profile"
            className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-all focus:outline-none"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00652c]/30 hover:ring-[#00652c]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc0nivYWZNUnrZwtMIDonhme0CeHR6Id5196M85yVH3AdAGWTBStkkvXuX8lu5i2OzbBqXh9gglayBiMjQrho_V94L8_Hwew--cQfOyW8idgWYbO2UUH6lXgu-kFXF-CjdMSmRdqPGV0A96YsNCVQ0g86cBMh5YFFubeFYbeGRIF9_JjIY7iBkeUHdHHcfFVQNYx0Tpp5CVeMK-uRR8qaJCZLq8QYrvokVzNXrvrJAfJproPSzapdxkw"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
