import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type ReferrerScreenRouteProp = RouteProp<GridStackParamList, 'Referrer'>
type ReferrerScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'Referrer'
>
type ReferrerScreenProps = {
  route: ReferrerScreenRouteProp
  navigation: ReferrerScreenNavigationProp
}

export type {ReferrerScreenProps}
