import {useMemo, useState} from 'react'
import type {IAPI, TypeForAPI} from '../data/IAPI'
import * as F from '../data/faker'

const createAPI = (api: TypeForAPI) => {
  return {
    id: F.randomId(),
    avatar: F.randomAvatarUrl(api.type),
    node: api,
  } as IAPI
}

export const useDefaultAPIList = (deps: any[] = []) => {
  const [name, setName] = useState<TypeForAPI[]>([
    {type: 'AddInCart', isEnable: false},
    {type: 'AppearProduct', isEnable: true},
    {type: 'Buy', isEnable: false},
    {type: 'DeleteInCart', isEnable: false},
    {type: 'Join', isEnable: false},
    {type: 'Leave', isEnable: false},
    {type: 'Link', isEnable: true},
    {type: 'LoginForAPI', isEnable: false},
    {type: 'PL', isEnable: true},
    {type: 'Search', isEnable: true},
    {type: 'Tel', isEnable: true},
    {type: 'Webview', isEnable: false},
  ])
  return useMemo(() => {
    return name.map(item => createAPI(item))
  }, [deps])
}
