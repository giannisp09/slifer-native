import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


import { FONTS, COLORS, SIZES} from "../constants"
import { defineAnimation } from 'react-native-reanimated';


export default function TextButton({disabled, name, buttonStyle ,onPress}) {
  return (
    <View style={{margin: SIZES.padding *3}} > 
       <TouchableOpacity
       disabled={disabled}
         style= {buttonStyle == null ? styles.button :buttonStyle}
         onPress={onPress }
       >
          <Text style={{color: COLORS.white, ...FONTS.h3}}> {name} </Text>      

       </TouchableOpacity>


    </View>
  )
}


const styles = StyleSheet.create({
  
 

  logo: {
     marginTop: SIZES.padding *5,
     height: 60,
     
     alignItems: 'center',
     justifyContent:'center',
  },

 
  button: {
    height: 60,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent:'center',
  },

  button2: {
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent:'center',
  },

  passwordVisibility: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    height: 30,
    width: 30,
  }


});

