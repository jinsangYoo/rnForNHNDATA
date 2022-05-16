import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type GridScreenRouteProp = RouteProp<GridStackParamList, 'Grid'>
type GridScreenNavigationProp = StackNavigationProp<GridStackParamList, 'Grid'>
type GridScreenProps = {
  route: GridScreenRouteProp
  navigation: GridScreenNavigationProp
}

export type {GridScreenProps}
