import 'react-native-gesture-handler';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, {useState,useEffect,useContext} from 'react';
//import { FlatList } from 'react-native-web';
import { StyleSheet,Image, Modal, AppRegistry, Text, View, Button,TextInput , ScrollView,FlatList, Platform} from 'react-native';
import { NativeRouter,Switch, Route,Router, Link, Routes } from "react-router-native";
import axios from 'axios';
import Tabs from './navigation/tabs'
import {AuthContext} from "./helpers/AuthContext"


import PostComponent from './components/Post/PostComponent'
import Goalnput from './components/Goalnput';
import Login from './pages/Main/Login'
import Signup from './pages/Main/Signup'
import { SafeAreaView } from 'react-native-safe-area-context';

import {createNativeStackNavigator}  from "@react-navigation/native-stack"
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'


const {backend_url, token} = require("./config/config");
import { useFonts } from 'expo-font';

// import {save,getValueFor} from './helpers/Storage'

import * as SecureStore from 'expo-secure-store';
import CustomDrawer from './navigation/drawer';

import { createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk"
import rootReducer from "./stores/rootReducer"
import {COLORS, SIZES, FONTS} from "./constants"
import { Icon } from 'react-native-elements';

const store = createStore(
   rootReducer,
   applyMiddleware(thunk)
)


async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {

    alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    alert('No values stored under that key.');
    return "no token"
  }
}



const Stack = createNativeStackNavigator()

export default function App() {

 const [loaded] = useFonts({
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

 
 useEffect(async () => {
    let token =  await SecureStore.getItemAsync("access-token");
    
    console.log("here")
    console.log(token)
    axios.get(backend_url +"auth/auth/",
    {headers:{
      'Authorization': 'Bearer ' + token
    }}).then((response) =>{
      if (response.data.detail){
        setAuthState({username:"",id:0, status:false})

      }
      else {
        console.log("authorized" + response.data)
        setAuthState({username: response.data.username, id: response.data.id,status:true,
           profile_photo:response.data.profile_photo})
        console.log(authState)
        
      }
    })
    
  }, []) 
 
  
  

  const [authState,setAuthState] = useState({username:"",id:0, status:false})

  
  const Test= () => <Text>{"test"}</Text>;

  
 
  

  const renderLogo = () => {
    return (
       <View style={styles.logo}>
         {/* <Image 

         source={require('./assets/3.png')}
         resizeMode="contain" 
         style={{width: "60%"}}
         /> */}

       <Icon name={"logo-react"} type="ionicon" size={30} color={ COLORS.primary} />


       </View>
    )
}

  return (

  //   <AuthContext.Provider value={{authState, setAuthState}}>
    

  //    {!authState.status ? 
  //      <SafeAreaView>
        
  //      {/* <View style={styles.screen}> */}
  //       {/* <Login /> */}
  //       <NavigationContainer>
      
  //         <Stack.Navigator
  //          screenOptions={{
  //             headerShown: true
  //          }} 
  //          initialRouteName={"Login"}
  //         >

  //           <Stack.Screen name="Login" component={Login} / >
  //           <Stack.Screen name="SignUp" component={Signup} / >
  //          </Stack.Navigator>
  //          </NavigationContainer>
       
       
  //      {/* <View styles={styles.typicalView}>
  //       <Image style={styles.stretch} source={require('./assets/enta.png')} c/>
  //      </View> */}
  //      </SafeAreaView>
    
  //   :
    
  //     <Tabs />
    
    
   
    
    
  //   } 
  <AuthContext.Provider value={{authState, setAuthState}}>
   <Provider store={store} >
     {/* {authState.status ? <>
     <View style={{
        backgroundColor: COLORS.white,
        //paddingTop: SIZES.padding
     }}>
       {renderLogo()}
     </View></>: <View></View> } */}
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
               headerShown: false
            }} 
            initialRouteName={!authState.status ? "Login" : "Tabs"}
           >

            {!authState.status ?
             <Stack.Screen name="Login" component={Login} />
             :
             <Stack.Screen name="drawer" component={CustomDrawer} /> 

            //  <Stack.Screen name="Tabs" component={Tabs} />
             }
            <Stack.Screen name="Signup" component={Signup} / >
            </Stack.Navigator>
   </NavigationContainer>
   
   </Provider>
   </AuthContext.Provider>
       
  );
   
}

  



const styles = StyleSheet.create({
   screen:{
    padding: 30
   },

   textInput:{
    padding:5,
    borderColor:'black',
    borderWidth: 1,
    marginVertical:10,


   },

  
   listItem: {
     padding:10,
     marginVertical:10,
     backgroundColor: '#ccc',
     borderColor:'black',
     borderWidth: 1
   },
   stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },

  typicalView: {
    flex: 2,
    justifyContent:'center',
  }, 
  logo: {
    marginTop: SIZES.padding *3,
    marginBottom: SIZES.padding,
    height: 30,
    
    alignItems: 'center',
    justifyContent:'center',
 },

  //  navItem: {
  //   flex: 1,
  //   alignItems: "center",
  //   padding: 10
  // },

});

