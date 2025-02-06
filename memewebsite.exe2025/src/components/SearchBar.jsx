'use client'
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching for:", query);
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}