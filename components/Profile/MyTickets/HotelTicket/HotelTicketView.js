import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight, Modal, Pressable, Platform } from 'react-native';
import COLORS from '../../../constants/color';
import FONTS from '../../../constants/font';
import Appbar from '../../../common/Appbar';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Otp from '../../Otp';
import userAction from '../../../../redux/user/actions';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

 function HotelTicketView({ item, navigation, type }) {
    const {otpModalView} = useSelector((state) => state.userReducer)
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    
    const OnCancelHotelBooking = (item, index) => {
        dispatch({
            type:userAction.OTP_MODAL_VIEW, payload:true
        })
        dispatch({
            type: userAction.GET_HOTEL_BOOKINGS_CANCEL_REQUEST, payload: {
                supplierConfirmationNum: item.supplierConfirmationNum,
                referenceNum: item.referenceNum
            },
            navigation:navigation
        })
    }
   
    return (
        <View style={style.card} >
            <View style={style.cardView}>
                <View style={style.cardText}>
                    <Text style={style.title}>{item?.hotel_name}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                        <View>
                            <Text style={style.title}>{item?.supplierConfirmationNum}</Text>
                            <Text style={{ fontFamily: FONTS.font, fontSize: height * 0.015, color: '#898989' }}>{item?.checkIn}  to {item?.checkOut}</Text>
                        </View>
                        {
                            (type === 'upcoming') ?
                                <TouchableHighlight onPress={() => OnCancelHotelBooking(item)} underlayColor='transparent'>
                                    <Text style={style.cancelbtn}>Cancel</Text>
                                </TouchableHighlight> : <View />
                        }
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between',marginTop:5  }}>
                    <Text style={{ fontFamily: FONTS.font, color: '#FE712A', fontSize: height * 0.017 }}>No of Days :  {item?.days}</Text>
                        <TouchableHighlight underlayColor='transparent' onPress={() => {
                            dispatch({
                                type: userAction.SET_HOTEL_TICKETS_DETAILS, payload: {
                                    "supplierConfirmationNum": item.supplierConfirmationNum,
                                    "referenceNum": item.referenceNum
                                },navigation:navigation
                            });
                        }}>
                            <Text style={style.viewDetail}>View Booking Details</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                visible={otpModalView}
                transparent={true}
                >
                <View style={{ backgroundColor: '#0000008f', height: '100%', justifyContent: 'center' }}>
                    <View style={style.ModalContainer}>
                        <View style={style.modalView}>
                            <View style={style.modalFlex}>
                                <Text style={style.ModalLabelText}>Hotel Booking Cancel</Text>
                                <Pressable
                                    onPress={() => 
                                          dispatch({
                                        type:userAction.OTP_MODAL_VIEW, payload:false
                                    })}>
                                    <IoniconsIcon name='close' size={35} color='#7c7c7c' />
                                </Pressable>
                            </View>
                            <Otp item={item} type={'hotel'} />
                        </View>
                    </View>
                </View>
            </Modal>
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
    tabText: { fontSize: 12.5, fontFamily: FONTS.font, alignSelf: 'center' },
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
        padding: 10,
        overflow:'hidden',
        borderWidth:Platform.OS==='ios'?0.1:0,
        borderColor:'grey'
    },
    cardText: { paddingLeft: 15 },
    title: {
        fontFamily: FONTS.fontBold,
        color: COLORS.colorText,
        fontSize: height * 0.020
    },
    cancelbtn: {
        backgroundColor: 'red',
        fontFamily: FONTS.font,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: 'white',
        marginRight: 10,
        fontSize: height * 0.02,
        overflow:'hidden'
    },
    viewDetail: {
        fontFamily: FONTS.font,
        fontSize: height * 0.017,
        color: '#0041F2',
        textDecorationLine: 'underline'
    },
    ModalContainer: {
        alignItems: 'center',
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    modalFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingTop: 10
    },
    ModalLabelText: {
        fontSize: 20,
        color: '#000',
        fontFamily: FONTS.mediam,
    },
})
export default React.memo(HotelTicketView)