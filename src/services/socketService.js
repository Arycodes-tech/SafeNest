import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'ws://localhost:5001'

let socket = null

export function connectSocket() {
  if (socket) return socket
  const token = localStorage.getItem('token')
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
  })
  return socket
}

export function joinRoom(conversationId) {
  if (!socket) connectSocket()
  socket.emit('join_room', { conversationId })
}

export function sendSocketMessage(conversationId, message) {
  if (!socket) return
  socket.emit('send_message', { conversationId, message })
}

export function onReceiveMessage(callback) {
  if (!socket) connectSocket()
  socket.on('receive_message', callback)
}

export function offReceiveMessage(callback) {
  if (!socket) return
  socket.off('receive_message', callback)
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}