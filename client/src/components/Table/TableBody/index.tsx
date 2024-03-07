import { FC } from "react"
import { ITableBodyProps } from "./types.ts"
import { HeaderTypeEnum } from "../types.ts"
import { formatDateTime } from "../../../helpers/functions.ts"

export const TableBody: FC<ITableBodyProps> = ({ data }) => {
  return (
    <tbody>
      {data.list.map((item, index) => (
        <tr className="cursor-pointer">
          {Object.keys(data.header).map((key) => {
            let ceilResult
            const onClick = () =>
              item.hasOwnProperty("id") && data.header[key].onClick
                ? data.header[key].onClick?.(item.id)
                : null
            switch (data.header[key].type) {
              case HeaderTypeEnum.date:
                ceilResult = formatDateTime(data.list[index][key])
                break
              case HeaderTypeEnum.image:
                ceilResult = (
                  <img
                    src={data.list[index][key]}
                    alt={data.list[index][key]}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                )
                break
              default:
                ceilResult = data.list[index][key]
            }
            return (
              <td onClick={onClick} className="py-2 px-4 border-b">
                {ceilResult}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}
