import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Svg, { Circle, Rect } from 'react-native-svg';

const dummyData = [
  {x: new Date(2018, 9, 1), y:0},
  {x: new Date(2018, 9, 2), y:0},
  {x: new Date(2018, 9, 3), y:200},
  {x: new Date(2018, 9, 4), y:210},
  {x: new Date(2018, 9, 5), y:300},
  {x: new Date(2018, 9, 6), y:340},
]

const height = 200;
const {width} = Dimensions.get('window')

export default function LineChart() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Svg height={height} width={width} viewBox="0 0 100 100" >
          {/* <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
          <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" /> */}
          
        </Svg>
      </View>
      <Text>LineChart</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
   root: {
     flex:1
   },
   container: {
     marginTop:60,
      height,
      width
   }
})