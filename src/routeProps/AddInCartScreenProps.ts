import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type AddInCartScreenRouteProp = RouteProp<GridStackParamList, 'AddInCart'>
type AddInCartScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'AddInCart'
>
type AddInCartScreenProps = {
  route: AddInCartScreenRouteProp
  navigation: AddInCartScreenNavigationProp
}

export type {AddInCartScreenProps}
