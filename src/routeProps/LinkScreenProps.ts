import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type LinkScreenRouteProp = RouteProp<GridStackParamList, 'Link'>
type LinkScreenNavigationProp = StackNavigationProp<GridStackParamList, 'Link'>
type LinkScreenProps = {
  route: LinkScreenRouteProp
  navigation: LinkScreenNavigationProp
}

export type {LinkScreenProps}
