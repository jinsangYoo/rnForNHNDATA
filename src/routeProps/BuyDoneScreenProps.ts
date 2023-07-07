import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type BuyDoneScreenRouteProp = RouteProp<GridStackParamList, 'BuyDone'>
type BuyDoneScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'BuyDone'
>
type BuyDoneScreenProps = {
  route: BuyDoneScreenRouteProp
  navigation: BuyDoneScreenNavigationProp
}

export type {BuyDoneScreenProps}
