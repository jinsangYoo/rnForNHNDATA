import React from 'react'
import type {FC} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import * as D from '../data'

export type ContryProps = {
  country: D.ICountry
}

const Country: FC<ContryProps> = ({country}) => {
  const {region, subregion, name, capital, population} = country

  return (
    <View style={[styles.view]}>
      <View>
        <Text style={[styles.name]}>{name}</Text>
      </View>
      <View>
        <Text>capital: {capital}</Text>
        <Text>population: {population}</Text>
        <Text>subregion: {subregion}</Text>
        <Text>region: {region}</Text>
      </View>
    </View>
  )
}

export default Country
const styles = StyleSheet.create({
  view: {padding: 5},
  name: {fontSize: 30, color: 'white', fontWeight: '400'},
})
