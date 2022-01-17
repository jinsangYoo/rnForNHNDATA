import {useMemo, useState} from 'react'
import type {IAPI} from '../data/IAPI'
import * as F from '../data/faker'

const createAPI = (node: Record<string, boolean>) => {
  return {
    id: F.randomId(),
    name: Object.keys(node)[0],
    avatar: F.randomAvatarUrl(Object.keys(node)[0]),
    isEnable: Object.values(node)[0],
  } as IAPI
}

export const useDefaultAPIList = (deps: any[] = []) => {
  const [name, setName] = useState<Record<string, boolean>[]>([
    {'Add Cart': true},
    {'Appear Product': false},
    {BUY: false},
    {'Del Cart': false},
    {Event: false},
    {Join: false},
    {Leave: false},
    {Link: false},
    {Login: false},
    {Push: false},
    {Referrer: false},
    {Search: false},
    {Tel: false},
  ])
  return useMemo(() => {
    return name.map(item => createAPI(item))
  }, [deps])
}
