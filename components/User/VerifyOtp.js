/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { View, Text, Dimensions, TextInput, ImageBackground, Image, StyleSheet, TouchableHighlight } from 'react-native';
import FONTS from '../constants/font';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import userActions from '../../redux/user/actions';
import OTPTextInput from 'react-native-otp-textinput'
import axios from 'axios';
import { API_URL } from '../constants/constApi';
import CommonAction from '../../redux/common/actions';



const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const VerifyOtp = ({ navigation,route }) => {
    const dispatch = useDispatch();
    let otpInput = useRef(null);

    const onSubmit=()=>{
        var otpText =otpInput?.state?.otpText.toString();
        var FinalText=otpText.replaceAll(',','')
        axios.post(
            `${API_URL}/verifyPasswordRest`,
            {otp:FinalText,email:route?.params?.email}, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
        ).then((res)=>{
            if(res?.data?.status ==true){
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: res?.data?.message} })
                navigation.navigate('PasswordChange',{email:route?.params?.email})
            }else{
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Something went wrong'} })
            }
        }).catch(err=>{
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: err?.response?.data?.message} })
        })
       }

    return (
        <View style={style.SplashSection}>
            <ImageBackground source={require('../../Assert/Images/background.png')} style={style.SplashBgImage} resizeMode="cover">
                <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/white-logo.png')} />

                <View style={style.LoginForm}>
                    <View style={style.FormGroup}>
                        <Text style={style.FormLabelText}>OTP</Text>
                        <View>
                            <OTPTextInput ref={e => (otpInput = e)} />
                        </View>
                    </View>
                    <View style={style.LoginBtnSec}>
                        <TouchableHighlight style={style.btnLogin} onPress={() =>onSubmit()
                          } underlayColor='transparent'>
                            <Text style={style.btnLoginText}>Verify OTP</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        </View >
    );
};

const style = StyleSheet.create({
    btnSighnUpText: {
        color: '#EDF2F7',
        fontSize: 12,
        fontFamily: FONTS.font,
    },
    btnGuestText: {
        color: '#EDF2F7',
        fontSize: 12,
        letterSpacing: 1,
    },
    continewGuestSec: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40
    },
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
    SplashSection: {
        width: width,
        height: height,
    },
    SplashBgImage: {
        width: width,
        height: height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BrandLogoSplash: {
        width: '60%',
        height: '20%',
        resizeMode: 'contain',
        marginBottom: 30,
    },
    SocialLogin: {
        flexDirection: 'row'
    },
    socialIconBox: {
        backgroundColor: '#EDF2F7',
        width: 40,
        height: 40,
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    orDashBotton: {
        marginTop: 10,
        marginBottom: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    orDash: {
        marginTop: 30,
        marginBottom: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    orText: {
        color: '#EDF2F7',
        fontSize: 17,
        position: 'relative',
        marginLeft: 15,
        marginRight: 15,
    },
    OrLine: {
        content: '',
        width: 80,
        height: 1,
        backgroundColor: '#ffffff96',
    },
    FormLabelText: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
    },
    LoginForm: {
        width: width,
        paddingHorizontal: 40,
    },
    LoginInput: {
        borderRadius: 5,
        backgroundColor: '#EDF2F7',
        paddingLeft: 15,
    },
    fogetPassword: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 50,
    },
    forgetText: {
        color: '#EDF2F7',
        fontSize: 12,
    },
})

export default VerifyOtp;