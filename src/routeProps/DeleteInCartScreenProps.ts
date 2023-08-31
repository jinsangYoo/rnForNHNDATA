import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type DeleteInCartScreenRouteProp = RouteProp<GridStackParamList, 'DeleteInCart'>
type DeleteInCartScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'DeleteInCart'
>
type DeleteInCartScreenProps = {
  route: DeleteInCartScreenRouteProp
  navigation: DeleteInCartScreenNavigationProp
}

export type {DeleteInCartScreenProps}
