import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type SearchScreenRouteProp = RouteProp<GridStackParamList, 'Search'>
type SearchScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'Search'
>
type SearchScreenProps = {
  route: SearchScreenRouteProp
  navigation: SearchScreenNavigationProp
}

export type {SearchScreenProps}
