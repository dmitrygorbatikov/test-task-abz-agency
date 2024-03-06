import { FC } from "react"

const UsersPagination: FC<{
  totalCount: number
  page: number
  perPage: number
  handleSearch: any
}> = ({ totalCount, page, perPage, handleSearch }) => {
  const totalPages = Math.ceil(totalCount / (perPage || 10))

  const onPageChange = (p: number) => {
    handleSearch({ page: p, perPage: "10" })
  }
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 mr-2 border border-gray-300 rounded focus:outline-none"
      >
        {"<"}
      </button>
      <span className="mr-2">{`Page ${page || 1} of ${totalPages === 0 ? 1 : totalPages}`}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 border border-gray-300 rounded focus:outline-none"
      >
        {">"}
      </button>
    </div>
  )
}

export default UsersPagination
