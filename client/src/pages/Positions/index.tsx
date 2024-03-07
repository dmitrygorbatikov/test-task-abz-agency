import { positionsAPI } from "../../services/position"
import { useEffect } from "react"
import { setPositions } from "../../store/position/positionSlice.ts"
import { useDispatch } from "react-redux"
import { useStoreSelector } from "../../store"
import { Table } from "../../components/Table"
import { HeaderTypeEnum } from "../../components/Table/types.ts"
import toastr from "toastr"

const Positions = () => {
  const dispatch = useDispatch()
  const [fetchPositions, { isLoading }] =
    positionsAPI.useLazyFetchPositionsQuery()
  const { positions } = useStoreSelector((state) => state.position)

  const header = {
    id: { name: "Id" },
    name: { name: "Name" },
    created_at: { name: "Created At", type: HeaderTypeEnum.date },
  }

  const data = {
    header,
    list: positions,
  }

  useEffect(() => {
    fetchPositions(null)
      .unwrap()

      .then((data ) => {
        dispatch(setPositions(data))
      })
      .catch((error) => {
        toastr.error(error.data.error)
      })
  }, [])

  if (isLoading) {
    return <h1>Loading ...</h1>
  }
  return (
    <div>
      <h2 className="m-0 p-0 text-3xl font-bold">Positions</h2>
      <Table data={data} />
    </div>
  )
}

export default Positions
