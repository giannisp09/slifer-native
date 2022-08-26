
//import ApiService from "../api";

import { StyleSheet,ImageBackground, Modal,KeyboardAvoidingView,Image,TouchableOpacity, AppRegistry, Text, View, Button,TextInput , ScrollView,FlatList,Platform} from 'react-native';
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext"
import { backend_url } from '../config/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient}  from 'expo-linear-gradient';
import {COLORS, SIZES, FONTS} from "../constants"
import {Icon} from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {save,getValueFor} from '../helpers/Storage'
import { deleteItemAsync } from 'expo-secure-store';
import { FormInput, FormInputCheck, RadioButton} from './'
import TextButton from './TextButton';
import {
  CardField,
  CardFieldInput,
  CardElement, useStripe, CardForm
} from '@stripe/stripe-react-native';
import { utcMilliseconds } from 'd3';





const CheckoutForm = ({navigation}) => {
  const { register, setValue, handleSubmit, control, reset, formState: { errors,isValid } } = useForm({mode: 'onBlur'});

  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();

  const [card, setCard] = useState(CardFieldInput.Details | null); //CardFieldInput.Details | null
  const [cardDetails, setCardDetails] = useState(null)
  const [cardName, setCardName] = useState('');
  const [cardNameError, setCardNameError] = useState('');

  const [cardErrors, setCardErrors] = useState(CardFieldInput.Details | null);

  const [isRemembered, setIsRemembered] = useState(false)

  const {confirmPayment, handleCardAction} = useStripe()
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

// Handle real-time validation errors from the CardElement.




const CardNumberValidation = 
({  value, minLength}) => {
      if (value != null && value != "") {
          if(value.length < minLength ){
            setCardErrors({...cardErrors,
              number: "Number must be 16 digits" })
          }
          else {
            setCardErrors({...cardErrors,
              number: "" })
          }
          console.log(value)
          console.log(CardFieldInput.Details)
      } 
    
};

const handleChange = (event) => {
  if (event.error) {
    setError(event.error.message);
  } else {
    setError(null);
  }
}

const fetchPaymentSheetParams = async () => {
  const response = await fetch(`${backend_url}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { paymentIntent, ephemeralKey, customer } = await response.json();
  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};

const initializePaymentSheet = async () => {
  const {
    paymentIntent,
    ephemeralKey,
    customer,
  } = await fetchPaymentSheetParams();
  const { error } = await initPaymentSheet({
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
  });
  if (!error) {
    setLoading(true);
  }
};

const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet({ clientSecret });
  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
  } else {
    Alert.alert('Success', 'Your order is confirmed!');
  }
};

useEffect(() => {
  setCard({...card, 
    brand:"Visa",
    complete: true,
    last4: "8156",
    validCVC: "Valid",
    validExpiryDate: "Valid",
    validNumber: "Valid"
  
  })
  initializePaymentSheet();
}, []);

const validateCardField=({field, value})=> {
    switch(field) {
       case "cardNumber":
         utils.validateInput()
    }
      

}

const renderCard = () => {
  return (
    <View style={{paddingHorizontal:SIZES.padding}}>
    <ImageBackground
     source={require('../assets/images/red-card.png')}
     style={{
       height: 175,
       width: '100%',
       marginTop : SIZES.radius,
       borderRadius: SIZES.radius,
       overflow: 'hidden',
     }}>

       {/* Visa Logo */}
       <Image 
         source={require('../assets/images/visa-2.png')}
         resizeMode="contain"
         style={{
            position: 'absolute',
            top: 5,
            right: 20,
            height: 60,
            width: 80
         }} 
       />

       {/* Details */}
       <View 
          style={{
             position: 'absolute',
             bottom: 20,
             left: 15,
             right:0,
             paddingHorizontal: SIZES.padding,
          }}
       >
            <Text style={{color:"white", ...FONTS.h3}}>{cardName}</Text>
     

       <View style={{flexDirection:"row"}}>
         <Text 
           style={{ 
             flex:1,
             color:"white",
             ...FONTS.body3
          }}
         >{card.number}</Text>

         {card.expiryMonth < 10 ? 
          <Text
           style={{
             color:"white",
             ...FONTS.body3
           }}
          >
            0{card.expiryMonth}/{card.expiryYear}
          </Text> :
          <Text
           style={{
             color:"white",
             ...FONTS.body3
           }}
          >
            {card.expiryMonth == null ? '' :0}{card.expiryMonth} 
          </Text> 
         }

       </View>
       </View>

     </ImageBackground>
     </View>

    
  )
}

const renderDetail = () => {
   return (
     <View style={{marginTop: SIZES.padding * 2 }}>

        <FormInput 
          label="Card Number"
          keyboardType="number-pad"
          value={card.number}
          maxLength={19}
          onChange={(value) => {
              setCard({...card, number: value.replace(/\s/g, '')
              .replace(/(\d{4})/g, '$1 ').trim()})
              //utils.validateInput(value, 19, setCardErrors)
              //let cae = CardNumberValidation(cardErrors, value, 16,setCardErrors)
              if(value.length >0 && value.length < 19 ){
                setCardErrors({...cardErrors,
                  number: "Number must be 16 digits" })
              }
              else {
                setCardErrors({...cardErrors,
                  number: "" })
              }
              
              console.log(card)
              console.log(cardErrors)

          }}
          errorMsg={cardErrors.number}
          appendComponent={
            <FormInputCheck 
               value={card.number}
               error={cardErrors.number}
            />}
        />

        <FormInput 
          label="Cardholder Name"
          value={cardName}
          containerStyle={{
            marginTop: SIZES.radius/2
          }}
          onChange={(value) => {
              setCardName(value)
              //utils.validateInput(value, 19, setCardErrors)
              //let cae = CardNumberValidation(cardErrors, value, 16,setCardErrors)
              if(value.length< 1 ){
                setCardNameError("Name must be not empty" )
              }
              else {
                setCardNameError("")
              }           
          }}
          errorMsg={cardNameError}
          appendComponent={
            <FormInputCheck 
               value={cardName}
               error={cardNameError}
            />}
        />

        {/* Expire Date & CVV */}
        <View 
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius/2
            
          }}
        >
          <FormInput 
              label="Expiry Date"
              placeholder="MM"
              keyboardType="number-pad"
              maxLength={2}
              value={card.expiryMonth}
              containerStyle={{
              
              }}
              onChange={(value) => {
                  //setCard(...card,value)
                  //utils.validateInput(value, 19, setCardErrors)
                 //let cae = CardNumberValidation(cardErrors, value, 16,setCardErrors)
                 //value = value.split("/")
                 setCard({...card,expiryMonth:value})
                 console.log(value)
                 console.log(cardErrors)  


                 if(parseInt(value)>12 || parseInt(value) <0){
                    setCardErrors({...cardErrors, expiryMonth:"Wrong Month"})
                  }
                  else {
                    setCardErrors({...cardErrors, expiryMonth:""})
                    console.log("here")
                  } 
                        
              }}
              //errorMsg={cardErrors.expiryMonth}
              appendComponent={
                <FormInputCheck 
                  value={card.expiryMonth}
                  error={cardErrors.expiryMonth}
                />}
          />
          <FormInput 
              label=" "
              placeholder="YY"
              keyboardType="number-pad"
              maxLength={2}
              value={card.expiryYear}
              containerStyle={{
                flex:0.4
              }}
              onChange={(value) => {
                  //setCard(...card,value)
                  //utils.validateInput(value, 19, setCardErrors)
                 //let cae = CardNumberValidation(cardErrors, value, 16,setCardErrors)
                 //value = value.split("/")
                 console.log(card)

                 setCard({...card,expiryYear:value})


                 if(parseInt(value) < 0){
                  setCardErrors({...cardErrors, expiryYear:"Year must be positive"})
                }
                else {
                  setCardErrors({...cardErrors, expiryYear:""})
                }   
              }}
              errorMsg={""}
              appendComponent={
                <FormInputCheck 
                  value={card.expiryYear}
                  error={cardErrors.expiryYear}
                />}
        />

          <FormInput 
              label="CVC"
              placeholder="CVC"
              keyboardType="number-pad"
              maxLength={3}
              value={card.cvc}
              containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius
              }}
              onChange={(value) => {
                  //setCard(...card,value)
                  //utils.validateInput(value, 19, setCardErrors)
                 //let cae = CardNumberValidation(cardErrors, value, 16,setCardErrors)
                 //value = value.split("/")
                 setCard({...card,cvc:value})

                if(value.length < 3){
                  setCardErrors({...cardErrors, cvc:"CVC is 3-digits"})
                }
                else {
                  setCardErrors({...cardErrors, cvc:""})
                }   
              }}
              errorMsg={cardErrors.cvc}
              appendComponent={
                <FormInputCheck 
                  value={card.cvc}
                  error={cardErrors.cvc}
                />}
        />



        </View>

        <View
          style={{
             alignItems: 'flex-start',
             marginTop: SIZES.padding,

          }}
        > 
         <RadioButton 
          label="Remember this card dertails."
          isSelected={isRemembered}
          onPress={() => setIsRemembered(!isRemembered)}
         />

        </View>
     </View>
   )
}

const renderButton =  ({text, navigationTarget}) => {
  
  console.log(card)
  return (
      <TextButton name={text}
       onPress={ async() => {
        //add these lines
        const  {paymentMethod, paymentError} = await stripe.createPaymentMethod({
          type: 'card',
          card: card
        });
        console.log(paymentMethod)
        navigation.navigate(navigationTarget)
      }}
      />
  )
}



const renderForm = () => {

 
   return (
     <KeyboardAwareScrollView
      keyboardDismissMode='on-drag'
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: SIZES.padding
      }}> 
        {/* Card */}
        {renderCard()}


        {/* Details */}
        
        {renderDetail()}

        {renderButton({text:"Proceed", navigationTarget:"Home"})}

      


     </KeyboardAwareScrollView>
   )
    }

    return (
      <View >
        {renderForm()}

      </View>
    )
    
};




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

  cardForm:{
    width: '100%',
    height: 250,
    marginVertical: 20,
  },

  passwordVisibility: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    height: 30,
    width: 30,
  }


});


export default CheckoutForm;

 {/* <CardForm
        postalCodeEnabled={false}
        countryNameEnabled={false}
        
        onFormComplete={(cardDetails) => {
            console.log('card details', cardDetails);
           setCard(cardDetails);
        }}
        style={styles.cardForm}
      /> */

      /* <CardField
      postalCodeEnabled={false}
      placeholder={{
        number: '4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 20,
      }}
      onCardChange={(cardDetails) => {
        setCard(cardDetails);
        console.log(cardDetails)
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    /> 
  
  return (

     
    <View  style={styles.form}>
  
      
      <View style={{marginTop: SIZES.padding*3}} >
        <Text style={{color: COLORS.white, }}> E-mail </Text>
        <Controller
           control={control}
           name="email"
           render={({field:{onChange, value, onBlur}}) =>(     
        
          <TextInput 
            style={styles.textInput}
            placeholder="Enter email"
            value={value}
            onBlur={onBlur}
            onChangeText ={value => onChange(value)}
            /> 
            )} 
        />
      </View>

      <View >

      

     

    <Button
          style={styles.button}
          disabled={!loading}
          title="Checkout"
          color="#841584"
          onPress={openPaymentSheet}
    />
    </View>
  
  
     
      
       
      </View>
  
    
   
    
    )
  }
  

return (
  <View>
    <Text> Card Form</Text>
    {renderForm()}

  </View>
);*/}
