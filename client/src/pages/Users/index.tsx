import { usersAPI } from "../../services/user"
import { useEffect } from "react"
import SearchUsers from "./SearchUsers.tsx"
import UsersSortBar from "./UsersSortBar.tsx"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUsers } from "../../store/user/userSlice.ts"
import { useStoreSelector } from "../../store"
import { generateQueryString } from "../../helpers/functions.ts"
import UsersPagination from "./UsersPagination.tsx"
import { UsersTable } from "./UsersTable.tsx"

const Users = () => {
  const dispatch = useDispatch()
  const { users, query, totalCount } = useStoreSelector((state) => state.user)
  const [fetchUsers] = usersAPI.useLazyFetchUsersQuery()
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const handleSearch = async (additionalParams: Object) => {
    const params: any = {}
    const q = queryParams.get("q")
    const sortBy = queryParams.get("sortBy")
    const sortItem = queryParams.get("sortItem")
    const page = queryParams.get("page")
    const perPage = queryParams.get("perPage")
    if (q) {
      params.q = q
    }
    if (sortBy) {
      params.sortBy = sortBy
    }
    if (sortItem) {
      params.sortItem = sortItem
    }
    if (page) {
      params.page = page
    }
    if (perPage) {
      params.perPage = perPage
    }
    const body = {
      ...params,
      ...additionalParams,
    }
    await fetchUsers(body).then(({ data }) => {
      if (!data?.users?.length && body.page > 1) {
        body.page = 1
        fetchUsers(body).then((res) => {
          dispatch(setUsers({ ...res.data, query: body }))
        })
      } else {
        dispatch(setUsers({ ...data, query: body }))
      }
    })
    navigate(`/users?${generateQueryString(body)}`)
  }

  useEffect(() => {
    handleSearch({}).then()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <div className=" flex justify-between items-center">
        <h2 className="m-0 p-0 text-3xl font-bold">Users</h2>
        <div className="flex items-center">
          <Link to="/users/create">
            <span className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
              Create
            </span>
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <SearchUsers
          handleSearch={handleSearch}
          search={queryParams.get("q") ?? ""}
        />
        <UsersSortBar handleSearch={handleSearch} />
      </div>
      <UsersTable users={users} />
      <UsersPagination
        totalCount={totalCount}
        page={query?.page ? +query?.page : 1}
        perPage={query?.perPage ? +query?.perPage : 10}
        handleSearch={handleSearch}
      />
    </div>
  )
}

export default Users
