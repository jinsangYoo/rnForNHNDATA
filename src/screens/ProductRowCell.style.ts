import {StyleSheet, Platform} from 'react-native'
import {Colors} from 'react-native-paper'

export const styles = StyleSheet.create({
  view: {
    width: '100%',
    padding: 3,
  },
  firstRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {height: 40},
    }),
  },
  secondRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {height: 40},
    }),
  },

  name: {fontSize: 22, fontWeight: '500', width: '60%', height: '100%'},
  category: {fontSize: 14, width: '20%', height: '100%'},
  price: {fontSize: 14, width: '20%', height: '100%'},
  quantity: {fontSize: 14, width: '40%', height: '100%'},
  productId: {fontSize: 14, width: '20%', height: '100%'},
  optionCodeName: {fontSize: 14, width: '20%', height: '100%'},

  touchableView: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 16},
})
