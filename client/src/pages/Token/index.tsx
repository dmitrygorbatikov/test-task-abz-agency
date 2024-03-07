import { TokensTable } from "./TokensTable.tsx"
import { useDispatch } from "react-redux"
import { useStoreSelector } from "../../store"
import { useEffect, useState } from "react"
import { tokenAPI } from "../../services/token"
import { setQuery, setTokens } from "../../store/token/tokenSlice.ts"
import InfiniteScroll from "react-infinite-scroll-component"
import { TopCreateHeaderLink } from "../../components/TopCreateHeaderLink"
import toastr from "toastr"

const Token = () => {
  const dispatch = useDispatch()
  const [fetchTokens, { isLoading }] = tokenAPI.useLazyFetchTokensQuery()
  const { tokens, query } = useStoreSelector((state) => state.token)
  const [hasMore, setHasMore] = useState(true)

  const handleFetchTokens = async () => {
    await fetchTokens({})
      .then(({ data }) => {
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
        .then((data) => {
          dispatch(setTokens({ tokens: [...tokens, ...(data?.tokens ?? [])] }))
          dispatch(setQuery({ page: newPage }))

          setHasMore(data.page * data.perPage < data.totalCount)
        })
        .catch((error) => {
          toastr.error(error.data.error)
        })
    } catch (error) {
      console.error("Error fetching more posts")
    }
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
        <TokensTable tokens={tokens} />
      </InfiniteScroll>
    </div>
  )
}

export default Token
