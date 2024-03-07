import { usersAPI } from "../../services/user"
import { useEffect } from "react"
import SearchUsers from "./SearchUsers.tsx"
import UsersSortBar from "./UsersSortBar.tsx"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUsers } from "../../store/user/userSlice.ts"
import { useStoreSelector } from "../../store"
import { generateQueryString } from "../../helpers/functions.ts"
import UsersPagination from "./UsersPagination.tsx"
import { TopCreateHeaderLink } from "../../components/TopCreateHeaderLink"
import { Table } from "../../components/Table"
import { HeaderTypeEnum, IHeaderValue } from "../../components/Table/types.ts"
import toastr from "toastr"

const Users = () => {
  const dispatch = useDispatch()
  const { users, query, totalCount } = useStoreSelector((state) => state.user)
  const [fetchUsers] = usersAPI.useLazyFetchUsersQuery()
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const handleSearch = async (additionalParams: Object) => {
    const params = {
      q: queryParams.get("q"),
      sortBy: queryParams.get("sortBy"),
      sortItem: queryParams.get("sortItem"),
      page: queryParams.get("page"),
      perPage: queryParams.get("perPage"),
      ...additionalParams,
    }
    await fetchUsers(params)
      .unwrap()
      .then((data) => {
        if (!data?.users?.length && params.page && +params.page > 1) {
          params.page = "1"
          fetchUsers(params)
            .unwrap()
            .then((res) => {
              dispatch(setUsers({ ...res, query: params }))
            })
        } else {
          dispatch(setUsers({ ...data, query: params }))
        }
      })
      .catch((error) => {
        toastr.error(error.data.error)
      })
    navigate(`/users?${generateQueryString(params)}`)
  }

  const handleCeilClick = (id: number) => navigate(`/users/list/${id}`)

  const header: Record<string, IHeaderValue> = {
    id: { name: "Id", onClick: handleCeilClick },
    photo: {
      name: "Photo",
      type: HeaderTypeEnum.image,
      onClick: handleCeilClick,
    },
    name: { name: "Name", onClick: handleCeilClick },
    position: { name: "Position", onClick: handleCeilClick },
    email: { name: "Email", onClick: handleCeilClick },
    phone: { name: "Phone", onClick: handleCeilClick },
    created_at: {
      name: "Created At",
      type: HeaderTypeEnum.date,
      onClick: handleCeilClick,
    },
  }

  const data = {
    header,
    list: users,
  }

  useEffect(() => {
    handleSearch({}).then()
  }, [])

  return (
    <div>
      <TopCreateHeaderLink link={"/users/create"} title={"Users"} />

      <div className="flex justify-between items-center mt-10">
        <SearchUsers
          handleSearch={handleSearch}
          search={queryParams.get("q") ?? ""}
        />
        <UsersSortBar handleSearch={handleSearch} />
      </div>
      <Table data={data} />
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
