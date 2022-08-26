import { StyleSheet,Modal, AppRegistry, Text, View, Button,TextInput , ScrollView,FlatList,Platform} from 'react-native';
import axios from 'axios'
import React, {useState,useEffect,useContext} from 'react';
import {AuthContext} from "../../helpers/AuthContext"
import { CheckBox, List, ListItem } from "react-native-elements";
import PostComponent from '../../components/Post/PostComponent';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FONTS, COLORS, SIZES} from "../../constants"
import Header from '../../components/Header';
import * as SecureStore from 'expo-secure-store';


import {
  CardField,
  CardFieldInput,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import CheckoutForm from '../../components/CheckoutForm';



const {backend_url,token} = require("../../config/config");

export default function Payment() {
  const [publishableKey, setPublishableKey] = useState('')

  const [cardDetails, setCardDetails] = useState(null)


  const renderHeader = () => {
    return (
        <Header leftName={"chevron-back-outline"}
        middleName={"Add Card"} />
    )
  }

  return (
    <StripeProvider publishableKey={publishableKey}>
    <View style={{flex:1, backgroundColor: "white"}}>
      {/* Header */}
      <Text>Payment</Text>
      {renderHeader()}
      


      {/* Form */}
      <CheckoutForm />

      {/* Footer */}

      
    </View>
    </StripeProvider>
  )
}

