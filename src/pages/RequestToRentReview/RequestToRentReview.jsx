import React from 'react';
import { FiChevronLeft as ChevronLeft, FiLock as Lock } from 'react-icons/fi';

export default function ReviewAndSubmit() {
  const summaryData = {
    moveInDate: '',
    duration: '1 Year',
    message: "Hi, I'm interested in this property and would like to schedule a viewing",
    fullName: 'Olamide Kanaruwi',
    phone: '+234 9156245901',
    email: 'akande19@gmail.com'
  };

  return (
    <div className="w-full max-w-md bg-white min-h-[844px] shadow-2xl rounded-[40px] overflow-hidden flex flex-col relative border border-gray-200 select-none">
      
            <div className="h-11 px-6 flex justify-between items-center text-xs font-semibold text-gray-900 tracking-tight z-10 bg-white">
        <div>9:41</div>
        <div className="flex items-center space-x-1.5">
          <div className="w-4 h-2.5 border border-black rounded-xs relative after:content-[''] after:absolute after:top-0.5 after:-right-1 after:w-0.5 after:h-1 after:bg-black"></div>
        </div>
      </div>

         <div className="px-4 py-3 flex items-center border-b border-gray-100">
        <button className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition active:scale-95">
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-gray-900 pr-10">Review & Submit</h1>
      </div>

           <div className="flex-1 px-5 py-5 overflow-y-auto space-y-5">
        
        <h3 className="font-bold text-base text-gray-900">Property</h3>

       
        <div className="flex space-x-4 pb-5 border-b border-gray-100">
          <div className="w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80" 
              alt="Apartment snapshot" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center space-y-1">
            <h2 className="font-bold text-base text-gray-900 leading-tight">2 Bedroom Apartment</h2>
            <p className="text-xs font-medium text-gray-400">Lekki Phase 1, Lagos</p>
            <p className="text-[#3b5998] font-bold text-base">₦2,500,000 <span class="text-xs font-normal text-gray-500">/year</span></p>
          </div>
        </div>

               <div className="space-y-4">
          <h3 className="font-bold text-base text-gray-900">Request Details</h3>
          
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-900">Move-in-date</span>
            <span className="text-[#6c82a3] font-medium">{summaryData.moveInDate}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-900">Rental Duration</span>
            <span className="text-[#6c82a3] font-medium">{summaryData.duration}</span>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="block text-sm font-semibold text-gray-900">Message to Agent</span>
            <p className="text-sm text-[#6c82a3] leading-relaxed">{summaryData.message}</p>
          </div>
        </div>

        <div className="border-b border-gray-100 pt-2"></div>

               <div className="space-y-4">
          <h3 className="font-bold text-base text-gray-900">Your Information</h3>
          
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-900">Full Name</span>
            <span className="text-[#6c82a3] font-medium">{summaryData.fullName}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-900">Phone Number</span>
            <span className="text-[#6c82a3] font-medium">{summaryData.phone}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-900">Email Address</span>
            <span className="text-[#6c82a3] font-medium">{summaryData.email}</span>
          </div>
        </div>

        {/* Legal Disclaimer Consent Footer text */}
        <p className="text-[13px] text-gray-600 font-medium pt-4 leading-relaxed">
          By submitting this request, you agree to our{' '}
          <button className="text-[#3554d1] font-semibold hover:underline bg-transparent border-none p-0">Terms of Service</button>{' '}
          and{' '}
          <button className="text-[#3554d1] font-semibold hover:underline bg-transparent border-none p-0">Privacy Policy</button>
        </p>

      </div>

      {/* Button Action Block */}
      <div className="px-5 pt-3 pb-8 bg-white flex flex-col items-center space-y-3">
        <button className="w-full bg-[#2f55d4] text-white text-base font-semibold py-4 rounded-xl shadow-md hover:bg-[#2342ab] transition active:scale-[0.99]">
          Submit Request
        </button>
        
        <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-medium">
          <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Secure & Encrypted</span>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-36 h-1 bg-black rounded-full"></div>

    </div>
  );
}