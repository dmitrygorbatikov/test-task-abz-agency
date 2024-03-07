import { MouseEventHandler } from "react"

export interface ISubmitButtonProps {
  title: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
  type?: "submit" | "reset" | "button"
}
