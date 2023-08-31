type IAPI = {
  id: string
  avatar: string
  node: TypeForAPI
}

type TypeForAPI = {
  type:
    | 'SDK_Configure_Setting'
    | 'ManuallySetAD_ID'
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
  displayName: string
  isEnable: boolean
}
export type {IAPI, TypeForAPI}
