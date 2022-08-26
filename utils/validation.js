export function CardNumberValidation 
({ cardErrors, value, minLength,setCardErrors }) {
      console.log("here")
      if (value != null && value != "") {
          if(value.length < minLength ){
            setCardErrors({...cardErrors,
              number: "Number must be 16 digits" })
          }
          console.log("here")
      }
      console.log("here")
      return cardErrors;
};




module.exports= {
    CardNumberValidation
};