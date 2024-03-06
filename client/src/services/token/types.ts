export interface IToken {
  id: number
  value: string
  is_valid: boolean
  created_at: string
}

export interface IGetTokenByIdResponse {
  tokens: IToken[]
  perPage: number
  page: number
  totalCount: number
}

export interface IGetTokenByIdRequest {
  id: number
}

export interface IVerifyTokenRequest {
  id: number
}

export interface IGetTokenListRequest {
  page?: number
  perPage?: number
}
