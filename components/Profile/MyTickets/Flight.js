import React from 'react';
import {View,Text,ScrollView, Dimensions,StyleSheet} from 'react-native';

let width =Dimensions.get('window').width;
let height =Dimensions.get('window').height;

export default function Tickets(){
    return(
        <View style={style.mainContainer}>


        </View>
    )
}

const style = StyleSheet.create({
    mainContainer:{
        height:height,
        width:width,
        backgroundColor:'white'
    }
})