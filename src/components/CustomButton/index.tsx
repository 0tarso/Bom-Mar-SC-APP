import { View, Text, ButtonProps, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/Theme/Colors'

interface Props extends TouchableOpacityProps {
  onPress: () => void
  title: string,
  backgroundColor: string,
  titleColor: string
}


const CustomButton = (props: Props) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: props.backgroundColor,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      elevation: 2,
      // borderBottomWidth: 3,
      // borderBottomColor: COLORS.BUTTON_BORDER_COLOR
    }}
      onPress={props.onPress}
    >
      <Text style={{
        color: props.titleColor,
        fontFamily: 'MontserratBold',
        fontSize: 14
      }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton