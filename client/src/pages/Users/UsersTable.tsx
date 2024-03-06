import { FC } from "react"
import { IUser } from "../../services/user/types.ts"
import { formatDateTime } from "../../helpers/functions.ts"
import { useNavigate } from "react-router-dom"

export const UsersTable: FC<{ users: IUser[] }> = ({ users }) => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <td className="py-2 px-4 border-b">Id</td>
            <td className="py-2 px-4 border-b">Photo</td>

            <td className="py-2 px-4 border-b">Name</td>
            <td className="py-2 px-4 border-b">Position</td>
            <td className="py-2 px-4 border-b">Email</td>
            <td className="py-2 px-4 border-b">Phone</td>
            <td className="py-2 px-4 border-b">Created At</td>
          </tr>
        </thead>
        <tbody>
          {users.map(
            ({ id, name, position_name, email, phone, photo, created_at }) => (
              <tr
                className="cursor-pointer"
                onClick={() => navigate(`/users/list/${id}`)}
              >
                <td className="py-2 px-4 border-b">{id}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={photo}
                    alt="John Doe"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">{name}</td>
                <td className="py-2 px-4 border-b">{position_name}</td>
                <td className="py-2 px-4 border-b">{email}</td>
                <td className="py-2 px-4 border-b">{phone}</td>
                <td className="py-2 px-4 border-b">
                  {formatDateTime(created_at)}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
