import { FC } from "react"
import { formatDateTime } from "../../helpers/functions.ts"
import { useNavigate } from "react-router-dom"
import { IToken } from "../../services/token/types.ts"

export const TokensTable: FC<{ tokens: IToken[] }> = ({ tokens }) => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <td className="py-2 px-4 border-b whitespace-nowrap">Id</td>
            <td className="py-2 px-4 border-b whitespace-nowrap">Value</td>
            <td className="py-2 px-4 border-b whitespace-nowrap">Is valid</td>
            <td className="py-2 px-4 border-b whitespace-nowrap">Created At</td>
          </tr>
        </thead>
        <tbody>
          {tokens.map(({ id, value, is_valid, created_at }) => (
            <tr
              className="cursor-pointer"
              onClick={() => navigate(`/tokens/list/${id}`)}
            >
              <td className="py-2 px-4 border-b">{id}</td>
              <td className="py-2 px-4 border-b">
                {value.length > 50 ? `${value.substring(0, 50)}...` : value}
              </td>
              <td
                className={`py-2 px-4 border-b ${is_valid ? "text-green-500" : "text-red-500"}`}
              >
                {is_valid ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b">
                {formatDateTime(created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
