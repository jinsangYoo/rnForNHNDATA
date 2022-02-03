import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type WebviewScreenRouteProp = RouteProp<GridStackParamList, 'Webview'>
type WebviewScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'Webview'
>
type WebviewScreenProps = {
  route: WebviewScreenRouteProp
  navigation: WebviewScreenNavigationProp
}

export type {WebviewScreenProps}
