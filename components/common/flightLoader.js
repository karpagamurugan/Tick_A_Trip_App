import React, { useState } from "react";
import { View , Text, ActivityIndicator,Pressable,Modal,Image} from "react-native";
import { useSelector } from "react-redux";

export default function FlightLoader(){

const {common_loader} =useSelector((state)=>state.CommonReducer)

        console.log(common_loader,'loader...')
    return (
        <Modal
        visible={common_loader}
        animationType="fade"
        transparent={true}
    >

        <Pressable
            // onPress={() => show_loader}
            style={{
                position: 'absolute',
                backgroundColor: '#000000',
                opacity: 0.3,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                // backgroundColor:'red'
            }} />

<View style={{ flex: 1, justifyContent: 'center', alignItems: "center"}} >
        <View style={{borderRadius: 100, backgroundColor: 'white',flexDirection:'column',alignItems:'center',padding:0 }}>
          
            <Image source={require('../../Assert/loader/flight.gif')} style={{width:150,height:150}}/>
            {/* <ActivityIndicator size={40} color={'red'}/> */}
            {/* <Text
                style={
                    {
                        color: 'black',
                        alignSelf: 'center',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16
                    }
                }
            >Loading Please Wait...</Text> */}

        </View>
    </View>
    </Modal>
    )
}