import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="flex border-t border-b overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`px-4 py-4 ${className} ${
              activeTab === tab.title
                ? " border-b-2 border-black  w-full text-black font-bold"
                : "bg-white  w-full"
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
