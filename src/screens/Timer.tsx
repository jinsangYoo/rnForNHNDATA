import React from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native'
import {Colors} from 'react-native-paper'
import {useToggle, useTimeout} from '../hooks'

const title = 'Timer'
export default function Timer() {
  const [loading, toggleLoading] = useToggle(true)
  useTimeout(
    () => {
      console.log(Platform.OS, 'loading: ', loading)
      loading && toggleLoading()
    },
    3000,
    [loading],
  )

  return (
    <View style={[styles.view]}>
      <Text style={[styles.title]}>{title}</Text>
      <Text>loading: {loading.toString()}</Text>
      <Button
        onPress={toggleLoading}
        title={loading ? 'stop loading' : 'start loading'}
      />
      {loading && (
        <ActivityIndicator size="large" color={Colors.deepPurple700} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.yellow300},
  title: {fontSize: 30, color: 'white', fontWeight: '600'},
})
