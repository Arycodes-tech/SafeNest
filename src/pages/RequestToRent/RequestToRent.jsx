import React, { useState } from 'react';
import { ChevronLeft, Calendar, ChevronDown } from 'lucide-react';

export default function RequestToRent() {
  const [formData, setFormData] = useState({
    moveInDate: '',
    duration: '',
    source: '',
    message: "Hi, I'm interested in this property and would like to schedule a viewing"
  });

  return (
    <div className="w-full max-w-md bg-white min-h-[844px] shadow-2xl rounded-[40px] overflow-hidden flex flex-col relative border border-gray-200 select-none">
      
      {/* Device Status Bar */}
      <div className="h-11 px-6 flex justify-between items-center text-xs font-semibold text-gray-900 tracking-tight z-10 bg-white">
        <div>9:41</div>
        <div className="flex items-center space-x-1.5">
          <div className="w-4 h-2.5 border border-black rounded-xs relative after:content-[''] after:absolute after:top-0.5 after:-right-1 after:w-0.5 after:h-1 after:bg-black"></div>
        </div>
      </div>

      {/* Header Nav */}
      <div className="px-4 py-3 flex items-center border-b border-gray-100">
        <button className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition active:scale-95">
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-gray-900 pr-10">Request to Rent</h1>
      </div>

      {/* Content Form Area */}
      <div className="flex-1 px-5 py-6 overflow-y-auto space-y-6">
        
        {/* Compact Property Card */}
        <div className="flex space-x-4 pb-6 border-b border-gray-100">
          <div className="w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80" 
              alt="Apartment preview" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center space-y-1">
            <h2 className="font-bold text-base text-gray-900 leading-tight">2 Bedroom Apartment</h2>
            <p className="text-xs font-medium text-gray-400">Lekki Phase 1, Lagos</p>
            <p className="text-[#3b5998] font-bold text-base">₦2,500,000 <span class="text-xs font-normal text-gray-500">/year</span></p>
            
            <div className="flex items-center space-x-3 pt-1 text-gray-500 text-xs font-medium">
              <span>🛏️ 2</span>
              <span>🛁 2</span>
              <span>📐 120m²</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-base text-gray-900 pt-1">Request Details</h3>

               <div className="space-y-5">
          
                   <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-900">Move-in-date</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Select move-in date" 
                value={formData.moveInDate}
                onChange={(e) => setFormData({...formData, moveInDate: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3554d1] transition bg-white"
              />
              <Calendar className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

                    <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-900">Rental Duration</label>
            <div className="relative">
              <select 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#3554d1] transition cursor-pointer"
              >
                <option value="" disabled>Select duration</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

                   <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-900">How do you hear about this property?</label>
            <div className="relative">
              <select 
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#3554d1] transition cursor-pointer"
              >
                <option value="" disabled>Select an option</option>
                <option value="social">Social Media</option>
                <option value="referral">Friend / Referral</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-900">Add a message to the agent (optional)</label>
            <textarea 
              rows={3} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 focus:outline-none focus:border-[#3554d1] transition resize-none"
            />
          </div>

        </div>
      </div>

            <div className="px-5 pt-4 pb-8 border-t border-gray-50 bg-white">
        <button className="w-full bg-[#3554d1] text-white text-base font-semibold py-4 rounded-xl shadow-md hover:bg-[#2a44b3] transition active:scale-[0.99]">
          Continue
        </button>
      </div>

    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-36 h-1 bg-black rounded-full"></div>

    </div>
  );
}