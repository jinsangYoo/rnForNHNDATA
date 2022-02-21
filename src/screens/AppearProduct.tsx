import React, {useState, useCallback, useLayoutEffect} from 'react'
import {StyleSheet} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {AppearProductScreenProps as Props} from '../routeProps'

import {getRandomIntInclusive} from '../../utils'
import {sendCommonWithPromise} from '../../acsdk'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'reactslimer'

const title = 'AppearProduct'
export default function AppearProduct({navigation}: Props) {
  const focus = useAutoFocus()
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])

  useLayoutEffect(() => {
    const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const randomValue = getRandomIntInclusive(0, 999).toString()
  const [url, setUrl] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const [productName, setProductName] = useState<string>(
    `제품명 >>${randomValue + 0}<<`,
  )
  const [productCategoryName, setProductCategoryName] = useState<string>(
    `제품카테 >>${randomValue + 0}<<`,
  )
  const [productPrice, setProductPrice] = useState<string>(
    getRandomIntInclusive(0, 990).toString(),
  )
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.APPEAR_PRODUCT, url)
    params.productName = productName
    params.productCategoryName = productCategoryName
    params.productPrice = productPrice
    sendCommonWithPromise(url, params)
  }, [url, productName, productCategoryName, productPrice])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={title}
          Left={() => (
            <Icon name="arrow-left-thick" size={30} onPress={onBack} />
          )}
        />
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>{title} 명(key: url)</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={url}
                onChangeText={setUrl}
                placeholder="이벤트 명 입력"
              />
            </View>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>제품 정보 입력</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={productName}
                onChangeText={setProductName}
                placeholder="제품명 입력"
              />
            </View>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={productCategoryName}
                onChangeText={setProductCategoryName}
                placeholder="제품 카테고리 입력"
              />
            </View>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={productPrice}
                onChangeText={setProductPrice}
                placeholder="제품 가격 입력"
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={onSend}>
            <Text style={[styles.text]}>{title}</Text>
          </TouchableView>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: 40},
  text: {fontSize: 20},
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {width: '100%', padding: 5, marginBottom: 10},
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10},
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
