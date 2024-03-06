import { IToken } from "../../services/token/types.ts"
import { CreateTokenValues } from "../../pages/CreateToken/schema/create-token.schema.ts"

export interface ITokenInitialState {
  tokens: IToken[]
  token?: IToken
  query: IGetTokensQuery
  tokenFormData: CreateTokenValues
}

export interface IGetTokensQuery {
  page: number
  perPage: number
}
