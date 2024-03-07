import { FC } from "react"
import { ITableProps } from "./types.ts"
import { TableBody } from "./TableBody"
export const Table: FC<ITableProps> = ({ data }) => {
  return (
    <table className="mt-5 min-w-full bg-white border border-gray-300 mb-5">
      <thead>
        <tr>
          {Object.keys(data.header).map((key) => (
            <td key={data.header[key].name} className="py-2 px-4 border-b">
              {data.header[key].name}
            </td>
          ))}
        </tr>
      </thead>
      <TableBody data={data} />
    </table>
  )
}
