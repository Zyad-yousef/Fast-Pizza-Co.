import { useState } from "react";
function SearchOrder() {
  const [query, setQuery] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }
  return (
    <form action="">
      <input
        type="search"
        placeholder="Search orders..."
        value={query}
        onChange={(e) => handleSearch(e)}
        className="w-28 rounded-full bg-yellow-100 px-3 py-4 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-2 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
