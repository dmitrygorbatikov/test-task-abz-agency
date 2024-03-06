import { FC, useState } from "react"

const SearchUsers: FC<{ handleSearch: any; search: string }> = ({
  handleSearch,
  search,
}) => {
  const [searchTerm, setSearchTerm] = useState(search)

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch({ q: searchTerm, page: "1" })
          }
        }}
        className="p-2 border border-gray-300 rounded-l focus:outline-none"
      />
      <button
        onClick={() => handleSearch({ q: searchTerm, page: "1" })}
        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-700 transition duration-300"
      >
        Search
      </button>
    </div>
  )
}

export default SearchUsers
