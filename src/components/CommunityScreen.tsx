import React, { useState } from 'react';
import { CommunityFridge, CommunityPost } from '../types';

interface CommunityScreenProps {
  fridges: CommunityFridge[];
  posts: CommunityPost[];
  onAddPost: (post: CommunityPost) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  fridges,
  posts,
  onAddPost,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'fridges'>('feed');
  const [postList, setPostList] = useState<CommunityPost[]>(posts);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<'recipe' | 'gift' | 'request'>('recipe');

  const toggleLike = (postId: string) => {
    setPostList((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likes: hasLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      author: 'Alex Rivera (You)',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc0nivYWZNUnrZwtMIDonhme0CeHR6Id5196M85yVH3AdAGWTBStkkvXuX8lu5i2OzbBqXh9gglayBiMjQrho_V94L8_Hwew--cQfOyW8idgWYbO2UUH6lXgu-kFXF-CjdMSmRdqPGV0A96YsNCVQ0g86cBMh5YFFubeFYbeGRIF9_JjIY7iBkeUHdHHcfFVQNYx0Tpp5CVeMK-uRR8qaJCZLq8QYrvokVzNXrvrJAfJproPSzapdxkw',
      authorRole: 'Community Rescuer',
      distance: 'Just now',
      timeAgo: 'Just now',
      title: newTitle.trim(),
      content: newContent.trim(),
      type: newType,
      likes: 1,
      commentsCount: 0,
      hasLiked: true,
      badge: newType === 'recipe' ? 'Recipe Tip' : newType === 'gift' ? 'Mutual Aid' : 'Neighbor Request',
    };

    setPostList([post, ...postList]);
    onAddPost(post);
    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-24 max-w-[480px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] text-[#151e15]">
            Community Hub
          </h1>
          <p className="font-['Inter'] text-[13px] text-[#3f493f]">
            Solidarity fridges, mutual aid exchanges &amp; zero-waste recipes
          </p>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="w-10 h-10 rounded-full bg-[#00652c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
          title="Share with neighbors"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#e1ebdd] p-1 rounded-xl mb-4 text-[13px] font-['Inter'] font-semibold">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'feed'
              ? 'bg-white text-[#00652c] shadow-sm font-bold'
              : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          Neighborhood Feed ({postList.length})
        </button>
        <button
          onClick={() => setActiveTab('fridges')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'fridges'
              ? 'bg-white text-[#00652c] shadow-sm font-bold'
              : 'text-[#3f493f] hover:text-[#151e15]'
          }`}
        >
          Community Fridges ({fridges.length})
        </button>
      </div>

      {/* Tab: Feed */}
      {activeTab === 'feed' && (
        <div className="flex flex-col gap-3.5">
          {postList.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl p-4 border border-[#e1ebdd] shadow-sm flex flex-col gap-2.5 transition-all hover:shadow-md"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#00652c]/20"
                  />
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#151e15]">
                      {post.author}
                    </h4>
                    <p className="text-[11px] text-[#6f7a6e]">
                      {post.authorRole} • {post.timeAgo}
                    </p>
                  </div>
                </div>

                {post.badge && (
                  <span className="px-2 py-0.5 rounded-md bg-[#e7f1e3] text-[#00652c] font-['Inter'] font-semibold text-[11px]">
                    {post.badge}
                  </span>
                )}
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#151e15] leading-snug">
                  {post.title}
                </h3>
                <p className="font-['Inter'] text-[13px] text-[#3f493f] mt-1 leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Attached Image if any */}
              {post.image && (
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mt-1">
                  <img src={post.image} alt="post" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Actions: Likes & Comments */}
              <div className="pt-2 border-t border-[#f2fcee] flex items-center justify-between text-[12px] text-[#6f7a6e]">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all active:scale-95 ${
                    post.hasLiked
                      ? 'bg-[#d3ffd5] text-[#00652c] font-bold'
                      : 'hover:bg-[#f2fcee] text-[#3f493f]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      post.hasLiked ? 'material-symbols-fill text-[#00652c]' : ''
                    }`}
                  >
                    favorite
                  </span>
                  <span>{post.likes}</span>
                </button>

                <div className="flex items-center gap-1 text-[#6f7a6e]">
                  <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                  <span>{post.commentsCount} comments</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Tab: Fridges */}
      {activeTab === 'fridges' && (
        <div className="flex flex-col gap-3.5">
          <div className="p-3 bg-[#e7f1e3] rounded-xl text-[#00652c] text-[12px] font-['Inter'] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">kitchen</span>
            <span>24/7 Free Community Refrigerators: Take what you need, leave what you can!</span>
          </div>

          {fridges.map((fridge) => (
            <div
              key={fridge.id}
              className="bg-white rounded-2xl p-4 border border-[#e1ebdd] shadow-sm flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#151e15]">
                    {fridge.name}
                  </h3>
                  <p className="text-[12px] text-[#6f7a6e] mt-0.5">{fridge.address}</p>
                </div>
                <span className="font-['Inter'] text-[12px] text-[#00652c] font-semibold bg-[#d3ffd5] px-2.5 py-1 rounded-full">
                  {fridge.distance}
                </span>
              </div>

              {/* Fullness Bar */}
              <div>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <span className="text-[#3f493f] font-medium">{fridge.statusText}</span>
                  <span className="font-bold text-[#00652c]">{fridge.fullnessPercent}% full</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e1ebdd] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#00652c]"
                    style={{ width: `${fridge.fullnessPercent}%` }}
                  />
                </div>
              </div>

              {/* Needed Items */}
              <div className="bg-[#f2fcee] p-2.5 rounded-xl">
                <span className="text-[11px] font-bold text-[#6f7a6e] uppercase tracking-wider block mb-1">
                  Most Needed Items:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {fridge.neededItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-[#dbe5d8] text-[11px] text-[#151e15] font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#6f7a6e]">
                <span>Last updated: {fridge.lastStocked}</span>
                <button
                  onClick={() => alert(`Directions to ${fridge.address} opened!`)}
                  className="px-3 py-1 rounded-full bg-[#e1ebdd] text-[#00652c] font-semibold hover:bg-[#dbe5d8]"
                >
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[400px] bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-3 relative animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#151e15]">
                Share With Neighbors
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2fcee] flex items-center justify-center text-[#151e15]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#6f7a6e] uppercase tracking-wider mb-1">
                  Post Type
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setNewType('recipe')}
                    className={`py-1.5 text-[12px] font-semibold rounded-lg ${
                      newType === 'recipe' ? 'bg-[#00652c] text-white' : 'bg-[#e1ebdd] text-[#151e15]'
                    }`}
                  >
                    🍞 Recipe Tip
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('gift')}
                    className={`py-1.5 text-[12px] font-semibold rounded-lg ${
                      newType === 'gift' ? 'bg-[#00652c] text-white' : 'bg-[#e1ebdd] text-[#151e15]'
                    }`}
                  >
                    🌱 Mutual Aid
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('request')}
                    className={`py-1.5 text-[12px] font-semibold rounded-lg ${
                      newType === 'request' ? 'bg-[#00652c] text-white' : 'bg-[#e1ebdd] text-[#151e15]'
                    }`}
                  >
                    ❓ Request
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#6f7a6e] uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourdough breadcrumb hack!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[13px] text-[#151e15] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#6f7a6e] uppercase tracking-wider mb-1">
                  Story or Instructions
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details, recipes, or porch location..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f2fcee] border border-[#dbe5d8] text-[13px] text-[#151e15] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-full bg-[#00652c] text-white font-['Inter'] font-bold text-[14px] shadow-sm hover:bg-[#00652c]/90 active:scale-95 transition-all mt-1"
              >
                Publish to Community
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
