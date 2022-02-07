import {StyleSheet} from 'react-native'
import {Colors} from 'react-native-paper'

export const styles = StyleSheet.create({
  view: {
    width: '100%',
    padding: 5,
    borderColor: Colors.red500,
    borderWidth: 2,
  },
  firstRowView: {flexDirection: 'row', padding: 5, alignItems: 'center'},
  secondRowView: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },

  name: {fontSize: 22, fontWeight: '500', width: '60%'},
  category: {fontSize: 14, width: '20%'},
  price: {fontSize: 14, width: '20%'},
  quantity: {fontSize: 14, width: '40%'},
  productId: {fontSize: 14, width: '20%'},
  optionCodeName: {fontSize: 14, width: '20%'},

  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 16},
})
