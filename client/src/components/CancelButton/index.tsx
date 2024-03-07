import { FC } from "react"
import { ICancelButtonProps } from "./types.ts"

export const CancelButton: FC<ICancelButtonProps> = ({
  isLoading = false,
  type,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={`ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition duration-300 ${
        isLoading ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {title}
    </button>
  )
}
