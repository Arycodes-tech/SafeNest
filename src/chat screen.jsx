import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000/api'; // CHANGE TO YOUR API

export default function MessagesList() {
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadChats();
    const interval = setInterval(loadChats, 15000);
    return () => clearInterval(interval);
  }, []);

  const loadChats = async () => {
    try {
      const token = localStorage.getItem('safenest_token') || '';
      const res = await fetch(`${API_BASE}/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      const mapped = (data.conversations || []).map(c => ({
        id: c.id,
        name: c.tenant_name,
        avatar: c.avatar_url,
        time: new Date(c.last_message_at).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        }),
        lastMessage: c.last_message,
        unread: c.unread_count || 0,
        isRead: (c.unread_count || 0) === 0,
        online: c.is_online
      }));

      setChats(mapped);
    } catch (err) {
      // Demo fallback
      setChats([
        { id: 1, name: 'Doris Ukah', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', time: '10:00 AM', lastMessage: 'Hi, is the apartment still available?', unread: 0, isRead: true, online: true },
        { id: 2, name: 'M.O Wale', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', time: '10:00 AM', lastMessage: "I'll come for viewing tomorrow", unread: 0, isRead: true, online: false },
        { id: 3, name: 'Yareji Victor', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', time: '10:00 AM', lastMessage: "What's the service charge?", unread: 1, isRead: false, online: true },
        { id: 4, name: 'Umoh John', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', time: '10:00 AM', lastMessage: 'Thanks for the quick response', unread: 0, isRead: true, online: false },
      ]);
    }
  };

  const filtered = chats.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-10 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text- outline-none focus:bg-white focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div>
          {filtered.map(chat => (
            <div
              key={chat.id}
              onClick={() => navigate(`/messages/${chat.id}`)}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 active:bg-gray-50 cursor-pointer hover:bg-gray-50"
            >
              <div className="relative flex-shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w- h- rounded-full object-cover" />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text- text-gray-900 truncate">{chat.name}</h3>
                  <span className="text- text-gray-500 flex-shrink-0">{chat.time}</span>
                </div>

                <div className="flex items-center justify-between mt-1 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    {chat.isRead && (
                      <svg className="w-4 h-4 text-[#10B981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <p className="text- text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>

                  {chat.unread > 0 && (
                    <span className="bg-[#2563EB] text-white text- font-medium min-w- h-5 px-1.5 rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}