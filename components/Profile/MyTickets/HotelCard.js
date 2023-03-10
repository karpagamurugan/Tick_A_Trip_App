import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import color from '../../constants/color';
import font from '../../constants/font';
import Appbar from '../../common/Appbar';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import actions from '../../../redux/user/actions';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

 export default function HotelTicketView  ( {item,navigation,type} ) {
    const dispatch = useDispatch();
    
    return(
        <View style={style.card} >
        <View style={style.cardView}>
            <View style={style.cardText}>
                <Text style={style.title}>{item?.hotel_name}</Text>
                <Text style={style.title}>{item?.supplierConfirmationNum}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: font.font, fontSize: height * 0.015, color: '#898989' }}>{item?.checkIn}  - {item?.checkOut}</Text>

                        </View>
                        <Text style={{ fontFamily: font.font, color: '#FE712A', fontSize: height * 0.017 }}>No of Days :  {item?.days}</Text>

                    </View>
                    {
                       (type === 'upcoming')? 
                        <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                        <Text style={style.cancelbtn}>Cancel</Text>
                    </TouchableHighlight>:<View/>
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{
                        
                        dispatch({
                            type: actions.SET_HOTEL_TICKETS_DETAILS, payload: {
                            "supplierConfirmationNum":item.supplierConfirmationNum,
                            "referenceNum": item.referenceNum
                          }
                          });
                        // console.log('disItem',item) 
                        navigation.navigate('HotelTicketDetails')
                        }}>
                        <Text style={style.viewDetail}>View Booking Details</Text>
                    </TouchableHighlight>
                    <ArrowIcon name='down' size={12} color='#0041F2' />
                </View>
            </View>
        </View>
    </View>
    )
    }
    
const style = StyleSheet.create({
    mainContainer: { height: height, width: width, backgroundColor: 'white' },
    listView: { height: height, marginBottom: 50 },
    tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        padding: 8,
        width: "100%",
        alignSelf: 'center',
    },
    tabText: { fontSize: 12.5, fontFamily: font.font, alignSelf: 'center' },
    tabBtn: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center'
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
    // cardView: { flexDirection: 'row' },
    cardText: { paddingLeft: 15 },
    title: {
        fontFamily: font.fontBold,
        color: color.colorText,
        // width: width * 0.6,
        fontSize: height * 0.020
    },
    cancelbtn: {
        backgroundColor: 'red',
        fontFamily: font.font,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: 'white',
        marginRight: 10,
        fontSize: height * 0.02
    },
    viewDetail: {
        fontFamily: font.font,
        fontSize: height * 0.017,
        color: '#0041F2',
        textDecorationLine: 'underline'
    },
})