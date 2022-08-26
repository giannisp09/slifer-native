import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect,useContext } from "react";

import { COLORS,FONTS, SIZES } from '../../constants';
import * as DocumentPicker from 'expo-document-picker';
import {Icon} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import {AuthContext,AuthState} from "../../helpers/AuthContext";
import axios from 'axios';

const {backend_url, token} = require("../../config/config");
import { deleteItemAsync } from 'expo-secure-store';




export default function Profile({navigation}) {
 
    const [singleFile, setSingleFile] = useState(null);

    const {authState, setAuthState} = useContext(AuthContext)


    const uploadImage = async () => {
        // Check if any file is selected or not
        if (singleFile != null) {
          // If file selected then create FormData
          let token =  await SecureStore.getItemAsync("access-token");
          const fileToUpload = singleFile;
          console.log(authState)
         // console.log(fileToUpload)

          // let data = new FormData() //  let data = {user:authState.id, photo: fileToUpload}

          // data.append('photo', {uri: fileToUpload.uri, name: fileToUpload.name, type: 'image/jpg'})
          // data.append("user",1) // authState.id)
          //data.append("photo", fileToUpload)
          let data = {"user": 1, "photo": fileToUpload.uri}
          console.log(data)

          axios.post(backend_url +"users/addPhoto", data,
          {headers : {'Authorization': 'Bearer '+ token
          }})
          .then((response, err) =>{
          
            if (response.data.error)  
              {alert(response.data.error);}   
            else {     
              console.log("success")                       
              console.log(response.data)                
            }        
         
            if (err)
             console.log(err)
          });
        }
      };
  
    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
        //   const res = await DocumentPicker.pick({
        //     // Provide which type of file you want user to pick
        //     type: [DocumentPicker.types.images],
        //     // There can me more options as well
        //     // DocumentPicker.types.allFiles
        //     // DocumentPicker.types.images
        //     // DocumentPicker.types.plainText
        //     // DocumentPicker.types.audio
        //     // DocumentPicker.types.pdf
        //   });

          const res = await DocumentPicker.getDocumentAsync({
              type:  "image/*"
          })
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          // Setting the state to show single file attributes
          setSingleFile(res);
        } catch (err) {
          setSingleFile(null);
          // Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            alert('Canceled');
          } else {
            // For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      };

      const renderAddButton = () => {
        return (
          <View style={{margin: SIZES.padding *3}}>
             <TouchableOpacity
               style= {styles.button2}
               onPress={selectFile }
             >
                {/* <Text style={{color: COLORS.black, ...FONTS.h3}}>Add Photo </Text>       */}
      
                <Icon name={"add-circle"} type="ionicon" size={20} color={ COLORS.black} />

             </TouchableOpacity>
      
          </View>
        )
      
      }

      const renderSendButton = () => {
        return (
          <View style={{margin: SIZES.padding *3}}>
             <TouchableOpacity
               style= {styles.button2}
               onPress={uploadImage }
             >
                {/* <Text style={{color: COLORS.black, ...FONTS.h3}}>Add Photo </Text>       */}
      
                <Icon name={"cloud-done"} type="ionicon" size={20} color={ COLORS.black} />

             </TouchableOpacity>
      
          </View>
        )
      
      }

      const renderLogoutButton = () => {
        return (
          <View style={{margin: SIZES.padding *3}}>
             <TouchableOpacity
               style= {styles.button2}
               onPress={() => { deleteItemAsync("access-token")
              } }
             >
                {/* <Text style={{color: COLORS.black, ...FONTS.h3}}>Add Photo </Text>       */}
      
                <Icon name={"exit"} type="ionicon" size={20} color={ COLORS.black} />

             </TouchableOpacity>
      
          </View>
        )
      
      }


      const renderSocietyButton = () => {
        return (
          <View style={{margin: SIZES.padding *3}}>
             <TouchableOpacity
               style= {styles.button2}
               onPress={() => { 
                 navigation.navigate("Drawrer")
              } }
             >
                {/* <Text style={{color: COLORS.black, ...FONTS.h3}}>Add Photo </Text>       */}
      
                <Icon name={"business"} type="ionicon" size={20} color={ COLORS.black} />

             </TouchableOpacity>
      
          </View>
        )
      
      }
      


  return (
    <View style={styles.screen}>


      <Text>Profile</Text>

      <View>
         <Text style={{color: COLORS.black, ...FONTS.h2}}>
             Add Profile Photo
         </Text>
         {renderAddButton()}
         {(singleFile != null) ?
           renderSendButton()
           : console.log("not yet")
         }

         {renderLogoutButton()}
         {renderSocietyButton()}

      </View>
    </View>

   
  )
}


const styles = StyleSheet.create({
    screen:{
     padding: 30
    },

    textInput:{
        //marginVertical: SIZES.padding,
        borderBottomColor: COLORS.white,
        borderBottomWidth: 1,
        height: 40,
        color: COLORS.white,
        ...FONTS.body3,
   
   
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
   
   
   
  });