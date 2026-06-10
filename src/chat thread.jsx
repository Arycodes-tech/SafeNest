import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3000/api';
const WS_URL = 'ws://localhost:3000/ws';

export default function ChatThread() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState({ name: '', avatar: '' });
  const listRef = useRef(null);
  const wsRef = useRef(null);

  const token = localStorage.getItem('safenest_token') || '';
  const currentUserId = localStorage.getItem('current_user_id') || '12';

  useEffect(() => {
    loadChat();
    connectWebSocket();

    // Mark as read
    fetch(`${API_BASE}/conversations/${id}/read`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    return () => wsRef.current?.close();
  }, [id]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const connectWebSocket = () => {
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_message' && data.chat_id == id) {
        const msg = data.message;
        setMessages(prev => [...prev, {
          id: msg.id,
          text: msg.body,
          time: new Date(msg.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          me: String(msg.sender_id) === String(currentUserId)
        }]);
      }
    };
  };

  const loadChat = async () => {
    try {
      const res = await fetch(`${API_BASE}/conversations/${id}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      // Get chat info from conversations list
      const convRes = await fetch(`${API_BASE}/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const convData = await convRes.json();
      const currentChat = convData.conversations.find(c => c.id == id);

      if (currentChat) {
        setChat({
          name: currentChat.tenant_name,
          avatar: currentChat.avatar_url,
          property: currentChat.property
        });
      }

      const mapped = (data.messages || []).map(m => ({
        id: m.id,
        text: m.body,
        time: new Date(m.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        me: String(m.sender_id) === String(currentUserId),
        status: m.read_at? 'read' : 'delivered'
      }));

      setMessages(mapped);
    } catch (err) {
      // Demo data
      setChat({ name: 'Doris Ukah', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' });
      setMessages([
        { id: 1, text: 'Hi, is the apartment still available?', time: '10:00 AM', me: false },
        { id: 2, text: 'Yes it is! Would you like to schedule a viewing?', time: '10:01 AM', me: true, status: 'read' },
        { id: 3, text: 'Yes please. When are you free?', time: '10:02 AM', me: false },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const text = input;
    setInput('');

    // Optimistic update
    const tempMsg = {
      id: Date.now(),
      text,
      time: 'now',
      me: true,
      status: 'sent'
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      await fetch(`${API_BASE}/conversations/${id}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
    } catch (err) {
      console.error('Failed to send', err);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img src={chat.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-[16px] text-gray-900 leading-tight truncate">{chat.name}</h2>
            <p className="text-[12px] text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Active now
            </p>
          </div>
        </div>

        {/* Property pill */}
        {chat.property && (
          <div className="px-4 pb-3">
            <div className="max-w-2xl mx-auto bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl px-3 py-2 flex items-center gap-2.5">
              <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100" className="w-10 h-10 rounded-lg object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[#1E40AF] truncate">{chat.property.title}</p>
                <p className="text-[11px] text-[#3B82F6]">{chat.property.location} • {chat.property.price}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.me? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[78%]">
                <div className={`${
                  msg.me
                   ? 'bg-[#2563EB] text-white rounded-[20px] rounded-br-[4px]'
                    : 'bg-white text-gray-900 rounded-[20px] rounded-bl-[4px] shadow-sm border border-gray-100'
                } px-4 py-2.5`}>
                  <p className="text-[15px] leading-[1.4] whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-1 mt-1 px-1 ${msg.me? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[11px] text-gray-400">{msg.time}</span>
                  {msg.me && (
                    <span className={`text-[11px] ${msg.status === 'read'? 'text-[#2563EB]' : 'text-gray-400'}`}>✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-2xl mx-auto px-3 py-3">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' &&!e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Message"
                rows={1}
                className="w-full bg-[#F3F4F6] rounded-[22px] px-4 py-2.5 pr-4 text-[15px] outline-none resize-none max-h-28 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20"
                style={{ height: 'auto' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 112) + 'px';
                }}
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all hover:bg-[#1D4ED8]"
            >
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}