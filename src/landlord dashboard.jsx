import { useState, useEffect } from 'react';

export default function LandlordDashboard() {
  const [userName, setUserName] = useState('...');
  const [userAvatar, setUserAvatar] = useState('');
  const [verifiedDate, setVerifiedDate] = useState('Loading...');
  const [notificationCount, setNotificationCount] = useState(0);
  const [earningsAmount, setEarningsAmount] = useState('₦0.00');
  const [earningsGrowth, setEarningsGrowth] = useState('0%');
  const [earningsPeriod, setEarningsPeriod] = useState('this month');
  const [periodLabel, setPeriodLabel] = useState('This Month');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stats, setStats] = useState({ activeListings: '-', newInquiries: '-', profileViews: '-', totalEarnings: '₦-' });
  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const API_BASE = 'https://api.safenest.com/v1';
  const AUTH_TOKEN = typeof window!== 'undefined'? localStorage.getItem('safenest_token') || '' : '';

  const apiFetch = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;
    const config = {
     ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
       ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        if (response.status === 401) showError('Session expired. Please log in again.');
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      showError('Failed to load data. Please try again.');
      throw error;
    }
  };

  const showError = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const loadUserProfile = async () => {
    try {
      const data = await apiFetch('/landlord/profile');
      setUserName(data.firstName);
      setUserAvatar(data.avatarUrl);
      setVerifiedDate(`Verified ${new Date(data.verifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`);
      setNotificationCount(data.unreadNotifications);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const loadStats = async () => {
    try {
      const data = await apiFetch('/landlord/dashboard/stats');
      setStats({
        activeListings: data.activeListings,
        newInquiries: data.newInquiries,
        profileViews: data.profileViews,
        totalEarnings: formatNaira(data.totalEarnings)
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadEarnings = async (period = 'month') => {
    try {
      const data = await apiFetch(`/landlord/earnings?period=${period}`);
      setEarningsAmount(formatNaira(data.amount));
      setEarningsGrowth(`${data.growth >= 0? '+' : ''}${data.growth}%`);
      setEarningsPeriod(period === 'today'? 'today' : period === 'week'? 'this week' : period === 'year'? 'this year' : 'this month');
    } catch (error) {
      console.error('Failed to load earnings:', error);
    }
  };

  const loadListings = async () => {
    try {
      const data = await apiFetch('/landlord/listings?status=active&limit=10');
      setListings(data.listings);
    } catch (error) {
      console.error('Failed to load listings:', error);
    } finally {
      setLoadingListings(false);
    }
  };

  const loadInquiries = async () => {
    try {
      const data = await apiFetch('/landlord/inquiries?limit=5&unread=true');
      setInquiries(data.inquiries);
    } catch (error) {
      console.error('Failed to load inquiries:', error);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const openInquiry = async (inquiryId) => {
    try {
      await apiFetch(`/landlord/inquiries/${inquiryId}/mark-read`, { method: 'POST' });
      window.location.href = `/messages?inquiry=${inquiryId}`;
    } catch (error) {
      showError('Failed to open inquiry');
    }
  };

  const handlePeriodChange = (period, label) => {
    setPeriodLabel(label);
    setDropdownOpen(false);
    loadEarnings(period);
  };

  const handleQuickAction = (action) => {
    const routes = {
      create: '/listings/new',
      listings: '/listings',
      messages: '/messages',
      availability: '/calendar',
      earnings: '/earnings'
    };
    window.location.href = routes[action];
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    const routes = {
      home: '/',
      listings: '/listings',
      messages: '/messages',
      profile: '/profile'
    };
    window.location.href = routes[tab];
  };

  useEffect(() => {
    loadUserProfile();
    loadStats();
    loadEarnings('month');
    loadListings();
    loadInquiries();
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', system-ui, sans-serif; }
       .scrollbar-hide::-webkit-scrollbar { display: none; }
       .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
       .skeleton { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity:.5; } }
      `}</style>

      <div className="bg-[#F5F7FA] min-h-screen">
        {/* Header */}
        <div className="bg-white px-4 py-4 sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button className="flex items-center">
              <img
                src="https://res.cloudinary.com/dlldm26g7/image/upload/v1781099163/remove-the-text-design-system-from-this-safenest-l_y09xdo.jpg"
                alt="SafeNest"
                className="h-8 w-auto"
              />
            </button>
            <div className="flex items-center gap-4">
              <button className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0.538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              <img src={userAvatar || ''} alt="User" className="w-9 h-9 rounded-full object-cover bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Hello {userName}</h1>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#B4FFCF] rounded-2xl p-5">
              <svg className="w-8 h-8 mb-3 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 className="text-lg font-bold mb-1 text-[#0F172A]">Verified Landlord</h3>
              <p className="text-sm text-[#0F172A]/80">{verifiedDate}</p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="relative h-48">
                <img
                  src="https://res.cloudinary.com/dlldm26g7/image/upload/v1781096750/ChatGPT_Image_Jun_10_2026_02_05_00_PM_f33tqg.png"
                  alt="Nationwide Listings"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-1">Nationwide Listings</h3>
                  <p className="text-sm text-white/90 mb-3">Discover properties across Nigeria with SafeNest</p>
                  <button onClick={() => window.location.href = '/about'} className="bg-[#2563EB] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#1E40AF] transition">
                    Read About Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings Card */}
          <div className="bg-[#2563EB] rounded-2xl p-6 text-white mb-6">
            <div className="relative inline-block mb-4">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 text-sm font-medium bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition">
                <span>{periodLabel}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg py-2 w-40 z-10">
                  <button onClick={() => handlePeriodChange('today', 'Today')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Today</button>
                  <button onClick={() => handlePeriodChange('week', 'This Week')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">This Week</button>
                  <button onClick={() => handlePeriodChange('month', 'This Month')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">This Month</button>
                  <button onClick={() => handlePeriodChange('year', 'This Year')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">This Year</button>
                </div>
              )}
            </div>
            <p className="text-4xl font-bold tracking-tight mb-2">{earningsAmount}</p>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-xs font-semibold px-2.5 py-1 rounded-full">{earningsGrowth}</span>
              <p className="text-sm text-white/90">Total Earnings {earningsPeriod}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="w-10 h-10 bg-[#16A34A]/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h4 className="text-sm text-gray-500 mb-1">Active Listings</h4>
                <p className="text-3xl font-bold text-[#0F172A]">{stats.activeListings}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="w-10 h-10 bg-[#1E40AF]/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#1E40AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <h4 className="text-sm text-gray-500 mb-1">New Inquiries</h4>
                <p className="text-3xl font-bold text-[#0F172A]">{stats.newInquiries}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="w-10 h-10 bg-[#14B8A6]/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#14B8A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h4 className="text-sm text-gray-500 mb-1">Profile Views</h4>
                <p className="text-3xl font-bold text-[#0F172A]">{stats.profileViews}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <h4 className="text-sm text-gray-500 mb-1">Total Earnings</h4>
                <p className="text-3xl font-bold text-[#0F172A]">{stats.totalEarnings}</p>
              </div>
            </div>
          </div>

          {/* My Listings */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">My Listings</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {loadingListings? (
                <>
                  <div className="min-w-[300px] bg-white rounded-2xl h-72 skeleton"></div>
                  <div className="min-w-[300px] bg-white rounded-2xl h-72 skeleton"></div>
                </>
              ) : listings.length === 0? (
                <p className="text-gray-500 text-center py-8 w-full">No active listings yet. Create your first listing!</p>
              ) : (
                listings.map(listing => (
                  <div key={listing.id} className="min-w-[300px] bg-white rounded-2xl overflow-hidden border border-gray-200">
                    <div className="relative h-44">
                      <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-[#2563EB] text-white text-xs font-semibold px-3 py-1 rounded-full">{listing.status}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold text-[#0F172A] mb-2">{listing.title}</h3>
                      <p className="text-xl font-bold text-[#0F172A] mb-3">
                        {formatNaira(listing.price)} <span className="text-sm font-medium text-gray-500">/ year</span>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6 6.5 3.5a1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
                          </svg>
                          <span>{listing.baths} Bath</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 4v16"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 8h18a2 2 0 0 1 2 2v10H2V8Z"/>
                          </svg>
                          <span>{listing.beds} Beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0.6.4 1h2"/>
                          </svg>
                          <span>Parking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              <button onClick={() => handleQuickAction('create')} className="bg-[#1E40AF] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 h-24 hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span className="text-xs font-semibold text-white text-center leading-tight">Create Listing</span>
              </button>

              <button onClick={() => handleQuickAction('listings')} className="bg-[#14B8A6] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 h-24 hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
                <span className="text-xs font-semibold text-white text-center leading-tight">My Listings</span>
              </button>

              <button onClick={() => handleQuickAction('messages')} className="bg-[#F59E0B] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 h-24 hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span className="text-xs font-semibold text-white text-center leading-tight">Messages</span>
              </button>

              <button onClick={() => handleQuickAction('availability')} className="bg-[#3B82F6] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 h-24 hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span className="text-xs font-semibold text-white text-center leading-tight">Manage Availability</span>
              </button>

              <button onClick={() => handleQuickAction('earnings')} className="bg-[#6CC24A] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 h-24 hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                <span className="text-xs font-semibold text-white text-center leading-tight">Earnings</span>
              </button>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Recent Inquiries</h2>
            <div className="space-y-3">
              {loadingInquiries? (
                <>
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 skeleton h-24"></div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 skeleton h-24"></div>
                </>
              ) : inquiries.length === 0? (
                <p className="text-gray-500 text-center py-8">No new inquiries</p>
              ) : (
                inquiries.map(inquiry => (
                  <div key={inquiry.id} onClick={() => openInquiry(inquiry.id)} className="bg-white rounded-2xl p-4 border border-gray-200 cursor-pointer hover:shadow-md transition">
                    <div className="flex items-start gap-3">
                      <img src={inquiry.tenantAvatar} alt={inquiry.tenantName} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#0F172A]">{inquiry.tenantName}</h4>
                        <p className="text-xs text-gray-500 mb-1">{inquiry.propertyTitle} • {inquiry.location}</p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{inquiry.message}</p>
                        <div className="flex items-center gap-2">
                          {inquiry.unreadCount > 0 && (
                            <span className="bg-[#2563EB] text-white text-xs font-semibold px-2 py-0.5 rounded-full">{inquiry.unreadCount} new</span>
                          )}
                          <span className="text-xs text-gray-400">{timeAgo(inquiry.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Floating Bottom Navigation */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md md:hidden">
          <div className="bg-white rounded-[24px] shadow-lg border border-gray-200 px-2 py-2">
            <div className="flex items-center justify-around">
              <button onClick={() => handleNavClick('home')} className={`flex flex-col items-center justify-center gap-1 py-2 px-4 ${activeTab === 'home'? 'text-[#2563EB]' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill={activeTab === 'home'? 'currentColor' : 'none'} stroke={activeTab === 'home'? 'none' : 'currentColor'} strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 0 0 1 3 19.5v-9z"/>
                </svg>
                <span className={`text-xs ${activeTab === 'home'? 'font-semibold' : 'font-medium'}`}>Home</span>
              </button>

              <button onClick={() => handleNavClick('listings')} className={`flex flex-col items-center justify-center gap-1 py-2 px-4 ${activeTab === 'listings'? 'text-[#2563EB]' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <path d="M8 8h8M8 12h8M8 16h5"/>
                </svg>
                <span className={`text-xs ${activeTab === 'listings'? 'font-semibold' : 'font-medium'}`}>Listings</span>
              </button>

              <button onClick={() => handleNavClick('messages')} className={`flex flex-col items-center justify-center gap-1 py-2 px-4 ${activeTab === 'messages'? 'text-[#2563EB]' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className={`text-xs ${activeTab === 'messages'? 'font-semibold' : 'font-medium'}`}>Messages</span>
              </button>

              <button onClick={() => handleNavClick('profile')} className={`flex flex-col items-center justify-center gap-1 py-2 px-4 ${activeTab === 'profile'? 'text-[#2563EB]' : 'text-gray-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21a8 8 0 1 0-16 0"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span className={`text-xs ${activeTab === 'profile'? 'font-semibold' : 'font-medium'}`}>Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}