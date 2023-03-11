import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView, } from 'react-native';
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import Appbar from '../common/Appbar';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAction from '../../redux/user/actions';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function AddTraveller({ navigation }) {
    const { travelers_list } = useSelector((state) => state.userReducer)
    var [useToken, setUseToken] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const travel = async () => {
            await AsyncStorage.getItem('tickatrip-token').then(
                (res) => {
                    if (res !== null) {
                        setUseToken(res)
                        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
                    } else {
                        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
                    }
                }
            )
        }
        travel();
    }, []);

    useEffect(() => {
        dispatch({
            type: userAction.SET_ADD_TRAVELLER_TOKEN, payload: true
        })
    }, []);


    return (
        <View style={{ width: width, height:height*0.9, backgroundColor: 'white' }}>
            <Appbar title={'Traveller'} />
            <View style={styles.addTravellerbtn}>
                <TouchableHighlight onPress={() => navigation.navigate('addtravellerform')}>
                    <Text style={styles.AddTraveller}>Add Traveller</Text>
                </TouchableHighlight>
            </View>
            <ScrollView>
                <View>
                    {
                        travelers_list?.travelers?.map((item, index) => (

                            <View key={index} style={styles.card}>
                                <Text>{item?.email}</Text>
                                <Text>{item?.phone}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.5 }}>
                                    <Text>Female</Text>
                                    <Text>Indian</Text>
                                </View>

                            </View>

                        ))

                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    addTravellerbtn: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 10
    },
    AddTraveller: {
        fontFamily: FONTS.font,
        color: 'white',
        backgroundColor: COLORS.colorBtn,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        fontSize: height * 0.02
    },
    card: {
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'black',
        marginVertical: 7,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 10
    },
})
