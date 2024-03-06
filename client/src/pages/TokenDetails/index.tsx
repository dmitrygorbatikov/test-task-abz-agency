import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useStoreSelector } from "../../store"
import { useDispatch } from "react-redux"
import { tokenAPI } from "../../services/token"
import { setDetailToken } from "../../store/token/tokenSlice.ts"
const TokenDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fetchTokenById, { isLoading }] = tokenAPI.useLazyFetchTokenByIdQuery()
  const [verifyToken, { isLoading: verifyTokenLoading }] =
    tokenAPI.useLazyVerifyTokenQuery()
  const { token } = useStoreSelector((state) => state.token)
  const [show, setShow] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [tokenData, setTokenData] = useState()
  const handleGoBack = () => {
    navigate("/")
  }

  const handleVerifyToken = async () => {
    if (id) {
      verifyToken({ id: +id }).then(({ data }) => {
        setTokenData(data)
        setShow(true)
      })
    }
    setDisabled(true)
  }

  const handleCloseData = async () => {
    dispatch(
      setDetailToken({
        ...token,
        is_valid: false,
      }),
    )
    setShow(false)
  }

  useEffect(() => {
    if (id) {
      fetchTokenById({ id: +id }).then(({ data }) => {
        dispatch(setDetailToken(data))
      })
    }
  }, [id])
  if (isLoading || verifyTokenLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={handleGoBack}
        className="p-2 bg-gray-500 text-white rounded mb-4"
      >
        Back
      </button>
      <label className="block">Value</label>
      <div className="flex justify-between items-center mb-4">
        {token && (
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold">{token.value}</h1>
            </div>
          </div>
        )}
      </div>
      {token?.is_valid ? (
        <button
          disabled={disabled}
          onClick={handleVerifyToken}
          className={`p-2 ${disabled ? "bg-green-300" : "bg-green-500"} text-white rounded`}
        >
          Show data
        </button>
      ) : (
        <p className="text-red-500">Token already used or expired</p>
      )}

      {show && (
        <div className="mt-8 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Token Data</h2>
          <button
            onClick={handleCloseData}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
          <pre>{JSON.stringify(tokenData, null, 2)}</pre>
        </div>
      )}
      {!token && <h1>User not found</h1>}
    </div>
  )
}

export default TokenDetails
