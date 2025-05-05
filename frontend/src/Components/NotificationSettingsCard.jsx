import React, { useState } from "react";

const NotificationSettingsCard = () => {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    sms: true,
    desktop: true,
  });

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:border-blue-500 transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
      <div className="space-y-5 overflow-hidden">
        {[
          { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
          { key: "push", label: "Push Notifications", desc: "Receive mobile push notifications" },
          { key: "sms", label: "SMS Notifications", desc: "Receive text message alerts" },
          { key: "desktop", label: "Desktop Notifications", desc: "Receive desktop notifications" },
        ].map((item) => (
          <div key={item.key} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-4">
              <button
                onClick={() => toggle(item.key)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${settings[item.key] ? "bg-violet-600" : "bg-gray-300"
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${settings[item.key] ? "translate-x-6" : "translate-x-0"
                    }`}
                ></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettingsCard;