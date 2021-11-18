import React, {ComponentProps, ComponentType} from 'react';
import type {FC} from 'react';
import type {StyleProp, TextStyle} from 'react-native';
import {TouchableView} from '.';
import type {TouchableViewProps} from '.';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

export type IconTextProps = TouchableViewProps &
  ComponentProps<typeof Icon> & {
    text: number | string;
    textStyle: StyleProp<TextStyle>;
  };

export const IconText: FC<IconTextProps> = ({
  name,
  size,
  color,
  textStyle,
  text,
  ...touchableViewProps
}) => {
  return (
    <TouchableView {...touchableViewProps}>
      <Icon name={name} size={size} color={color} />
      <Text style={textStyle}>{text}</Text>
    </TouchableView>
  );
};
