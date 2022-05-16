type IAPI = {
  id: string
  avatar: string
  node: TypeForAPI
}

type TypeForAPI = {
  type:
    | 'AddInCart'
    | 'AppearProduct'
    | 'BuyDone'
    | 'BuyCancel'
    | 'DeleteInCart'
    | 'Join'
    | 'Leave'
    | 'Link'
    | 'LoginForAPI'
    | 'PL'
    | 'Referrer'
    | 'Search'
    | 'Tel'
    | 'Webview'
  isEnable: boolean
}
export type {IAPI, TypeForAPI}
