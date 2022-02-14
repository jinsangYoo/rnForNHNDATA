import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {StyleSheet, FlatList} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useScrollEnabled} from '../contexts'
import {useDispatch} from 'react-redux'
import * as D from '../data'
import * as L from '../store/login'
import ProductRowCell from './ProductRowCell'
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

const title = 'Buy'
export default function DeleteInCart({navigation}: Props) {
  const dispatch = useDispatch()
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])
  const logout = useCallback(() => {
    dispatch(L.logoutAction())
    navigation.reset({index: 0, routes: [{name: 'Login'}]})
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
    setProducts(products => [D.createRandomProduct(), ...products])
  }, [])
  const deleteProduct = useCallback(
    (id: string) => () => {
      setProducts(products => products.filter(p => p.productId != id))
    },
    [],
  )

  const randomValue = getRandomIntInclusive(0, 999)
  const [url, setUrl] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.BUY, url)
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
  }, [products])

  const renderSeparator = useCallback(() => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    )
  }, [])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={title}
          Left={() => (
            <Icon name="arrow-left-thick" size={30} onPress={onBack} />
          )}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
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
