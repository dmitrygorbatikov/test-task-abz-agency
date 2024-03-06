import { FC } from "react"
import { formatDateTime } from "../../helpers/functions.ts"
import { useNavigate } from "react-router-dom"
import { IPosition } from "../../services/position/types.ts"

export const PositionsTable: FC<{ positions: IPosition[] }> = ({
  positions,
}) => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <td className="py-2 px-4 border-b">Id</td>
            <td className="py-2 px-4 border-b">Name</td>
            <td className="py-2 px-4 border-b">Created At</td>
          </tr>
        </thead>
        <tbody>
          {positions.map(({ id, name, created_at }) => (
            <tr
              className="cursor-pointer"
              onClick={() => navigate(`/users/list/${id}`)}
            >
              <td className="py-2 px-4 border-b">{id}</td>
              <td className="py-2 px-4 border-b">{name}</td>
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
