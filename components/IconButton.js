import { View, Text } from 'react-native'
import React from 'react'

export default function IconButton({iconName, onPress}) {
  return (
    <View style={{margin: SIZES.padding *3}}>
    <TouchableOpacity
      style= {styles.button}
      onPress={onPress }
    >
       <Text style={{color: COLORS.white, ...FONTS.h3}}> {iconName} </Text>      

    </TouchableOpacity>


 </View>
  )
}