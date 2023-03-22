import React, { useRef, useState } from 'react';
import { Alert, View, Text, Dimensions, TextInput, Pressable, Image, StyleSheet, TouchableHighlight, Modal } from 'react-native';
import FONTS from '../constants/font';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import userActions from '../../redux/user/actions';
import OTPTextInput from 'react-native-otp-textinput'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


const Otp = ({ item, navigation, type }) => {
    let otpInput = useRef(null);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    

    const confirmOtp = (item) => {  
       if(type==='hotel'){
        dispatch({
            type: userActions.GET_HOTEL_BOOKINGS_CANCEL_VERIFY, payload: {
                supplierConfirmationNum: item.supplierConfirmationNum,
                referenceNum: item.referenceNum,
                OTP: otpInput?.state?.otpText?.toString()?.replaceAll(",", "")
            }
        })
       }else if(type==='flight'){
        dispatch({
            type: userActions.GET_FLIGHT_BOOKINGS_CANCEL_VERIFY, payload: {
                supplierConfirmationNum: item.supplierConfirmationNum,
                referenceNum: item.referenceNum,
                OTP: otpInput?.state?.otpText?.toString()?.replaceAll(",", "")
            }
        })
       }
        // console.log('confirmOtp1',item.supplierConfirmationNum)
        // console.log('confirmOtp2',item.referenceNum)
        console.log('confirmOtp3',)
        setOtp("");
    }

    return (
        <View style={style.ModalOtp}>
            <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/Otp_logo.png')} />
            <View style={style.LoginForm}>
                <View style={{ marginHorizontal: 30 }}>
                    <Text style={style.OtpText}>Enter Your OTP</Text>
                    <OTPTextInput
                        value={otp}
                        onChange={v => setOtp(v)}
                        inputCount={6}
                        textInputStyle={{ width: 40, color: '#0040f0' }}
                        ref={e => (otpInput = e)}
                        tintColor='#0040f0'
                    />
                </View>
                <View style={style.LoginBtnSec}>
                    <TouchableHighlight style={style.btnLogin} onPress={() => confirmOtp(item)} underlayColor='transparent'>
                        <Text style={style.btnLoginText}>Confirm Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>

        </View >
    );
}

const style = StyleSheet.create({
    btnLoginText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 15,
    },
    btnLogin: {
        backgroundColor: '#0041F2',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    LoginBtnSec: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },

    BrandLogoSplash: {
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10
    },
    LoginForm: {
        width: width,
    },
    ModalOtp: {
        paddingTop: 10,
        paddingBottom: 30
    },

    OtpText: {
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 18,
        color: '#000',
        fontFamily: FONTS.mediam
    },
    underlineStyleBase: {
        color: '#000'
    }
})

export default Otp;