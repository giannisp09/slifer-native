import React,{useState} from 'react'
import { StyleSheet, Text, View, Button,TextInput , ScrollView,FlatList,Platform} from 'react-native';


function Goalnput({onAddGoal}) {

  const [goal,setGoal] = useState({})

  const goalHandler = (text) =>{
    let obj = {postText:text}
    setGoal(obj)
 };

  return (
    <View style={styles.inputContainer}>
        <TextInput placeholder="Enter Course Goal"
         onChangeText={goalHandler} 
         value={goal.value}/>
        <Button title="Add" onPress={onAddGoal.bind(this,goal)} />
      </View>
  )
}

const styles = StyleSheet.create({

 inputContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
   }
})

export default Goalnput