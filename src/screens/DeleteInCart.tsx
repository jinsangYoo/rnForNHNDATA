import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {StyleSheet, FlatList} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useScrollEnabled} from '../contexts'
import * as D from '../data'
import ProductRowCell from './ProductRowCell'
import {useRenderSeparator} from '../hooks'
import {AddInCartScreenProps as Props} from '../routeProps'

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

const title = 'DeleteInCart'
export default function DeleteInCart({navigation}: Props) {
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])

  useEffect(() => {
    D.makeArray(1).forEach(addProduct)
  }, [])
  useLayoutEffect(() => {
    const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const [scrollEnabled] = useScrollEnabled()

  // product
  const [products, setProducts] = useState<D.IProduct[]>([])
  const addProduct = useCallback(() => {
    const randomValue = getRandomIntInclusive(0, 99)
    setProducts(products => [D.createRandomProduct(randomValue), ...products])
  }, [])
  const deleteProduct = useCallback(
    (id: string) => () => {
      setProducts(products => products.filter(p => p.productId != id))
    },
    [],
  )

  const randomValue = getRandomIntInclusive(0, 999)
  const [url, setUrl] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const [memberKey, setMemberKey] = useState<string>(
    `멈버ID >>${randomValue + 0}<<`,
  )
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.DELCART)
    params.memberKey = memberKey
    params.products = []
    products.map(item => {
      params.products?.push(
        new ACProduct(
          item.name,
          item.category,
          item.price,
          item.quantity,
          item.productId,
          item.optionCodeName,
        ),
      )
    })
    sendCommonWithPromise(url, params)
  }, [products, memberKey])

  const renderSeparator = useRenderSeparator()

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={title}
          Left={() => (
            <Icon name="arrow-left-thick" size={30} onPress={onBack} />
          )}
        />
        <View border style={[styles.textInputView]}>
          <TextInput
            style={[styles.textInput]}
            value={memberKey}
            onChangeText={setMemberKey}
            placeholder="멈버ID 입력"
          />
        </View>
        <TouchableView
          notification
          style={[styles.touchableView]}
          onPress={addProduct}>
          <Text style={[styles.text]}>제품 추가</Text>
        </TouchableView>
        <FlatList
          scrollEnabled={scrollEnabled}
          data={products}
          extraData={products}
          ItemSeparatorComponent={renderSeparator}
          renderItem={({item, index}) => (
            <ProductRowCell
              product={item}
              index={index}
              onDeletePressed={deleteProduct(item.productId)}
              onChange={(product, index) => {
                products[index] = {...products[index], ...product}
              }}
              isDisableProductIdAndOptionCodeName={true}
            />
          )}
          keyExtractor={item => item.id}
        />
        <TouchableView
          notification
          style={[styles.touchableView, styles.bottomAPITouchableView]}
          onPress={onSend}>
          <Text style={[styles.text]}>{title}</Text>
        </TouchableView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center'},
  title: {fontSize: 40},
  text: {fontSize: 20},
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10, width: '90%'},
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 255, 99, 0.5)',
  },
  bottomAPITouchableView: {
    marginVertical: 10,
  },
})
