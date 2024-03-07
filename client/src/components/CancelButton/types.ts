import { MouseEventHandler } from "react"

export interface ICancelButtonProps {
  title: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
  type?: "submit" | "reset" | "button"
}
