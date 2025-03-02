const TabChanger = ({ activeTab, setActiveTab } : { activeTab: "book" | "website", setActiveTab: (tab: "book" | "website") => void} ) => {
    return (
      <div className="flex justify-center mb-2">
        {(["book", "website"] as ("book" | "website")[]).map((tab) => (
          <button
            key={tab}
            className={`pb-1 px-3 text-base grow ${
              activeTab === tab ? "text-black border-b-2 border-indigo-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "book" ? "Add Book" : "Add Website"}
          </button>
        ))}
      </div>
    );
  };
  
  export default TabChanger;
  