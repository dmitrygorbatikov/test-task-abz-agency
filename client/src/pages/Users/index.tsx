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
    await fetchUsers(body)
      .then(({ data }) => {
        if (!data?.users?.length && body.page > 1) {
          body.page = 1
          fetchUsers(body)
            .then((res) => {
              dispatch(setUsers({ ...res.data, query: body }))
            })
            .catch((error) => {
              toastr.error(error.data.error)
            })
        } else {
          dispatch(setUsers({ ...data, query: body }))
        }
      })
      .catch((error) => {
        toastr.error(error.data.error)
      })
    navigate(`/users?${generateQueryString(body)}`)
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
    handleSearch({}).catch((error) => {
      toastr.error(error.data.error)
    })
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
