import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import {Icon} from 'react-native-elements';
import {COLORS, SIZES, FONTS} from "../constants"

export default function Header({leftName, middleName, rightName}) {
  return (
    <View style={styles.reactionsFooter}>
      <Icon name={"chevron-back-outline"} type="ionicon" size={30} color={ COLORS.black} />
      <View style={{ alignItems: 'center',justifyContent:'center'}}>
      <Text >{middleName}</Text>
      </View>
   </View>
  )
}

const styles = StyleSheet.create({
    reactionsFooter:{
        backgroundColor: '#fff',
        padding: 10,
        marginTop: SIZES.padding *2,
        marginBottom: SIZES.padding,
        flexDirection: "row"
       
      },
})