import band from 'd3-scale/src/band';
import React from 'react';
import {
    View,
    Image,
    Text

} from 'react-native'

import {Icon} from 'react-native-elements';
import {COLORS,SIZES} from '../constants'

const FormInputCheck = ({value, error}) => {
    return (
        <View 
        style={{
            justifyContent: 'center'
        }}
        >
           <Icon name={(value == "" || value ==null|| (value != "" && error == ""))
            ? "checkmark-circle-outline" : "close-circle-outline"} 
            type="ionicon"
             size={20} 
            color={ (value == "" || value==null)? COLORS.darkgray :
            (value != "" && error == "") ?
             "green" : "red"}
             />

        </View>
    )

}

export default FormInputCheck