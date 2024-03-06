import { FC, useState } from "react"

const UsersSortBar: FC<{ handleSearch: any }> = ({ handleSearch }) => {
  const [sortItemValue, setSortItemValue] = useState("created_at")
  const [sortByValue, setSortByValue] = useState("desc")

  return (
    <div className="flex items-center">
      <span className="mr-2">Sort item:</span>
      <select
        value={sortItemValue}
        onChange={(e) => setSortItemValue(e.target.value)}
        className="p-2 border border-gray-300 rounded focus:outline-none"
      >
        <option value="created_at">Created At</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="position_name">Position name</option>
      </select>

      <span className="mr-2 ml-2">Sort by:</span>
      <select
        value={sortByValue}
        onChange={(e) => setSortByValue(e.target.value)}
        className="p-2 border border-gray-300 rounded focus:outline-none"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button
        onClick={() =>
          handleSearch({ sortBy: sortByValue, sortItem: sortItemValue })
        }
        className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Apply
      </button>
    </div>
  )
}

export default UsersSortBar
