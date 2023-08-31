import {StyleSheet} from 'react-native'
import {Colors} from 'react-native-paper'
import color from 'color'

export const commonStyles = StyleSheet.create({
  flex: {flex: 1},
  rowTitle: {fontWeight: 'bold'},
  rowValueToLeftPadding: {paddingLeft: 5},
  widthFullView: {
    width: '100%',
    padding: 10,
  },
  widthFullAndRowFlexDirectionView: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  flexAndRowFlexDirectionViewNonPadding: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlexDirectionViewNonPadding: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
