/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Dimensions, Modal, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CommonAction from "../../redux/common/actions";
import style from "./commonStyle";

export default function Alert() {
    const dispatch = useDispatch()
    const { setAlert } = useSelector((state) => state.CommonReducer)

    useEffect(() => {
        if (setAlert.status === true) {
            setTimeout(() => dispatch({ type: CommonAction.SET_ALERT, payload: { status: false, message: '' } }), 10000)
        }
    }, [setAlert,dispatch])

    return (
        <Modal
            visible={setAlert.status}
            animationType="fade"
            transparent={true}
        >
            <View style={style.AlertBox}>
                <Text style={style.AlertBoxHead}>Tick a Trip says</Text>
                <Text style={style.AlertBoxCon}>{setAlert?.message}</Text>
            </View>
        </Modal>
    )
}