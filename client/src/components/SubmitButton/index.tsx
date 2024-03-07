import { FC } from "react"
import { ISubmitButtonProps } from "./types.ts"

export const SubmitButton: FC<ISubmitButtonProps> = ({
  isLoading = false,
  type,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ${
        isLoading ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {title}
    </button>
  )
}
