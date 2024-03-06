import { positionsAPI } from "../../services/position"
import { useEffect } from "react"
import { setPositions } from "../../store/position/positionSlice.ts"
import { useDispatch } from "react-redux"
import { useStoreSelector } from "../../store"
import { PositionsTable } from "./PositionsTable.tsx"

const Positions = () => {
  const dispatch = useDispatch()
  const [fetchPositions, { isLoading }] =
    positionsAPI.useLazyFetchPositionsQuery()
  const { positions } = useStoreSelector((state) => state.position)

  useEffect(() => {
    fetchPositions(null).then(({ data }) => {
      dispatch(setPositions(data))
    })
  }, [])
  if (isLoading) {
    return <h1>Loading ...</h1>
  }
  return (
    <div className="container mx-auto p-8">
      <h2 className="m-0 p-0 text-3xl font-bold">Positions</h2>
      <PositionsTable positions={positions} />
    </div>
  )
}

export default Positions
