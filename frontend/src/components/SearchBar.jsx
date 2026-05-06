export default function SearchBar({ onSearch }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by name, email, or mobile..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
