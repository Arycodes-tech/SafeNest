import React from 'react'

// This component creates a single chat message bubble.
// sender can be 'user' (the renter) or 'agent' (landlord/agent)
export const ChatBubble = ({
  message, // The text of the message
  time, // The time the message was sent
  sender = 'user', // Who sent it. Default is 'user'
}) => {
  // 1. Check who is sending the message

  const isUser = sender === 'user'
  // 2. Decide the bubble's background colour and position
  let bubbleClasses = ''

  if (isUser) {
    bubbleClasses = 'ml-auto bg-primary text-white rounded-[12px_12px_0_12px]'
  } else {
    bubbleClasses =
      'bg-background-secondary text-text-primary rounded-[12px_12px_0_12px]'
  }

  // --------------------------------------------------------------
  // 3. Decide the timestamp text colour
  // --------------------------------------------------------------
  let timeColorClass = ''
  if (isUser) {
    timeColorClass = 'text-blue-100' // Light blue (shows well on dark blue)
  } else {
    timeColorClass = 'text-text-tertiary' // Grey (shows well on light grey)
  }
  // 4. Build the full container classes for the bubble
  const containerClasses = `max-w-[75%] px-3.5 py-3 font-sans text-sm ${bubbleClasses}`
  // 5. Render the bubble
  return (
    <div className={containerClasses}>
      {/* The message text */}
      {message}

      {/* The timestamp – block = new line, text-right = align right */}
      <span className={`mt-1.5 block text-right text-xs ${timeColorClass}`}>
        {time}
      </span>
    </div>
  )
}
