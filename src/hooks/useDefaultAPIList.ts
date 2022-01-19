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
    {type: 'Add Cart', isEnable: true},
    {type: 'Appear Product', isEnable: false},
    {type: 'Buy', isEnable: false},
    {type: 'Del Cart', isEnable: false},
    {type: 'Event', isEnable: false},
    {type: 'Join', isEnable: false},
    {type: 'Leave', isEnable: false},
    {type: 'Link', isEnable: false},
    {type: 'Login', isEnable: false},
    {type: 'Push', isEnable: false},
    {type: 'Referrer', isEnable: false},
    {type: 'Search', isEnable: false},
    {type: 'Tel', isEnable: false},
  ])
  return useMemo(() => {
    return name.map(item => createAPI(item))
  }, [deps])
}
