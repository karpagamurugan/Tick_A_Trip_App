/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Dimensions, Pressable, Modal, Image } from "react-native";
import { useSelector } from "react-redux";

export default function LazyLoader() {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const { common_loader } = useSelector((state) => state.CommonReducer)

    // console.log(common_loader, 'loader...')
    return (
        <Modal
            visible={common_loader}
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
                <View style={{backgroundColor:'#fff', width: 150,height: 150,borderRadius: 100,overflow: "hidden",}}>
                    <Image style={{ height: 150, width: 150, resizeMode: 'cover' }} source={require('../../Assert/loader/common.gif')} />
                </View>
            </View>
        </Modal>
    )
}