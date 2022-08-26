import { View, Text } from 'react-native'
import React from 'react'

import { useState, useEffect,useContext } from "react";
import axios from "axios";
import {AuthContext, AuthState} from "../../helpers/AuthContext";

const {backend_url} = require("../../config/config");
import * as SecureStore from 'expo-secure-store';


export default function Charity() {

  const [foundations, setFoundations] = useState([])

  useEffect(async () => {

      var token =  await SecureStore.getItemAsync("access-token");
      axios.get( backend_url + "foundations/",
      {headers : {accessToken: token}}).then((response) =>{
        console.log(response.data)
        setFoundations(response.data);
        
      });
  }, [])


  return (
    <View>
      <Text>Charity</Text>
      <View>
      
      </View>
    </View>

   
  )
}