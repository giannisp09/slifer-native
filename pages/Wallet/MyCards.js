import { View, Text,StyleSheet, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'

import  TextButton from "../../components/TextButton"
import { FONTS, COLORS, SIZES} from "../../constants"

import Header from '../../components/Header'
import {CardItem} from '../../components'
import { $CombinedState } from 'redux'


export default function MyCards({navigation}) {

  const dummyData = [
    {id:1,name:"MasterCard", icon:"logo-bitcoin" },
    {id:2,name:"Google Pay", icon:"logo-google" },
  ]

  const dummyDataAll = [
    {id:1,name:"MasterCard", icon:"logo-bitcoin" },
    {id:2,name:"Google Pay", icon:"logo-google" },
    {id:3,name:"Visa", icon:"logo-bitcoin" },
    {id:4,name:"Apple Pay", icon:"logo-apple" },
    {id:5,name:"PayPal", icon:"logo-paypal" },
    // {id:6,name:"Google Pay", icon:"logo-google" },
  ]

  let mycard_ids = dummyData.map(a => a.id);


  const [selectedCard, setSelectedCard] = useState(null)

  
  const renderHeader = () => {
      return (
          <Header leftName={"chevron-back-outline"}
          middleName={"My Cards"} />
      )
  }

  const renderFooter = () => {
     return (
        <View
         style={{
           //paddingTop: SIZES.radius,
           paddingBottom: SIZES.padding,
           paddingHorizontal: SIZES.padding
         }}>
           <TextButton 
              disabled={selectedCard == null}
              name={selectedCard?.key =="NewCard" ? "Add" :
              "Proceed"}
              buttonStyle={{
                height: 60,
                backgroundColor: selectedCard == null ? COLORS.lightGray 
                :COLORS.primary,
                borderRadius: SIZES.radius / 1.5,
                alignItems: 'center',
                justifyContent:'center',
              }}
              onPress={() => {
                if (selectedCard.key =="NewCard"){
                navigation.navigate("AddNewCard",{
                  selectedCard: selectedCard
                })
                }
                else {
                  navigation.navigate("Wallet",{
                    selectedCard: selectedCard
                  })
                }
              }
              }
           
           />


        </View>
     )
  }

  const renderMyCards = () => {
    return (
      <View>
         {dummyData.map((item, index) => {
            return (
              <CardItem 
                  key={`MyCard-${item.id}`}
                  item={item}
                  isSelected={`${selectedCard?.key}-${selectedCard?.id}`
                   == `MyCard-${item.id}`}
                  onPress={() => {setSelectedCard({...item, key:"MyCard"})}}
              />
            )
         })}
      </View>
    )
  }
  
  return (
    <View style={{flex:1, backgroundColor:COLORS.white}}>
       {/* Headers */}
       {renderHeader()}

       {/* Cards */}
       <ScrollView
        contentContainerStyle={{
           flexGrow: 1,
           marginTop: SIZES.radius,
           paddingHorizontal: SIZES.padding,
           paddingBottom: SIZES.radius
        }}
       >
         {/* My Cards */}
         {renderMyCards()}

         {/* Add New Card */}

        <Text style={{marginTop:SIZES.padding,...FONTS.h3}}>
          Add new card
        </Text>

        {dummyDataAll.map((item, index) => {
           return (
            <CardItem 
              key={`NewCard-${item.id}`}
              item={item}
             isSelected={`${selectedCard?.key}-${selectedCard?.id}`
              == `NewCard-${item.id}`}
              onPress={() => {setSelectedCard({...item, key:"NewCard"})}}
       />)
        })}

       </ScrollView>

       {/* Footer */}
       {renderFooter()}
    </View>
  )
}