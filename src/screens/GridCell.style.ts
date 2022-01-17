import {StyleSheet} from 'react-native'
import {Colors} from 'react-native-paper'
import color from 'color'

export const styles = StyleSheet.create({
  view: {padding: 5, borderColor: Colors.red500, borderWidth: 2},
  topView: {padding: 5, alignItems: 'center'},
  avatar: {
    borderColor: color(Colors.blue500).lighten(0.5).string(),
    borderWidth: 2,
  },
  bottomView: {flex: 1, padding: 5, alignItems: 'center'},
  name: {fontSize: 22, fontWeight: '500'},
  text: {fontSize: 16},
  remark: {marginTop: 10, fontSize: 16},
})
