import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {Icon} from 'react-native-elements';

import{ FONTS, COLORS, SIZES} from '../constants'

 const RadioButton = ({
    containerStyle,
    label,
    labelStyle,
    iconStyle,
    isSelected,
    onPress
}) => {
  return (
   <TouchableOpacity
       style={{
           flexDirection: 'row',
           alignItems: 'center',
           justifyContent: 'center',
           ...containerStyle
       }}
       onPress={onPress}

   >
     {/* Radio Button */}
     <Icon name={isSelected ? "radio-button-on" : "radio-button-off"}
      type="ionicon" size={30} color={ COLORS.primary} />
      <Text
        style={{
            marginLeft: SIZES.radius,
            color: COLORS.gray,
            ...FONTS.body3,
            ...labelStyle
        }}
      >{
      label}</Text>



   </TouchableOpacity>
  )
}

export default RadioButton
