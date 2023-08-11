import {useMemo, useState} from 'react'
import {Platform} from 'react-native'
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
    {
      type: 'SDK_Configure_Setting',
      displayName: 'SDK 초기화 설정',
      isEnable: true,
    },
    {type: 'AddInCart', displayName: '장바구니 추가', isEnable: true},
    {type: 'AppearProduct', displayName: '제품노출', isEnable: true},
    {type: 'BuyDone', displayName: '구매완료', isEnable: true},
    {type: 'BuyCancel', displayName: '구매취소', isEnable: true},
    {type: 'DeleteInCart', displayName: '장바구니 취소', isEnable: true},
    {type: 'Join', displayName: '회원가입', isEnable: true},
    {type: 'Leave', displayName: '회원탈퇴', isEnable: true},
    {type: 'Link', displayName: '링크', isEnable: true},
    {type: 'LoginForAPI', displayName: '로그인', isEnable: true},
    {type: 'PL', displayName: 'PL', isEnable: true},
    {
      type: 'Referrer',
      displayName: 'Install Referrer',
      isEnable: Platform.OS === 'android' ? true : false,
    },
    {type: 'Search', displayName: '검색', isEnable: true},
    {type: 'Tel', displayName: '연락처', isEnable: true},
    {type: 'Webview', displayName: '웹뷰', isEnable: true},
  ])
  return useMemo(() => {
    return name.map(item => createAPI(item))
  }, [deps])
}
