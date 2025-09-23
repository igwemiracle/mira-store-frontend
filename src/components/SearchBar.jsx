import React from "react";
import { SearchIcon } from "lucide-react";

export default function SearchBar({ placeholder = "Search...", onSearch, className }) {
  return (
    <div className={`flex-center mx-auto xs:w-[95%] max-w-[900px] rounded overflow-hidden  bg-white ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 w-full text-[#1C1C1C] bg-white outline-none border-none"
      />
      <button
        className="bg-[#FA801D] hover:bg-[#e9710d] text-white px-4 py-3 flex-center transition-colors"
        onClick={onSearch}
      >
        <SearchIcon size={20} />
      </button>
    </div>
  );
}
