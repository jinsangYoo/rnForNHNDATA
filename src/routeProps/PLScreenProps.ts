import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type PLScreenRouteProp = RouteProp<GridStackParamList, 'PL'>
type PLScreenNavigationProp = StackNavigationProp<GridStackParamList, 'PL'>
type PLScreenProps = {
  route: PLScreenRouteProp
  navigation: PLScreenNavigationProp
}

export type {PLScreenProps}
