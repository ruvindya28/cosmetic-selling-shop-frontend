export default function SearchBox({
  search,
  setSearch,
  onSearch,
  onReset,
}) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 p-4">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products"
        value={search}
        className="w-full md:w-[250px] h-[40px] border border-gray-400 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="w-full md:w-[100px] h-[40px] bg-pink-600 text-white rounded-md cursor-pointer hover:bg-pink-700 transition-colors duration-200"
      >
        Search
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full md:w-[100px] h-[40px] bg-gray-600 text-white rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200"
      >
        Reset
      </button>
    </div>
  );
}