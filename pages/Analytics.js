import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {FONTS, COLORS, SIZES} from "../constants"
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-elements';
import LineChart from '../components/Analytics/LineChart';
import CircularProgressUI from '../components/Analytics/CircularProgressUI';

const {backend_url,token} = require("../config/config");

export default function Analytics() {
  const renderHeader = () =>{
    return (<View style={{
      backgroundColor: COLORS.white,
      //paddingTop: SIZES.padding
   }}>
      <View style={styles.logo}>
     

     <Icon name={"logo-react"} type="ionicon" size={30} color={ COLORS.primary} />


     </View>
   </View>)
  }

  return (
    <View>
      {renderHeader()}
      {/* <LineChart /> */}
      <CircularProgressUI />
    </View>
  )
}


const styles = StyleSheet.create({
  screen:{
   //padding: 10,
   backgroundColor: COLORS.white
  },

  logo: {
    marginTop: SIZES.padding *3,
    marginBottom: SIZES.padding,
    height: 30,
    
    alignItems: 'center',
    justifyContent:'center',
 },
  
 
});