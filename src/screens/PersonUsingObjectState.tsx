import React, {FC, useCallback, useState} from 'react'
import {View, Image, Text, Alert} from 'react-native'
import * as D from '../data'
import {styles} from './Person.style'
import moment from 'moment-with-locales-es6'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Avatar, IconText} from '../components'
import {Colors} from 'react-native/Libraries/NewAppScreen'

moment.locale('ko')

export type PersonProps = {
  person: D.IPerson
}

const PersonUsingObjectState: FC<PersonProps> = ({person: initialPerson}) => {
  const avatarPressed = useCallback(() => Alert.alert('avatar pressed.'), [])
  const deletePressed = useCallback(() => Alert.alert('delete pressed.'), [])

  const [person, setPerson] = useState<D.IPerson>({
    ...initialPerson,
    counts: {
      comment: initialPerson.counts.comment,
      retweet: initialPerson.counts.retweet,
      heart: initialPerson.counts.heart,
    },
  })
  const commentPressed = useCallback(
    () =>
      setPerson(person => ({
        ...person,
        counts: {...person.counts, comment: person.counts.comment + 1},
      })),
    [],
  )
  const retweetPressed = useCallback(
    () =>
      setPerson(person => ({
        ...person,
        counts: {...person.counts, retweet: person.counts.retweet + 1},
      })),
    [],
  )
  const heartPressed = useCallback(
    () =>
      setPerson(person => ({
        ...person,
        counts: {...person.counts, heart: person.counts.heart + 1},
      })),
    [],
  )

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={initialPerson.avatar}
          size={50}
          onPress={avatarPressed}
        />
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{initialPerson.name}</Text>
        <Text style={[styles.email]}>{initialPerson.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.text]}>
            {moment(initialPerson.createdDate).startOf('day').fromNow()}
          </Text>
          <Icon
            name="trash-can-outline"
            size={26}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, styles.comments]}>
          {initialPerson.comments}
        </Text>
        <Image source={{uri: initialPerson.image}} style={[styles.image]} />
        <View style={[styles.countsView]}>
          <IconText
            viewStyle={[styles.touchableIcon]}
            onPress={commentPressed}
            name="comment"
            size={24}
            color={Colors.blue500}
            textStyle={[styles.iconText]}
            text={person.counts.comment}
          />
          <IconText
            viewStyle={[styles.touchableIcon]}
            onPress={retweetPressed}
            name="twitter-retweet"
            size={24}
            color={Colors.blue500}
            textStyle={[styles.iconText]}
            text={person.counts.retweet}
          />
          <IconText
            viewStyle={[styles.touchableIcon]}
            onPress={heartPressed}
            name="heart"
            size={24}
            color={Colors.blue500}
            textStyle={[styles.iconText]}
            text={person.counts.heart}
          />
        </View>
      </View>
    </View>
  )
}

export default PersonUsingObjectState
