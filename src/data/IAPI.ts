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
    | 'Event'
    | 'Join'
    | 'Leave'
    | 'Link'
    | 'LoginForAPI'
    | 'Search'
    | 'Tel'
    | 'Webview'
  isEnable: boolean
}
export type {IAPI, TypeForAPI}
