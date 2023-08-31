import React, {useState, useCallback, useEffect} from 'react'
import {StyleSheet, ActivityIndicator} from 'react-native'
import {Colors} from 'react-native-paper'
import {SafeAreaView, View, Text, TopBar, UnderlineText} from '../theme'

export default function Fetch() {
  const [humorText, setHumorText] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const getHumor = useCallback(() => {
    setHumorText('')
    setErrorMessage('')
    setLoading(true)
    fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(result => {
        setHumorText(result.value)
        setLoading(false)
      })
      .catch(e => {
        setErrorMessage(e.message)
        setLoading(false)
      })
  }, [])
  useEffect(getHumor, [])

  return (
    <SafeAreaView>
      <TopBar>
        <UnderlineText style={[styles.text]} onPress={getHumor}>
          get humor
        </UnderlineText>
      </TopBar>
      {loading && (
        <ActivityIndicator size="large" color={Colors.lightBlue500} />
      )}
      <View style={[styles.content]}>
        <Text style={[styles.text]}>{humorText}</Text>
        {errorMessage.length > 0 && (
          <Text style={[styles.text]}>{errorMessage}</Text>
        )}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  text: {fontSize: 20, textAlign: 'center'},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
})
