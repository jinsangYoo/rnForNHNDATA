import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type BuyCancelScreenRouteProp = RouteProp<GridStackParamList, 'BuyCancel'>
type BuyCancelScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'BuyCancel'
>
type BuyCancelScreenProps = {
  route: BuyCancelScreenRouteProp
  navigation: BuyCancelScreenNavigationProp
}

export type {BuyCancelScreenProps}
