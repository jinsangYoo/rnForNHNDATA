import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import {Colors} from 'react-native-paper'
import Country from './Country'
import * as D from '../data'
import {useAsync} from '../hooks'

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

const title = 'Fetch'
export default function Fetch() {
  useLayoutEffect(() => {
    const randomValue = getRandomIntInclusive(0, 999).toString()
    const msg = `>>${title}<< >>${randomValue}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [countries, setCountries] = useState<D.ICountry[]>([])
  const [error, resetError] = useAsync(async () => {
    setCountries([])
    resetError()
    // await Promise.reject(new Error('some error occurs'))
    const countries = await D.getCountries()
    setCountries(countries)
  })

  return (
    <View style={[styles.view]}>
      <Text style={[styles.title]}>{title}</Text>
      {error && <Text>{error.message}</Text>}
      <FlatList
        data={countries}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Country country={item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.blue100},
  title: {fontSize: 30, color: 'white', fontWeight: '600'},
  separator: {borderBottomColor: Colors.blue50, borderBottomWidth: 1},
})
