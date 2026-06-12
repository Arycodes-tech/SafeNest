import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { BottomNavigation } from '../components/layout/BottomNavigation'

export const MessagesList = () => {
  const navigate = useNavigate()
  const [chats, setChats] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const DEMO_CHATS = [
    {
      id: 1,
      name: 'Doris Ukah',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      lastMessage: 'Hi, is the apartment still available?',
      time: new Date(Date.now() - 30 * 60000).toISOString(),
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: 'M.O Wale',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: "I'll come for viewing tomorrow",
      time: new Date(Date.now() - 2 * 3600000).toISOString(),
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Yareji Victor',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      lastMessage: "What's the service charge?",
      time: new Date(Date.now() - 5 * 3600000).toISOString(),
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: 'Umoh John',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      lastMessage: 'Thanks for the quick response',
      time: new Date(Date.now() - 24 * 3600000).toISOString(),
      unread: 0,
      online: false,
    },
  ]

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const loadChats = async () => {
    setLoading(true)
    const token = localStorage.getItem('token')

    // ---- REAL BACKEND CODE (uncomment when API ready) ----
    /*
    try {
      const res = await fetch('http://localhost:5001/api/v1/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      const mapped = (data.conversations || []).map(c => ({
        id: c.id,
        name: c.tenant_name,
        avatar: c.avatar_url,
        lastMessage: c.last_message,
        time: c.last_message_at,
        unread: c.unread_count || 0,
        online: c.is_online || false,
      }))
      setChats(mapped)
      setLoading(false)
      return
    } catch (err) {
      console.warn('Backend not available, using demo data')
    }
    */

    // ---- DEMO MODE (fallback) ----
    await new Promise((resolve) => setTimeout(resolve, 500))
    setChats(DEMO_CHATS)
    setLoading(false)
  }

  useEffect(() => {
    loadChats()

    const interval = setInterval(loadChats, 15000)

    // Option 2: WebSocket (for instant updates) – uncomment when backend provides socket
    /*
    const socket = new WebSocket('ws://localhost:5001/ws/conversations')
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data)
      // Update the chat list with new message (increment unread, update last message)
      setChats(prev => prev.map(chat =>
        chat.id === newMessage.conversationId
          ? { ...chat, lastMessage: newMessage.text, time: newMessage.createdAt, unread: chat.unread + 1 }
          : chat
      ))
    }
    return () => socket.close()
    */

    return () => clearInterval(interval)
  }, [])

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(query.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-10 pb-4">
          <h1 className="text-h2 font-bold text-text-primary">Messages</h1>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <FaSearch
              onClick={() => navigate('/messages')}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-11 pr-4 py-3 bg-background-secondary border border-border rounded-xl text-body text-text-primary outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          {loading ? (
            <div className="text-center py-10 text-text-tertiary">
              Loading conversations...
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="text-center py-10 text-text-tertiary">
              No messages yet
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => navigate(`/messages/${chat.id}`)}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-border active:bg-background-hover cursor-pointer hover:bg-background-hover transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-body text-text-primary truncate">
                      {chat.name}
                    </h3>
                    <span className="text-caption text-text-tertiary flex-shrink-0">
                      {formatTime(chat.time)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1 gap-2">
                    <div className="flex items-center gap-1 min-w-0 flex-1">
                      {chat.unread === 0 && (
                        <svg
                          className="w-4 h-4 text-success flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      <p className="text-caption text-text-tertiary truncate">
                        {chat.lastMessage}
                      </p>
                    </div>

                    {chat.unread > 0 && (
                      <span className="bg-primary text-white text-xs font-medium min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomNavigation></BottomNavigation>
    </div>
  )
}
