import React from 'react'
import { StyleSheet,ImageBackground, Text, View,TouchableOpacity, Button,TextInput , ScrollView,FlatList, Image} from 'react-native';

// import axios from 'axios'
import {useState,useEffect,useContext} from 'react'
import {AuthContext, AuthState} from "../../helpers/AuthContext";
import {Icon} from 'react-native-elements';

import { backend_url, token } from '../../config/config';
import {COLORS, SIZES, FONTS} from '../../constants'



function PostComponent({id, postObject, liked, postView, image_url}) {
  const [likes_count,setLikes_count] = useState(0);
    const [likedState,setLikedState] = useState(false);
    const {authState} = useContext(AuthContext)




    useEffect(() => {
     //setLikes_count(postObject.likes_count)
      setLikedState(liked)
      console.log(postObject)
    },[postObject,liked])

    // const deletePost = (id) => {
    //   axios.delete(backend_url + `/posts/${id}`,
    //   {headers : {'Authorization': 'Bearer '+ token}})
    //   .then((response)=>{
    //      
    //   })
    // }
   

    // const likePost = (id) => {
    //     axios.post(backend_url + "likes",
    //     {postID : id},
    //     {headers : {'Authorization': 'Bearer '+token}})
    //     .then((response)=> {
    //       alert(response.data);
    //       if (response.data ==="1"){
    //        setLikes_count(likes_count+1)
    //        setLikedState(true)
    //       }
    //       else {
    //        setLikes_count(likes_count-1)
    //        setLikedState(false)
    //       }
    //     })
    // }
   
    const image = {uri: postObject.profile_photo}
    return (
        <TouchableOpacity>
         <View style={styles.header}>
         <Image
         style={{width: 30, height:30, borderRadius:30/2, marginRight:10}}
         source={{
          uri:postObject.profile_photo,//https://static0.cbrimages.com/wordpress/wp-content/uploads/2020/08/Lelouch-Zero.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5
         }}
        />
          <Text style={{flex:2}}>{postObject.username}</Text>

         </View>
       
    
        <View style={styles.listItem}>
       
         
          <View style={styles.container}>
          {/* <ImageBackground source={{uri: postObject.profile_photo}}style={styles.image} >
              <Text>Inside</Text>
          </ImageBackground> */}
          <Image
         style={{width: '100%', height: 300 ,  marginRight:10}}
         source={{
          uri:postObject.profile_photo,//https://static0.cbrimages.com/wordpress/wp-content/uploads/2020/08/Lelouch-Zero.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5
         }}
        />
          </View>
          <Text>{postObject.postText}</Text>
        </View>
        <View style={styles.reactionsDataFooter}>
        {/* <Icon name={"chatbubbles-outline"} type="ionicon" size={20} color={ COLORS.black} /> */}
          <Text> 419 likes</Text>
        </View>
        <View style={styles.reactionsFooter}>
        <Icon name={"chatbubbles-outline"} type="ionicon" size={20} color={ COLORS.black} />

        </View>

     
       </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: '#fff',
    padding: 10,
    
    flexDirection: "row"
   
  },
  reactionsDataFooter:{
    backgroundColor: '#fff',
    padding: 10,
    
    flexDirection: "row"
   
  },

  reactionsFooter:{
    backgroundColor: '#fff',
    padding: 10,
    
    flexDirection: "row"
   
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20
  },
  

  listItem: {
    padding:10,
    backgroundColor: COLORS.white,
    borderBottomColor:'black',
    borderBottomWidth: 0.2
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },

});

export default PostComponent;

