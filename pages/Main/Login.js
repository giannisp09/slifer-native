import React from 'react'
import { StyleSheet,Modal,KeyboardAvoidingView,Image,TouchableOpacity, AppRegistry, Text, View, Button,TextInput , ScrollView,FlatList,Platform} from 'react-native';
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import {AuthContext} from "../../helpers/AuthContext"
import { backend_url } from '../../config/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient}  from 'expo-linear-gradient';
import {COLORS, SIZES, FONTS} from "../../constants"
import {Icon} from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form'
import {save,getValueFor} from '../../helpers/Storage'
import { deleteItemAsync } from 'expo-secure-store';


// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }

// async function getValueFor(key) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     alert("🔐 Here's your value 🔐 \n" + result);
//   } else {
//     alert('No values stored under that key.');
//   }
// }

function Login({navigation}) {

  const { register, setValue, handleSubmit, control, reset, formState: { errors,isValid } } = useForm({mode: 'onBlur'});

  
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const {setAuthState} = useContext(AuthContext)

  const auth = ({token}) => { 
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
}

 

  const login = data => {
    // let data ={username: username, password: password}
    
    axios.post(backend_url + "users/login/", data).then((response) =>{
      if (response.data.error) 
      {alert(response.data.error);
       }
      else {

      console.log("logged in")
      console.log(data)
       
      deleteItemAsync("access-token")
      save("access-token", response.data.access)
      auth({token: response.data.access})
      //setAuthState({username:response.data.username,id: response.data.id,status:true,
       // profile_photo: response.data.profile_photo});
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }]
      })
     // navigation.navigate("Tabs")

      }
    });
   
    
  }

  const sign_up = () => {
    navigation.navigate("Signup")
  }

  

  const renderLogo = () => {
    return (
       <View style={styles.logo}>
         <Image 

         source={require('../../assets/3.png')}
         resizeMode="contain" 
         style={{width: "60%"}}
         />

       </View>
    )
}

const renderLoginButton = () => {
  return (
    <View style={{margin: SIZES.padding *3}}>
       <TouchableOpacity
         style= {styles.button}
         onPress={handleSubmit(login) }
       >
          <Text style={{color: COLORS.white, ...FONTS.h3}}> Login </Text>      

       </TouchableOpacity>


    </View>


  )

}

const renderSignupButton = () => {
  return (
    <View style={{margin: SIZES.padding *3}}>
       <TouchableOpacity
         style= {styles.button2}
         onPress={sign_up }
       >
          <Text style={{color: COLORS.black, ...FONTS.h3}}> Create an account</Text>      

       </TouchableOpacity>


    </View>


  )

}

const renderForm = () => {
  return (
  <View style={styles.form}>

    {/* username */}
    <View style={{marginTop: SIZES.padding*3}} >
      <Text style={{color: COLORS.white, }}> Username </Text>
      <Controller
         control={control}
         name="username"
         render={({field:{onChange, value, onBlur}}) =>(     
      
        <TextInput 
          style={styles.textInput}
          placeholder="Enter username"
          value={value}
          onBlur={onBlur}
          onChangeText ={value => onChange(value)}
          /> 
          )} 
      />
    </View>


     {/* password */}
     <View style={{marginTop: SIZES.padding*2}} >
      <View>
      <Text style={{color: COLORS.white, }}> Password </Text>
      <Controller
         control={control}
         name="password"
         render={({field:{onChange, value, onBlur}}) =>(     
      
        <TextInput 
          style={styles.textInput}
          secureTextEntry={!showPassword} 
          placeholder="Enter password"
          value={value}
          onBlur={onBlur}
          onChangeText ={value => onChange(value)}
          /> 
          )} 
      />
      <TouchableOpacity
        style={styles.passwordVisibility}
        onPress={() => setShowPassword(!showPassword)}
      >
         <Icon name={"eye-outline"} type="ionicon" size={20} color={ COLORS.white} />


      </TouchableOpacity>
      </View>
     
    </View>

  
 
  </View>
  )
}


  return (
    < KeyboardAvoidingView
     behavior={Platform.OS === "ios" ? "padding" : null}
     style={{flex :1}}>
    <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{flex :1}}
     >
       <ScrollView>
       {renderLogo()}
       {renderForm()}
       {renderLoginButton()}
       {renderSignupButton()}

      </ScrollView>
    
    </LinearGradient>

    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  
  textInput:{
     //marginVertical: SIZES.padding,
     borderBottomColor: COLORS.white,
     borderBottomWidth: 1,
     height: 40,
     color: COLORS.white,
     ...FONTS.body3,


  },

  phone: {
    width: 100,
    height: 40, 
    marginLeft:5,
    marginRight:35,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    
  },

  logo: {
     marginTop: SIZES.padding *5,
     height: 60,
     
     alignItems: 'center',
     justifyContent:'center',
  },

  form: {
    marginTop: SIZES.padding * 3,
    marginHorizontal: SIZES.padding * 3
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





export default Login
