/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Dimensions, Pressable, Modal, Image } from "react-native";
import { useSelector } from "react-redux";

export default function HotelLoader() {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const { hotel_loader } = useSelector((state) => state.CommonReducer)

    return (
        <Modal
            visible={hotel_loader}
            animationType="fade"
            transparent={true}
        >

            <Pressable
                style={{
                    position: 'absolute',
                    backgroundColor: '#000000',
                    opacity: 0.3,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }} />

           
            <View style={{ width: width, height: height, display: 'flex', justifyContent: 'center', alignItems: "center"}}>
                <View style={{backgroundColor:'#fff', width: 150,height: 150,borderRadius: 100,overflow: "hidden",flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{ height: 100, width: 100, resizeMode: 'cover', }} source={require('../../Assert/loader/hotel.gif')} />
                </View>
            </View>
        </Modal>
    )
}