/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, ActivityIndicator, Pressable, Modal, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";

export default function FlightLoader() {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const { flight_loader } = useSelector((state) => state.CommonReducer)

    return (

        <Modal
            visible={flight_loader}
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

            <View style={{ width: width, height: height, display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                <View style={{ backgroundColor: '#fff', width: 150, height: 150, borderRadius: 100, overflow: "hidden", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 150, width: 150, resizeMode: 'cover', }} source={require('../../Assert/loader/flight.gif')} />
                </View>
            </View>
        </Modal>
    )
}