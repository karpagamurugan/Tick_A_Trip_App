/* eslint-disable prettier/prettier */
import React, { useState, useEffect, } from "react";
import { View, Dimensions, Modal, Text,StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Ant from 'react-native-vector-icons/AntDesign';
import CommonAction from '../../redux/common/actions';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function Alert() {
    const dispatch = useDispatch()
    const { setAlert } = useSelector((state) => state.CommonReducer)

    useEffect(() => {
        if (setAlert.status === true) {
            setTimeout(() => dispatch({ type: CommonAction.SET_ALERT, payload: { status: false, message: '' } }), 3000)
        }
    }, [setAlert,dispatch])

    return (
        <Modal
            visible={setAlert.status}
            animationType="fade"
            transparent={true}
        >
            <View style={style.AlertBox}>
                {/* <Text style={style.AlertBoxHead}>Tick a Trip says</Text> */}
                <Ant name="infocirlce" size={22} color={COLORS.BtnColor}/>
                <Text style={style.AlertBoxCon}>{setAlert?.message}</Text>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    AlertBox: {
        position: 'absolute',
        bottom: 10,
        backgroundColor:'black',
        width: width * 0.9,
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
        borderRadius:10,
        flexDirection:'row'
        // borderWidth:3,
        // borderColor:'#FFCC00',
    },
    AlertBoxHead:{
        textAlign:'center',
        color:COLORS.colorBtn,
        fontFamily:FONTS.mediam,
        marginBottom:3,
    },
    AlertBoxCon:{
        paddingLeft:10,
        color:'white',
        fontFamily:FONTS.mediam,
    },
})