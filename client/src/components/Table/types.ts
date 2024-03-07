export interface ITableProps {
  data: ITableData
}

export interface ITableData {
  list: any[]
  header: Record<string, IHeaderValue>
}

export interface IHeaderValue {
  name: string
  type?: HeaderTypeEnum
  onClick?: (id: number) => void
}

export enum HeaderTypeEnum {
  text = "text",
  image = "image",
  date = "date",
}
