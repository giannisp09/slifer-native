import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import {COLORS, SIZES, FONTS} from '../constants'
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-elements';


    


export default function CardItem({item, isSelected, onPress}) {
  return (
    <TouchableOpacity 
       style={{
           flexDirection: 'row',
           height: 100,
           alignItems: 'center',
           marginTop: SIZES.radius,
           paddingHorizontal: SIZES.padding,
           borderWidth: 2,
           borderColor: isSelected ? COLORS.primary : COLORS.lightGray2
          
       }}
       onPress={onPress}
       >

         {/* Card Image */}
         <View
         style={{
             width: 60,
             height: 45,
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius: SIZES.radius,
             borderWidth: 2,
             borderColor: COLORS.lightGray2

         }}>
            <Icon name={item.icon} type="ionicon" size={30} color={ COLORS.primary} />


         </View>

         {/* Name */}

         <Text
           style={{
               flex:1, 
               marginLeft: SIZES.radius,
               ...FONTS.h3
           }}
         >
            {item.name}
        </Text>


         {/* Radio Button */}
         <Icon name={isSelected ? "radio-button-on" : "radio-button-off"}
          type="ionicon" size={30} color={ COLORS.primary} />


    </TouchableOpacity>
  )
}