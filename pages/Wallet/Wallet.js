
import { View, Text,StyleSheet, ScrollView, Image} from 'react-native'
import React from 'react'

import  TextButton from "../../components/TextButton"
import { FONTS, COLORS, SIZES} from "../../constants"

import Header from '../../components/Header'




export default function Wallet({navigation}) {

 const renderHeader = () => {
     return (
       <Header leftName={"chevron-back-outline"}
         middleName={"My Wallet"} />
     )
  }

  const renderButton = ({text, navigationTarget}) => {
      return (
          <TextButton name={text}
           onPress={() => {navigation.navigate(navigationTarget)}}
          />
      )
  }

  return (
    <View>
      <Text>Wallet</Text>

      {/* Header */}
      {renderHeader()}

      <View style={{alignItems:'center', justifyContent:'center',}}>
      <Image 
        source={require('../../assets/images/credit.png')}
        style={{width: "60%", height: 200}}
        resizeMode="contain" 

       />
       </View>

      {renderButton({text:"Payment Methods" ,navigationTarget:"MyCards"})}
      {renderButton({text:"Add", navigationTarget:"AddNewCard"})}



    </View>
  )
}