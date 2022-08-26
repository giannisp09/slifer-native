import { StyleSheet,Modal, AppRegistry, Text, View, Button,TextInput , ScrollView,FlatList,Platform} from 'react-native';
import axios from 'axios'
import React, {useState,useEffect,useContext} from 'react';
import {AuthContext} from "../../helpers/AuthContext"
import { List, ListItem } from "react-native-elements";
import PostComponent from '../../components/Post/PostComponent';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FONTS, COLORS, SIZES} from "../../constants"
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-elements';

const {backend_url,backend_url_neo4j,lelouch_photo, token} = require("../../config/config");

// const Stack = createNativeStackNavigator({
//      PostComponent: {screen: PostComponent},

// });


function Home({navigation}) {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const {authState} = useContext(AuthContext)

    const [slifer, setSlifer] = useState("")
    const [apiOverview,setApiOverview] = useState({})

    const postView = (id) =>{
     // history.push(`/post/${id}`); something similar
     console.log("post " + id + " viewed!!!")
    }

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


    useEffect(async () => {
      //  axios.get(backend_url).then((response) =>{
      //   setApiOverview(response.data)
      // } )  

      var token =  await SecureStore.getItemAsync("access-token");

      if (!authState.status){
       // history.push("/login"); //do something similar
       console.log("Must be logged in to view posts")
      }
      else {
        console.log(authState)
      axios.get( backend_url_neo4j + "posts",
      {headers : {'Authorization': 'Bearer '+ token}}).then((response) =>{
        console.log(response.data.likedPosts)
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts);
      });

      axios.get( backend_url).then((response) =>{
        //console.log(response.data)
        //setApiOverview(response.data)
        setSlifer(response.data)
        console.log(apiOverview)
      });
     }
  
    },[])
  
  return (
   
     
     <View style={styles.screen}>
       {renderHeader()}
       {/* <Text style={{padding: 1, ...FONTS.h3}}>{slifer}</Text>  */}
      
      <FlatList
        data={listOfPosts}
        renderItem={({ item ,index}) => (
           
           <PostComponent key={item.postId} id={item.postId} postObject={item} liked={likedPosts[index]} postView={postView} />
           
        )}
        keyExtractor={item => item.post_id}
      />
      {/* {Object.keys(apiOverview).map((key) =>{
        return <Text key={key}>{apiOverview[key]}</Text>
      } )

       } */}
      
    
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

export default Home