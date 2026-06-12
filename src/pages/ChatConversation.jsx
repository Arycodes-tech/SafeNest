import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa'
import { ChatBubble } from '../components/ui/ChatBubble'

export const ChatConversation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const currentRole = user.role

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const fetchMessages = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Not authenticated')
      setLoading(false)
      return
    }

    try {
      // WILL REPLACE URL WITH ACTUAL BACKEND ENDPOINT  ***
      const response = await fetch(
        `http://localhost:5001/api/v1/conversations/${id}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const data = await response.json()

      if (response.ok) {
        const formatted = data.messages.map((msg) => ({
          id: msg.id,
          text: msg.text,
          time: formatTime(msg.createdAt),
          sender: msg.sender.role === currentRole ? 'user' : 'other',
        }))
        setMessages(formatted)
        setError('')
      } else {
        setError(data.message || 'Failed to load messages')
      }
    } catch (err) {
      console.warn('Backend not available, using demo fallback')

      setMessages([
        {
          id: 1,
          text: 'Hello, is the apartment still available?',
          time: '10:32 AM',
          sender: 'user',
        },
        {
          id: 2,
          text: 'Yes, it is. Would you like to schedule a viewing?',
          time: '10:33 AM',
          sender: 'other',
        },
        {
          id: 3,
          text: 'That would be great. How about tomorrow at 2 PM?',
          time: '10:34 AM',
          sender: 'user',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    setSending(true)
    const token = localStorage.getItem('token')

    try {
      // WILL REPLACE URL WITH  ACTUAL BACKEND ENDPOINT LATER ***
      const response = await fetch(
        `http://localhost:5001/api/v1/conversations/${id}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: newMessage }),
        }
      )

      if (response.ok) {
        setNewMessage('')

        await fetchMessages()
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to send')
      }
    } catch (err) {
      console.warn('Backend not available – demo send')

      const optimisticMsg = {
        id: Date.now(),
        text: newMessage,
        time: formatTime(new Date().toISOString()),
        sender: 'user',
      }
      setMessages((prev) => [...prev, optimisticMsg])
      setNewMessage('')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [id, currentRole])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const goBack = () => {
    if (currentRole === 'renter') {
      navigate('/messages')
    } else {
      navigate('/dashboard')
    }
  }

  if (loading) return <div className="p-4 text-center">Loading messages...</div>

  return (
    <div className="flex flex-col h-screen bg-background-secondary">
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate('/messages')} className="p-1">
          <FaArrowLeft className="text-text-primary w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-text-primary">Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            time={msg.time}
            sender={msg.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 text-sm text-error bg-error/10">{error}</div>
      )}

      <div className="bg-white border-t border-border p-3 flex gap-2 items-end">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 border border-border rounded-2xl px-4 py-2 text-sm focus:outline-none focus:border-primary resize-none"
          disabled={sending}
          style={{ minHeight: '40px', maxHeight: '120px' }}
        />
        <button
          onClick={sendMessage}
          disabled={sending || !newMessage.trim()}
          className={`bg-primary text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition ${
            sending || !newMessage.trim()
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:opacity-90'
          }`}
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  )
}
