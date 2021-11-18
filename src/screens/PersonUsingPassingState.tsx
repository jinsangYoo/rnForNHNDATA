import React, {FC, useCallback, useState} from 'react'
import {View, Image, Text, Alert} from 'react-native'
import * as D from '../data'
import {styles} from './Person.style'
import moment from 'moment-with-locales-es6'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Avatar, IconText} from '../components'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import PersonIcons from './PersonIcons'

moment.locale('ko')

export type PersonProps = {
  person: D.IPerson
}

const PersonUsingPassingState: FC<PersonProps> = ({person: initialPerson}) => {
  const avatarPressed = useCallback(() => Alert.alert('avatar pressed.'), [])
  const deletePressed = useCallback(() => Alert.alert('delete pressed.'), [])

  const [person, setPerson] = useState<D.IPerson>({
    ...initialPerson,
    counts: {
      comment: 0,
      retweet: 0,
      heart: 0,
    },
  })

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={person.avatar}
          size={50}
          onPress={avatarPressed}
        />
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.text]}>
            {moment(person.createdDate).startOf('day').fromNow()}
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
          {person.comments}
        </Text>
        <Image source={{uri: person.image}} style={[styles.image]} />
        <PersonIcons person={person} setPerson={setPerson} />
      </View>
    </View>
  )
}

export default PersonUsingPassingState
