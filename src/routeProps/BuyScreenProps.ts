import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type BuyScreenRouteProp = RouteProp<GridStackParamList, 'Buy'>
type BuyScreenNavigationProp = StackNavigationProp<GridStackParamList, 'Buy'>
type BuyScreenProps = {
  route: BuyScreenRouteProp
  navigation: BuyScreenNavigationProp
}

export type {BuyScreenProps}
