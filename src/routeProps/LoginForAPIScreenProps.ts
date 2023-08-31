import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type LoginForAPIScreenRouteProp = RouteProp<GridStackParamList, 'LoginForAPI'>
type LoginForAPIScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'LoginForAPI'
>
type LoginForAPIScreenProps = {
  route: LoginForAPIScreenRouteProp
  navigation: LoginForAPIScreenNavigationProp
}

export type {LoginForAPIScreenProps}
