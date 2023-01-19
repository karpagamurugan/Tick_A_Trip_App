import React from 'react';
import {View,Text,Dimensions,StyleSheet} from 'react-native';
import Appbar from '../../common/Appbar';



export default function HotelTicketDetails({navigation}){
    return(
        <View>
            <Appbar title={'Booking Details'}/>
            <Text>Hotel details....</Text>
        </View>
    )
}


const style = StyleSheet.create({
   
})