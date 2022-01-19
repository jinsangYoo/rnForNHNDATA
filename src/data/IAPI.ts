type IAPI = {
  id: string
  avatar: string
  node: TypeForAPI
}

type TypeForAPI = {
  type:
    | 'Add Cart'
    | 'Appear Product'
    | 'Buy'
    | 'Del Cart'
    | 'Event'
    | 'Join'
    | 'Leave'
    | 'Link'
    | 'Login'
    | 'Push'
    | 'Referrer'
    | 'Search'
    | 'Tel'
  isEnable: boolean
}
export type {IAPI, TypeForAPI}
