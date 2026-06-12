import React from "react";

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen flex flex-col pb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="w-6"></div>
          <h1 className="text-lg font-semibold">Profile</h1>
          <i className="fa-regular fa-bell text-gray-700 text-lg"></i>
        </div>

        {/* Profile Card */}
        <div className="mx-4 bg-blue-600 rounded-2xl px-4 py-5 text-white flex items-center gap-4 shadow-md">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-14 h-14 rounded-full border-2 border-white object-cover"
          />

          <div>
            <div className="flex items-center gap-1">
              <h2 className="font-semibold">Name</h2>
              <i className="fa-solid fa-circle-check text-xs"></i>
            </div>

            <p className="text-xs text-blue-100">Email Address</p>

            <p className="text-sm mt-1">Phone Number</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mx-4 mt-5 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">

          {[
            {
              icon: "fa-user",
              text: "Personal Information",
              type: "regular",
            },
            {
              icon: "fa-shield",
              text: "Verification",
              type: "solid",
            },
            {
              icon: "fa-clipboard",
              text: "My Requests",
              type: "regular",
            },
            {
              icon: "fa-heart",
              text: "Saved Listings",
              type: "solid",
            },
            {
              icon: "fa-calendar-check",
              text: "My Bookings",
              type: "solid",
            },
            {
              icon: "fa-credit-card",
              text: "Payment Methods",
              type: "regular",
            },
            {
              icon: "fa-bell",
              text: "Notifications",
              type: "regular",
            },
            {
              icon: "fa-circle-question",
              text: "Help & Support",
              type: "regular",
            },
            {
              icon: "fa-gear",
              text: "Settings",
              type: "solid",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-4 hover:bg-gray-100 cursor-pointer transition ${
                index !== 8 ? "border-b" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <i
                    className={`fa-${item.type} ${item.icon} text-blue-600`}
                  ></i>
                </div>

                <span className="text-sm font-medium">{item.text}</span>
              </div>

              <i className="fa-solid fa-chevron-right text-xs text-gray-400"></i>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto border-t bg-white">
          <div className="flex justify-around py-3 text-gray-500 text-xs">

            <div className="flex flex-col items-center">
              <i className="fa-solid fa-house text-lg"></i>
              <span>Home</span>
            </div>

            <div className="flex flex-col items-center">
              <i className="fa-regular fa-heart text-lg"></i>
              <span>Saved</span>
            </div>

            <div className="flex flex-col items-center">
              <i className="fa-regular fa-comment-dots text-lg"></i>
              <span>Messages</span>
            </div>

            <div className="flex flex-col items-center text-blue-600">
              <i className="fa-solid fa-user text-lg"></i>
              <span className="font-medium">Profile</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;