// src/components/layout/BottomNavigation.jsx

import React, { useState } from 'react'
// useState lets us remember which tab is currently selected.
// Without it, clicking a tab wouldn't change anything on screen.

export const BottomNavigation = () => {
  // 1. Define the tabs (what appears in the navigation)
  const tabs = [
    { name: 'Home', icon: '' },
    { name: 'Saved', icon: '' },
    { name: 'Messages', icon: '' },
    { name: 'Profile', icon: '' },
  ]

  // 2. State to track which tab is active
  const [activeTab, setActiveTab] = useState('Home')

  // 3. Render the navigation bar

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-border bg-white px-2 py-2 font-sans shadow-floating sm:relative sm:rounded-2xl sm:border sm:px-3">
      {/* Loop through the tabs array and create a button for each one */}
      {tabs.map((tab) => {
        // Check if this tab is the active one
        const isActive = activeTab === tab.name

        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-all duration-200 hover:bg-background-hover"
          >
            {/* Icon (emoji) - large enough to tap */}
            <span className="text-xl leading-none">{tab.icon}</span>

            <span
              className={`text-xs ${
                isActive ? 'font-bold text-primary' : 'text-text-tertiary'
              }`}
            >
              {tab.name}
            </span>

            {/* Active indicator - a small dot below the label */}
            <span
              className={`h-1.5 w-1.5 rounded-full bg-primary transition-all duration-200 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
