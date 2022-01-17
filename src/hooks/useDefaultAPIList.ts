import {useMemo, useState} from 'react'
import type {IAPI} from '../data/IAPI'
import * as F from '../data/faker'

const createAPI = (name: string) => {
  return {
    id: F.randomId(),
    name: name,
    avatar: F.randomAvatarUrl(name),
    isEnable: false,
  } as IAPI
}

export const useDefaultAPIList = (deps: any[] = []) => {
  const [name, setName] = useState<string[]>(['PL', 'BUY'])
  return useMemo(() => {
    return name.map(item => createAPI(item))
  }, [deps])
}
