import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { usersAPI } from "../../services/user"
import { useStoreSelector } from "../../store"
import { useDispatch } from "react-redux"
import { setDetailUser } from "../../store/user/userSlice.ts"
import toastr from "toastr"
const UserDetails = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fetchUserById, { isLoading }] = usersAPI.useLazyFetchUserByIdQuery()
  const { user } = useStoreSelector((state) => state.user)

  const handleGoBack = () => {
    navigate("/users")
  }

  useEffect(() => {
    if (userId) {
      fetchUserById({ userId: +userId })
        .then(({ data }) => {
          dispatch(setDetailUser(data))
        })
        .catch((error) => {
          toastr.error(error.data.error)
        })
    }
  }, [userId])
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <button
        onClick={handleGoBack}
        className="p-2 bg-gray-500 text-white rounded mb-4"
      >
        Back
      </button>
      <div className="flex justify-between items-center mb-4">
        {user && (
          <div className="flex items-center">
            <img
              src={user.photo}
              alt={user.name}
              className="rounded-full w-16 h-16 mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500">{user.position_name}</p>
            </div>
          </div>
        )}
      </div>
      {user && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      {!user && <h1>User not found</h1>}
    </div>
  )
}

export default UserDetails
