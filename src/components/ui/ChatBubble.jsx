import React from 'react'

export const ChatBubble = ({
  message, 
  time, 
  sender = 'user', 
}) => {
  const isUser = sender === 'user'
  let bubbleClasses = ''
  if (isUser) {
    bubbleClasses = 'ml-auto bg-primary text-white rounded-[12px_12px_0_12px]'
  } else {
    bubbleClasses =
      'bg-background-secondary text-text-primary rounded-[12px_12px_0_12px]'
  }
  let timeColorClass = ''
  if (isUser) {
    timeColorClass = 'text-blue-100'
  } else {
    timeColorClass = 'text-text-tertiary'
  }
  const containerClasses = `max-w-[75%] px-3.5 py-3 font-sans text-sm ${bubbleClasses}`
  return (
    <div className={containerClasses}>
      {message}
      <span className={`mt-1.5 block text-right text-xs ${timeColorClass}`}>
        {time}
      </span>
    </div>
  )
}
