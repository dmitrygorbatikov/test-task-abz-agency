import { useDispatch } from "react-redux"
import { useStoreSelector } from "../../store"
import { useEffect, useState } from "react"
import { tokenAPI } from "../../services/token"
import { setQuery, setTokens } from "../../store/token/tokenSlice.ts"
import InfiniteScroll from "react-infinite-scroll-component"
import { TopCreateHeaderLink } from "../../components/TopCreateHeaderLink"
import toastr from "toastr"
import { HeaderTypeEnum, IHeaderValue } from "../../components/Table/types.ts"
import { Table } from "../../components/Table"
import { useNavigate } from "react-router-dom"

const Token = () => {
  const dispatch = useDispatch()
  const [fetchTokens, { isLoading }] = tokenAPI.useLazyFetchTokensQuery()
  const { tokens, query } = useStoreSelector((state) => state.token)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()

  const handleFetchTokens = async () => {
    await fetchTokens({})
      .unwrap()

      .then((data) => {
        dispatch(setTokens({ ...data }))
      })
      .catch((error) => {
        toastr.error(error.data.error)
      })
  }

  const fetchMoreTokens = async () => {
    try {
      const newPage = query.page + 1
      fetchTokens({
        page: newPage,
      })
        .unwrap()
        .then((data ) => {
          dispatch(setTokens({ tokens: [...tokens, ...(data?.tokens ?? [])] }))
          dispatch(setQuery({ page: newPage }))

          setHasMore(data.page * data.perPage < data.totalCount)
        })
        .catch((error) => {
          console.log(error)
          toastr.error(error.data.error)
        })
    } catch (error) {
      console.error("Error fetching more posts")
    }
  }
  const handleCeilClick = (id: number) =>   navigate(`/tokens/list/${id}`)


  const header: Record<string, IHeaderValue> = {
    id: { name: "Id", onClick: handleCeilClick },
    value: { name: "Value", type: HeaderTypeEnum.token, onClick: handleCeilClick },
    is_valid: { name: "Is valid",
      type: HeaderTypeEnum.is_valid,
      onClick: handleCeilClick },
    created_at: {
      name: "Created At",
      type: HeaderTypeEnum.date,
      onClick: handleCeilClick,
    },
  }

  const data = {
    header,
    list: tokens,
  }

  useEffect(() => {
    handleFetchTokens().catch((error) => {
      toastr.error(error.data.error)
    })
  }, [])
  if (isLoading) {
    return <h1>Loading ...</h1>
  }
  return (
    <div>
      <TopCreateHeaderLink link={"/tokens/create"} title={"Tokens"} />

      <InfiniteScroll
        dataLength={tokens.length}
        next={fetchMoreTokens}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
            <p className="ml-4">Loading...</p>
          </div>
        }
      >
        <Table data={data} />
      </InfiniteScroll>
    </div>
  )
}

export default Token
