type IAPI = {
  id: string
  avatar: string
  node: TypeForAPI
}

type TypeForAPI = {
  type:
    | 'AddInCart'
    | 'AppearProduct'
    | 'Buy'
    | 'DeleteInCart'
    | 'Join'
    | 'Leave'
    | 'Link'
    | 'LoginForAPI'
    | 'PL'
    | 'Search'
    | 'Tel'
    | 'Webview'
  isEnable: boolean
}
export type {IAPI, TypeForAPI}
