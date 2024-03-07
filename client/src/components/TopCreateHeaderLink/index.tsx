import { FC } from "react"
import { Link } from "react-router-dom"
import { ITopCreateHeaderLinkProps } from "./types.ts"

export const TopCreateHeaderLink: FC<ITopCreateHeaderLinkProps> = ({
  link,
  title,
}) => {
  return (
    <div className=" flex justify-between items-center">
      <h2 className="m-0 p-0 text-3xl font-bold">{title}</h2>
      <div className="flex items-center">
        <Link to={link}>
          <span className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
            Create
          </span>
        </Link>
      </div>
    </div>
  )
}
