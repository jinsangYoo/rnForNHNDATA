import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type TelScreenRouteProp = RouteProp<GridStackParamList, 'Tel'>
type TelScreenNavigationProp = StackNavigationProp<GridStackParamList, 'Tel'>
type TelScreenProps = {
  route: TelScreenRouteProp
  navigation: TelScreenNavigationProp
}

export type {TelScreenProps}
